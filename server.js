const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'data', 'genres.json');

app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  if (!fs.existsSync(DATA_PATH)) return null;
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data', err.message);
    return null;
  }
}

app.get('/api/genres', (req, res) => {
  const data = readData();
  if (!data) return res.status(500).json({ error: 'No cached data. Run fetch-genres first.' });
  res.json({ genres: Object.keys(data) });
});

app.get('/api/random', (req, res) => {
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: 'tag query parameter required' });
  const data = readData();
  if (!data) return res.status(500).json({ error: 'No cached data. Run fetch-genres first.' });
  const list = data[tag];
  if (!list || list.length === 0) return res.status(404).json({ error: `No tracks for tag: ${tag}` });
  const item = list[Math.floor(Math.random() * list.length)];

  const q = encodeURIComponent(`${item.artist} ${item.name}`);
  const youtube_search_url = `https://www.youtube.com/results?search_query=${q}`;

  res.json({
    track: item.name,
    artist: item.artist,
    lastfm_url: item.lastfm_url,
    youtube_search_url,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log('Static files served from /public.');
});
