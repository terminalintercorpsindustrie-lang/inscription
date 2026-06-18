const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

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
        navLinks.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .portfolio-item').forEach(el => {
    el.classList.add('scroll-animation');
    observer.observe(el);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

navbar.style.transition = 'transform 0.3s ease';

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    });
});

// Animation holographique
const hologramImages = document.querySelectorAll('.hologram-img');
let currentIndex = 0;

function animateHologram() {
    // Désactiver l'image actuelle
    hologramImages[currentIndex].classList.remove('active');
    
    // Passer à l'image suivante
    currentIndex = (currentIndex + 1) % hologramImages.length;
    
    // Activer la nouvelle image
    hologramImages[currentIndex].classList.add('active');
}

// Démarrer l'animation toutes les 3 secondes
setInterval(animateHologram, 3000);