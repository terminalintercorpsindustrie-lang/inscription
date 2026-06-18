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
if (hologramImages.length > 0) {
    setInterval(animateHologram, 3000);
}

// Formulaire d'inscription
const inscriptionForm = document.getElementById('inscriptionForm');
const formMessage = document.getElementById('formMessage');

if (inscriptionForm) {
    inscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(inscriptionForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simuler l'envoi
        formMessage.className = 'form-message';
        formMessage.textContent = 'Envoi en cours...';
        
        setTimeout(() => {
            // Afficher le succès
            formMessage.className = 'form-message success';
            formMessage.textContent = `Merci ${data.nom} ! Votre inscription a été enregistrée avec succès. Nous vous contacterons bientôt.`;
            
            // Réinitialiser le formulaire
            inscriptionForm.reset();
            
            // Cacher le message après 5 secondes
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }, 1000);
    });
}

// Lightbox / Slider
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let portfolioImages = [];
let currentLightboxIndex = 0;

if (lightbox) {
    // Récupérer toutes les images du portfolio sur la page
    document.querySelectorAll('.portfolio-item img').forEach((img, index) => {
        portfolioImages.push(img.src);
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            currentLightboxIndex = index;
            openLightbox(img.src);
        });
    });
    
    // Ouvrir le lightbox
    function openLightbox(src) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';
    }
    
    // Fermer le lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + portfolioImages.length) % portfolioImages.length;
        lightboxImg.src = portfolioImages[currentLightboxIndex];
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % portfolioImages.length;
        lightboxImg.src = portfolioImages[currentLightboxIndex];
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') {
                currentLightboxIndex = (currentLightboxIndex - 1 + portfolioImages.length) % portfolioImages.length;
                lightboxImg.src = portfolioImages[currentLightboxIndex];
            }
            if (e.key === 'ArrowRight') {
                currentLightboxIndex = (currentLightboxIndex + 1) % portfolioImages.length;
                lightboxImg.src = portfolioImages[currentLightboxIndex];
            }
        }
    });
}