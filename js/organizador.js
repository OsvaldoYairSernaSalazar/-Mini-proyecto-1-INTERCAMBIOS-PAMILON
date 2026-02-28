const organizerInput = document.getElementById("organizerName");
const includeOrganizer = document.getElementById("includeOrganizer");
const participantInput = document.getElementById("participantName");
const list = document.getElementById("participantsList");

let participants = [];

// Agregar participante
document.getElementById("addParticipant").addEventListener("click", function () {
    const name = participantInput.value.trim();
    if (name !== "") {
        participants.push(name);
        renderList();
        participantInput.value = "";
    }
});

function renderList() {
    list.innerHTML = "";
    participants.forEach((name, index) => {
        list.innerHTML += `
            <div class="list-group-item d-flex justify-content-between">
                ${name}
                <button onclick="removeParticipant(${index})" class="btn btn-sm btn-danger">X</button>
            </div>
        `;
    });
}

function removeParticipant(index) {
    participants.splice(index, 1);
    renderList();
}

// Continuar
document.getElementById("continueToExclusions").addEventListener("click", function () {

    let finalList = [...participants];

    if (includeOrganizer.checked) {
        finalList.push(organizerInput.value.trim());
    }

    localStorage.setItem("participants", JSON.stringify(finalList));

    window.location.href = "exclusiones.html";
});