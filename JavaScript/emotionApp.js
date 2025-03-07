import { emotionData } from "./mockEmotionData.js";

console.log(emotionData); // Check if data is loaded correctly

const emotionButtons = document.querySelectorAll(".emotion-box");
const searchBar = document.querySelector(".search-bar");
const playlistContainer = document.querySelector(".playlist-container");

// Function to display songs based on mood
function displaySongs(mood) {
    const songList = emotionData.playlists[mood] || [];
    playlistContainer.innerHTML = ''; // Clear the existing playlist
    if (songList.length === 0) {
        playlistContainer.innerHTML = `<p>No songs found for mood: ${mood}</p>`;
    } else {
        songList.forEach(song => {
            const songElement = document.createElement("div");
            songElement.className = "song-item";
            songElement.textContent = song.title;
            playlistContainer.appendChild(songElement);
        });
    }
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
        if (e.key === "Enter" && searchBar.value.trim() !== "") {
            displaySongs(searchBar.value.trim()); // Display songs based on search query
        }
    });
}
