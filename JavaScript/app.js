import fetchPlaylists from "../JavaScript/fetchPlaylist.js";

async function displayPlaylist() {
    const playlists = await fetchPlaylists();
    console.log("Fetched Playlist:", playlists);

    const playlistContainer = document.querySelector("playlist-container");

    //Clear existing content
    playlistContainer.innerHTML = "";

    //Loop through fetched playlist and create elements
    playlistContainer.forEach((playlist, index) => {
        const button = document.createElement("button");
        button.classList.add("playlist-box");
        button.innerHTML = `<i class="fa-solid fa-music"></i> ${playlist.name}` ;

    });

    playlistContainer.appendChild(button);


}

//Load playlists when the page loads
document.addEventListener("DOMContentLoader", displayPlaylist);
