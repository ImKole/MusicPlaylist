import fetchPlaylists from "../JavaScript/fetchPlaylist.js";

async function displayPlaylists() {
    const playlists = await fetchPlaylists();
    console.log("Fetched Playlists:", playlists);

    const playlistContainer = document.querySelector(".playlist-container");

    // Clear existing content
    playlistContainer.innerHTML = "";

    // Loop through fetched playlists and create elements
    playlists.forEach((playlist, index) => {
        const button = document.createElement("button");
        button.classList.add("playlist-box");
        button.innerHTML = `<i class="fa-solid fa-music"></i> ${playlist.name}`;
        button.setAttribute("data-playlist-id", playlist.id);

        // Optional: Add click event to load more details
        button.addEventListener("click", () => {
            alert(`Selected Playlist: ${playlist.name}`);
            // You can expand this to show playlist details in another section
        });

        playlistContainer.appendChild(button);
    });
}

// Load playlists when the page loads
document.addEventListener("DOMContentLoaded", displayPlaylists);
