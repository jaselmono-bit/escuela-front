// about.js
document.addEventListener('DOMContentLoaded', function() {
    loadAboutData();
    loadTeamData();
});

// Cargar datos sobre nosotros
async function loadAboutData() {
    try {
        const response = await fetch('/api/?action=getAbout');
        const data = await response.json();
        
        if (data.data) {
            if (data.data.about) {
                renderAboutData(data.data.about);
            }
            if (data.data.values) {
                renderValues(data.data.values);
            }
        }
    } catch (error) {
        console.error('Error loading about data:', error);
    }
}

// Renderizar datos sobre nosotros
function renderAboutData(about) {
    // Puedes personalizar qué campos mostrar y dónde
    if (about.historia) {
        const container = document.getElementById('about-history');
        if (container) {
            container.innerHTML += `<p>${about.historia}</p>`;
        }
    }
}

// Renderizar valores
function renderValues(values) {
    const container = document.getElementById('values-grid');
    
    if (!values || values.length === 0) {
        container.innerHTML = `
            <div class="value-card">
                <div class="value-icon">🤝</div>
                <h3>Compromiso</h3>
                <p>Tu transformación es nuestra prioridad absoluta</p>
            </div>
            <div class="value-card">
                <div class="value-icon">❤️</div>
                <h3>Empatía</h3>
                <p>Acompañamos con respeto y comprensión cada etapa</p>
            </div>
            <div class="value-card">
                <div class="value-icon">🔬</div>
                <h3>Profesionalismo</h3>
                <p>Altos estándares éticos y actualización constante</p>
            </div>
            <div class="value-card">
                <div class="value-icon">🌍</div>
                <h3>Accesibilidad</h3>
                <p>Conocimiento accesible para todos</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = values.map(value => `
        <div class="value-card">
            <div class="value-icon">${value.icono || '🌟'}</div>
            <h3>${value.valor}</h3>
            <p>${value.descripcion}</p>
        </div>
    `).join('');
}

// Cargar datos del equipo
async function loadTeamData() {
    try {
        const response = await fetch('/api/?action=getTeam');
        const data = await response.json();
        
        if (data.data && data.data.team) {
            renderTeam(data.data.team);
        }
    } catch (error) {
        console.error('Error loading team data:', error);
    }
}

// Renderizar equipo
function renderTeam(team) {
    const container = document.getElementById('team-grid');
    
    if (!team || team.length === 0) {
        container.innerHTML = `
            <div class="team-card">
                <div class="team-photo">
                    <img src="/assets/images/rostro.png" alt="Director - Descodificación Transpersonal">
                </div>
                <div class="team-info">
                    <h3>Director</h3>
                    <div class="team-role">Director y Terapeuta Principal</div>
                    <p>Especialista en Biodescodificación Transpersonal con más de 15 años de experiencia. Formado en Argentina y Europa en terapias holísticas y sanación emocional.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = team.map(member => `
        <div class="team-card">
            <div class="team-photo">
                <img src="${member.imagen || '/assets/images/rostro.png'}" 
                     alt="${member.nombre}" 
                     onerror="this.src='/assets/images/rostro.png'">
            </div>
            <div class="team-info">
                <h3>${member.nombre}</h3>
                <div class="team-role">${member.rol}</div>
                <p>${member.descripcion}</p>
            </div>
        </div>
    `).join('');
}