// Navigation et interactions
class CarpetWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupFormHandling();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupServiceCards();
    }

    // Navigation
    setupNavigation() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Effet de scroll sur la navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Navigation active selon la section
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        });
    }

    // Menu mobile
    setupMobileMenu() {
        const hamburger = document.querySelector('.nav-hamburger');
        const menu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });

        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }

    // Animations au scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animation séquentielle pour les cartes de service
                    if (entry.target.classList.contains('service-card')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.2}s`;
                    }
                    
                    // Animation séquentielle pour les étapes du processus
                    if (entry.target.classList.contains('process-step')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.15}s`;
                    }
                    
                    // Animation séquentielle pour les éléments de galerie
                    if (entry.target.classList.contains('gallery-item')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.2}s`;
                    }
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        const elementsToAnimate = document.querySelectorAll(`
            .service-card,
            .process-step,
            .about-text,
            .about-visual,
            .gallery-item,
            .contact-info,
            .contact-form-container
        `);

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // Défilement fluide
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Hauteur de la nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Interactions des cartes de service
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Gestion du formulaire
    setupFormHandling() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
            
            // Validation en temps réel
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    // Validation des champs
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Supprimer les erreurs précédentes
        this.clearFieldError(field);

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Format d\'email invalide';
                }
                break;
            
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Format de téléphone invalide';
                }
                break;
        }

        // Champs requis
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Afficher erreur de champ
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Styles d'erreur
        if (!document.getElementById('error-styles')) {
            const style = document.createElement('style');
            style.id = 'error-styles';
            style.textContent = `
                .form-group input.error,
                .form-group textarea.error,
                .form-group select.error {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
                }
                .field-error {
                    color: #dc3545;
                    font-size: 0.85rem;
                    margin-top: 0.25rem;
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Supprimer erreur de champ
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Soumission du formulaire
    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validation complète
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormMessage('Veuillez corriger les erreurs avant de soumettre.', 'error');
            return;
        }
        
        // Afficher le loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Simulation d'envoi (remplacer par votre API)
            await this.simulateFormSubmission(data);
            
            this.showFormMessage('Votre message a été envoyé avec succès. Nous vous répondrons rapidement.', 'success');
            form.reset();
            
        } catch (error) {
            this.showFormMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Simulation d'envoi de formulaire
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            console.log('Données du formulaire:', data);
            setTimeout(resolve, 1500); // Simulation d'une requête réseau
        });
    }

    // Afficher message de formulaire
    showFormMessage(message, type) {
        // Supprimer les anciens messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageEl, form);
        
        // Styles du message
        if (!document.getElementById('message-styles')) {
            const style = document.createElement('style');
            style.id = 'message-styles';
            style.textContent = `
                .form-message {
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border-radius: 4px;
                    font-weight: 500;
                }
                .form-message.success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .form-message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new CarpetWebsite();
});

// Animations de performance
document.addEventListener('DOMContentLoaded', () => {
    // Optimisation des animations avec Intersection Observer
    if ('IntersectionObserver' in window) {
        // Les animations sont déjà gérées dans la classe principale
    } else {
        // Fallback pour les navigateurs plus anciens
        const elementsToShow = document.querySelectorAll('.service-card, .process-step');
        elementsToShow.forEach(el => el.classList.add('visible'));
    }
    
    // Préchargement des images critiques
    const criticalImages = [
        // Ajoutez ici les URLs d'images critiques si vous en ajoutez
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Gestion de la performance
window.addEventListener('load', () => {
    // Optimisations post-chargement
    requestIdleCallback(() => {
        // Analytics ou autres scripts non-critiques
        console.log('Site web de L\'Atelier du Tapis chargé');
    });
});

// Utilitaires
const Utils = {
    // Debounce pour optimiser les événements de scroll
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Vérification de support des animations
    supportsAnimations() {
        return 'animate' in document.createElement('div') || 
               'webkitTransform' in document.createElement('div').style;
    },
    
    // Détection mobile
    isMobile() {
        return window.innerWidth <= 768;
    }
};

// Export pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CarpetWebsite, Utils };
}