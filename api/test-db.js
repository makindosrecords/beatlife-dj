import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
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