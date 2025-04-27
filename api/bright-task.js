// api/bright-task.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { question, lat, lng } = req.body;          // ① 會拿到前端帶來的參數
    const url  = 'https://psygbalodgljzncoqynv.supabase.co/functions/v1/bright-task';
    const key  = process.env.SUPABASE_ANON_KEY;

    const r = await fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({ question, lat, lng })
    });

    const data = await r.json();
    res.setHeader('Content-Type', 'application/json'); // ② 明確告訴瀏覽器
    res.status(r.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
