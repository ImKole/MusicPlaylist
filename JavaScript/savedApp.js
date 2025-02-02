const playlistContainer = document.querySelector(".playlist-container");

// Function to display saved playlists
function displaySavedPlaylists(savedPlaylists) {
    playlistContainer.innerHTML = ""; // Clear any existing content
    savedPlaylists.forEach(playlist => {
        const btn = document.createElement("button");
        btn.className = "playlist-box";
        btn.innerHTML = `<i class="fa-solid fa-music"></i> ${playlist.name}`; // Corrected string interpolation
        btn.addEventListener("click", () => {
            alert(`Songs in ${playlist.name}: \n${playlist.songs.map(song => song.title).join("\n")}`); // Corrected string interpolation
        });
        playlistContainer.appendChild(btn);
    });
}

// Fetch saved playlists from mockSavedData.json
fetch("./JavaScript/mockSavedData.json")
    .then(response => response.json())
    .then(data => {
        displaySavedPlaylists(data.savedPlaylists); // Pass the savedPlaylists to the display function
    })
    .catch(error => {
        console.error("Error loading saved playlists:", error);
    });
