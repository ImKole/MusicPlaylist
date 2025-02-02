import { savedPlaylists } from "..JavaScript/mockSavedData.js";

const playlistContainer = document.querySelector(".playlist-container");

function displaySavedPlaylists() {
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

displaySavedPlaylists();