function fetchSongsByMood(moodid) {
  const playlistContainer = document.getElementById('songs-container');
  playlistContainer.classList.remove('show'); // Reset in case it's already shown
  playlistContainer.innerHTML = ''; // Clear old content

  fetch(`/getSongs?moodid=${moodid}`)
    .then(response => response.json())
    .then(data => {
      console.log("Received data:", data);
      if (data.success) {
        data.data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span class="song-title">Title: ${item.song_title}</span>,
            <span class="artist">Artist: ${item.artist}</span>,
            <span class="album">Album: ${item.album}</span>
          `;
          playlistContainer.appendChild(listItem);
        });

        // Trigger reflow so fade-in works
        void playlistContainer.offsetWidth;
        playlistContainer.classList.add('show');
      } else {
        console.error('Failed to load songs:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching songs:', error);
    });
}




