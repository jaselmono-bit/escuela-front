// contact.js
document.addEventListener('DOMContentLoaded', function() {
    loadContactData();
    setupContactForm();
});

// Cargar datos de contacto
async function loadContactData() {
    try {
        const response = await fetch('/api/?action=getContact');
        const data = await response.json();
        
        if (data.data && data.data.contact) {
            renderContactData(data.data.contact);
        }
    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}

// Renderizar datos de contacto
function renderContactData(contact) {
    const container = document.getElementById('contact-data');
    
    if (!contact || contact.length === 0) {
        container.innerHTML = `
            <div class="contact-item">
                <div class="icon">📧</div>
                <div>
                    <h3>Email</h3>
                    <p>info@seronline.org</p>
                    <p>Respuesta en menos de 24 horas</p>
                </div>
            </div>
            <div class="contact-item">
                <div class="icon">📱</div>
                <div>
                    <h3>WhatsApp</h3>
                    <p>+54 9 3541597936</p>
                    <p>Lunes a Viernes: 9:00 - 18:00 hs</p>
                </div>
            </div>
            <div class="contact-item">
                <div class="icon">📍</div>
                <div>
                    <h3>Ubicación</h3>
                    <p>Alta Gracia</p>
                    <p>Córdoba, Argentina</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = contact.map(item => {
        let icon = '📞';
        if (item.clave.includes('email') || item.clave.includes('Email')) icon = '📧';
        if (item.clave.includes('whatsapp') || item.clave.includes('WhatsApp')) icon = '📱';
        if (item.clave.includes('ubicación') || item.clave.includes('Ubicación')) icon = '📍';
        if (item.clave.includes('horario') || item.clave.includes('Horario')) icon = '🕐';
        
        return `
            <div class="contact-item">
                <div class="icon">${icon}</div>
                <div>
                    <h3>${item.clave}</h3>
                    <p>${item.valor}</p>
                    ${item.descripcion ? `<p>${item.descripcion}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Configurar formulario de contacto
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        const messageDiv = document.getElementById('form-message');
        
        // Mostrar estado de carga
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        messageDiv.style.display = 'none';
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            // ⚠️ REEMPLAZA CON TU URL REAL DE APPS SCRIPT
            const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_APPS_SCRIPT_ID/exec';
            
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'submitContact',
                    ...data
                }).toString()
            });
            
            const result = await response.json();
            
            if (result.data && result.data.success) {
                showMessage(result.data.message, 'success');
                this.reset(); // Limpiar formulario
            } else {
                showMessage(result.data.error || 'Error al enviar el mensaje', 'error');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión. Por favor, intenta nuevamente.', 'error');
        } finally {
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Mostrar mensajes
function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.className = 'form-message ' + type;
}