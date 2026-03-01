// ===============================
// REFERENCIAS
// ===============================
const eventosGrid = document.querySelector(".eventos-grid");
const botonesEvento = () => document.querySelectorAll(".btn-evento");
const mostrarMasBtn = document.querySelector(".btn-link");
const continueBtn = document.getElementById("continueBtn");

let eventoSeleccionado = null;


// ===============================
// FUNCIÓN PARA SELECCIONAR BOTÓN
// ===============================
function seleccionarEvento(boton) {

    botonesEvento().forEach(btn => btn.classList.remove("active-event"));

    boton.classList.add("active-event");

    eventoSeleccionado = boton.textContent.trim();
}


// ===============================
// ACTIVAR BOTONES EXISTENTES
// ===============================
botonesEvento().forEach(boton => {

    boton.addEventListener("click", function () {
        seleccionarEvento(this);
    });

});


// ===============================
// CREAR EVENTO PERSONALIZADO
// ===============================
mostrarMasBtn.addEventListener("click", function () {

    Swal.fire({
        title: "Escribe tu celebración",
        input: "text",
        inputPlaceholder: "Ej. Intercambio Familiar 2026",
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value) {
                return "Debes escribir un nombre";
            }
        }
    }).then((result) => {

        if (result.isConfirmed) {

            const nuevoEvento = result.value.trim();

            // Crear botón nuevo
            const nuevoBoton = document.createElement("button");
            nuevoBoton.type = "button";
            nuevoBoton.className = "btn-evento";
            nuevoBoton.textContent = nuevoEvento;

            // Agregar evento click
            nuevoBoton.addEventListener("click", function () {
                seleccionarEvento(this);
            });

            // Insertarlo al grid
            eventosGrid.appendChild(nuevoBoton);

            // Seleccionarlo automáticamente
            seleccionarEvento(nuevoBoton);

            Swal.fire({
                icon: "success",
                title: "Evento agregado",
                timer: 1000,
                showConfirmButton: false
            });
        }

    });

});


// ===============================
// CONTINUAR
// ===============================
continueBtn.addEventListener("click", function () {

    if (!eventoSeleccionado) {
        Swal.fire({
            icon: "warning",
            title: "Selecciona un evento",
            text: "Debes elegir un evento antes de continuar."
        });
        return;
    }

    localStorage.setItem("tipoEvento", eventoSeleccionado);

    Swal.fire({
        icon: "success",
        title: "Evento seleccionado",
        text: eventoSeleccionado,
        timer: 1200,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "fecha.html";
    });

});