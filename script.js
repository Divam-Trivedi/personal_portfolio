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
    const target = document.getElementById("typed-name");
    if (target) {
        const text = "Divam Trivedi";
        let index = 0;
        function typeLetter() {
            if (index < text.length) {
                target.textContent += text.charAt(index);
                index++;
                setTimeout(typeLetter, 120);
            }
        }
        typeLetter();
    }

    // Load poems from JSON
    fetch('poems.json')
        .then(res => res.json())
        .then(poems => {
            const grid = document.getElementById('poem-grid');
            if (!grid) return;
            poems.forEach(poem => {
                const card = document.createElement('div');
                card.className = 'poem-card';
                card.innerHTML = poem.title
                    ? `<h3>${poem.title}</h3><p>${poem.text.replace(/\n/g, '<br>')}</p>`
                    : `<p>${poem.text.replace(/\n/g, '<br>')}</p>`;
                grid.appendChild(card);
            });
        })
        .catch(err => console.error('Failed to load poems:', err));
});

// Get elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking a nav link
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Toggle dropdown menu on mobile
const dropdowns = document.querySelectorAll('#nav-links .dropdown > a');

dropdowns.forEach(drop => {
    drop.addEventListener('click', function(e) {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 768) { // adjust for mobile
            e.preventDefault(); // prevent # jump
            const submenu = this.nextElementSibling; // the <ul>
            if(submenu.style.display === 'flex'){
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'flex';
                submenu.style.flexDirection = 'column';
            }
        }
    });
});