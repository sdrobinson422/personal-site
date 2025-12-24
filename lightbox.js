// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-arrow lightbox-prev">&#10094;</span>
        <div class="lightbox-media-container">
            <img class="lightbox-content lightbox-image" src="" alt="">
            <video class="lightbox-content lightbox-video" controls></video>
        </div>
        <span class="lightbox-arrow lightbox-next">&#10095;</span>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxVideo = lightbox.querySelector('.lightbox-video');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Get ALL images and videos from ALL galleries on the page
    const allMedia = Array.from(document.querySelectorAll('.project-gallery img, .project-gallery .video-wrapper .video-thumbnail'));
    let currentIndex = 0;

    // Add click handlers to all gallery media
    allMedia.forEach((media, index) => {
        media.addEventListener('click', function() {
            currentIndex = index;
            showMedia(currentIndex);
            lightbox.classList.add('active');
        });
    });

    function showMedia(index) {
        const media = allMedia[index];
        
        if (media.tagName === 'VIDEO') {
            // Show video
            lightboxVideo.src = media.src;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
            lightboxVideo.play();
        } else {
            // Show image
            lightboxImg.src = media.src;
            lightboxImg.alt = media.alt;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            lightboxVideo.src = '';
        }
        
        // Hide/show arrows based on position
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === allMedia.length - 1 ? 'none' : 'block';
    }

    // Previous media
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            showMedia(currentIndex);
        }
    });

    // Next media
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex < allMedia.length - 1) {
            currentIndex++;
            showMedia(currentIndex);
        }
    });

    // Close lightbox when clicking outside the media and arrows
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
                showMedia(currentIndex);
            } else if (e.key === 'ArrowRight' && currentIndex < allMedia.length - 1) {
                currentIndex++;
                showMedia(currentIndex);
            }
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        lightboxVideo.src = '';
    }
});