// Adriane's Part 

// ==================== SCROLL FADE IN/FADE OUT ANIMATION ====================
// Simple fade in/fade out effect when scrolling - elements fade in when they come into view

function initializeScrollFadeAnimation() {
    // Get all sections and cards we want to animate
    const elementsToAnimate = document.querySelectorAll(
        'section, .project-card, .education-item, .skill-category'
    );

    // Set initial opacity to 0 (hidden)
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s ease-in-out';
    });

    // Create an observer to watch for elements entering the viewport
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible - fade in
                entry.target.style.opacity = '1';
            } else {
                // Element is not visible - fade out
                entry.target.style.opacity = '0';
            }
        });
    }, observerOptions);

    // Watch all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Run the scroll animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    initializeScrollFadeAnimation();
});