// home.js - VERSIÓN COMPLETA Y CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de datos...');
    loadFeaturedCourses();
    loadResources();
    loadContactData();
    initContactForm();
});

// ========== CURSOS DESTACADOS ==========
async function loadFeaturedCourses() {
    try {
        console.log('📚 Cargando cursos destacados...');
        const data = await fetchAPI('getFeaturedCourses');
        
        console.log('📚 Cursos recibidos:', data);
        
        if (data && data.courses && data.courses.length > 0) {
            renderFeaturedCourses(data.courses);
        } else {
            console.log('⚠️ No hay cursos, mostrando por defecto');
            showDefaultCourses();
        }
    } catch (error) {
        console.error('❌ Error cargando cursos:', error);
        showDefaultCourses();
    }
}

function renderFeaturedCourses(courses) {
    const container = document.getElementById('featured-courses');
    if (!container) return;
    
    container.innerHTML = courses.map(course => `
        <article class="course-card">
            <img src="${course.imagen || '/assets/images/curso-default.jpg'}" 
                 alt="${course.titulo}" 
                 class="course-image"
                 onerror="this.src='/assets/images/curso-default.jpg'">
            <div class="course-content">
                <h3>${course.titulo}</h3>
                <p>${course.descripcion}</p>
                <ul class="course-features">
                    ${course.caracteristicas && course.caracteristicas.length > 0 
                        ? course.caracteristicas.map(feat => `<li>${feat}</li>`).join('') 
                        : '<li>Contenido de alta calidad</li><li>Acceso 24/7</li><li>Soporte personalizado</li>'
                    }
                </ul>
                <a href="${course.boton_enlace || '/contacto'}" 
                   class="course-button ${course.tipo === 'gratis' ? 'free' : ''}">
                    ${course.boton_texto || 'Más Información'}
                </a>
            </div>
        </article>
    `).join('');
}

function showDefaultCourses() {
    const container = document.getElementById('featured-courses');
    if (!container) return;
    
    container.innerHTML = `
        <article class="course-card">
            <img src="https://raw.githubusercontent.com/jaselmono-bit/documentos/main/imagenes/formacion-en-biodescodificacion-w%20(1).jpg" 
                 alt="Formación completa en Biodescodificación" 
                 class="course-image">
            <div class="course-content">
                <h3>Formación en Biodescodificación</h3>
                <p>Conviértete en un profesional de la biodescodificación con nuestro curso completo.</p>
                <ul class="course-features">
                    <li>Modalidad 100% online</li>
                    <li>Estudia a tu propio ritmo</li>
                    <li>Lecciones en video HD</li>
                    <li>Práctica profesional</li>
                    <li>Certificación oficial</li>
                </ul>
                <a href="/contacto" class="course-button">Más Información</a>
            </div>
        </article>
        
        <article class="course-card">
            <img src="https://raw.githubusercontent.com/jaselmono-bit/documentos/main/imagenes/sobrepeso-y-emociones-w.jpg" 
                 alt="Curso de Sobrepeso y Emociones" 
                 class="course-image">
            <div class="course-content">
                <h3>Sobrepeso y Emociones</h3>
                <p>Descubre la relación entre las emociones y el sobrepeso.</p>
                <ul class="course-features">
                    <li>Curso especializado temático</li>
                    <li>Acceso inmediato 24/7</li>
                    <li>Videos explicativos</li>
                    <li>Casos prácticos reales</li>
                    <li>Material descargable</li>
                </ul>
                <a href="/contacto" class="course-button">Consultar</a>
            </div>
        </article>
        
        <article class="course-card">
            <img src="https://raw.githubusercontent.com/jaselmono-bit/documentos/main/imagenes/introduccion-a-la-biodescodificacion-w.jpg" 
                 alt="Introducción gratuita a la Biodescodificación" 
                 class="course-image">
            <div class="course-content">
                <h3>Introducción a la Biodescodificación</h3>
                <p><strong>¡CURSO GRATUITO!</strong> Comienza tu viaje en la biodescodificación sin costo alguno.</p>
                <ul class="course-features">
                    <li>100% Gratuito</li>
                    <li>Acceso inmediato</li>
                    <li>Conceptos fundamentales</li>
                    <li>Videos introductorios</li>
                    <li>Sin compromiso</li>
                </ul>
                <a href="https://oupen.academy" target="_blank" class="course-button free">Acceder Gratis</a>
            </div>
        </article>
    `;
}

// ========== RECURSOS ==========
async function loadResources() {
    try {
        console.log('📖 Cargando recursos...');
        const data = await fetchAPI('getResources');
        
        console.log('📖 Recursos recibidos:', data);
        
        if (data && data.resources && data.resources.length > 0) {
            renderResources(data.resources);
        } else {
            console.log('⚠️ No hay recursos, mostrando por defecto');
            showDefaultResources();
        }
    } catch (error) {
        console.error('❌ Error cargando recursos:', error);
        showDefaultResources();
    }
}

