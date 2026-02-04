// Message console pour vérifier que le fichier est bien lié
console.log("FleuryConnect : Système prêt.");

document.addEventListener('DOMContentLoaded', function() {
    
    /* === 1. GESTION DU MENU LATÉRAL (SIDENAV) === */
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const sidenav = document.getElementById('mySidenav');

    if (openBtn && sidenav) {
        // Ouvrir le menu
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche la fermeture immédiate via l'event window
            sidenav.style.left = "0";
        });

        // Fermer le menu avec la croix
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                sidenav.style.left = "-250px";
            });
        }

        // Fermer si on clique n'importe où en dehors du menu
        window.addEventListener('click', (e) => {
            if (sidenav.style.left === "0px" && !sidenav.contains(e.target) && e.target !== openBtn) {
                sidenav.style.left = "-250px";
            }
        });
    }

    /* === 2. GESTION DE LA NAVIGATION ACTIVE === */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidenav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    /* === 3. ANIMATIONS D'APPARITION (INTERSECTION OBSERVER) === */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearanceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Petit délai progressif pour les cartes
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // On applique l'observateur aux sections et aux cartes
    const animatedElements = document.querySelectorAll('section, .card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        appearanceObserver.observe(el);
    });

    /* === 4. EFFET PARALLAXE LÉGER (HERO) === */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    /* === 5. BOUTON RETOUR EN HAUT === */
    const scrollIndicator = document.createElement('div');
    scrollIndicator.innerHTML = '↑';
    scrollIndicator.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px; background: #2ecc71;
        border-radius: 50%; display: flex; align-items: center;
        justify-content: center; cursor: pointer; opacity: 0;
        transition: all 0.3s; z-index: 999; color: white;
        font-size: 24px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = (window.pageYOffset > 300) ? '1' : '0';
    });

    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Utilitaire de debug
function debugFleuryConnect() {
    console.log('=== FleuryConnect Debug ===');
    console.log('Menu présent:', !!document.getElementById('mySidenav'));
    console.log('Bouton Menu présent:', !!document.getElementById('openMenu'));
    console.log('=======================');
}
/* === EASTER EGG CONTACT === */
const contactForm = document.getElementById('contactForm');
#easter-egg-corner {
    position: fixed;
    top: 0;
    right: 0;
    width: 50px;   /* Largeur de la zone cliquable */
    height: 50px;  /* Hauteur de la zone cliquable */
    z-index: 9999; /* Pour être sûr qu'il soit au-dessus de tout */
    cursor: default; /* Curseur normal pour ne pas griller le secret */
    background: transparent;
}