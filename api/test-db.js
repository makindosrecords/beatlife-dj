import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    
    if (!url || !token) throw new Error("Missing Upstash DB variables in Vercel.");
    const kv = createClient({ url, token });

    // 1. Write a test key to the Redis database
    await kv.set('test_connection', 'Database is successfully connected and writing!');

    // 2. Read the key right back out
    const retrievedValue = await kv.get('test_connection');

    return res.status(200).json({ 
      success: true, 
      database_says: retrievedValue 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}