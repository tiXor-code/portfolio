// ============================================
// SPECIAL EFFECTS MODULE
// ============================================

class SpecialEffects {
    constructor() {
        this.smokeContainer = document.querySelector('.launch-smoke-container');
        this.exhaustContainer = document.querySelector('.exhaust-container');
        this.spaceEnvironment = document.querySelector('.space-environment');
    }

    // Generate launch smoke particles
    generateLaunchSmoke(count = 50) {
        for (let i = 0; i < count; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            
            // Random initial position and size
            const startX = gsap.utils.random(-200, 200);
            const startY = gsap.utils.random(-50, 50);
            const scale = gsap.utils.random(0.5, 2);
            
            gsap.set(smoke, {
                x: startX,
                y: startY,
                scale: scale,
                rotation: gsap.utils.random(0, 360),
                opacity: gsap.utils.random(0.3, 0.8)
            });
            
            this.smokeContainer.appendChild(smoke);
        }
    }

    // Animate smoke particles
    animateLaunchSmoke() {
        const particles = this.smokeContainer.querySelectorAll('.smoke-particle');
        
        particles.forEach((particle, index) => {
            const delay = index * 0.05;
            
            gsap.to(particle, {
                y: gsap.utils.random(-300, -600),
                x: `+=${gsap.utils.random(-300, 300)}`,
                scale: `*=${gsap.utils.random(2, 4)}`,
                rotation: `+=${gsap.utils.random(-180, 180)}`,
                opacity: 0,
                duration: gsap.utils.random(3, 6),
                delay: delay,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        });
    }

    // Create exhaust plumes for engines
    createExhaustPlumes() {
        const engines = document.querySelectorAll('.engine');
        
        engines.forEach((engine, index) => {
            const plume = document.createElement('div');
            plume.className = 'exhaust-plume';
            
            // Position plume based on engine type
            const isCenter = engine.classList.contains('central');
            const width = isCenter ? 60 : 40;
            const height = isCenter ? 200 : 150;
            
            gsap.set(plume, {
                width: width,
                height: height,
                left: '50%',
                bottom: -10,
                transform: 'translateX(-50%)'
            });
            
            engine.appendChild(plume);
        });
    }

    // Animate exhaust plumes during ignition
    animateExhaustPlumes(intensity = 1) {
        const plumes = document.querySelectorAll('.exhaust-plume');
        
        plumes.forEach(plume => {
            gsap.to(plume, {
                opacity: intensity,
                height: `*=${1 + intensity}`,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Add turbulence animation
            plume.style.animation = `exhaustTurbulence ${0.1 / intensity}s ease-in-out infinite`;
        });
    }

    // Generate dynamic starfield
    generateStars(count = 200) {
        const starsNear = document.querySelector('.space-layer.stars-near');
        const starsFar = document.querySelector('.space-layer.stars-far');
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = gsap.utils.random(1, 3) + 'px';
            star.style.height = star.style.width;
            star.style.background = '#ffffff';
            star.style.borderRadius = '50%';
            star.style.left = gsap.utils.random(0, 100) + '%';
            star.style.top = gsap.utils.random(0, 100) + '%';
            star.style.opacity = gsap.utils.random(0.3, 1);
            
            // Add twinkle animation to some stars
            if (Math.random() > 0.7) {
                star.style.animation = `twinkle ${gsap.utils.random(2, 5)}s ease-in-out infinite`;
            }
            
            // Distribute between near and far layers
            if (i < count / 2) {
                starsFar.appendChild(star);
            } else {
                starsNear.appendChild(star);
            }
        }
    }

    // Terminal typing effect
    typeTerminalText() {
        const lines = document.querySelectorAll('.terminal-line');
        
        lines.forEach((line, index) => {
            const delay = line.dataset.delay || index * 500;
            
            gsap.fromTo(line, 
                { opacity: 0 },
                { 
                    opacity: 1,
                    duration: 0.1,
                    delay: delay / 1000,
                    ease: "none"
                }
            );
        });
    }

    // Clean up effects
    cleanup() {
        // Remove smoke particles
        const particles = this.smokeContainer.querySelectorAll('.smoke-particle');
        particles.forEach(p => p.remove());
        
        // Reset exhaust plumes
        const plumes = document.querySelectorAll('.exhaust-plume');
        plumes.forEach(p => {
            gsap.set(p, { opacity: 0, height: 'auto' });
            p.style.animation = '';
        });
    }
}

// Export for use in other modules
window.SpecialEffects = SpecialEffects;