const eventosGrid = document.querySelector(".eventos-grid");
const mostrarMasBtn = document.getElementById("mostrarMasBtn");
const continueBtn = document.getElementById("continueBtn");

let eventoSeleccionado = null;

function activarEventos() {
  document.querySelectorAll(".btn-evento").forEach((boton) => {
    boton.onclick = function () {
      document
        .querySelectorAll(".btn-evento")
        .forEach((b) => b.classList.remove("active-event"));

      this.classList.add("active-event");

      eventoSeleccionado = this.innerText.trim();
    };
  });
}

activarEventos();

mostrarMasBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Escribe tu celebración",

    input: "text",

    inputPlaceholder: "Ej. Intercambio Familiar",

    showCancelButton: true,

    confirmButtonText: "Agregar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nombre = result.value.trim();

      if (!nombre) return;

      const col = document.createElement("div");

      col.className = "col-6";

      col.innerHTML = `

<button class="btn-evento">

<div class="evento-card">

<div class="evento-icon">🎉</div>

<div class="evento-texto">${nombre}</div>

</div>

</button>

`;

      eventosGrid.appendChild(col);

      activarEventos();
    }
  });
});

continueBtn.addEventListener("click", () => {
  if (!eventoSeleccionado) {
    Swal.fire({
      icon: "warning",

      title: "Selecciona un evento",

      text: "Debes elegir un evento antes de continuar.",
    });

    return;
  }

  localStorage.setItem("tipoEvento", eventoSeleccionado);

  Swal.fire({
    icon: "success",

    title: "Evento seleccionado",

    timer: 1000,

    showConfirmButton: false,
  }).then(() => {
    window.location.href = "fecha.html";
  });
});
