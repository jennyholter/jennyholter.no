// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Close sidebar when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
});

// Smooth scroll navigation with active link highlighting
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(updateActiveNav, 100);
            }
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 300) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Keyboard support: close sidebar on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', false);
            menuToggle.focus();
        }
    }
});

// Initialize
console.log('Portfolio loaded');
