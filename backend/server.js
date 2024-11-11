const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/playlists', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questionAnswerSchema = new mongoose.Schema({
    question: String,
    answer: String,
  });
  
  const playlistSchema = new mongoose.Schema({
    name: String,
    questions: [questionAnswerSchema],
  });

const Playlist = mongoose.model('Playlist', playlistSchema);

app.get('/playlists', async (req, res) => {
  const playlists = await Playlist.find();
  res.json(playlists);
});

app.post('/playlists', async (req, res) => {
  const newPlaylist = new Playlist(req.body);
  await newPlaylist.save();
  res.json(newPlaylist);
});

app.put('/playlists/:id', async (req, res) => {
  const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPlaylist);
});

app.delete('/playlists/:id', async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Playlist deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});