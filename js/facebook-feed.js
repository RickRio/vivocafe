// ============================================================
// FACEBOOK FEED INTEGRATION
// ============================================================
// NOTA: Para usar esto en producción necesitas:
// 1. Crear una App en Facebook Developers
// 2. Obtener un Access Token con permisos de páginas
// 3. Configurar las variables de entorno
// ============================================================

// Configuración de Facebook (cambia estos valores)
const FB_CONFIG = {
    pageId: 'TU_PAGE_ID',        // ID de la página de Facebook
    accessToken: 'TU_ACCESS_TOKEN', // Token de acceso (NUNCA en frontend en producción)
    limit: 6,                    // Número de publicaciones a mostrar
    apiUrl: 'https://graph.facebook.com/v19.0/'
};

// Datos de ejemplo cuando no hay conexión real
const MOCK_FEED = [
    {
        id: '1',
        message: '🎵 ¡Nuevo episodio de nuestro podcast "La Hora del Cafecito"! Hablamos sobre el futuro de la música urbana con invitados especiales. ¡No te lo pierdas!',
        created_time: new Date(Date.now() - 3600000).toISOString(),
        full_picture: 'https://picsum.photos/600/400?random=20',
        likes: { summary: { total_count: 245 } },
        comments: { summary: { total_count: 43 } },
        shares: { count: 78 }
    },
    {
        id: '2',
        message: '🔥 ¡ÚLTIMA HORA! Se confirma el concierto masivo en la ciudad para el próximo mes. Prepárate para la experiencia más grande del año.',
        created_time: new Date(Date.now() - 7200000).toISOString(),
        full_picture: 'https://picsum.photos/600/400?random=21',
        likes: { summary: { total_count: 512 } },
        comments: { summary: { total_count: 89 } },
        shares: { count: 156 }
    },
    {
        id: '3',
        message: '💡 ¿Sabías que la inteligencia artificial ya está creando música? Hablamos con expertos sobre el impacto de la IA en la industria creativa.',
        created_time: new Date(Date.now() - 10800000).toISOString(),
        full_picture: 'https://picsum.photos/600/400?random=22',
        likes: { summary: { total_count: 189 } },
        comments: { summary: { total_count: 34 } },
        shares: { count: 67 }
    }
];

/**
 * Obtiene las publicaciones de Facebook
 * En producción, esto debe hacerse desde un servidor backend
 */
async function fetchFacebookFeed() {
    try {
        // En producción, harías una llamada a tu backend
        // const response = await fetch(`/api/facebook-feed`);
        // const data = await response.json();
        // return data;
        
        // Simulamos una respuesta exitosa con datos de ejemplo
        console.log('📡 Conectando con Facebook...');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // En producción, aquí usarías la API real
        // const url = `${FB_CONFIG.apiUrl}${FB_CONFIG.pageId}/posts?access_token=${FB_CONFIG.accessToken}&fields=id,message,created_time,full_picture,likes.summary(true),comments.summary(true),shares&limit=${FB_CONFIG.limit}`;
        // const response = await fetch(url);
        // const data = await response.json();
        // return data.data || [];
        
        return MOCK_FEED;
    } catch (error) {
        console.error('❌ Error al obtener el feed de Facebook:', error);
        // Si hay error, devolvemos datos de ejemplo
        return MOCK_FEED;
    }
}

/**
 * Renderiza las publicaciones en el grid
 */
function renderFacebookFeed(posts) {
    const feedContainer = document.getElementById('facebookFeed');
    
    if (!feedContainer) return;
    
    if (!posts || posts.length === 0) {
        feedContainer.innerHTML = `
            <div class="fb-error">
                <i class="fas fa-facebook-frown"></i>
                <p>No pudimos cargar las publicaciones de Facebook</p>
                <button onclick="connectFacebook()" class="btn-facebook-connect">
                    <i class="fab fa-facebook"></i> Intentar de nuevo
                </button>
            </div>
        `;
        return;
    }
    
    feedContainer.innerHTML = posts.map(post => {
        const message = post.message || 'Sin descripción';
        const timeAgo = getTimeAgo(post.created_time);
        const imageHtml = post.full_picture 
            ? `<img src="${post.full_picture}" alt="Publicación de Facebook" class="fb-post-image" onerror="this.style.display='none'">` 
            : '';
        const likes = post.likes?.summary?.total_count || 0;
        const comments = post.comments?.summary?.total_count || 0;
        const shares = post.shares?.count || 0;
        
        return `
            <div class="fb-post-card" data-id="${post.id}">
                <div class="fb-post-header">
                    <div class="fb-post-avatar" style="background: linear-gradient(135deg, #1877f2, #0a5bbf);">
                        M
                    </div>
                    <div>
                        <div class="fb-post-user">Midia Digital</div>
                        <div class="fb-post-time"><i class="far fa-clock"></i> ${timeAgo}</div>
                    </div>
                </div>
                <div class="fb-post-content">${message}</div>
                ${imageHtml}
                <div class="fb-post-actions">
                    <span><i class="fas fa-heart" style="color: #ff2e63;"></i> ${likes}</span>
                    <span><i class="fas fa-comment"></i> ${comments}</span>
                    <span><i class="fas fa-share-alt"></i> ${shares}</span>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Calcula el tiempo transcurrido desde la fecha
 */
function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 30) return `Hace ${diffDays} d`;
    return date.toLocaleDateString('es-ES');
}

/**
 * Botón para conectar con Facebook
 */
function connectFacebook() {
    const btn = document.getElementById('fbConnectBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
    btn.disabled = true;
    
    // Simulamos conexión
    setTimeout(() => {
        btn.innerHTML = '<i class="fab fa-facebook"></i> Conectado ✅';
        btn.style.background = '#00a86b';
        btn.disabled = false;
        // Recargar feed
        initFacebookFeed();
    }, 1500);
}

/**
 * Inicializa el feed
 */
async function initFacebookFeed() {
    const feedContainer = document.getElementById('facebookFeed');
    if (feedContainer) {
        feedContainer.innerHTML = `
            <div class="feed-loading">
                <div class="loader"></div>
                <p>Cargando noticias de Facebook...</p>
            </div>
        `;
    }
    
    const posts = await fetchFacebookFeed();
    renderFacebookFeed(posts);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initFacebookFeed);

// Conectar botón de Facebook
document.addEventListener('DOMContentLoaded', () => {
    const fbBtn = document.getElementById('fbConnectBtn');
    if (fbBtn) {
        fbBtn.addEventListener('click', connectFacebook);
    }
});