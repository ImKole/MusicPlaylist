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
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user") || 1; // default to 1 if not in URL

    fetch(`/savedplaylists?user=${user}`)
        .then(response => response.json())
        .then(data => {
            console.log("Received data:", data);
            if (data.success) {
                console.log(data);
                data.data.forEach((playlist) => {
                    const playlistContainer = document.createElement('div');
                    playlistContainer.classList.add('playlist-container-main');

                    const listHeader = document.createElement('h1');
                    listHeader.textContent = `${playlist.playlist_name}`;
                    playlistContainer.appendChild(listHeader);

                    const songsList = document.createElement('ol');
                    let songsPresent = false;

                    // Iterate over each possible song slot
                    for (let i = 1; i <= 5; i++) {
                        const songTitle = playlist[`song_title_${i}`];
                        const artist = playlist[`artist_${i}`];
                        if (songTitle && artist) { // Check for non-null song title and artist
                            const songItem = document.createElement('li');
                            songItem.textContent = `${songTitle} by ${artist}`;
                            songsList.appendChild(songItem);
                            songsPresent = true;
                        }
                    }

                    if (songsPresent) {
                        playlistContainer.appendChild(songsList);
                    } else {
                        const noSongsMessage = document.createElement('p');
                        noSongsMessage.textContent = 'No songs in this playlist.';
                        playlistContainer.appendChild(noSongsMessage);
                    }

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