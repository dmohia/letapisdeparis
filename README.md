# Le Tapis de Paris - Site Vitrine

Site vitrine élégant et minimaliste pour un atelier d'entretien et restauration de tapis de luxe. Design inspiré des galeries d'art avec animations fluides et responsive design.

## 🚀 Démarrage rapide

### Prérequis
- Navigateur web moderne
- Extension Live Server pour VSCode (recommandé)

### Installation
1. Le projet est déjà installé dans ce dossier
2. Ouvrez `index.html` dans votre navigateur ou utilisez Live Server
3. Pour Live Server : clic droit sur `index.html` > "Open with Live Server"

## 📁 Structure du projet

```
atelier-du-tapis/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles et animations
├── js/
│   └── script.js           # Interactions JavaScript
├── assets/
│   └── images/             # Dossier pour vos images
└── README.md               # Documentation
```

## ✨ Fonctionnalités

### Design & UX
- **Design minimaliste** inspiré de Jay Montclaire
- **Palette sobre** : noir, blanc, nuances de gris
- **Typographies élégantes** : Inter + Playfair Display
- **Animations fluides** au scroll et hover
- **Représentations visuelles** de tapis en CSS pur

### Sections
- **Hero** : Présentation avec visuel de tapis animés
- **Services** : Nettoyage, Restauration, Conservation
- **Processus** : Timeline en 4 étapes
- **À propos** : Histoire et valeurs
- **Contact** : Formulaire fonctionnel + informations

### Responsive Design
- **Desktop** : Expérience optimale sur grands écrans
- **Tablet** : Adaptation fluide pour tablettes
- **Mobile** : Menu hamburger et mise en page verticale

### Animations
- **Scroll animations** avec Intersection Observer
- **Tapis flottants** dans la section hero
- **Transitions fluides** sur tous les éléments
- **Effets de hover** sur les cartes de service

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/style.css` :

```css
:root {
    --color-primary: #000000;    /* Noir principal */
    --color-secondary: #333333;  /* Gris foncé */
    --color-accent: #666666;     /* Gris moyen */
    --color-light: #f8f8f8;     /* Gris clair */
    --color-white: #ffffff;      /* Blanc */
}
```

### Textes
Modifiez directement dans `index.html` :

1. **Titre principal** : Changez "L'art de préserver vos tapis de luxe"
2. **Nom de l'entreprise** : Remplacez "L'Atelier du Tapis"
3. **Informations de contact** : Adresse, téléphone, email
4. **Services** : Adaptez les descriptions selon vos prestations

### Images
Ajoutez vos images dans le dossier `assets/images/` et mettez à jour les références :

```html
<!-- Exemple pour ajouter une image -->
<img src="assets/images/votre-image.jpg" alt="Description">
```

### Services
Pour modifier les services dans `index.html` :

1. Trouvez la section `<section id="services">`
2. Modifiez les `<div class="service-card">`
3. Changez les titres, descriptions et listes de fonctionnalités

### Formulaire de contact
Le formulaire est fonctionnel avec validation JavaScript. Pour l'adapter :

1. **Champs** : Ajoutez/supprimez dans `index.html`
2. **Validation** : Modifiez les règles dans `js/script.js`
3. **Envoi** : Intégrez votre API dans la fonction `handleFormSubmission`

## 🛠 Fonctionnalités avancées

### Menu mobile
Menu hamburger responsive qui s'adapte automatiquement aux écrans < 768px.

### Validation de formulaire
- Validation en temps réel
- Messages d'erreur personnalisés
- Vérification format email/téléphone

### Animations de performance
- Utilisation d'Intersection Observer
- Animations séquentielles pour les cartes
- Fallback pour navigateurs anciens

### SEO Optimisé
- Balises meta appropriées
- Structure HTML sémantique
- Attributs alt pour l'accessibilité

## 📱 Responsive Breakpoints

- **Desktop** : > 768px
- **Tablet** : 481px - 768px
- **Mobile** : ≤ 480px

## 🎯 Intégrations possibles

### Analytics
Ajoutez votre code Google Analytics avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

### Formulaire de contact
Pour envoyer les emails, intégrez un service comme :
- **EmailJS** (côté client)
- **Formspree** (service tiers)
- **Votre API** (backend personnalisé)

### Maps
Ajoutez Google Maps dans la section contact :

```html
<div class="map-container">
    <iframe src="https://maps.google.com/..." frameborder="0"></iframe>
</div>
```

## 🎨 Représentations de tapis CSS

Le site inclut des représentations visuelles de tapis créées uniquement en CSS :

- **Tapis persan** : Motifs radiaux dorés
- **Tapis oriental** : Rayures diagonales grises
- **Tapis moderne** : Design minimaliste blanc

### Personnaliser les tapis CSS

Modifiez les classes `.carpet` dans `css/style.css` :

```css
.carpet.persian {
    background: linear-gradient(45deg, #votre-couleur1, #votre-couleur2);
    background-image: 
        radial-gradient(circle at 25% 25%, #motif1 10px, transparent 10px);
}
```

## 🔧 Optimisations

### Performance
- Images optimisées (WebP recommandé)
- CSS et JS minifiés en production
- Lazy loading pour les images

### Accessibilité
- Contraste conforme WCAG
- Navigation au clavier
- Labels appropriés pour les formulaires

### SEO
- Balises meta complètes
- Données structurées possibles
- URLs propres et descriptives

## 📞 Support

Pour toute question ou personnalisation avancée, consultez la documentation CSS/JavaScript ou modifiez directement les fichiers selon vos besoins.

## 📄 Licence

Ce template est libre d'utilisation pour vos projets commerciaux et personnels.

---

**Développé avec ❤️ pour Le Tapis de Paris**Updated: Jeu 18 sep 2025 21:03:08 CEST
