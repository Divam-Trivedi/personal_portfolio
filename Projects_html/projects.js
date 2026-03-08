// ===== TAB SWITCHING =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Count projects per tab and update badges
const counts = {
    hardware:   document.querySelectorAll('#tab-hardware .proj-card:not(.proj-card-placeholder)').length,
    simulation: document.querySelectorAll('#tab-simulation .proj-card:not(.proj-card-placeholder)').length,
    software:   document.querySelectorAll('#tab-software .proj-card:not(.proj-card-placeholder)').length,
};

Object.entries(counts).forEach(([key, val]) => {
    const el = document.getElementById('count-' + key);
    if (el) el.textContent = val;
});

// Handle tab click
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById('tab-' + target).classList.add('active');

        // Preserve tab in URL hash for direct linking
        history.replaceState(null, '', '#' + target);
    });
});

// On page load, check URL hash and activate correct tab
(function activateFromHash() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['hardware', 'simulation', 'software'];
    if (validTabs.includes(hash)) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        document.querySelector('[data-tab="' + hash + '"]').classList.add('active');
        document.getElementById('tab-' + hash).classList.add('active');
    }
})();

// ===== ANIMATE CARDS ON SCROLL =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 60);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.proj-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});
