import fetchPlaylists from "./fetchPlaylists.js";

async function displayPlaylists() {
    const playlists = await fetchPlaylists();
    console.log("Fetched Playlists:", playlists);
}

displayPlaylists();
