// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select all the emotion buttons
    const emotionButtons = document.querySelectorAll('.emotion-box');
    
    // Add an event listener to each emotion button
    emotionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the emotion from the button's ID
            const emotion = this.id;
            
            // Call the server using AJAX (Fetch API) with POST method
            fetch('/mood_playlist', {
                method: 'POST',  // Change to POST since you're sending data in the body
                headers: {
                    'Content-Type': 'application/json',  // Ensure content type is JSON
                },
                body: JSON.stringify({ mood: emotion })  // Send the emotion as a JSON object
            })
            .then(response => response.json())  // Parse the response as JSON
            .then(data => {
                console.log('Response data:', data);  // Log the parsed data
                
                // You can update the page with the returned playlist
                const playlistContainer = document.getElementById('playlistContainer');
                playlistContainer.innerHTML = '';  // Clear previous playlist
                if (data.success && data.data) {
                    data.data.forEach(song => {
                        const songItem = document.createElement('div');
                        songItem.classList.add('song');
                        songItem.innerText = song.title; // Assuming the song object has a title
                        playlistContainer.appendChild(songItem);
                    });
                } else {
                    playlistContainer.innerHTML = 'No songs found for this mood.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);  // Log network fetch errors
            });
        });
    });
});
