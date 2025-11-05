// components.js - VERSIÓN CORREGIDA
function loadHeader() {
    return `
        <header>
            <nav>
                <div class="logo-wrapper">
                    <div class="logo-img-container">
                        <img src="/assets/images/logo-seroline.png" alt="Descodificación Transpersonal Logo">
                    </div>
                    <span class="logo-text">Descodificación Transpersonal</span>
                </div>
                <button class="menu-toggle" onclick="toggleMenu()">☰</button>
                <ul id="navMenu">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/cursos">Cursos</a></li>
                    <li><a href="/nosotros">Nosotros</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                </ul>
            </nav>
        </header>
    `;
}

function loadFooter() {
    return `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="/assets/images/iso-seroline.png" alt="Logo Descodificación Transpersonal">
                    </div>
                    <p>Transformando vidas a través de la sanación emocional profunda.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/cursos">Cursos</a></li>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Cursos Destacados</h3>
                    <ul>
                        <li><a href="/cursos">Formación Completa</a></li>
                        <li><a href="/cursos">Sobrepeso y Emociones</a></li>
                        <li><a href="/cursos">Curso Gratuito</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contacto</h3>
                    <ul>
                        <li>📧 info@seronline.org</li>
                        <li>📱 +54 9 3541597936</li>
                        <li>📍 Alta Gracia, Córdoba</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Descodificación Transpersonal - Todos los derechos reservados</p>
            </div>
        </footer>
    `;
}

// Cargar componentes al DOM
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    
    if (header) header.innerHTML = loadHeader();
    if (footer) footer.innerHTML = loadFooter();
    
    initCommonFeatures();
});

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function initCommonFeatures() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cerrar menú móvil al hacer clic
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('navMenu');
            menu.classList.remove('active');
        });
    });
}

function showMessage(elementId, text, type) {
    const messageDiv = document.getElementById(elementId);
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.className = 'form-message ' + type;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.dataset.originalText = button.textContent;
        button.textContent = 'Enviando...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

// ✅ FUNCIÓN CORREGIDA PARA LLAMAR A LA API
async function fetchAPI(action, data = null) {
    try {
        // Construir URL - el worker maneja /api/
        let url = `/api/?action=${action}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        if (data) {
            options.method = 'POST';
            const formData = new URLSearchParams();
            for (const key in data) {
                if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            }
            options.body = formData;
        }

        console.log('🔍 Llamando a API:', url, options.method);
        
        const response = await fetch(url, options);
        
        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Datos recibidos:', result);
        
        // La respuesta viene en result.data
        if (result.data && result.data.error) {
            throw new Error(result.data.error);
        }
        
        return result.data || result;
        
    } catch (error) {
        console.error('❌ Error en fetchAPI:', error);
        throw error;
    }
}