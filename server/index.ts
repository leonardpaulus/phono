import express from 'express';
import path from 'path';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

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

let oAuthTokenSecret: string | null;
let oAuthToken_2: string | null;

app.get('/api/oauth/request_token', async (_request, response) => {
  const response = await fetch(
    'https://api.discogs.com/oauth/request_token',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_nonce="${Date.now()}",oauth_version="1.0",oauth_signature="${consumerSecret}&", oauth_callback="http://localhost:3001/api/oauth/return"`,
      },
    }
  );

  const token = await response.text();
  const params = new URLSearchParams(token);
  oAuthToken_2 = params.get('oauth_token');
  oAuthTokenSecret_2 = params.get('oauth_token_secret');
  response.redirect(
    `https://discogs.com/oauth/authorize?oauth_token=${oAuthToken_2}`
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
        Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_nonce="${Date.now()}",oauth_token="${oAuthToken_2}", oauth_signature=${consumerSecret}&${oAuthTokenSecret_2}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${oAuthVerifier}"`,
      },
    }
  );

  const token = await tokenResponse.text();
  console.log(token);
  const params = new URLSearchParams(token);
  const oAuthAccessToken_4 = params.get('oauth_token');
  const oAuthTokenSecret_4 = params.get('oauth_token_secret');

  const identityResponse = await fetch(
    'https://api.discogs.com/oauth/identity',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${oAuthAccessToken_4}", oauth_signature="${consumerSecret}&${oAuthTokenSecret_4}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      },
    }
  );
  const identity = await identityResponse.json();
  console.log(identity);

  const searchResponse = await fetch(
    'https://api.discogs.com/database/search?q=queen',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${oAuthAccessToken_4}", oauth_signature="${consumerSecret}&${oAuthTokenSecret_4}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
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
