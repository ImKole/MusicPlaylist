//import fetchRatings from "../Rating/ratings.js";
//import Ratings from "./fetchRatings.js";
async function displayRatings() {
    const ratings = await fetchRatings();
    console.log("Fetched Ratings:" , ratings);

    const ratingsContainer = document.querySelector(".ratings-container");

    ratingsContainer.innerHTML = "";


    let ratingsData = ratings;

    if (!ratingsData.ratings || ratingsData.ratings.length ===0) {
        console.warn("Warning: No ratings available.");
        return;
    }
    ratingsData.ratings.forEach((rating, index) => {
        const button = document.createElement("button");
        button.classList.add("ratings-box");
        button.setAttribute("data-ratings-id", rating.id || "unknown");
        
        button.addEventListener("click", () => {
            alert('Selected Rating: ${rating.title}');
            
    });
    button.textContent = rating.rating;
    ratingsContainer.appendChild(button);
    });
    //displayRatings();
}
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('darkmode-toggle');

    // Check the checkbox status and update the mode
    function updateMode() {
        if (checkbox.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode','disabled');
        }
    }

    // Event listener for changes on the checkbox
    checkbox.addEventListener('change', function() {
        updateMode();
    });

    // Initial check in case the checkbox is saved as checked
    updateMode();
});
function fetchSong() {
  fetch('/findSongs')
    .then(response => response.json())
    .then(data => {
      console.log("Received data:", data);

      if (!data.success) {
        console.error('Failed to load songs:', data.message);
        return;
      }

      const songs = data.data.map(item => [
        item.song_id,
        item.song_title,
        item.artist,
        item.album,
        item.duration,
        item.rank
      ]);

      let gridContainer = document.getElementById('grid-container');
      if (!gridContainer) {
        console.warn("⚠️ grid-container not found! Creating one.");
        gridContainer = document.createElement('div');
        gridContainer.id = 'grid-container';
        document.body.appendChild(gridContainer);
      } else {
        gridContainer.innerHTML = ''; // Clear old content
      }

      const grid = new gridjs.Grid({
        columns: [
          'Song ID',
          'Title',
          'Artist',
          'Album',
          'Duration',
          {
            name: 'Rank',
            formatter: (cell, row) => {
              const songId = row.cells[0].data;
              const rankOptions = [1, 2, 3, 4, 5];

              let selectHTML = `<select data-song-id="${songId}" class="rank-dropdown">`;
              rankOptions.forEach(rank => {
                selectHTML += `<option value="${rank}" ${rank == cell ? 'selected' : ''}>${rank}</option>`;
              });
              selectHTML += '</select>';

              return gridjs.html(selectHTML);
            }
          }
        ],
        data: songs,
        search: true,
        pagination: {
          limit: 5
        },
        sort: true,
        className: {
          table: 'song-container-main'
        }
      });

      console.log("Rendering Grid.js table...");
      grid.render(gridContainer);

      grid.on('ready', () => {
        console.log(" Grid.js table rendered successfully!");
        document.querySelectorAll('.rank-dropdown').forEach(select => {
          select.addEventListener('change', (event) => {
            const songId = event.target.getAttribute('data-song-id');
            const newRank = event.target.value;
            updateSongRank(songId, newRank);
          });
        });
      });

    })
    .catch(error => {
      console.error( 'Error fetching songs:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchSong);

// Function to update the song rank in the database
function updateSongRank(songId, newRank) {
  console.log(`Updating song ${songId} to rank ${newRank}`);

  fetch('/updateRank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      song_id: songId,
      rank: newRank
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Rank updated successfully!');
      } else {
        console.error('Failed to update rank:', data.message);
      }
    })
    .catch(error => {
      console.error(' Error updating rank:', error);
    });
}
// Updating Rank on Button Click
  document.getElementById('updateRankBtn').addEventListener('click', function () {
    const songId = document.getElementById('songId').value;
    const newRank = parseInt(document.getElementById('rank').value);

    if (songId && !isNaN(newRank)) {
      updateSongRank(songId, newRank);
    } else {
      console.error(" Please provide a valid song ID and rank.");
    }
  });



