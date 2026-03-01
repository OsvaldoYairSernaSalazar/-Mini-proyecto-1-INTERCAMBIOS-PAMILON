const participants = JSON.parse(localStorage.getItem("participants")) || [];

const questionSection = document.getElementById("questionSection");
const exclusionsSection = document.getElementById("exclusionsSection");
const participantsContainer = document.getElementById("participantsContainer");

const noExclusionsBtn = document.getElementById("noExclusions");
const setExclusionsBtn = document.getElementById("setExclusions");
const continueBtn = document.getElementById("continueBtn");

let exclusions = {}; // objeto donde guardaremos exclusiones

// Si el usuario NO quiere exclusiones
noExclusionsBtn.addEventListener("click", () => {
    exclusions = {};
    localStorage.setItem("exclusions", JSON.stringify(exclusions));
    Swal.fire({
  title: '¡NO EXCLUSIONES!',
  text: 'Exclusiones no necesarias.',
  icon: 'success',
  confirmButtonColor: '#224abe'
});
});

// Si el usuario quiere establecer exclusiones
setExclusionsBtn.addEventListener("click", () => {
    questionSection.classList.add("d-none");
    exclusionsSection.classList.remove("d-none");
    renderParticipants();
});

// Crear lista dinámica
function renderParticipants() {
    participantsContainer.innerHTML = "";

    participants.forEach(person => {

        const div = document.createElement("div");
        div.className = "mb-4 p-3 border rounded";

        const label = document.createElement("label");
        label.className = "form-label fw-bold";
        label.textContent = person;

        div.appendChild(label);

        // Inicializar arreglo si no existe
        if (!exclusions[person]) {
            exclusions[person] = [];
        }

        participants.forEach(other => {
            if (other !== person) {

                const checkDiv = document.createElement("div");
                checkDiv.className = "form-check";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "form-check-input";
                checkbox.id = person + "_" + other;
                checkbox.value = other;

                // Si ya estaba guardado, marcarlo
                if (exclusions[person].includes(other)) {
                    checkbox.checked = true;
                }

                checkbox.addEventListener("change", () => {

                    if (checkbox.checked) {
                        exclusions[person].push(other);
                    } else {
                        exclusions[person] = exclusions[person].filter(name => name !== other);
                    }

                    localStorage.setItem("exclusions", JSON.stringify(exclusions));
                });

                const checkLabel = document.createElement("label");
                checkLabel.className = "form-check-label";
                checkLabel.setAttribute("for", checkbox.id);
                checkLabel.textContent = other;

                checkDiv.appendChild(checkbox);
                checkDiv.appendChild(checkLabel);
                div.appendChild(checkDiv);
            }
        });

        participantsContainer.appendChild(div);
    });
}

// Continuar (a futura página de sorteo)
continueBtn.addEventListener("click", () => {
    localStorage.setItem("exclusions", JSON.stringify(exclusions));
   Swal.fire({
  title: '¡Guardado!',
  text: 'Exclusiones guardadas correctamente.',
  icon: 'success',
  confirmButtonColor: '#224abe'
}).then(()=> {
    window.location.href = "tipoEvento.html";
});
    // Aquí después puedes mandar a sorteo.html
});
