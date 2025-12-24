// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we're in root or pages directory
    const isInRoot = !window.location.pathname.includes('/home/');
    const prefix = isInRoot ? '' : '../';
    
    // Load header
    fetch(prefix + 'header-footer/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch(prefix + 'header-footer/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});