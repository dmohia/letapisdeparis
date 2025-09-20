// Navigation et interactions
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links only (not form buttons)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        // Skip if it's inside a form or is a form button
        if (link.closest('form') || link.type === 'submit') return;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation avant soumission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                showPopup('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Validation email renforcée
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showPopup('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Validation téléphone international (si rempli)
            if (phone) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{6,20}$/;
                const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

                if (!phoneRegex.test(phone) || cleanPhone.length < 6 || cleanPhone.length > 20) {
                    e.preventDefault();
                    showPopup('Veuillez entrer un numéro de téléphone valide (format international accepté).', 'error');
                    return;
                }
            }

            // Si toutes les validations passent, laisser Formspree traiter le formulaire
            showPopup('Envoi en cours...', 'success');
        });
    }

    // Fonction pour afficher les popups
    function showPopup(message, type) {
        // Supprimer popup existant
        const existingPopup = document.querySelector('.custom-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Créer le popup
        const popup = document.createElement('div');
        popup.className = `custom-popup ${type}`;
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <p>${message}</p>
                <button class="popup-close" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Auto-remove après 5 secondes
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 5000);
    }

    // Check for success parameter and show thank you message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        showPopup('Merci ! Votre demande de devis a été envoyée avec succès. Nous vous contacterons rapidement.', 'success');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname + '#contact');
    }

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
});