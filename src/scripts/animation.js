gsap.registerPlugin(ScrollTrigger);

const journey = document.getElementById('content-journey');
const rocket = document.getElementById('rocket');
const earthBg = document.querySelector('.earth-bg');
const nebulaBg = document.querySelector('.nebula-bg');

// --- LAUNCH SEQUENCE ---
let launchTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: journey,
        start: "top top",
        end: "+=1500", // Launch sequence duration
        scrub: 1,
        pin: true,
        pinSpacing: true,
    }
});

launchTimeline
    .to(rocket, { y: -window.innerHeight * 0.8, scale: 1.5, ease: "power2.in" })
    .to(earthBg, { y: window.innerHeight, opacity: 0, ease: "power1.in" }, "<0.1")
    .to(nebulaBg, { opacity: 0.4, ease: "power1.in" }, "<0.5");


// --- MASTER TIMELINE FOR THE JOURNEY (Post-Launch) ---
let masterTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: journey,
    start: "1500 top", // Start after the launch sequence
    end: "bottom bottom",
    scrub: 1.5,
  }
});

// 1. Rocket Animation
masterTimeline.to(rocket, {
  y: - (journey.offsetHeight - window.innerHeight),
  ease: "power1.inOut"
}, 0);

// 2. Background Parallax
masterTimeline.to(nebulaBg, {
  y: -window.innerHeight * 0.2,
  ease: "none"
}, 0);

masterTimeline.to("#starfield", {
  y: -window.innerHeight * 0.4,
  ease: "none"
}, 0);


// --- HERO SECTION ANIMATION ---
gsap.from(".hero-content", {
  opacity: 0,
  y: 50,
  duration: 1.5,
  ease: "power3.out",
  delay: 0.5
});


// --- CONTENT SECTION FADE-INS ---
gsap.utils.toArray('.content-section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});


// --- PROJECTS PINNING & ANIMATION ---
const projectsContainer = document.querySelector(".projects-section-container");
const pinContainer = document.querySelector(".pin-container");

gsap.timeline({
    scrollTrigger: {
        trigger: projectsContainer,
        start: "center center",
        end: `+=${window.innerHeight * 1.5}`,
        scrub: true,
        pin: true,
    }
})
.from(".project-card", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out"
});


// --- STARFIELD CANVAS SETUP ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 500; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        alpha: Math.random()
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

drawStars();
