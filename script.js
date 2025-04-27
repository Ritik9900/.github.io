document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Section Letter Animation ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Wrap each letter in a span
        heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: '.hero-title .letter',
                translateY: [100, 0], // Start from below
                translateZ: 0,
                opacity: [0, 1], // Fade in
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 300 + 50 * i // Stagger delay
            })
            .add({ // Animate subtitle and buttons after title
                targets: '.hero-subtitle, .cta-button',
                translateY: [20, 0],
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1000,
                offset: '-=800' // Start slightly before title finishes
            }, );
    }

    // --- Scroll Reveal Animation using Intersection Observer ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Animate with Anime.js directly instead of CSS transition
                // anime({
                //     targets: entry.target,
                //     translateY: [30, 0],
                //     opacity: [0, 1],
                //     duration: 800,
                //     easing: 'easeOutExpo'
                // });
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with the class 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });


    // --- Project Card Hover Effect (Optional Enhancement) ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Example: Slightly lift the image on hover
            anime({
                targets: card.querySelector('img'),
                translateY: -5, // Lift image slightly
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        card.addEventListener('mouseleave', () => {
            // Return image to original position
            anime({
                targets: card.querySelector('img'),
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // --- Set current year in footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded