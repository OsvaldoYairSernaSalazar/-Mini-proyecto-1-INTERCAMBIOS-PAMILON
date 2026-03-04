const participants = JSON.parse(localStorage.getItem("participants")) || [];

const questionSection = document.getElementById("questionSection");
const exclusionsSection = document.getElementById("exclusionsSection");

const participantsContainer = document.getElementById("participantsContainer");
const dragParticipants = document.getElementById("dragParticipants");

const noExclusionsBtn = document.getElementById("noExclusions");
const setExclusionsBtn = document.getElementById("setExclusions");
const continueBtn = document.getElementById("continueBtn");

let exclusions = JSON.parse(localStorage.getItem("exclusions")) || {};



noExclusionsBtn.addEventListener("click", () => {

exclusions = {};

localStorage.setItem("exclusions", JSON.stringify(exclusions));

Swal.fire({
title:'¡Sin exclusiones!',
text:'Se continuará sin restricciones.',
icon:'success',
confirmButtonColor:'#224abe'
});

});



setExclusionsBtn.addEventListener("click", () => {

questionSection.classList.add("d-none");
exclusionsSection.classList.remove("d-none");

renderParticipants();

});



function renderParticipants(){

dragParticipants.innerHTML = "";

participants.forEach(person => {

const item = document.createElement("div");

item.className = "persona d-flex align-items-center gap-2";

item.draggable = true;

item.innerHTML = `
<i class="bi bi-person-circle avatar-icon"></i>
<span>${person}</span>
`;

item.addEventListener("dragstart", e=>{
e.dataTransfer.setData("text/plain", person);
});
dragParticipants.appendChild(item);

});

renderExclusionZones();

}



function renderExclusionZones(){

participantsContainer.innerHTML = "";

participants.forEach(person => {

if(!exclusions[person]){
exclusions[person] = [];
}

const wrapper = document.createElement("div");

wrapper.className = "mb-3 p-3 border rounded";


const title = document.createElement("div");

title.className = "fw-bold mb-2";

title.textContent = person + " NO puede regalar a:";


const dropZone = document.createElement("div");

dropZone.className = "drop-zone";

dropZone.dataset.person = person;



dropZone.addEventListener("dragover", e => {
e.preventDefault();
});


dropZone.addEventListener("drop", e => {

e.preventDefault();

const draggedPerson = e.dataTransfer.getData("text/plain");

if(draggedPerson === person) return;

if(!exclusions[person].includes(draggedPerson)){

exclusions[person].push(draggedPerson);

const tag = document.createElement("span");

tag.className = "excluded";

tag.textContent = draggedPerson;


tag.addEventListener("click", () => {

exclusions[person] = exclusions[person].filter(p => p !== draggedPerson);

tag.remove();

localStorage.setItem("exclusions", JSON.stringify(exclusions));

});


dropZone.appendChild(tag);

localStorage.setItem("exclusions", JSON.stringify(exclusions));

}

});



if(exclusions[person].length > 0){

exclusions[person].forEach(name => {

const tag = document.createElement("span");

tag.className = "excluded";

tag.textContent = name;

tag.addEventListener("click", () => {

exclusions[person] = exclusions[person].filter(p => p !== name);

tag.remove();

localStorage.setItem("exclusions", JSON.stringify(exclusions));

});

dropZone.appendChild(tag);

});

}



wrapper.appendChild(title);

wrapper.appendChild(dropZone);

participantsContainer.appendChild(wrapper);

});

}



continueBtn.addEventListener("click", () => {

localStorage.setItem("exclusions", JSON.stringify(exclusions));

Swal.fire({
title:'¡Guardado!',
text:'Exclusiones guardadas correctamente.',
icon:'success',
confirmButtonColor:'#224abe'
}).then(()=>{

window.location.href = "tipoEvento.html";

});

});