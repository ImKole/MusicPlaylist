const playlistContainer = document.querySelector(".playlist-container");

// Function to display saved playlists
function displaySavedPlaylists(savedPlaylists) {
    playlistContainer.innerHTML = ""; // Clear any existing content
    savedPlaylists.forEach(playlist => {
        const btn = document.createElement("button");
        btn.className = "playlist-box";
        btn.innerHTML = `<i class="fa-solid fa-music"></i> ${playlist.name}`; // Corrected string interpolation
        btn.addEventListener("click", () => {
            alert(`Songs in ${playlist.name}: \n${playlist.songs.join("\n")}`); // Corrected string interpolation
        });
        playlistContainer.appendChild(btn);
    });
}

// Load playlists data from the JSON file
function loadSavedPlaylists() {
    fetch("./JavaScript/mockSavedData.json")
        .then(response => response.json())
        .then(data => {
            displaySavedPlaylists(data.savedPlaylists); // Display playlists from JSON data
        })
        .catch(error => console.error("Error loading saved playlists:", error));
}

// Event listener for playlist buttons
document.addEventListener("DOMContentLoaded", () => {
    loadSavedPlaylists(); // Load saved playlists when the page is loaded
});

// Function to load playlist data
function loadPlaylist(playlistName) {
    fetch("./JavaScript/mockSavedData.json")
        .then(response => response.json())
        .then(data => {
            const playlist = data.savedPlaylists.find(p => p.name === playlistName); // Find playlist by name

            if (playlist) {
                console.log(`Loading playlist: ${playlistName}`, playlist.songs); // Corrected string interpolation
                displayPlaylist(playlist.songs); // Display the songs in the playlist
            } else {
                console.log("Playlist not found!");
            }
        })
        .catch(error => console.error("Error loading saved playlist:", error));
}

// Function to display the playlist (modify UI as needed)
function displayPlaylist(songs) {
    const container = document.querySelector(".playlist-container");
    container.innerHTML = ""; // Clear previous content

    songs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.classList.add("song-item");
        songElement.innerHTML = `
            <p><strong>${song.title}</strong> by ${song.artist}</p>
            <audio controls src="${song.url}"></audio>
        `; // Corrected string interpolation
        container.appendChild(songElement);
    });
}

