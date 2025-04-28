document.addEventListener('DOMContentLoaded', () => {

    // --- Active Nav Link ---
    const setActiveLink = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        // Get current page path, handle root case '/' -> 'index.html'
        let currentPath = window.location.pathname.split('/').pop();
        if (currentPath === '' || window.location.pathname.endsWith('/')) {
            currentPath = 'index.html';
        }

        navLinks.forEach(link => {
            let linkPath = link.getAttribute('href').split('/').pop();
             if (linkPath === '' || link.getAttribute('href') === '/') { // Handle root links in nav
                 linkPath = 'index.html';
             }

            // Remove hash part for comparison (e.g. #contact)
            const linkPathClean = linkPath.split('#')[0];
            const currentPathClean = currentPath.split('#')[0];

            if (linkPathClean === currentPathClean) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    setActiveLink(); // Call on initial load


    // --- Hero Section Letter Animation (only on index.html) ---
    const heroTitle = document.querySelector('.hero-title');
    let currentPathCheck = window.location.pathname.split('/').pop();
    if (currentPathCheck === '' || window.location.pathname.endsWith('/')) {
        currentPathCheck = 'index.html';
    }

    if (heroTitle && currentPathCheck === 'index.html') {
        // Wrap each letter in a span
        heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: '.hero-title .letter',
                translateY: [100, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: anime.stagger(50, {start: 300}) // Use anime.stagger
            })
            .add({
                targets: '.hero-subtitle, .cta-button', // Select both buttons in hero
                translateY: [30, 0], // Start slightly lower
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: anime.stagger(100), // Stagger buttons slightly
                offset: '-=1000' // Overlap with title animation ending
            }, );
    }


    // --- Scroll Reveal Animation using Intersection Observer ---
    const observerOptions = {
        root: null, // relative to viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Check if element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
            // Optional: Add logic here to remove 'is-visible' if element scrolls out of view
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements you want to animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });


    // --- Initialize Image Carousel (Swiper) ---
    // Check if the swiper container exists on the current page
    const imageSwiperEl = document.querySelector('.my-image-swiper');
    if (imageSwiperEl) {
        const imageSwiper = new Swiper('.my-image-swiper', {
            // Optional parameters
            direction: 'horizontal', // 'horizontal' or 'vertical'
            loop: true,             // Enable continuous looping
            speed: 600,             // Transition speed (ms)
            // effect: 'fade',      // Optional effect: 'slide', 'fade', 'cube', 'coverflow', 'flip'
            // fadeEffect: {          // Required if using fade effect
            //    crossFade: true
            // },

             // Autoplay configuration (optional - uncomment to enable)
             /*
             autoplay: {
                 delay: 3500, // Delay between transitions (ms)
                 disableOnInteraction: false, // Keep playing after user interaction? false = yes
                 pauseOnMouseEnter: true,      // Pause when mouse is over slider
             },
             */

            // If we need pagination (dots)
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // Allow clicking on dots to navigate
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Accessibility features
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                paginationBulletMessage: 'Go to slide {{index}}'
            },

            // Keyboard navigation
            keyboard: {
                enabled: true,
                onlyInViewport: false, // Allow keyboard nav even when slider not fully visible
            },

            // How many slides to show at once (usually 1 for image carousels)
            slidesPerView: 1,
            spaceBetween: 0, // Space between slides (usually 0 for full-image)

        });
    }


    // --- Project Card Hover Effect (Optional Enhancement - refined) ---
    // This can be mostly handled by CSS now, but JS can add more complex effects if needed.
    // Keeping it simple for now.


    // --- Set current year in footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded