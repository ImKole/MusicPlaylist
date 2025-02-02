import { emotionData } from "./mockEmotionData.js";

console.log(emotionData); // Check if data is loaded correctly

const emotionButtons = document.querySelectorAll(".emotion-box");
const searchBar = document.querySelector(".search-bar");

if (emotionButtons.length > 0) {
    emotionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const mood = button.textContent.trim();
            displaySongs(mood);
        });
    });
}

if (searchBar) {
    searchBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            displaySongs(searchBar.value);
        }
    });
}

function displaySongs(mood) {
    const songList = emotionData[mood] || [];
    alert(`Songs for ${mood}: \n${songList.join("\n")}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const emotionButtons = document.querySelectorAll(".emotion-box");
  const searchBar = document.querySelector(".search-bar");
  const playlistContainer = document.querySelector(".playlist-container");

  // Event listeners for emotion buttons
  if (emotionButtons.length > 0) {
      emotionButtons.forEach(button => {
          button.addEventListener("click", () => {
              const mood = button.textContent.trim();
              displaySongs(mood); // Function to display songs based on mood
          });
      });
  }

  // Event listener for the search bar
  if (searchBar) {
      searchBar.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
              displaySongs(searchBar.value); // Function to display songs based on search query
          }
      });
  }

  // Optional: If you have a playlist section
  if (playlistContainer) {
      fetchSavedPlaylists(); // Function to fetch and display saved playlists
  }
});

// You can define your functions to handle display logic below (e.g., displaySongs, fetchSavedPlaylists)
