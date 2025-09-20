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

    // Form handling avec AJAX pour éviter la redirection
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showPopup('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showPopup('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Bouton loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Solution mailto direct
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const serviceLabels = {
                'nettoyage': 'Nettoyage professionnel',
                'restauration': 'Restauration',
                'conservation': 'Conservation'
            };
            const selectedService = serviceLabels[service] || 'Demande générale';
            const subject = `[${selectedService}] ${name}`;
            const body = `Nom: ${name}
Email: ${email}
Téléphone: ${phone || 'Non renseigné'}
Service demandé: ${selectedService}

Message:
${message}`;

            const mailtoLink = `mailto:contact@letapisdeparis.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            showPopup('Votre client email va s\'ouvrir avec le message pré-rempli. Envoyez-le pour finaliser votre demande.', 'success');
            contactForm.reset();

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
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