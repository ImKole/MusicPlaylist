// Dark mode toggle script
document.getElementById('darkmode-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    document.querySelectorAll('.emotion-box').forEach(function(box) {
        box.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.playlist-box').forEach(function(box) {
        box.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.search-bar').forEach(function(bar) {
        bar.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.search-btn').forEach(function(btn) {
        btn.classList.toggle('dark-mode');
    });
});
