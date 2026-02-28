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
        div.className = "mb-3";

        const label = document.createElement("label");
        label.className = "form-label fw-bold";
        label.textContent = person;

        const select = document.createElement("select");
        select.className = "form-select";
        select.multiple = true;

        participants.forEach(other => {
            if (other !== person) {
                const option = document.createElement("option");
                option.value = other;
                option.textContent = other;
                select.appendChild(option);
            }
        });

        select.addEventListener("change", () => {
            const selected = Array.from(select.selectedOptions).map(opt => opt.value);
            exclusions[person] = selected;
            localStorage.setItem("exclusions", JSON.stringify(exclusions));
        });

        div.appendChild(label);
        div.appendChild(select);
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
});
    // Aquí después puedes mandar a sorteo.html
});