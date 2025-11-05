// courses.js
document.addEventListener('DOMContentLoaded', function() {
    loadAllCourses();
    setupFilters();
});

// Cargar todos los cursos
async function loadAllCourses() {
    try {
        const response = await fetch('/api/?action=getCourses');
        const data = await response.json();
        
        if (data.data && data.data.courses) {
            window.allCourses = data.data.courses; // Guardar para filtros
            renderAllCourses(data.data.courses);
        } else {
            showNoCoursesMessage();
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        showNoCoursesMessage();
    }
}

// Renderizar todos los cursos
function renderAllCourses(courses) {
    const container = document.getElementById('all-courses');
    const noCourses = document.getElementById('no-courses');
    
    if (!courses || courses.length === 0) {
        showNoCoursesMessage();
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <article class="course-card" data-type="${course.tipo || 'formacion'}">
            <img src="${course.imagen || '/assets/images/curso-default.jpg'}" 
                 alt="${course.titulo}" 
                 class="course-image"
                 onerror="this.src='/assets/images/curso-default.jpg'">
            <div class="course-content">
                <h3>${course.titulo}</h3>
                <p>${course.descripcion}</p>
                <ul class="course-features">
                    ${course.caracteristicas && course.caracteristicas.length > 0 
                        ? course.caracteristicas.map(feat => `<li>${feat.trim()}</li>`).join('') 
                        : '<li>Contenido de alta calidad</li><li>Acceso 24/7</li><li>Soporte personalizado</li>'
                    }
                </ul>
                <a href="${course.boton_enlace || '#contacto'}" 
                   class="course-button ${course.tipo === 'gratis' ? 'free' : ''}">
                    ${course.boton_texto || 'Más Información'}
                </a>
            </div>
        </article>
    `).join('');
    
    // Mostrar/ocultar mensaje de no cursos
    if (courses.length === 0) {
        container.style.display = 'none';
        noCourses.style.display = 'block';
    } else {
        container.style.display = 'grid';
        noCourses.style.display = 'none';
    }
}

// Configurar filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar cursos
            const filter = this.dataset.filter;
            filterCourses(filter);
        });
    });
}

// Filtrar cursos
function filterCourses(filter) {
    const courses = window.allCourses || [];
    
    let filteredCourses = courses;
    if (filter !== 'all') {
        filteredCourses = courses.filter(course => {
            const courseType = course.tipo ? course.tipo.toLowerCase() : 'formacion';
            return courseType.includes(filter);
        });
    }
    
    renderAllCourses(filteredCourses);
}

// Mostrar mensaje cuando no hay cursos
function showNoCoursesMessage() {
    const container = document.getElementById('all-courses');
    const noCourses = document.getElementById('no-courses');
    
    container.style.display = 'none';
    noCourses.style.display = 'block';
}