function fetchSongsByMood(moodid) {
  fetch(`/getSongs?moodid=${moodid}`)
    .then(response => response.json())
    .then(data => {
      console.log("Received data:", data);
      if (data.success) {
        const playlistContainer = document.getElementById('songs-container');
        playlistContainer.innerHTML = '';
        data.data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `Song Title: ${item.song_title}, Artist: ${item.artist}, Album: ${item.album}`;
          playlistContainer.appendChild(listItem);
        });
      } else {
        console.error('Failed to load songs:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching songs:', error);
    });
}
