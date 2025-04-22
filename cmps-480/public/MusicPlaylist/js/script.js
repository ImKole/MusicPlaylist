document.querySelector('.searchBar').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var questContainers = document.querySelectorAll('.playlist-container-main');

    questContainers.forEach(function(container) {
        var text = container.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            container.style.display = 'inline-block';
        } else {
            container.style.display = 'none';
        }
    });
});

document.querySelector('.searchBar').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var questContainers = document.querySelectorAll('.playlist-container');

    questContainers.forEach(function(container) {
        var text = container.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            container.style.display = 'inline-block';
        } else {
            container.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('darkmode-toggle');

    // Check the checkbox status and update the mode
    function updateMode() {
        if (checkbox.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Event listener for changes on the checkbox
    checkbox.addEventListener('change', function() {
        updateMode();
    });

    // Initial check in case the checkbox is saved as checked
    updateMode();
});

function fetchPlaylists() {
    fetch('/playlists')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:", data);
        if (data.success) {
          const playlistContainer = document.getElementById('playlistContainer');
          playlistContainer.innerHTML = '';
          data.data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Playlist ID: ${item.playlist_id}, Name: ${item.playlist_name}`;
            playlistContainer.appendChild(listItem);
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


//Mock Json request for the database to gather and input saved playlists onto the page
/*function displaySavedPlaylists(playlists) {
    const container = document.querySelector('.container');
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist-container-main';
        playlistElement.innerHTML = `
            <img class="item-image" src="${playlist.image}">
            <p>${playlist.title}</p>
            <div class="count-container">
                <p class="count">${playlist.songCount}</p>
                <h3>Song Count</h3>
            </div>
        `;
        container.appendChild(playlistElement);
    });
} */