document.querySelector('.searchBar').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var questContainers = document.querySelectorAll('.playlist-container-main');

    questContainers.forEach(function(container) {
        var text = container.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            container.style.display = 'inline-block';
        } else {
            container.style.display = 'none';
        }
    });
});

document.querySelector('.searchBar').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var questContainers = document.querySelectorAll('.playlist-container');

    questContainers.forEach(function(container) {
        var text = container.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            container.style.display = 'inline-block';
        } else {
            container.style.display = 'none';
        }
    });
});