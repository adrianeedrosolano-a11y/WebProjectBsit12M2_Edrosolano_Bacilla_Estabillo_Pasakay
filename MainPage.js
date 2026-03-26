// ==================== JAVASCRIPT GUIDE ====================
// This file controls all the interactive features on the webpage
// When you click buttons, scroll, or submit forms - JavaScript makes it work!

// ==================== READ MORE / READ LESS BUTTON ====================
// Makes the "READ MORE" button show/hide extra text when clicked
function setupReadMoreButton() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const extraContent = document.getElementById('extraContent');
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            if (extraContent.style.display === 'none' || extraContent.style.display === '') {
                // Show the hidden text
                extraContent.style.display = 'block';
                readMoreBtn.textContent = 'READ LESS';
            } else {
                // Hide the text
                extraContent.style.display = 'none';
                readMoreBtn.textContent = 'READ MORE';
            }
        });
    }
}

let expandedCard = null;

// ==================== MEMBER CARDS CLICK ====================
// Sets up member cards so they expand when you click on a team member's name
function initializeMemberCards() {
    const memberNames = document.querySelectorAll('.member-name');
    memberNames.forEach(name => {
        name.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMemberDetails(this);
        });
    });
    
    // Setup portfolio button links
    setupPortfolioButtons();
}

// ==================== PORTFOLIO BUTTON LINKS ====================
// When you click "VISIT PORTFOLIO" button, it opens each member's portfolio
function setupPortfolioButtons() {
    const portfolioBtns = document.querySelectorAll('.visit-portfolio-btn');
    const portfolioLinks = {
        'Edrosolano, Adriane A.': 'AdrianePortfolio.html',
        'Bacila, Jayron Angelo C.': 'Jay/index.html',
        'Estabillo, John Steve': 'Steve/index.html',
        'Pasacay, Allen James D.': 'james/index.html'
    };
    
    portfolioBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const memberName = this.closest('.member-card').querySelector('.member-name').textContent;
            const portfolioUrl = portfolioLinks[memberName];
            if (portfolioUrl) {
                window.location.href = portfolioUrl;
            } else {
                alert('Portfolio for ' + memberName + ' coming soon!');
            }
        });
    });
}

// ==================== SHOW/HIDE MEMBER DETAILS ====================
// Expands member card to show their full info when clicked
function toggleMemberDetails(element) {
    const clickedCard = element.closest('.member-card');
    const clickedDetails = clickedCard.querySelector('.member-details');
    
    // If another card was expanded, close it
    if (expandedCard !== null && expandedCard !== clickedCard) {
        const previousDetails = expandedCard.querySelector('.member-details');
        previousDetails.style.display = 'none';
    }
    
    // Toggle current card
    if (clickedDetails.style.display === 'none' || clickedDetails.style.display === '') {
        // Show the card details
        clickedDetails.style.display = 'block';
        expandedCard = clickedCard;
    } else {
        // Hide the card details
        clickedDetails.style.display = 'none';
        expandedCard = null;
    }
}

// ==================== FADE IN ANIMATIONS WHEN SCROLLING ====================
// Makes sections fade in/out smoothly as you scroll up and down the page
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in view - fade it in
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
            } else {
                // Element is out of view - fade it out
                entry.target.classList.remove('fade-in');
                entry.target.style.opacity = '0';
            }
        });
    }, observerOptions);

    // Watch for these sections scrolling
    const sectionsToAnimate = document.querySelectorAll(
        '.about-preview, .members-section, .contact-section, .hero-content'
    );
    sectionsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Animate member cards with delay between each one
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.opacity = '0';
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate each card with a little delay
                    setTimeout(() => {
                        entry.target.classList.add('slide-in-up');
                        entry.target.style.opacity = '1';
                    }, index * 100);
                } else {
                    // Fade out when scrolling away
                    entry.target.classList.remove('slide-in-up');
                    entry.target.style.opacity = '0';
                }
            });
        }, observerOptions);
        cardObserver.observe(card);
    });
}

// ==================== PORTFOLIO HOVER EFFECT ====================
// Shows portfolio description when you hover over an item
function setupPortfolio() {
    const items = document.querySelectorAll('.portfolio-item');
    const dyn = document.getElementById('dynamic-content');
    items.forEach(item => {
        // When mouse enters - show description
        item.addEventListener('mouseenter', () => {
            dyn.innerHTML = `<h3>${item.dataset.name}</h3><p>${item.dataset.desc}</p>`;
        });
        // When mouse leaves - hide description
        item.addEventListener('mouseleave', () => { dyn.innerHTML = ''; });
        // When clicked - show alert
        item.addEventListener('click', () => {
            alert(`You selected ${item.dataset.name}'s portfolio!`);
        });
    });
}

// ==================== UPDATE HERO TEXT ====================
// Changes the main heading text dynamically (example function)
function updateHeroText() {
    const hero = document.querySelector('.hero-body');
    hero.textContent = 'This text was changed dynamically by JavaScript.';
}

// ==================== NAVIGATE TO PAGE ====================
// Directs you to a different page (example function)
function goTo(section) {
    window.location.href = section + '.html';
}

// ==================== SMOOTH SCROLL TO SECTIONS ====================
// Makes ABOUT US, CONTACTS, and MEMBERS links scroll smoothly to their sections
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Smooth scroll to the target section
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== CONTACT FORM SUBMISSION ====================
// Gets form data and shows a thank you message when you click "SEND MESSAGE"
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the values that the user typed in
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Show thank you message with their name and email
            alert(`Thank you ${name}! Your message has been received.\nWe will get back to you at ${email} soon.`);
            
            // Clear the form for new message
            this.reset();
        });
    }
}

// ==================== SUBSCRIBE BUTTON ====================
// When you click SUBSCRIBE - it opens a YouTube video in a new tab
function setupSubscribeButton() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Opens YouTube video at 11 seconds in a new tab
            window.open('https://www.youtube.com/watch?v=hK1mnXrHayY&t=11s', '_blank');
        });
    }
}

// ==================== WHEN PAGE LOADS ====================
// Runs all the functions above when the page first loads
window.addEventListener('DOMContentLoaded', () => {
    setupReadMoreButton();
    initializeMemberCards();
    setupScrollAnimations();
    setupPortfolio();
    setupSmoothScroll();
    setupContactForm();
    setupSubscribeButton();
    const readBtn = document.querySelector('.btn-readmore');
    if (readBtn) readBtn.addEventListener('click', updateHeroText);
});

// Shows the current page URL in the browser console (for debugging)
console.log('Current URL:', window.location.href);

// location info for debugging
console.log('Current URL:', window.location.href);
