/* ────────────────────────────────────────────
   main.js — portfolio interactivity
──────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

    // ── Init Lucide icons ──
    lucide.createIcons();

    // ── Header shadow on scroll ──
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-scrolled', window.scrollY > 10);
    }, { passive: true });

    // ── Mobile menu toggle ──
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // ── Active nav link on scroll ──
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));

    // ── Project filter ──
    const filterBar  = document.getElementById('filter-bar');
    const filterBtns = filterBar.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('#projectsContainer .project-card');

    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            // animate in/out
            if (match) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    });

    // Apply transition to cards
    cards.forEach(card => {
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    });

    // ── Contact form (simulated) ──
    const submitBtn      = document.getElementById('submit-btn');
    const formFeedback   = document.getElementById('form-feedback');
    const nameInput      = document.getElementById('form-name');
    const emailInput     = document.getElementById('form-email');
    const messageInput   = document.getElementById('form-message');

    submitBtn.addEventListener('click', () => {
        const name    = nameInput.value.trim();
        const email   = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Por favor preenche todos os campos.');
            return;
        }

        // Simulate send
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>A enviar…</span>';

        setTimeout(() => {
            formFeedback.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
        }, 900);
    });

});
