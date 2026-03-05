const participants = JSON.parse(localStorage.getItem("participants")) || [];
const exclusions = JSON.parse(localStorage.getItem("exclusions")) || {};

const sortearBtn = document.getElementById("sortearBtn");
const resultsContainer = document.getElementById("resultsContainer");


function sortear(){

let intentos = 0;

while(intentos < 500){

let disponibles = [...participants];

let resultado = {};

let valido = true;

for(let persona of participants){

let opciones = disponibles.filter(p => 
p !== persona &&
!(exclusions[persona] || []).includes(p)
);

if(opciones.length === 0){

valido = false;

break;

}

let elegido = opciones[Math.floor(Math.random()*opciones.length)];

resultado[persona] = elegido;

disponibles = disponibles.filter(p => p !== elegido);

}

if(valido){

mostrarResultados(resultado);

return;

}

intentos++;

}

Swal.fire({

icon:"error",

title:"No se pudo generar el sorteo",

text:"Las exclusiones son demasiado restrictivas."

});

}


function mostrarResultados(resultado){

resultsContainer.innerHTML = "";

Object.entries(resultado).forEach(([de, para])=>{

const card = document.createElement("div");

card.className = "result-card";

card.innerHTML = `
<div class="result-name">
<i class="bi bi-person-circle"></i> ${de}
</div>

<div class="result-arrow">
<i class="bi bi-arrow-right"></i>
</div>

<div class="result-name">
<i class="bi bi-gift"></i> ${para}
</div>
`;

resultsContainer.appendChild(card);

});

Swal.fire({

icon:"success",

title:"¡Sorteo realizado!",

text:"Los resultados se generaron correctamente."

});

}


sortearBtn.addEventListener("click", sortear);