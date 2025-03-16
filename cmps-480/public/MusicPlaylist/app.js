import fetchRatings from "../Rating/ratings.js";
import Ratings from "./fetchRatings.js";
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