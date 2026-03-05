// ===============================
// REFERENCIAS DEL DOM
// ===============================
const organizerInput = document.getElementById("organizerName");
const includeOrganizer = document.getElementById("includeOrganizer");
const participantInput = document.getElementById("participantName");
const list = document.getElementById("participantsList");

const addBtn = document.getElementById("addParticipant");
const continueBtn = document.getElementById("continueToExclusions");

let participants = [];

// ===============================
// UTILIDADES
// ===============================
function normalizar(nombre) {
  return nombre.trim().toLowerCase();
}

function existeNombre(nombre) {
  const n = normalizar(nombre);
  // en la lista
  if (participants.some((p) => normalizar(p) === n)) return true;
  // igual al organizador cuando esté marcado
  if (includeOrganizer.checked && normalizar(organizerInput.value) === n)
    return true;
  return false;
}

// ===============================
// AGREGAR PARTICIPANTE
// ===============================
addBtn.addEventListener("click", function () {
  const name = participantInput.value.trim();

  if (name === "") {
    Swal.fire({
      icon: "warning",
      title: "Campo vacío",
      text: "Escribe un nombre antes de agregar.",
      confirmButtonText: "Entendido",
    });
    return;
  }

  if (existeNombre(name)) {
    Swal.fire({
      icon: "warning",
      title: "Nombre duplicado",
      text: "Ese nombre ya está en la lista o coincide con el organizador.",
      confirmButtonText: "Entendido",
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
continueBtn.addEventListener("click", function () {
  let finalList = [...participants];

  // ===============================
  // AGREGAR ORGANIZADOR
  // ===============================
  if (includeOrganizer.checked) {
    const organizerName = organizerInput.value.trim();

    if (organizerName === "") {
      Swal.fire({
        icon: "warning",
        title: "Organizador vacío",
        text: "Escribe el nombre del organizador o desmarca la opción.",
        confirmButtonText: "Entendido",
      });

      return;
    }

    if (participants.some((p) => normalizar(p) === normalizar(organizerName))) {
      Swal.fire({
        icon: "warning",
        title: "Nombre duplicado",
        text: "El organizador ya está agregado como participante.",
        confirmButtonText: "Entendido",
      });

      return;
    }

    finalList.push(organizerName);
  }

  // ===============================
  // VALIDACIONES
  // ===============================

  if (finalList.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Sin participantes",
      text: "No hay participantes agregados para el sorteo.",
      confirmButtonText: "Entendido",
    });

    return;
  }

  // 🔴 VALIDACIÓN IMPORTANTE
  // mínimo 3 participantes para evitar A ↔ B

  if (finalList.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Muy pocos participantes",
      text: "El intercambio necesita al menos 3 personas para funcionar correctamente.",
      confirmButtonText: "Entendido",
    });

    return;
  }

  // ===============================
  // GUARDAR DATOS
  // ===============================
  localStorage.setItem("participants", JSON.stringify(finalList));

  Swal.fire({
    icon: "success",
    title: "Comencemos",
    text: "Participantes guardados. Ahora vamos a configurar exclusiones.",
    confirmButtonText: "¡Vamos!",
  }).then(() => {
    window.location.href = "exclusiones.html";
  });
});
