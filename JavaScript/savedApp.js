const playlistContainer = document.querySelector(".playlist-container");

// Fetch saved playlists from the JSON file
async function fetchSavedPlaylists() {
    try {
        const response = await fetch('./JavaScript/mockSavedData.json');  // Adjusted path for your JSON
        const data = await response.json();
        displaySavedPlaylists(data.savedPlaylists); // Pass the fetched playlists to the display function
    } catch (error) {
        console.error("Error loading saved playlists:", error);
    }
}

// Function to display the saved playlists
function displaySavedPlaylists(savedPlaylists) {
    playlistContainer.innerHTML = "";
    savedPlaylists.forEach(playlist => {
        const btn = document.createElement("button");
        btn.className = "playlist-box";
        btn.innerHTML = `<i class='fa-solid fa-music'></i> ${playlist.name}`;
        btn.addEventListener("click", () => {
            alert(`Songs in ${playlist.name}: \n${playlist.songs.join("\n")}`);
        });
        playlistContainer.appendChild(btn);
    });
}

// Event listener for the page load to fetch the playlists
document.addEventListener("DOMContentLoaded", fetchSavedPlaylists);

// Function to load and display the playlist based on selection
function loadPlaylist(playlistName) {
    fetch('./JavaScript/mockSavedData.json')  // Fetch the JSON again when loading a specific playlist
        .then(response => response.json())
        .then(data => {
            const playlist = data.savedPlaylists.find(p => p.name === playlistName);
            if (playlist) {
                console.log(`Loading playlist: ${playlistName}`, playlist.songs);
                displayPlaylist(playlist.songs); // Display the selected playlist's songs
            } else {
                console.log("Playlist not found!");
            }
        })
        .catch(error => console.error("Error loading saved playlist:", error));
}

// Function to display the selected playlist songs
function displayPlaylist(songs) {
    const container = document.querySelector(".playlist-container");
    container.innerHTML = ""; // Clear previous content

    songs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.classList.add("song-item");
        songElement.innerHTML = `
            <p><strong>${song.title}</strong> by ${song.artist}</p>
            <audio controls src="${song.url}"></audio>
        `;
        container.appendChild(songElement);
    });
}

// Event listener for playlist button clicks (to load playlist data)
document.addEventListener("DOMContentLoaded", () => {
    const playlistButtons = document.querySelectorAll(".playlist-box");

    playlistButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const playlistName = event.target.textContent.trim();
            console.log(`You clicked: ${playlistName}`);
            // Call function to load and display songs
            loadPlaylist(playlistName);
        });
    });
});
