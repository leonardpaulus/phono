import express from 'express';
import path from 'path';
import fetch from 'cross-fetch';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());

if (!process.env.DISCOGS_CONSUMER_KEY) {
  throw new Error('No Discogs Consumer Key available');
}
if (!process.env.DISCOGS_CONSUMER_SECRET) {
  throw new Error('No Discogs Consumer Secret available');
}

const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello from server' });
});

type ReleaseProps = {
  artists_sort: string;
  title: string;
  labels: [];
  genres: [];
  styles: [];
  tracklist: [];
  released_formatted: string;
  id: number;
  sales_history: object;
  huge_thumb: string;
};

let oAuthRequestTokenSecret: string | null;
let oAuthRequestToken: string | null;
let oAuthAccessTokenSecret: string | null;
let oAuthAccessToken: string | null;

app.get('/api/oauth/request_token', async (_request, response, next) => {
  try {
    const tokenResponse = await fetch(
      'https://api.discogs.com/oauth/request_token',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_nonce="${Date.now()}",oauth_version="1.0",oauth_signature="${consumerSecret}&", oauth_callback="http://localhost:3001/api/oauth/return"`,
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

    const token = await tokenResponse.text();
    const params = new URLSearchParams(token);
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
    const username = identity.username;
    if (oAuthAccessToken && oAuthAccessTokenSecret) {
      response.cookie(
        'auth',
        JSON.stringify({
          username: username,
          token: oAuthAccessToken,
          secret: oAuthAccessTokenSecret,
        }),
        { httpOnly: true }
      );

      const redirectURL = `${request.protocol}://${request.hostname}:${port}/api/me`;
      response.redirect(redirectURL);
    }
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get('/api/search/:searchq', async (request, response, next) => {
  const searchQuery = request.params.searchq;

  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const token = authCookie.token;
    const secret = authCookie.secret;

    const searchResponse = await fetch(
      `https://api.discogs.com/database/search?q=${searchQuery}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const search = await searchResponse.json();

    response.send(search);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});

app.get('/api/me', async (request, response, next) => {
  try {
    const authCookie = JSON.parse(request.cookies.auth);

    const user = authCookie.username;
    const token = authCookie.token;
    const secret = authCookie.secret;

    const searchResponse = await fetch(
      `https://api.discogs.com/users/${user}/collection`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        },
      }
    );
    const search = await searchResponse.json();
    const releases = search.releases;
    const collection = releases.map(
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
        huge_thumb: release.basic_information.huge_thumb,
      })
    );

    response.send(collection);
  } catch (error) {
    next(response.status(500).send('Internal Server Error'));
  }
});
// Serve production bundle
app.use(express.static('dist'));

//Handle client routing, return all requestts on the app
app.get('/', (_request, response) => {
  response.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
