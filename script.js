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

// ==========================================
// Offerings HOVER EFFECTS
// ==========================================

function initOfferingsHoverEffects() {
    const OfferingsItems = document.querySelectorAll('.Offerings-item');

    OfferingsItems.forEach(item => {
        const image = item.querySelector('.Offerings-image img');
        
        item.addEventListener('mouseenter', function(e) {
            // Add magnetic effect
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${deltaY * 5}deg) 
                rotateY(${deltaX * 5}deg)
            `;
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================

function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Offerings images parallax
    const OfferingsImages = document.querySelectorAll('.Offerings-image img');
    
    window.addEventListener('scroll', () => {
        OfferingsImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                img.style.transform = `translateY(${scrollPercent * 50 - 25}px) scale(1.1)`;
            }
        });
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

function initLoadingAnimation() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    });
}

// ==========================================
// TEXT REVEAL ANIMATION
// ==========================================

function initTextReveal() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .Offerings-item, .service-card, .blog-card');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn-hero, .btn-contact-large, .btn-outline-light');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
// Removed per user request

// ==========================================
// SERVICE CARD TILT EFFECT
// ==========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
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
            rotateX(${deltaY * -10}deg) 
            rotateY(${deltaX * 10}deg)
        `;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ==========================================
// BLOG CARD HOVER EFFECT
// ==========================================

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
        `;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ==========================================
// RANDOM GRADIENT ANIMATION
// ==========================================

function randomGradient() {
    const colors = [
        ['#6366f1', '#8b5cf6'],
        ['#8b5cf6', '#ec4899'],
        ['#ec4899', '#f43f5e'],
        ['#f43f5e', '#fb923c'],
        ['#fb923c', '#fbbf24']
    ];

    const highlights = document.querySelectorAll('.highlight');
    
    setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        highlights.forEach(highlight => {
            highlight.style.background = `linear-gradient(135deg, ${randomColor[0]} 0%, ${randomColor[1]} 100%)`;
            highlight.style.webkitBackgroundClip = 'text';
            highlight.style.webkitTextFillColor = 'transparent';
            highlight.style.backgroundClip = 'text';
        });
    }, 3000);
}

randomGradient();

// ==========================================
// COUNTER ANIMATION
// ==========================================

function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, 16);
}

// ==========================================
// FLOATING ANIMATION FOR HERO
// ==========================================

function initFloatingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        let position = 0;
        
        setInterval(() => {
            position += 0.5;
            heroTitle.style.transform = `translateY(${Math.sin(position / 10) * 5}px)`;
        }, 50);
    }
}

// Uncomment to enable floating animation
// initFloatingAnimation();

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
// MOBILE MENU CLOSE ON LINK CLICK
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// ==========================================
// DROPDOWN MENU HANDLING FOR DESKTOP AND MOBILE
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.nav-item.dropdown');
    const dropdownToggle = document.getElementById('navbarDropdown');
    const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    
    // Check if dropdown elements exist
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    
    let isMobile = window.innerWidth < 992;
    
    // Function to handle dropdown toggle
    function toggleDropdown(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    }
    
    // Function to show dropdown (for desktop hover)
    function showDropdown() {
        if (!isMobile) {
            dropdownMenu.classList.add('show');
        }
    }
    
    // Function to hide dropdown (for desktop hover)
    function hideDropdown() {
        if (!isMobile) {
            dropdownMenu.classList.remove('show');
        }
    }
    
    // Desktop behavior - hover to show dropdown
    if (!isMobile) {
        dropdown.addEventListener('mouseenter', showDropdown);
        dropdown.addEventListener('mouseleave', hideDropdown);
        // Also allow click to toggle on desktop
        dropdownToggle.addEventListener('click', toggleDropdown);
    } 
    // Mobile behavior - click to toggle dropdown
    else {
        dropdownToggle.addEventListener('click', toggleDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
    
    // Handle window resize to adjust behavior
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 992;
        
        // Remove any existing event listeners to prevent duplication
        dropdown.removeEventListener('mouseenter', showDropdown);
        dropdown.removeEventListener('mouseleave', hideDropdown);
        dropdownToggle.removeEventListener('click', toggleDropdown);
        
        // Reattach appropriate event listeners based on screen size
        if (!isMobile) {
            dropdown.addEventListener('mouseenter', showDropdown);
            dropdown.addEventListener('mouseleave', hideDropdown);
            dropdownToggle.addEventListener('click', toggleDropdown);
        } else {
            dropdownToggle.addEventListener('click', toggleDropdown);
        }
    });
});

// ==========================================
// PREVENT DEFAULT SCROLL RESTORATION
// ==========================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

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

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Your scroll logic here
}, 16);

window.addEventListener('scroll', optimizedScroll);





// ==========================================
// HERO CAROUSEL INITIALIZATION
// ==========================================

function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        // Initialize Bootstrap carousel with custom options
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        });
        
        // Add custom indicators animation
        carousel.addEventListener('slide.bs.carousel', function (e) {
            // Reset all animations
            const titles = e.relatedTarget.querySelectorAll('.hero-title .line');
            const descriptions = e.relatedTarget.querySelectorAll('.hero-description, .carousel-subtitle, .carousel-badge, .btn-hero, .btn-hero-outline');
            
            titles.forEach(title => {
                title.style.animation = 'none';
                title.offsetHeight; // Trigger reflow
                title.style.animation = null;
            });
            
            descriptions.forEach(desc => {
                desc.style.animation = 'none';
                desc.offsetHeight; // Trigger reflow
                desc.style.animation = null;
            });
        });
    }
}

// ==========================================
// CAROUSEL IMAGE TILT EFFECT
// ==========================================

function initCarouselImageTilt() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    
    carouselImages.forEach(imageContainer => {
        const img = imageContainer.querySelector('img');
        
        imageContainer.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.5s ease';
        });
        
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${deltaY * -5}deg) 
                rotateY(${deltaX * 5}deg)
                scale(1.02)
            `;
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}




document.querySelectorAll('.footer-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        const btn = document.querySelector('.footer-toggle');
        const dropdown = bootstrap.Dropdown.getInstance(btn);
        if (dropdown) dropdown.hide();
    });
});

document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    alert('Thank you! Your enquiry has been submitted.');

    const modal = bootstrap.Modal.getInstance(
        document.getElementById('enquiryModal')
    );
    modal.hide();

    this.reset();
});

const data = [
  {
    name: "ANDY LAW",
    desc: "Allows you to collaborate, experiment, and test much more effectively and efficiently.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "JACK MILLER",
    desc: "Hands-on training and real-time examples helped me gain confidence.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    name: "SOPHIA LEE",
    desc: "Perfect learning environment with expert trainers and guidance.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    name: "DAVID CLARK",
    desc: "The best IT training center with real project exposure.",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
  }
];

let index = 0;

function changeTestimonial(i) {
  index = i;
  updateUI();
}

function updateUI() {
  const img = document.getElementById("mainImg");
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = data[index].img;
    document.getElementById("name").innerText = data[index].name;
    document.getElementById("desc").innerText = data[index].desc;
    document.getElementById("count").innerText = `#${index + 1}`;
    img.style.opacity = 1;
  }, 300);

  document.querySelectorAll(".thumbnail-wrapper img").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

/* Auto-play like GIF */
setInterval(() => {
  index = (index + 1) % data.length;
  updateUI();
}, 4000);




