function fetchPlaylists() {
    fetch('/playlists')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:", data);
        if (data.success) {
            // Loop through the playlists data and create a new container for each
            data.data.forEach((item, index) => {
              // Dynamically create a new container for each playlist item
              const playlistContainer = document.createElement('btn');
              playlistContainer.classList.add('playlist-container-main'); // Add the same class to match your existing styles

              // Create a new <p> element for the playlist name
              const listItem = document.createElement('p');
              listItem.textContent = `Name: ${item.playlist_name}`;

              // Append the <h1> elements to the new container
              playlistContainer.appendChild(listItem);

              // Append the new container to the document (or a specific parent container)
              document.body.appendChild(playlistContainer);
            });
          } else {
          console.error('Failed to load playlists:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  }

  document.addEventListener('DOMContentLoaded', fetchPlaylists);
  