function fetchSongsByMood(mood_Id) {
  fetch(`/getSongs?Mood=${mood_Id}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('songs-container');
      container.innerHTML = ''; // clear old songs

      if (data.success) {
        data.data.forEach(song => {
          const songDiv = document.createElement('div');
          songDiv.classList.add('song');
          songDiv.innerHTML = `
            <h3>${song.song_title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Album: ${song.album}</p>
            <p>Duration: ${song.duration} seconds</p>
          `;
          container.appendChild(songDiv);
        });
      } else {
        container.innerHTML = `<p>${data.message}</p>`;
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
    });
}


/* test*/
  