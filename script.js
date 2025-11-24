// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all timeline items, project cards, and education cards
document.querySelectorAll('.timeline-item, .project-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Handle missing images gracefully
document.querySelectorAll('.skill-icon').forEach(img => {
    img.addEventListener('error', function() {
        // If image fails to load, show the first letter of the alt text as fallback
        const altText = this.alt || '?';
        const parent = this.parentElement;
        const fallbackText = document.createElement('span');
        fallbackText.textContent = altText.charAt(0).toUpperCase();
        fallbackText.style.fontSize = '2.5rem';
        fallbackText.style.color = 'var(--accent)';
        parent.replaceChild(fallbackText, this);
    });
});

// Typing animation for name
document.addEventListener("DOMContentLoaded", () => {
    const text = "Divam Trivedi";
    const target = document.getElementById("typed-name");
    let index = 0;

    function typeLetter() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(typeLetter, 120); // typing speed
        }
    }

    typeLetter();
});
