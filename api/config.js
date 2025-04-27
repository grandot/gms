// File: api/config.js

export const config = {
  runtime: 'edge'
}

export default (req) => {
  return new Response(
    JSON.stringify({ key: process.env.GMAPS_API_KEY }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
}
