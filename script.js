// ---- Animaciones FadeIn ----
    document.addEventListener("DOMContentLoaded", () => {
      const fadeEls = document.querySelectorAll(".animate-fade-in");
      fadeEls.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
          el.style.transition = "all 0.8s ease";
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        }, i * 300);
      });
    });

// ---- Buscador ----
let frases = [];

// ---- Cargar JSON ----
fetch("frases.json")
.then(res => res.json())
.then(data => frases = data)
.catch(err => alert("sd"));

  // ---- Elementos ----
  const inputBuscador = document.querySelector("input[type='text']");
  const btnBuscar = document.querySelector("button");
  const modal = document.getElementById("modalResultados");
  const cerrarModal = document.getElementById("cerrarModal");
  const contenedorResultados = document.getElementById("contenedorResultados");

  // ---- Buscar y mostrar en modal ----
  btnBuscar.addEventListener("click", () => {
    const query = inputBuscador.value.toLowerCase();
    const resultados = frases.filter(f => f.texto.toLowerCase().includes(query));

    contenedorResultados.innerHTML = resultados.length
      ? resultados.map(r => `<p class="p-2 bg-gray-100 rounded-lg">${r.texto}</p>`).join("")
      : "<p class='text-gray-500'>No se encontraron resultados</p>";

    alert("SD")

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  // ---- Cerrar modal ----
  cerrarModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  // ---- Cerrar modal clic fuera ----
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });
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

      // Simulación de envío
      alert("✅ Gracias por enviar tu frase.");
      form.reset();
    });