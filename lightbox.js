// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-arrow lightbox-prev">&#10094;</span>
        <img class="lightbox-content" src="" alt="">
        <span class="lightbox-arrow lightbox-next">&#10095;</span>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Get ALL images from ALL galleries on the page
    const allImages = Array.from(document.querySelectorAll('.project-gallery img'));
    let currentIndex = 0;

    // Add click handlers to all gallery images
    allImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add('active');
        });
    });

    function showImage(index) {
        lightboxImg.src = allImages[index].src;
        lightboxImg.alt = allImages[index].alt;
        
        // Hide/show arrows based on position
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === allImages.length - 1 ? 'none' : 'block';
    }

    // Previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    // Next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex < allImages.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    // Close lightbox when clicking outside the image and arrows
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight' && currentIndex < allImages.length - 1) {
                currentIndex++;
                showImage(currentIndex);
            }
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }
});