// pages/api/getTokens.js

import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query; // This code comes from the Zoho OAuth2 callback

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const response = await axios.post(
      'https://accounts.zoho.com/oauth/v2/token',
      null,
      {
        params: {
          code: code,
          client_id: '1000.03F9D3MTPYZ4TXJWNAPOC92XFIPIPX',
          client_secret: '0e4d37275b93e7c0ec0233f0b2a14a1927cfdb5683',
          redirect_uri: 'http://localhost:3000/callback',
          grant_type: 'authorization_code',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    res.status(200).json({ access_token, refresh_token, expires_in });
  } catch (error) {
    console.error('Failed to fetch tokens:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
}
