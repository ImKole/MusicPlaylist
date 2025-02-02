fetch("playlists.json")
  .then(response => response.json())
  .then(data => {
    document.querySelectorAll(".emotion-box").forEach(button => {
      button.addEventListener("click", () => {
        let mood = button.textContent.trim();
        let playlist = data.playlists[mood];
        showPlaylistPopup(mood, playlist);
      });
    });
  });

function showPlaylistPopup(mood, playlist) {
  let popupContent = `<h2>${mood} Playlist</h2><ul>`;
  playlist.forEach(song => {
    popupContent += `<li><a href="${song.url}" target="_blank">${song.title} - ${song.artist}</a></li>`;
  });
  popupContent += "</ul>";
  
  // Display the popup
  document.getElementById("popup").innerHTML = popupContent;
  document.getElementById("popup").style.display = "block";
}
