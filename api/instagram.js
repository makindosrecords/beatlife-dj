import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  const INSTA_ACCOUNT_ID = process.env.INSTAGRAM_USER_ID || '17841456128830489';

  try {
    let ACCESS_TOKEN;
    
    // 1. Safely check the KV database for a refreshed token
    try {
      const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
      if (url && token) {
        const kv = createClient({ url, token });
        ACCESS_TOKEN = await kv.get('INSTAGRAM_ACCESS_TOKEN');
      }
    } catch (dbError) {
      console.warn('KV Database not connected. Falling back to env vars.');
    }

    // 2. Fallback to environment variable or hardcoded token if DB fails
    if (!ACCESS_TOKEN) {
      ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || 'EAAWQLV0A65gBRnkYuOpPXrFT3zXgS6P68NIXtZAZBVyuV9zEC7yqwhT4UZBBXbO4Kvmpk8IHdrhEuUa4N9CCoYx088Xntk0MBhFW4BlVItzwPx0tiMPOZB4fQRY4IBFf8cQrqLNZC6FvoLO9WkZAjVZAWh4hsZB2ZCLBzePtUH3xw3XOJYcAZBHUr1KZBWVaips';
    }

    if (!ACCESS_TOKEN) throw new Error("Missing INSTAGRAM_ACCESS_TOKEN environment variable");

    let finalMediaData = [];

    // ROUTE A: If using an Instagram Basic Display Token (IGQ...)
    if (ACCESS_TOKEN.startsWith('IGQ')) {
      const basicApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=25&access_token=${ACCESS_TOKEN}`;
      const basicRes = await fetch(basicApiUrl);
      if (!basicRes.ok) throw new Error(`Basic API Error: ${await basicRes.text()}`);
      const basicData = await basicRes.json();
      finalMediaData = basicData.data.slice(0, 15);
    
    // ROUTE B: If using a Facebook Graph API Token (EAA...)
    } else {
      // Since we now have the TRUE exact Instagram Business Account ID, 
      // we can completely bypass the complex Facebook Page lookups!
      const mediaUrl = `https://graph.facebook.com/v20.0/${INSTA_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=25&access_token=${ACCESS_TOKEN}`;
      const mediaResponse = await fetch(mediaUrl);
      
      if (!mediaResponse.ok) {
        const errorText = await mediaResponse.text();
        console.error('Instagram API Full Error:', errorText);
        throw new Error(`API Error: ${errorText}`);
      }
  
      const data = await mediaResponse.json();
      finalMediaData = data.data.slice(0, 15);
    }
    
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(finalMediaData);
  } catch (error) {
    console.error('Serverless Function Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}