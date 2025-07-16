            ease: "power2.in" 
        }, "<0.1")
        .to(nebulaBg, { 
            opacity: 0.6, 
            scale: 1.1,
            ease: "power1.inOut" 
        }, "<0.3");

    // Enhanced Post-Launch Journey
    let masterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: journey,
            start: "2000 top",
            end: "bottom bottom",
            scrub: 2,
        }
    });

    masterTimeline
        .to(rocket, {
            y: -(journey.offsetHeight - window.innerHeight * 0.5),
            ease: "none"
        }, 0)
        .to(nebulaBg, {
            y: -window.innerHeight * 0.3,
            ease: "none"
        }, 0)
        .to("#starfield", {
            y: -window.innerHeight * 0.5,
            ease: "none"
        }, 0);

    // Enhanced Content Animations
    gsap.utils.toArray('.content-section').forEach((section, index) => {
        gsap.fromTo(section, 
            {
                opacity: 0,
                y: 100,
                scale: 0.95
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {                        gsap.to(section.querySelectorAll('h2, p, .cta-button'), {
                            opacity: 1,
                            y: 0,
                            stagger: 0.2,
                            duration: 0.8,
                            ease: "power3.out"
                        });
                    }
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            }
        );
    });

    // Enhanced Projects Animation
    const projectsContainer = document.querySelector(".projects-section-container");
    
    gsap.timeline({
        scrollTrigger: {
            trigger: projectsContainer,
            start: "top center",
            end: `+=${window.innerHeight * 2}`,
            scrub: true,
            pin: true,
        }
    })
    .fromTo(".project-card", {
        y: 150,
        opacity: 0,
        rotationY: 45,
        scale: 0.8
    }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: 0.3,
        ease: "power3.out"
    });
}function setupStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const starCount = Math.min(800, window.innerWidth * 0.5);
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            baseAlpha: Math.random() * 0.8 + 0.2
        });
    }

    let animationId;
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        stars.forEach(star => {
            // Twinkling effect
            star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * 0.3;
            
            ctx.globalAlpha = Math.max(0, star.alpha);
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationId = requestAnimationFrame(animateStars);
    }    
    animateStars();
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateStars();
        }
    });
}

function setupScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header scroll effect
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effects for performance
        if (Math.abs(scrollY - lastScrollY) > 10) {
            requestAnimationFrame(() => {
                const earthBg = document.querySelector('.earth-bg');
                const nebulaBg = document.querySelector('.nebula-bg');
                
                if (earthBg && scrollY < window.innerHeight * 2) {
                    earthBg.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
                
                if (nebulaBg && scrollY > window.innerHeight) {
                    nebulaBg.style.transform = `translateY(${(scrollY - window.innerHeight) * 0.3}px)`;
                }
            });
            lastScrollY = scrollY;
        }
    }, { passive: true });
}// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -15,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);// Observe all sections for performance
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', (e) => {
        console.warn('Image failed to load:', e.target.src);
        // Fallback to a solid color background
        e.target.style.background = 'linear-gradient(135deg, rgba(0, 170, 255, 0.1), rgba(0, 100, 200, 0.05))';
        e.target.style.display = 'block';
        e.target.style.minHeight = '200px';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});