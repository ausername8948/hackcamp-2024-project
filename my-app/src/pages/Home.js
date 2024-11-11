import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/playlists')
      .then((response) => response.json())
      .then((data) => setPlaylists(data));
  }, []);

  const handleNewPlaylist = () => {
    const playlistName = prompt('Enter the name of the new playlist:');
    if (playlistName) {
      const newPlaylist = { name: playlistName, questions: [] };
      fetch('http://localhost:3000/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      })
        .then((response) => response.json())
        .then((createdPlaylist) => {
          setPlaylists([...playlists, createdPlaylist]);
        });
    }
  };

  const handleNavigateToPlaylist = (playlist) => {
    navigate('/playlist', { state: { playlist } });
  };

  return (
    <div className="home">
      <button className="playlist-button" onClick={handleNewPlaylist}>
        New Playlist
      </button>
      <div className="playlists">
        {playlists.map((playlist, index) => (
          <button
            key={index}
            className="playlist-button"
            onClick={() => handleNavigateToPlaylist(playlist)}
          >
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
