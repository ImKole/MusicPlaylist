import { savedPlaylists } from "./JavaScript/mockSavedData.js";

const playlistContainer = document.querySelector(".playlist-container");

function displaySavedPlaylists() {
    playlistContainer.innerHTML = "";
    savedPlaylists.forEach(playlist => {
        const btn = document.createElement("button");
        btn.className = "playlist-box";
        btn.innerHTML = <i class='fa-solid fa-music'></i> ${playlist.name};
        btn.addEventListener("click", () => {
            alert(Songs in ${playlist.name}: \n${playlist.songs.join("\n")});
        });
        playlistContainer.appendChild(btn);
    });
}

displaySavedPlaylists();

document.addEventListener("DOMContentLoaded", () => {
    const playlistButtons = document.querySelectorAll(".playlist-box");

    playlistButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const playlistName = event.target.textContent.trim();
            console.log(You clicked: ${playlistName});
            // Call function to load and display songs (next step)
            loadPlaylist(playlistName);
        });
    });
});

// Function to Load Playlist Data
function loadPlaylist(playlistName) {
    import("..JavaScript/mockSavedData.js").then(({ savedPlaylists }) => {
        const songs = savedPlaylists[playlistName];

        if (songs) {
            console.log(Loading playlist: ${playlistName}, songs);
            displayPlaylist(songs);
        } else {
            console.log("Playlist not found!");
        }
    }).catch(error => console.error("Error loading saved playlist:", error));
}

// Function to Display Playlist (Modify for UI)
function displayPlaylist(songs) {
    const container = document.querySelector(".playlist-container");
    container.innerHTML = ""; // Clear previous content

    songs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.classList.add("song-item");
        songElement.innerHTML = 
            <p><strong>${song.title}</strong> by ${song.artist}</p>
            <audio controls src="${song.url}"></audio>
        ;
        container.appendChild(songElement);
    });
}"