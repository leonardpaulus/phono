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

let oAuthRequestTokenSecret: string | null;
let oAuthRequestToken: string | null;
let oAuthAccessTokenSecret: string | null;
let oAuthAccessToken: string | null;

app.get('/api/oauth/request_token', async (_request, response) => {
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
});

app.get('/api/oauth/return', async (request, response) => {
  const { oauth_verifier: oAuthVerifier } = request.query;

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
  console.log(token);
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
    response.cookie('username', username, { httpOnly: true });
    response.cookie('accessToken', oAuthAccessToken, { httpOnly: true });
    response.cookie('accessTokenSecret', oAuthAccessTokenSecret, {
      httpOnly: true,
    });
    response.send('logged in');
  }
});

app.get('/api/search/:searchq', async (request, response) => {
  const searchQuery = request.params.searchq;

  const token = request.cookies.accessToken;
  const secret = request.cookies.accessTokenSecret;

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
});

app.get('/api/me', async (request, response) => {
  const user = request.cookies.username;
  const token = request.cookies.accessToken;
  const secret = request.cookies.accessTokenSecret;

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

  response.send(search);
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
