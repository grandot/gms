// api/config.js
export default function handler(req, res) {
  res
    .status(200)
    .json({
      PUBLIC_GMAPS_API_KEY: process.env.GMAPS_API_KEY,
      SUPABASE_ANON_KEY:   process.env.SUPABASE_ANON_KEY
    });
}