function renderResources(resources) {
    const container = document.getElementById('resources-grid');
    if (!container) return;
    
    container.innerHTML = resources.map(resource => `
        <article class="resource-card">
            <div class="resource-image">
                ${getResourceIcon(resource.tipo)}
            </div>
            <div class="resource-content">
                <span class="resource-tag">${resource.tipo}</span>
                <h3>${resource.titulo}</h3>
                <p>${resource.descripcion}</p>
                <a href="${resource.boton_enlace || '#'}" 
                   class="cta-button" 
                   ${resource.boton_enlace && resource.boton_enlace.startsWith('http') ? 'target="_blank"' : ''}>
                    ${resource.boton_texto || 'Ver más'}
                </a>
            </div>
        </article>
    `).join('');
}

function getResourceIcon(tipo) {
    const icons = {
        'Artículo': '📝',
        'Video': '🎥',
        'Guía': '📚',
        'Podcast': '🎙️',
        'Webinar': '💻'
    };
    return icons[tipo] || '📄';
}

function showDefaultResources() {
    const container = document.getElementById('resources-grid');
    if (!container) return;
    
    container.innerHTML = `
        <article class="resource-card">
            <div class="resource-image">📝</div>
            <div class="resource-content">
                <span class="resource-tag">Artículo</span>
                <h3>Blog de Biodescodificación</h3>
                <p>Artículos semanales sobre temas de biodescodificación, casos reales y técnicas de sanación.</p>
                <a href="/contacto" class="cta-button">Leer Artículos</a>
            </div>
        </article>
        
        <article class="resource-card">
            <div class="resource-image">🎥</div>
            <div class="resource-content">
                <span class="resource-tag">Video</span>
                <h3>Canal de YouTube</h3>
                <p>Videos gratuitos con lecciones, ejercicios y testimonios de transformación personal.</p>
                <a href="/contacto" class="cta-button">Ver Videos</a>
            </div>
        </article>
        
        <article class="resource-card">
            <div class="resource-image">📚</div>
            <div class="resource-content">
                <span class="resource-tag">Guía</span>
                <h3>Guías Descargables</h3>
                <p>Material gratuito en PDF para profundizar en diferentes aspectos de la biodescodificación.</p>
                <a href="/contacto" class="cta-button">Descargar</a>
            </div>
        </article>
    `;
}

// ========== CONTACTO ==========
async function loadContactData() {
    try {
        console.log('📞 Cargando datos de contacto...');
        const data = await fetchAPI('getContact');
        
        console.log('📞 Contacto recibido:', data);
        
        if (data && data.contact && data.contact.length > 0) {
            renderContactData(data.contact);
        } else {
            console.log('⚠️ No hay datos de contacto, mostrando por defecto');
            showDefaultContact();
        }
    } catch (error) {
        console.error('❌ Error cargando contacto:', error);
        showDefaultContact();
    }
}

function renderContactData(contact) {
    const container = document.getElementById('contact-data');
    if (!container) return;
    
    container.innerHTML = contact.map(item => {
        const icon = getContactIcon(item.clave);
        return `
            <div class="contact-item">
                <div class="icon">${icon}</div>
                <div>
                    <h3>${item.clave}</h3>
                    <p>${item.valor}</p>
                    ${item.descripcion ? `<p style="font-size: 0.9rem; color: #666;">${item.descripcion}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function getContactIcon(clave) {
    const claveLC = clave.toLowerCase();
    if (claveLC.includes('email') || claveLC.includes('correo')) return '📧';
    if (claveLC.includes('whatsapp') || claveLC.includes('teléfono') || claveLC.includes('telefono')) return '📱';
    if (claveLC.includes('ubicación') || claveLC.includes('ubicacion') || claveLC.includes('dirección')) return '📍';
    if (claveLC.includes('horario')) return '🕐';
    return '📞';
}

function showDefaultContact() {
    const container = document.getElementById('contact-data');
    if (!container) return;
    
    container.innerHTML = `
        <div class="contact-item">
            <div class="icon">📧</div>
            <div>
                <h3>Email</h3>
                <p>info@seronline.org</p>
                <p style="font-size: 0.9rem; color: #666;">Respuesta en menos de 24 horas</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="icon">📱</div>
            <div>
                <h3>WhatsApp</h3>
                <p>+54 9 3541597936</p>
                <p style="font-size: 0.9rem; color: #666;">Lunes a Viernes: 9:00 - 18:00 hs</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="icon">📍</div>
            <div>
                <h3>Ubicación</h3>
                <p>Alta Gracia, Córdoba</p>
                <p style="font-size: 0.9rem; color: #666;">Argentina</p>
            </div>
        </div>
    `;
}

// ========== FORMULARIO DE CONTACTO ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const messageDiv = document.getElementById('form-message');
        
        setButtonLoading(submitButton, true);
        if (messageDiv) messageDiv.style.display = 'none';
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            console.log('📤 Enviando formulario...', data);
            
            const result = await fetchAPI('submitContact', data);
            
            console.log('✅ Respuesta del servidor:', result);
            
            if (result.success) {
                showMessage('form-message', result.message || '¡Mensaje enviado correctamente!', 'success');
                this.reset();
            } else {
                showMessage('form-message', result.error || 'Error al enviar el mensaje', 'error');
            }
            
        } catch (error) {
            console.error('❌ Error enviando formulario:', error);
            showMessage('form-message', 'Error de conexión. Por favor, intenta nuevamente.', 'error');
        } finally {
            setButtonLoading(submitButton, false);
        }
    });
}