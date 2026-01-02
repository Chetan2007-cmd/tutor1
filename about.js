// ==========================================
// INITIALIZE AOS (Animate On Scroll)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Custom Cursor
    initCustomCursor();

    // Navbar Scroll Effect
    initNavbarScroll();

    // Smooth Scrolling
    initSmoothScroll();

    // Offerings Hover Effects
    initOfferingsHoverEffects();

    // Parallax Effects
    initParallaxEffects();

    // Loading Animation
    initLoadingAnimation();

    // Text Reveal Animation
    initTextReveal();
});



// ==========================================
// CUSTOM CURSOR
// ==========================================

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        const speed = 0.15;
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .Offerings-item, .service-card, .blog-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Scroll effect for navbar background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Highlight active page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === './index.html')) {
            link.classList.add('active');
        }
    });

    // Auto-close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
