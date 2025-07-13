// ============================================
// CINEMATIC SCROLL CONTROLLER
// ============================================

class CinematicController {
    constructor() {
        this.effects = new SpecialEffects();
        this.progressBar = document.querySelector('.progress-fill');
        this.setupScrollTriggers();
        this.initializePhysics();
    }

    setupScrollTriggers() {
        // Update progress bar
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                this.updateProgress(self.progress);
                this.updateScene(self.progress);
            }
        });

        // Stage 1: Monitor Extreme Close-Up (0-15%)
        this.setupMonitorStage();
        
        // Stage 2: Workspace Reveal (15-35%)
        this.setupWorkspaceStage();
        
        // Stage 3: Porthole Discovery (35-50%)
        this.setupPortholeStage();
        
        // Stage 4: Rocket Exterior Reveal (50-65%)
        this.setupRocketStage();
        
        // Stage 5: Engine Ignition (65-75%)
        this.setupIgnitionStage();
        
        // Stage 6: Rocket Launch (75-85%)
        this.setupLaunchStage();
        
        // Stage 7: Portfolio Reveal (85-100%)
        this.setupPortfolioStage();
    }

    updateProgress(progress) {
        gsap.set(this.progressBar, { width: `${progress * 100}%` });
    }

    updateScene(progress) {
        // Map scroll progress to scene states
        const stage = this.getCurrentStage(progress);
        this.updateLighting(stage);
        this.updateVisibility(stage);
    }

    getCurrentStage(progress) {
        if (progress < 0.15) return 1;
        if (progress < 0.35) return 2;
        if (progress < 0.5) return 3;
        if (progress < 0.65) return 4;
        if (progress < 0.75) return 5;
        if (progress < 0.85) return 6;
        return 7;
    }

    setupMonitorStage() {
        // Initial state - extreme close-up
        gsap.set(".monitor-assembly", { 
            scale: 3.5, 
            z: -120,
            filter: "contrast(1.2) brightness(1.1)"
        });

        // Stage 1 animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "15% top",
                scrub: 1
            }
        })
        .to(".monitor-assembly", {
            scale: 2.8,
            z: -90,
            ease: "none"
        })
        .to(".terminal-content", {
            opacity: 1,
            duration: 0.5
        }, 0);
    }

    setupWorkspaceStage() {
        // Hide workspace elements initially
        gsap.set([".desk-environment", ".wall-layer"], { 
            opacity: 0 
        });

        // Stage 2 animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "15% top",
                end: "35% top",
                scrub: 1
            }
        })
        .to(".monitor-assembly", {
            scale: 1,
            z: 0,
            filter: "contrast(1) brightness(1)",
            ease: "power2.inOut"
        })
        .to([".desk-environment", ".wall-layer"], {
            opacity: 1,
            stagger: 0.1,
            ease: "power2.inOut"
        }, 0.2)
        .to(".interior-scene", {
            scale: 0.8,
            ease: "power2.inOut"
        }, 0.5);
    }

    setupPortholeStage() {
        gsap.set(".porthole-assembly", { 
            scale: 3,
            opacity: 0
        });

        // Stage 3 animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "35% top",
                end: "50% top",
                scrub: 1
            }
        })
        .to(".porthole-assembly", {
            scale: 1,
            opacity: 1,
            ease: "power2.out"
        })
        .to(".interior-scene", {
            scale: 0.3,
            z: 200,
            ease: "power2.inOut"
        }, 0);
    }

    setupRocketStage() {
        gsap.set(".rocket-assembly", { 
            scale: 0.1,
            opacity: 0,
            y: 100
        });

        gsap.set(".space-environment", {
            opacity: 0
        });

        // Stage 4 animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "50% top",
                end: "65% top",
                scrub: 1
            }
        })
        .to([".interior-scene", ".porthole-assembly"], {
            opacity: 0,
            scale: 0.5,
            ease: "power2.in"
        })
        .to(".rocket-assembly", {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, 0.3)
        .to(".space-environment", {
            opacity: 1,
            ease: "power2.out"
        }, 0.3);
    }

    setupIgnitionStage() {
        // Create exhaust plumes
        this.effects.createExhaustPlumes();
        
        const ignitionTL = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "65% top",
                end: "75% top",
                scrub: 1
            }
        });

        // Stage 1: Pre-ignition vapor
        ignitionTL.to(".engine-preburner", {
            opacity: 0.3,
            duration: 0.1
        });

        // Stage 2: Torch ignition
        ignitionTL.to(".engine-core", {
            background: "radial-gradient(circle, #ffffff 0%, #ff8800 60%, #ff4400 100%)",
            duration: 0.2,
            stagger: 0.03
        });

        // Stage 3: Full combustion
        ignitionTL.to(".engine-core", {
            background: "radial-gradient(circle, #ffffff 0%, #ff6600 40%, #ff2200 80%)",
            boxShadow: "0 0 40px #ff6600, 0 0 80px #ff4400",
            duration: 0.5
        });

        // Animate exhaust plumes
        ignitionTL.call(() => {
            this.effects.animateExhaustPlumes(0.5);
        }, null, 0.2);

        ignitionTL.call(() => {
            this.effects.animateExhaustPlumes(1);
        }, null, 0.5);
    }

    setupLaunchStage() {
        // Generate smoke particles
        ScrollTrigger.create({
            trigger: "body",
            start: "74% top",
            onEnter: () => {
                this.effects.generateLaunchSmoke(50);
            }
        });

        // Launch animation
        const launchTL = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "75% top",
                end: "85% top",
                scrub: 1
            }
        });

        // Rocket acceleration
        launchTL
            .to(".rocket-assembly", {
                y: -window.innerHeight * 0.5,
                scale: 0.9,
                duration: 0.3,
                ease: "power1.out"
            })
            .to(".rocket-assembly", {
                y: -window.innerHeight * 2,
                scale: 0.4,
                duration: 0.4,
                ease: "power2.in"
            })
            .to(".rocket-assembly", {
                y: -window.innerHeight * 4,
                scale: 0.1,
                opacity: 0.8,
                duration: 0.3,
                ease: "power3.in"
            });

        // Launch effects
        launchTL.to(".launch-flash", {
            opacity: 1,
            scale: 3,
            duration: 0.2,
            ease: "power2.out"
        }, 0.1);

        launchTL.to(".launch-flash", {
            opacity: 0,
            scale: 5,
            duration: 0.5
        }, 0.3);

        // Animate smoke
        launchTL.call(() => {
            this.effects.animateLaunchSmoke();
        }, null, 0.1);
    }

    setupPortfolioStage() {
        gsap.set(".portfolio-space", {
            opacity: 0,
            y: 100
        });

        // Portfolio reveal animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "85% top",
                end: "100% top",
                scrub: 1
            }
        })
        .to(".launch-smoke-container", {
            opacity: 0,
            scale: 3,
            filter: "blur(30px)",
            duration: 1,
            ease: "power2.out"
        })
        .to(".portfolio-space", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, 0.5)
        .fromTo(".portfolio-section", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        }, 0.7);
    }

    initializePhysics() {
        // Set up realistic physics for floating elements
        gsap.utils.toArray(".floating").forEach(element => {
            gsap.to(element, {
                y: "random(-20, 20)",
                rotation: "random(-5, 5)",
                duration: "random(4, 8)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }

    updateLighting(stage) {
        // Dynamic lighting based on stage
        const viewport = document.querySelector('.viewport');
        
        switch(stage) {
            case 1:
            case 2:
                viewport.style.filter = 'brightness(1)';
                break;
            case 3:
            case 4:
                viewport.style.filter = 'brightness(0.9)';
                break;
            case 5:
            case 6:
                viewport.style.filter = 'brightness(1.2) contrast(1.1)';
                break;
            case 7:
                viewport.style.filter = 'brightness(1) contrast(1.2)';
                break;
        }
    }

    updateVisibility(stage) {
        // Control visibility of elements based on stage
        const elements = {
            interior: document.querySelector('.interior-scene'),
            porthole: document.querySelector('.porthole-assembly'),
            rocket: document.querySelector('.rocket-assembly'),
            space: document.querySelector('.space-environment'),
            portfolio: document.querySelector('.portfolio-space')
        };

        // Reset all
        Object.values(elements).forEach(el => {
            if (el) el.style.pointerEvents = 'none';
        });

        // Enable interaction for current stage
        switch(stage) {
            case 1:
            case 2:
                if (elements.interior) elements.interior.style.pointerEvents = 'auto';
                break;
            case 3:
                if (elements.porthole) elements.porthole.style.pointerEvents = 'auto';
                break;
            case 4:
            case 5:
            case 6:
                if (elements.rocket) elements.rocket.style.pointerEvents = 'auto';
                break;
            case 7:
                if (elements.portfolio) elements.portfolio.style.pointerEvents = 'auto';
                break;
        }
    }
}

// Export for use in main.js
window.CinematicController = CinematicController;