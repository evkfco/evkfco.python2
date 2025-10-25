const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.LASTFM_API_KEY;
if (!API_KEY) {
  console.error('Missing LASTFM_API_KEY in environment. Copy .env.example -> .env and add your key.');
  process.exit(1);
}

const OUT_PATH = path.join(__dirname, 'data', 'genres.json');
const TAGS = [
  'rock', 'pop', 'jazz', 'classical', 'hip-hop', 'electronic', 'metal', 'blues', 'country', 'folk'
];

async function fetchTopTracksForTag(tag, limit = 100) {
  const url = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for tag ${tag}`);
  const data = await res.json();
  const tracks = (data.tracks && data.tracks.track) || [];
  return tracks.map(t => ({
    name: t.name || '',
    artist: (t.artist && t.artist.name) || (t.artist && t.artist['#text']) || '',
    lastfm_url: t.url || '',
  }));
}

async function main() {
  const out = {};
  for (const tag of TAGS) {
    try {
      console.log('Fetching', tag);
      const tracks = await fetchTopTracksForTag(tag);
      out[tag] = tracks;
      // small delay to be polite
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error('Error fetching', tag, err.message);
      out[tag] = [];
    }
  }

  const dir = path.dirname(OUT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', OUT_PATH);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
