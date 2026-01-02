// ==========================================
// BLOG PAGE JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    initCustomCursor();
    initFilterButtons();
    initBlogAnimations();
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
    const interactiveElements = document.querySelectorAll('a, button, .blog-card');
    
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
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter blog posts with animation
            blogCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show card with delay
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.style.animation = 'blogAppear 0.6s ease forwards';
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
// BLOG ANIMATIONS
// ==========================================

function initBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');

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

    blogCards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// 3D TILT EFFECT
// ==========================================

function init3DTilt() {
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
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
// MAGNETIC BUTTON EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn-contact, .btn-cta, .filter-btn');

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
// SEARCH FUNCTIONALITY
// ==========================================

function initSearch() {
    const searchInput = document.getElementById('blogSearch');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');

        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const category = card.querySelector('.blog-category').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
}

// Uncomment to enable search
// initSearch();

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
// ARTICLE COUNTER
// ==========================================

function updateArticleCounter() {
    const visibleArticles = document.querySelectorAll('.blog-card:not(.hide)').length;
    const totalArticles = document.querySelectorAll('.blog-card').length;
    
    console.log(`Showing ${visibleArticles} of ${totalArticles} articles`);
}

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

function trackArticleClick(articleTitle) {
    console.log(`Article clicked: ${articleTitle}`);
    // Add your analytics code here
}

// Add click tracking to all blog cards
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
        const articleTitle = card.querySelector('.blog-title').textContent;
        trackArticleClick(articleTitle);
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
// PARALLAX EFFECT ON IMAGES
// ==========================================

function initParallaxImages() {
    const blogImages = document.querySelectorAll('.blog-image');
    
    window.addEventListener('scroll', throttle(() => {
        blogImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                img.style.transform = `translateY(${scrollPercent * 30 - 15}px) scale(1.1)`;
            }
        });
    }, 16));
}

// Uncomment to enable parallax on images
// initParallaxImages();

// ==========================================
// CATEGORY COLOR CODING
// ==========================================

function initCategoryColors() {
    const categories = {
        'design-course': '#6366f1',
        'design-tips': '#8b5cf6',
        'dev-source': '#ec4899'
    };

    document.querySelectorAll('.blog-card').forEach(card => {
        const category = card.getAttribute('data-category');
        const categoryElement = card.querySelector('.blog-category');
        
        if (categories[category] && categoryElement) {
            categoryElement.style.color = categories[category];
        }
    });
}

initCategoryColors();

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = [];
    }
});

// ==========================================
// READING TIME ESTIMATOR
// ==========================================

function estimateReadingTime() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        // Estimate 3-5 minute read time for articles
        const readTime = Math.floor(Math.random() * 3) + 3;
        const readTimeElement = document.createElement('span');
        readTimeElement.className = 'read-time';
        readTimeElement.textContent = `${readTime} min read`;
        readTimeElement.style.cssText = `
            color: var(--text-secondary);
            font-size: 0.875rem;
            margin-left: 1rem;
        `;
        
        const dateElement = card.querySelector('.blog-date');
        if (dateElement) {
            dateElement.appendChild(readTimeElement);
        }
    });
}

// Uncomment to enable reading time estimates
// estimateReadingTime();

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c Cuberto Blog Page ', 'background: #6366f1; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Explore our design insights and tutorials! ', 'background: #8b5cf6; color: #fff; font-size: 14px; padding: 5px;');
console.log('%c Built with HTML, CSS & JavaScript ', 'background: #ec4899; color: #fff; font-size: 14px; padding: 5px;');
