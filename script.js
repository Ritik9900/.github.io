document.addEventListener('DOMContentLoaded', () => {

    // --- Active Nav Link ---
    const setActiveLink = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentPath = window.location.pathname.split('/').pop(); // Get the current file name (e.g., "projects.html")

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();

            // Handle index.html specifically
            if ((currentPath === '' || currentPath === 'index.html') && (linkPath === '' || linkPath === 'index.html')) {
                link.classList.add('active');
            } else if (linkPath === currentPath && linkPath !== 'index.html' && linkPath !== '') {
                 link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    setActiveLink(); // Call on initial load


    // --- Hero Section Letter Animation (only on index.html) ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html'))) {
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
                targets: '.hero-subtitle, .cta-button', // Select both buttons
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
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });


    // --- Project Card Hover Effect (Optional Enhancement - refined) ---
    // This can be mostly handled by CSS now, but JS can add more complex effects if needed.
    // Keeping it simple for now.


    // --- Set current year in footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded