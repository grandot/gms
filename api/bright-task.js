// api/bright-task.js
export default function handler(req, res) {
  // 處理 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 手動讀取原始 request body
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', async () => {
    try {
      const { question, lat, lng } = JSON.parse(body || '{}');
      // Supabase Edge Function 的 URL
      const supaUrl = 'https://psygbalodgljzncoqynv.supabase.co/functions/v1/bright-task';
      const supaKey = process.env.SUPABASE_ANON_KEY;
      // 呼叫 Supabase Function
      const r = await fetch(supaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supaKey}`
        },
        body: JSON.stringify({ question, lat, lng })
      });
      const data = await r.json();
      res.status(r.status).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
