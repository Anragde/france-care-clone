document.addEventListener('DOMContentLoaded', function() {
    // Gestion des menus déroulants
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const parent = this.parentElement;
            const dropdownContent = parent.querySelector('.dropdown-content');
            
            if (dropdownContent) {
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    // Fermer tous les autres menus déroulants
                    document.querySelectorAll('.dropdown-content').forEach(content => {
                        content.style.display = 'none';
                    });
                    
                    // Ouvrir ce menu déroulant
                    dropdownContent.style.display = 'block';
                }
            }
        });
    });
    
    // Fermer les menus déroulants en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-wrapper')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });
    
    // Gestion du bouton scroll-to-top
    const scrollButton = document.querySelector('.fab-scrollup');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.transform = 'translateY(100%)';
        }
    });
    
    scrollButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation des éléments au scroll
    const animateElements = document.querySelectorAll('.card---stepper, .block-persona');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Slider simple pour les filières
    const slides = document.querySelectorAll('.card-slider__slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    const slideInterval = 5000; // 5 secondes par slide
    
    // Fonction pour afficher un slide spécifique
    function showSlide(index) {
        // Masquer tous les slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Afficher seulement les slides visibles (3 maximum ou moins si pas assez de slides)
        const maxVisibleSlides = Math.min(3, totalSlides);
        for (let i = 0; i < maxVisibleSlides; i++) {
            const slideIndex = (index + i) % totalSlides;
            slides[slideIndex].style.display = 'block';
        }
    }
    
    // Initialiser le slider
    if (totalSlides > 3) {
        // Démarrer le slider automatique si plus de 3 slides
        setInterval(function() {
            currentSlide = (currentSlide + 1) % (totalSlides - 2);
            showSlide(currentSlide);
        }, slideInterval);
    }
    
    // Afficher les premiers slides au chargement
    showSlide(0);
    
    // Effet de défilement pour les logos partenaires
    const logContainer = document.querySelector('.log---container');
    if (logContainer) {
        logContainer.style.animation = 'scrollLogos 20s linear infinite';
    }
});

// Ajout de CSS pour l'animation des logos
const style = document.createElement('style');
style.innerHTML = `
@keyframes scrollLogos {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
`;
document.head.appendChild(style);
