const emotionButtons = document.querySelectorAll(".emotion-box");
const playlistContainer = document.querySelector(".playlist-container");

// Function to display songs based on mood
function displaySongs(songs) {
    playlistContainer.innerHTML = ''; // Clear the existing playlist
    if (songs.length === 0) {
        playlistContainer.innerHTML = `<p>No songs found for this mood</p>`;
    } else {
        songs.forEach(song => {
            const songElement = document.createElement("div");
            songElement.className = "song-item";
            songElement.textContent = song.title; // Assuming `title` is the field in your database
            playlistContainer.appendChild(songElement);
        });
    }
}

// Event listener for emotion buttons
emotionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mood = button.id;  // Get the ID of the clicked button
        fetchSongsForMood(mood);  // Pass the mood to fetch songs
    });
});

// Function to fetch songs for a specific mood from the server
function fetchSongsForMood(mood) {
    fetch(`/mood_playlist?mood=${mood}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displaySongs(data.data); // data.data contains the songs from the database
            } else {
                playlistContainer.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching mood playlist:", error);
            playlistContainer.innerHTML = "<p>Failed to load songs</p>";
        });
}
