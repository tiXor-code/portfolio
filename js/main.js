// ============================================
// MAIN APPLICATION CONTROLLER
// ============================================

class MainApp {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.cinematicController = null;
        this.init();
    }

    async init() {
        // Wait for DOM and assets to load
        await this.preloadAssets();
        
        // Initialize GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize effects
        const effects = new SpecialEffects();
        effects.generateStars(200);
        effects.typeTerminalText();
        
        // Initialize cinematic controller
        this.cinematicController = new CinematicController();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup interactive elements
        this.setupInteractiveElements();
        
        // Hide loading screen
        this.hideLoadingScreen();
    }

    async preloadAssets() {
        // Simulate asset loading
        return new Promise((resolve) => {
            // In a real app, you'd preload images, fonts, etc.
            setTimeout(resolve, 1500);
        });
    }

    hideLoadingScreen() {
        gsap.to(this.loadingScreen, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                this.loadingScreen.classList.add('hidden');
            }
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate scroll position
                    const rect = targetSection.getBoundingClientRect();
                    const absoluteTop = window.pageYOffset + rect.top;
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: absoluteTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupInteractiveElements() {
        // Project cards tilt effect
        this.setupProjectCards();
        
        // Contact button
        this.setupContactButton();
        
        // Skill items hover
        this.setupSkillHovers();
        
        // Parallax for space layers
        this.setupParallax();
    }

    setupProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card.querySelector('.project-inner'), {
                    rotationY: rotateY,
                    rotationX: -rotateX,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.project-inner'), {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card.querySelector('.project-inner'), {
                    rotationY: rotateY,
                    rotationX: -rotateX,
                    duration: 0.1,
                    ease: "none"
                });
            });
        });
    }

    setupContactButton() {
        const contactBtn = document.querySelector('.contact-cta');
        
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                // Animate button
                gsap.to(contactBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                
                // Create launch effect
                const flash = document.createElement('div');
                flash.style.position = 'fixed';
                flash.style.top = '50%';
                flash.style.left = '50%';
                flash.style.transform = 'translate(-50%, -50%)';
                flash.style.width = '100px';
                flash.style.height = '100px';
                flash.style.background = 'radial-gradient(circle, rgba(0,255,136,0.8), transparent)';
                flash.style.borderRadius = '50%';
                flash.style.pointerEvents = 'none';
                document.body.appendChild(flash);
                
                gsap.fromTo(flash, {
                    scale: 0,
                    opacity: 1
                }, {
                    scale: 20,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => flash.remove()
                });
                
                // Show contact info
                setTimeout(() => {
                    alert('Launch sequence initiated! Contact: teodor.lutoiu@example.com');
                }, 500);
            });
        }
    }

    setupSkillHovers() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupParallax() {
        const spaceLayers = document.querySelectorAll('.space-layer');
        
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            spaceLayers.forEach((layer, index) => {
                const speed = (index + 1) * 5;
                gsap.to(layer, {
                    x: x * speed,
                    y: y * speed,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    }

    // Handle window resize
    handleResize() {
        // Refresh ScrollTrigger on resize
        ScrollTrigger.refresh();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new MainApp();
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            app.handleResize();
        }, 250);
    });
    
    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 2000);
});