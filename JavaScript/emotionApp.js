
import { emotionData } from "./mockEmotionData.js";

console.log(emotionData); // Check if data is loaded correctly


const emotionButtons = document.querySelectorAll(".emotion-box");
const searchBar = document.querySelector(".search-bar");

emotionButtons.forEach(button => {
  button.addEventListener("click", () => {
      const mood = button.textContent.trim();
      displaySongs(mood);
  });
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
      displaySongs(searchBar.value);
  }
});

function displaySongs(mood) {
  const songList = emotionData[mood] || [];
  alert(`Songs for ${mood}: \n${songList.join("\n")}`);
}

