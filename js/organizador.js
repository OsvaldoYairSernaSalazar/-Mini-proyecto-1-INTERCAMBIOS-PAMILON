// ===============================
// REFERENCIAS DEL DOM
// ===============================
const organizerInput = document.getElementById("organizerName");
const includeOrganizer = document.getElementById("includeOrganizer");
const participantInput = document.getElementById("participantName");
const list = document.getElementById("participantsList");

let participants = [];

// ===============================
// AGREGAR PARTICIPANTE
// ===============================
document.getElementById("addParticipant").addEventListener("click", function () {
    const name = participantInput.value.trim();

    if (name === "") {
        Swal.fire({
            icon: "warning",
            title: "Campo vacío",
            text: "Escribe un nombre antes de agregar.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    participants.push(name);
    renderList();
    participantInput.value = "";
});

// ===============================
// RENDERIZAR LISTA
// ===============================
function renderList() {
    list.innerHTML = "";

    participants.forEach((name, index) => {
        list.innerHTML += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                ${name}
                <button onclick="removeParticipant(${index})" 
                        class="btn btn-sm btn-danger">
                    X
                </button>
            </div>
        `;
    });
}

// ===============================
// ELIMINAR PARTICIPANTE
// ===============================
function removeParticipant(index) {
    participants.splice(index, 1);
    renderList();
}

// ===============================
// CONTINUAR A EXCLUSIONES
// ===============================
document.getElementById("continueToExclusions").addEventListener("click", function () {

    let finalList = [...participants];

    // Agregar organizador si está marcado
    if (includeOrganizer.checked) {
        const organizerName = organizerInput.value.trim();

        if (organizerName === "") {
            Swal.fire({
                icon: "warning",
                title: "Organizador vacío",
                text: "Escribe el nombre del organizador o desmarca la opción.",
                confirmButtonText: "Entendido"
            });
            return;
        }

        finalList.push(organizerName);
    }

    // 🚨 VALIDACIÓN PRINCIPAL
    if (finalList.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Sin participantes",
            text: "No hay participantes agregados para el sorteo.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    // 🚨 Validación opcional: mínimo 2 personas
    if (finalList.length < 2) {
        Swal.fire({
            icon: "error",
            title: "Muy pocos participantes",
            text: "Debes agregar al menos 2 personas para realizar el sorteo.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    // Guardar en localStorage
    localStorage.setItem("participants", JSON.stringify(finalList));

    Swal.fire({
        icon: "success",
        title: "Comencemos",
        text: "Participantes guardados. Ahora vamos a las exclusiones.",
        confirmButtonText: "¡Vamos!"
    }).then(() => {
        window.location.href = "exclusiones.html";
    });
});