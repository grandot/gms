// api/bright-task.js
export default async function handler(req, res) {
  const { question, lat, lng } = req.body;
  const url = 'https://psygbalodgljzncoqynv.supabase.co/functions/v1/bright-task';
  const key = process.env.SUPABASE_ANON_KEY;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({ question, lat, lng })
  });
  const data = await resp.json();
  res.status(resp.status).json(data);
}
