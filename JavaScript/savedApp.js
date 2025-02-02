fetch("savedPlaylists.json")
  .then(response => response.json())
  .then(data => {
    document.querySelectorAll(".playlist-box").forEach((button, index) => {
      button.addEventListener("click", () => {
        let playlist = data.savedPlaylists[index];
        showSavedPlaylistPopup(playlist);
      });
    });
  });

function showSavedPlaylistPopup(playlist) {
  let popupContent = `<h2>${playlist.name}</h2><ul>`;
  playlist.songs.forEach(song => {
    popupContent += `<li><a href="${song.url}" target="_blank">${song.title} - ${song.artist}</a></li>`;
  });
  popupContent += "</ul>";
  
  // Display the popup
  document.getElementById("popup").innerHTML = popupContent;
  document.getElementById("popup").style.display = "block";
}
