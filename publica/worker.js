// worker.js - CONFIGURADO CON TUS URLs
const API_BASE = 'https://script.google.com/macros/s/AKfycbwtp9vWaIRNL2UP7zj1bNy-kwntJtTV7GnQKX9w1bduPaA5KBw-WGPPQPr-AF9ndljk/exec';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Manejar CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // API Routes - /api/* va a Google Apps Script
    if (path.startsWith('/api/')) {
      return handleAPI(request, url);
    }

    // Para archivos estáticos (CSS, JS, imágenes), servirlos directamente
    if (path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf)$/)) {
      return fetch(request);
    }

    // Páginas HTML - servir desde Pages
    const pages = {
      '/': 'https://descodificacion-transpersonal.pages.dev/index.html',
      '/cursos': 'https://descodificacion-transpersonal.pages.dev/cursos.html',
      '/nosotros': 'https://descodificacion-transpersonal.pages.dev/nosotros.html',
      '/contacto': 'https://descodificacion-transpersonal.pages.dev/contacto.html'
    };

    if (pages[path]) {
      return fetch(pages[path]);
    }

    // Para cualquier otra ruta, servir el index
    return fetch('https://descodificacion-transpersonal.pages.dev/index.html');
  }
};

async function handleAPI(request, url) {
  const action = url.searchParams.get('action');
  
  if (!action) {
    return createJSONResponse({error: 'Se requiere parámetro action'}, 400);
  }
  
  try {
    const apiUrl = `${API_BASE}?action=${action}`;
    
    let response;
    if (request.method === 'POST') {
      const body = await request.text();
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      });
    } else {
      response = await fetch(apiUrl);
    }
    
    const data = await response.text();
    
    try {
      const parsedData = JSON.parse(data);
      return createJSONResponse(parsedData);
    } catch (parseError) {
      return createJSONResponse({
        error: 'Error en la respuesta del servidor',
        details: data.substring(0, 200)
      }, 500);
    }
    
  } catch (error) {
    return createJSONResponse({
      error: 'Error conectando con el servidor',
      details: error.message
    }, 500);
  }
}

function createJSONResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}