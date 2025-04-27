// api/bright-task.js
export default async function handler(req, res) {
  // ----- CORS -----
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();

  /* -------- 1. 解析 JSON body -------- */
  let body = {};
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
  } catch (e) {
    return res.status(400).json({ error: '無效的 JSON' });
  }
  const { question, lat, lng } = body;

  /* -------- 2. 轉呼 Supabase Function -------- */
  const key = process.env.SUPABASE_ANON_KEY;
  const url = 'https://psygbalodgljzncoqynv.supabase.co/functions/v1/bright-task';

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({ question, lat, lng })
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
