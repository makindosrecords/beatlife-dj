import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Secure the endpoint so only Vercel Cron can call it
  if (
    process.env.CRON_SECRET && 
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 1. Get the current active token from KV or Environment
    let currentToken;
    try {
      currentToken = await kv.get('INSTAGRAM_ACCESS_TOKEN');
    } catch (dbError) {
      console.warn('KV Database not connected.');
    }
    currentToken = currentToken || process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!currentToken) throw new Error("No token found to refresh.");

    // Note: EAA... tokens (Facebook Graph API) often don't expire if they are permanent Page Access Tokens.
    // The /refresh_access_token endpoint is specifically for IGQ... (Instagram Basic Display) tokens.
    if (currentToken.startsWith('EAA')) {
      return res.status(200).json({ message: "EAA token detected. This architecture assumes it is a permanent Page Access Token. No refresh needed." });
    }

    // 2. Fetch the new token from Meta (For IGQ... tokens)
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
    const metaRes = await fetch(refreshUrl);
    const data = await metaRes.json();

    if (!metaRes.ok) throw new Error(data.error?.message || 'Failed to refresh token from Meta');

    // 3. Save the new 60-day token to our Vercel KV Database
    await kv.set('INSTAGRAM_ACCESS_TOKEN', data.access_token);

    return res.status(200).json({ success: true, message: "Token refreshed successfully!", token_preview: data.access_token.slice(0, 10) + '...' });
  } catch (error) {
    console.error('CRON Refresh Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}