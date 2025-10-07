// Elementos
const btnBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
const modal = document.getElementById('modalResultados');
const cerrarModal = document.getElementById('cerrarModal');
const contenedorResultados = document.getElementById('contenedorResultados');

let frases = [];

// Cargar JSON
fetch('frases.json')
  .then(res => {
    if (!res.ok) throw new Error('Error al obtener frases.json: ' + res.status);
    return res.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      console.error('frases.json no contiene un array:', data);
      return;
    }
    frases = data;
    console.log('Frases cargadas:', frases.length);
    // opcional: ver primeros objetos para debug
    console.log(frases.slice(0,5));
  })
  .catch(err => {
    console.error('Error cargando frases:', err);
  });

// Mostrar / cerrar modal
function mostrarModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function cerrar() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
cerrarModal.addEventListener('click', cerrar);

// Buscar (con protección)
function buscarTermino() {
  try {
    const termino = (inputBuscar.value || '').trim().toLowerCase();
    contenedorResultados.innerHTML = '';

    if (!termino) {
      contenedorResultados.innerHTML = '<p class="text-gray-500">Por favor ingresa una palabra clave.</p>';
      mostrarModal();
      return;
    }

    if (!Array.isArray(frases)) {
      contenedorResultados.innerHTML = '<p class="text-gray-500">Las frases aún no se han cargado. Intenta de nuevo en unos segundos.</p>';
      mostrarModal();
      return;
    }

    const resultados = frases.filter(f => {
      // Protegemos contra objetos mal formados
      const texto = f && f.texto ? String(f.texto).toLowerCase() : '';
      const categoria = f && f.categoria ? String(f.categoria).toLowerCase() : '';
      return texto.includes(termino) || categoria.includes(termino);
    });

    if (resultados.length === 0) {
      contenedorResultados.innerHTML = '<p class="text-gray-500">No se encontraron resultados.</p>';
      mostrarModal();
      return;
    }

    // Renderiza resultados (scrollable por CSS del modal)
    const fragment = document.createDocumentFragment();
    resultados.forEach(f => {
      const div = document.createElement('div');
      div.className = 'p-4 bg-white/90 rounded-lg shadow mb-3';
      // seguridad: escapar texto si es necesario
      div.innerHTML = `
        <p class="text-lg font-semibold text-[#0b3e81]">"${escapeHtml(String(f.texto || ''))}"</p>
        <p class="text-sm text-gray-500 mt-1">Categoría: ${escapeHtml(String(f.categoria || ''))}</p>
      `;
      fragment.appendChild(div);
    });
    contenedorResultados.appendChild(fragment);
    mostrarModal();

  } catch (err) {
    console.error('Error en búsqueda:', err);
    contenedorResultados.innerHTML = '<p class="text-red-500">Ocurrió un error al realizar la búsqueda.</p>';
    mostrarModal();
  }
}

// Atacha eventos
btnBuscar.addEventListener('click', buscarTermino);
inputBuscar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') buscarTermino();
});

// Pequeña función para escapar HTML (seguridad si el JSON tiene contenido inesperado)
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


    // ---- Formulario ----
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const categoria = form.categoria.value;
      const frase = form.frase.value.trim();

      if (!email || !categoria || !frase) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      form.reset();
    });