// ============================================================
// SCRIPT PRINCIPAL - Midia Digital
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== MENU HAMBURGUESA =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ===== FILTROS DE CATEGORÍAS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover active de todos
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.textContent.trim();
                // Aquí iría la lógica para filtrar noticias
                console.log(`Filtrando por: ${category}`);
            });
        });
    }

    // ===== CARGAR MÁS NOTICIAS =====
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            loadMoreBtn.disabled = true;
            
            // Simular carga de más noticias
            setTimeout(() => {
                loadMoreBtn.innerHTML = 'Cargar más <i class="fas fa-chevron-down"></i>';
                loadMoreBtn.disabled = false;
                // Aquí se agregarían más noticias al grid
                console.log('Cargando más noticias...');
            }, 1500);
        });
    }

    // ===== TICKER DE BREAKING NEWS =====
    const ticker = document.querySelector('.breaking-ticker');
    if (ticker) {
        // Duplicar items para efecto infinito
        const items = ticker.innerHTML;
        ticker.innerHTML = items + items;
    }

    // ===== REPRODUCTOR DE PODCAST (simulado) =====
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.className = 'fas fa-pause';
                btn.style.background = 'var(--gradient-neon)';
                // Simular reproducción
                console.log('🎵 Reproduciendo podcast...');
            } else {
                icon.className = 'fas fa-play';
                btn.style.background = 'rgba(0,0,0,0.7)';
                console.log('⏸️ Pausando podcast...');
            }
        });
    });

    // ===== SCROLL ANIMATIONS (con Intersection Observer) =====
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.news-card, .podcast-card, .fb-post-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = `all 0.5s ease ${index * 0.1}s`;
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }

    // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== CONSOLA CON ESTILO (branding) =====
    console.log('%c🎙️ MIDIA DIGITAL', 'font-size: 2rem; font-weight: bold; color: #00D4FF;');
    console.log('%cEl medio de la generación que conecta', 'font-size: 1rem; color: #FFD93D;');
    console.log('%c📡 Conectado a Facebook ✓', 'font-size: 0.9rem; color: #39FF14;');

    // ===== NOTIFICACIÓN DE BIENVENIDA =====
    console.log('👋 ¡Bienvenido a Midia! Explora las últimas noticias, podcasts y tendencias.');
});

// ===== FUNCIÓN PARA COMPARTIR EN FACEBOOK =====
function shareOnFacebook(url, title) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ===== FUNCIÓN PARA ABRIR ENLACE DE FACEBOOK =====
function openFacebookPage() {
    window.open('https://www.facebook.com/tu-pagina', '_blank');
}

// ===== EXPONER FUNCIONES GLOBALMENTE =====
window.shareOnFacebook = shareOnFacebook;
window.openFacebookPage = openFacebookPage;