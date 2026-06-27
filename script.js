document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typewriter Animation Engine ---
    const words = [
        "Frontend Developer", 
        "DSA Enthusiast", 
        "Problem Solver", 
        "Writer"
        
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeDelay = 100;
    const eraseDelay = 50;
    const turnDelay = 2000;
    const targetElement = document.getElementById('typewriter');

    function performTypingCycle() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        targetElement.textContent = currentWord.substring(0, charIndex);

        let dynamicDelay = isDeleting ? eraseDelay : typeDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            dynamicDelay = turnDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            dynamicDelay = 500;
        }

        setTimeout(performTypingCycle, dynamicDelay);
    }

    if (targetElement) setTimeout(performTypingCycle, 500);

    // --- 2. Mobile Responsive Menu State Manager ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenuState() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    mobileToggle.addEventListener('click', toggleMenuState);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMenuState();
    }));

    // --- 3. High Performance Intersection Observer (Scroll Reveal) ---
    const revealTargets = document.querySelectorAll('.scroll-reveal');
    
    const configurationOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once animation trigger completes to save main thread cycles
                observer.unobserve(entry.target);
            }
        });
    }, configurationOptions);

    revealTargets.forEach(target => intersectionObserver.observe(target));

    // --- 4. Dynamic Sticky Navigation Blur Transformation ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = "0 10px 30px rgba(2, 12, 27, 0.7)";
            navbar.style.height = "70px";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.height = "80px";
        }
    });
})