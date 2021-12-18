import express from 'express';
import path from 'path';
import fetch from 'cross-fetch';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {
  SearchResultProps,
  ReleaseProps,
  FriendsProps,
  AlbumProps,
} from '../src/lib/types';
dotenv.config();
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());

if (!process.env.DISCOGS_CONSUMER_KEY) {
  throw new Error('No Discogs Consumer Key available');
}
if (!process.env.DISCOGS_CONSUMER_SECRET) {
  throw new Error('No Discogs Consumer Secret available');
}

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('No JWT_SECRET provided');
}

const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;

let oAuthRequestTokenSecret: string | null;
let oAuthRequestToken: string | null;
let oAuthAccessTokenSecret: string | null;
let oAuthAccessToken: string | null;

app.get('/api/oauth/request_token', async (request, response, next) => {
  try {
    const tokenResponse = await fetch(
      'https://api.discogs.com/oauth/request_token',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_nonce="${Date.now()}",oauth_version="1.0",oauth_signature="${consumerSecret}&", oauth_callback="http://${
            request.hostname
          }/api/oauth/return"`,
        },
      }
    );

    const token = await tokenResponse.text();
    const params = new URLSearchParams(token);
    oAuthRequestToken = params.get('oauth_token');
    oAuthRequestTokenSecret = params.get('oauth_token_secret');
    response.redirect(
      `https://discogs.com/oauth/authorize?oauth_token=${oAuthRequestToken}`
    );
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get('/api/oauth/return', async (request, response, next) => {
  const { oauth_verifier: oAuthVerifier } = request.query;

  try {
    const tokenResponse = await fetch(
      'https://api.discogs.com/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_nonce="${Date.now()}",oauth_token="${oAuthRequestToken}", oauth_signature=${consumerSecret}&${oAuthRequestTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${oAuthVerifier}"`,
        },
      }
    );

    const responseToken = await tokenResponse.text();
    const params = new URLSearchParams(responseToken);
    oAuthAccessToken = params.get('oauth_token');
    oAuthAccessTokenSecret = params.get('oauth_token_secret');

    const identityResponse = await fetch(
      'https://api.discogs.com/oauth/identity',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${oAuthAccessToken}", oauth_signature="${consumerSecret}&${oAuthAccessTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const identity = await identityResponse.json();
    const username = jwt.sign(identity.username, JWT_SECRET);
    if (oAuthAccessToken && oAuthAccessTokenSecret) {
      const token = jwt.sign(oAuthAccessToken, JWT_SECRET);
      const secret = jwt.sign(oAuthAccessTokenSecret, JWT_SECRET);
      response.cookie(
        'auth',
        JSON.stringify({
          username: username,
          token: token,
          secret: secret,
        }),
        { httpOnly: true }
      );

      response.redirect(`http://${request.hostname}/home`);
    }
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get(
  '/api/search/:searchcategory/:searchquery',
  async (request, response, next) => {
    const searchQuery = request.params.searchquery;
    const searchCategory = request.params.searchcategory;
    let format;
    {
      searchCategory === 'title' ? (format = '&format=lp') : (format = null);
    }

    try {
      const authCookie = JSON.parse(request.cookies.auth);

      const token = jwt.verify(authCookie.token, JWT_SECRET);
      const secret = jwt.verify(authCookie.secret, JWT_SECRET);

      const searchResponse = await fetch(
        `https://api.discogs.com/database/search?type=release&county=usa${format}&${searchCategory}=${searchQuery}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          },
        }
      );
      const search = await searchResponse.json();
      const results = search.results;
      const searchResult = results.map((result: SearchResultProps) => ({
        title: result.title,
        id: result.id,
        cover: result.cover_image,
        in_collection: result.user_data.in_collection,
      }));
      response.send(searchResult);
    } catch (error) {
      next(response.status(500).send('Internal Server Error'));
    }
  }
);

app.get('/api/me', async (request, response, next) => {
  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const user = jwt.verify(authCookie.username, JWT_SECRET);
    const token = jwt.verify(authCookie.token, JWT_SECRET);
    const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    const collectionResponse = await fetch(
      `https://api.discogs.com/users/${user}/collection`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );

    const instanceResponse = await fetch(
      `https://api.discogs.com/users/${user}/collection/folders/1/releases`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const instance = await instanceResponse.json();
    const instanceReleases = instance.releases;

    const collection = await collectionResponse.json();
    const collectionReleases = collection.releases;
    const myCollection = collectionReleases.map(
      (release: { basic_information: ReleaseProps }, index: number) => ({
        title: release.basic_information.title,
        artist: release.basic_information.artists_sort,
        labels: release.basic_information.labels,
        genres: release.basic_information.genres,
        styles: release.basic_information.styles,
        tracklist: release.basic_information.tracklist,
        release: release.basic_information.released_formatted,
        id: release.basic_information.id,
        sales_history: release.basic_information.sales_history,
        cover: release.basic_information.huge_thumb,
        in_collection: true,
        instanceId: instanceReleases[index].instance_id,
      })
    );
    const myUniqueCollection = [
      ...new Map(
        myCollection.map((album: AlbumProps) => [album.id, album])
      ).values(),
    ];

    response.send(myUniqueCollection);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get('/api/album/:albumid', async (request, response, next) => {
  const albumId = request.params.albumid;

  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const token = jwt.verify(authCookie.token, JWT_SECRET);
    const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    const searchResponse = await fetch(
      `https://api.discogs.com/releases/${albumId}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const search = await searchResponse.json();
    const singleAlbum = {
      title: search.title,
      artist: search.artists_sort,
      labels: search.labels,
      genres: search.genres,
      styles: search.styles,
      tracklist: search.tracklist,
      release: search.released,
      id: search.id,
      cover: search.images[0].uri,
    };

    response.send(singleAlbum);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.post('/api/collection/:albumid', async (request, response, next) => {
  const albumId = request.params.albumid;

  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const user = jwt.verify(authCookie.username, JWT_SECRET);
    const token = jwt.verify(authCookie.token, JWT_SECRET);
    const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    await fetch(
      `https://api.discogs.com/users/${user}/collection/folders/1/releases/${albumId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    response.send('success');
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.delete(
  '/api/collection/:albumid/:instanceid',
  async (request, response, next) => {
    const albumId = request.params.albumid;
    const instanceId = request.params.instanceid;

    try {
      const authCookie = JSON.parse(request.cookies.auth);

      const user = jwt.verify(authCookie.username, JWT_SECRET);
      const token = jwt.verify(authCookie.token, JWT_SECRET);
      const secret = jwt.verify(authCookie.secret, JWT_SECRET);

      await fetch(
        `https://api.discogs.com/users/${user}/collection/folders/1/releases/${albumId}/instances/${instanceId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          },
        }
      );
      response.send('success');
    } catch (error) {
      next(response.status(500).send('Internal Server Error'));
    }
  }
);

app.get('/api/friends', async (request, response, next) => {
  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const user = jwt.verify(authCookie.username, JWT_SECRET);
    const token = jwt.verify(authCookie.token, JWT_SECRET);
    const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    const searchResponse = await fetch(
      `https://api.discogs.com/users/${user}/friends`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const friendsResponse = await searchResponse.json();
    const friendsList = friendsResponse.friends;
    const friends = friendsList.map((friend: { user: FriendsProps }) => ({
      id: friend.user.id,
      username: friend.user.username,
      avatar: friend.user.avatar_url,
    }));

    response.send(friends);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get('/api/friends/:username', async (request, response, next) => {
  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const username = request.params.username;
    const token = jwt.verify(authCookie.token, JWT_SECRET);
    const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    const collectionResponse = await fetch(
      `https://api.discogs.com/users/${username}/collection?page=1&per_page=50`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );

    const collection = await collectionResponse.json();
    const collectionReleases = collection.releases;
    const userCollection = collectionReleases.map(
      (release: { basic_information: ReleaseProps }) => ({
        title: release.basic_information.title,
        artist: release.basic_information.artists_sort,
        labels: release.basic_information.labels,
        genres: release.basic_information.genres,
        styles: release.basic_information.styles,
        tracklist: release.basic_information.tracklist,
        release: release.basic_information.released_formatted,
        id: release.basic_information.id,
        sales_history: release.basic_information.sales_history,
        cover: release.basic_information.huge_thumb,
      })
    );

    const userUniqueCollection = [
      ...new Map(
        userCollection.map((album: AlbumProps) => [album.id, album])
      ).values(),
    ];

    response.send(userUniqueCollection);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

// Serve production bundle
app.use(express.static('dist'));

//Handle client routing, return all requestts on the app
app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
