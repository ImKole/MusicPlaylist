import mockPlaylists from "../mockData.js";  // Import the mock data

function fetchPlaylists() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPlaylists);  // Simulate API delay
        }, 500);  // 500ms delay
    });
}

export default fetchPlaylists;  // Make the function available for use
