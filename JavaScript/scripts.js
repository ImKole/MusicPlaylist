document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('darkmode-toggle');

    // Check the checkbox status and update the mode
    function updateMode() {
        if (checkbox.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Event listener for changes on the checkbox
    checkbox.addEventListener('change', function() {
        updateMode();
    });

    // Initial check in case the checkbox is saved as checked
    updateMode();
});