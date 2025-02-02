import { emotionData } from "./mockEmotionData.js";

console.log(emotionData); // Check if data is loaded correctly

const emotionButtons = document.querySelectorAll(".emotion-box");
const searchBar = document.querySelector(".search-bar");
const playlistContainer = document.querySelector(".playlist-container");

// Function to display songs based on mood
function displaySongs(mood) {
    const songList = emotionData.playlists[mood] || [];
    alert(`Songs for ${mood}: \n${songList.map(song => song.title).join("\n")}`);
}

// Event listeners for emotion buttons
if (emotionButtons.length > 0) {
    emotionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const mood = button.textContent.trim();
            displaySongs(mood); // Display songs based on mood
        });
    });
}

// Event listener for the search bar
if (searchBar) {
    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            displaySongs(searchBar.value); // Display songs based on search query
        }
    });
}

// Function to fetch and display saved playlists (mocked)
function fetchSavedPlaylists() {
    const savedPlaylists = [
        { name: "Happy Playlist", songs: ["Song 1", "Song 2"] },
        { name: "Sad Playlist", songs: ["Song 3", "Song 4"] }
    ];

    savedPlaylists.forEach(playlist => {
        const btn = document.createElement("button");
        btn.className = "playlist-box";
        btn.innerHTML = playlist.name;
        btn.addEventListener("click", () => {
            alert(`Songs in ${playlist.name}: \n${playlist.songs.join("\n")}`);
        });
        playlistContainer.appendChild(btn);
    });
}

// Call the fetchSavedPlaylists function if playlistContainer exists
document.addEventListener("DOMContentLoaded", () => {
    if (playlistContainer) {
        fetchSavedPlaylists(); // Fetch and display saved playlists
    }
});
