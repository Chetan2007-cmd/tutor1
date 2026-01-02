// ==========================================
// PROJECTS PAGE JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    initCustomCursor();
    initFilterButtons();
    initProjectAnimations();
    initMobileMenu();
    init3DTilt();
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
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    
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
// FILTER FUNCTIONALITY
// ==========================================

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show card with delay
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.style.animation = 'projectAppear 0.6s ease forwards';
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hide');
                }
            });

            // Update URL hash
            if (filterValue !== 'all') {
                window.history.pushState(null, '', `#${filterValue}`);
            } else {
                window.history.pushState(null, '', window.location.pathname);
            }
        });
    });

    // Check for hash on load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const button = document.querySelector(`[data-filter="${hash}"]`);
        if (button) {
            button.click();
        }
    }
}

// ==========================================
// PROJECT ANIMATIONS
// ==========================================

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// 3D TILT EFFECT
// ==========================================

function init3DTilt() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `
                translateY(-10px) 
                perspective(1000px) 
                rotateX(${deltaY * -5}deg) 
                rotateY(${deltaX * 5}deg)
                scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn-contact, .btn-contact-large, .filter-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const maxDistance = 20;
        const distance = Math.sqrt(x * x + y * y);
        const factor = Math.min(distance / 100, 1);
        
        this.style.transform = `translate(${x * factor * 0.3}px, ${y * factor * 0.3}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// PROJECT COUNTER
// ==========================================

function updateProjectCounter() {
    const visibleProjects = document.querySelectorAll('.project-card:not(.hide)').length;
    const totalProjects = document.querySelectorAll('.project-card').length;
    
    console.log(`Showing ${visibleProjects} of ${totalProjects} projects`);
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ==========================================
// SEARCH FUNCTIONALITY (OPTIONAL)
// ==========================================

function initSearch() {
    const searchInput = document.getElementById('projectSearch');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });

        updateProjectCounter();
    });
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeButton = document.querySelector('.filter-btn.active');
    
    if (!activeButton) return;

    let currentIndex = Array.from(filterButtons).indexOf(activeButton);

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % filterButtons.length;
        filterButtons[currentIndex].click();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
        filterButtons[currentIndex].click();
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ==========================================

function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 100));

// ==========================================
// PREVENT DEFAULT SCROLL RESTORATION
// ==========================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ==========================================
// PAGE TRANSITION
// ==========================================

window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// ==========================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ==========================================

function trackProjectClick(projectName) {
    console.log(`Project clicked: ${projectName}`);
    // Add your analytics code here
}

// Add click tracking to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectName = card.querySelector('.project-title').textContent;
        trackProjectClick(projectName);
    });
});

// ==========================================
// FILTER ANIMATION ENHANCEMENT
// ==========================================

function enhanceFilterAnimation() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

enhanceFilterAnimation();

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c Cuberto Projects Page ', 'background: #6366f1; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Filter and explore our amazing projects! ', 'background: #8b5cf6; color: #fff; font-size: 14px; padding: 5px;');
