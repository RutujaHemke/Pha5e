// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Custom Cursor
    initCustomCursor();
    
    // Initialize GSAP Animations
    initHeroAnimations();
    
    // Initialize Hover Effects
    initHoverEffects();
});

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        // Update cursor position using GSAP for smooth movement
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        // Update cursor follower with slight delay for smooth effect
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Change cursor size on clickable elements
    const clickables = document.querySelectorAll('a, button, .menu-toggle');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.backgroundColor = 'var(--secondary-color)';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'rgba(249, 115, 22, 0.4)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'rgba(110, 23, 203, 0.3)';
        });
    });
    
    // Add mouse down effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Hero section animations with GSAP
function initHeroAnimations() {
    // Hero timeline
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate hero title lines
    const titleLines = document.querySelectorAll('.line-reveal');
    
    heroTl.to(titleLines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        delay: 0.5
    });
    
    // Animate highlight underline
    heroTl.to('.hero-title .highlight::after', {
        scaleX: 1,
        duration: 0.7,
        delay: 0.1
    });
    
    // Animate subtitle and CTA
    heroTl.to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.1
    });
    
    heroTl.to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.1
    });
    
    // Animate hero image
    heroTl.to('.hero-image-container', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.1
    });
    
    // Fade in scroll indicator
    heroTl.to('.scroll-indicator', {
        opacity: 1,
        duration: 0.5,
        delay: 0.2
    });
    
    // Mouse movement parallax effect for shapes
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const heroImage = document.querySelector('.hero-image-container');
    
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Apply parallax effect to shapes with GSAP
        shapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            gsap.to(shape, {
                x: x * 100 * speed,
                y: y * 100 * speed,
                duration: 1,
                ease: "power1.out"
            });
        });
        
        // Subtle movement to the hero image with GSAP
        gsap.to(heroImage, {
            x: x * 20,
            y: y * 20,
            duration: 1,
            ease: "power1.out"
        });
    });
}

// Interactive hover effects
function initHoverEffects() {
    // Menu hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            navLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.style.opacity = '0.5';
                }
            });
        });
        
        link.addEventListener('mouseleave', () => {
            navLinks.forEach(otherLink => {
                otherLink.style.opacity = '1';
            });
        });
    });
    
    // Mobile menu toggle with GSAP
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    let menuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            hamburger.classList.add('active');
            gsap.to(hamburger.querySelectorAll('span')[0], {
                rotation: 45,
                y: 9,
                backgroundColor: '#ffffff',
                duration: 0.3
            });
            gsap.to(hamburger.querySelectorAll('span')[1], {
                rotation: -45,
                y: -9,
                backgroundColor: '#ffffff',
                duration: 0.3
            });
        } else {
            hamburger.classList.remove('active');
            gsap.to(hamburger.querySelectorAll('span')[0], {
                rotation: 0,
                y: 0,
                backgroundColor: '#ffffff',
                duration: 0.3
            });
            gsap.to(hamburger.querySelectorAll('span')[1], {
                rotation: 0,
                y: 0,
                backgroundColor: '#ffffff',
                duration: 0.3
            });
        }
    });
}

// Scroll functionality for scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    // Scroll to next section with GSAP
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: window.innerHeight, autoKill: false },
        ease: "power2.inOut"
    });
});