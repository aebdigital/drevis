// GSAP Animations - Simplified Section-Level
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Wait for DOM to load and check if GSAP is available
document.addEventListener('DOMContentLoaded', function() {
    
    // Disable CSS fallback animation when GSAP is running
    if (typeof gsap !== 'undefined') {
        const style = document.createElement('style');
        style.textContent = '.fade-in-up { animation: none !important; }';
        document.head.appendChild(style);
    }
    
    // 1. HERO SECTIONS - Make immediately visible
    gsap.set('.hero-title, .about-hero-title, .gallery-hero-title, .services-hero-title', 
        { opacity: 1, y: 0 }
    );
    
    gsap.set('.hero-subtitle, .about-hero-subtitle, .gallery-hero-subtitle, .services-hero-subtitle', 
        { opacity: 1, y: 0 }
    );
    
    gsap.set('.hero-actions, .hero-feature', 
        { opacity: 1, y: 0, scale: 1 }
    );
    
    // 2. FADE-IN UP ANIMATIONS
    // Only animate sections with the fade-in-up class
    gsap.utils.toArray('.fade-in-up').forEach((element) => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // 3. COUNTER ANIMATIONS (keep these for numbers)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // 4. PARALLAX DISABLED - was causing transforms on hero backgrounds
    
    // 5. RESET ANY TRANSFORMS ON HERO IMAGES
    gsap.set('.hero-bg-image', { clearProps: "all" });

    
    console.log('Simplified GSAP animations initialized');
});