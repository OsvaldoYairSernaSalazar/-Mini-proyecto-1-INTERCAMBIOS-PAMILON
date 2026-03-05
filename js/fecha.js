const fechaInput = document.getElementById("fechaEvento");
const precioSelect = document.getElementById("precioRegalo");
const otroPrecio = document.getElementById("otroPrecio");
const boton = document.getElementById("guardarDatos");


// evitar fechas pasadas

const hoy = new Date().toISOString().split("T")[0];
fechaInput.min = hoy;


// mostrar campo si elige otra cantidad

precioSelect.addEventListener("change", () => {

if(precioSelect.value === "otro"){
otroPrecio.classList.remove("d-none");
}else{
otroPrecio.classList.add("d-none");
}

});


// guardar datos

boton.addEventListener("click", () => {

let fecha = fechaInput.value;
let precio = precioSelect.value;

if(precio === "otro"){
precio = otroPrecio.value;
}

if(!fecha || !precio){

Swal.fire({
icon:"warning",
title:"Campos incompletos",
text:"Debes seleccionar una fecha y un monto para el regalo"
});

return;
}


// guardar en localStorage

localStorage.setItem("fechaEvento", fecha);
localStorage.setItem("precioRegalo", precio);


Swal.fire({
icon:"success",
title:"Datos guardados",
text:"La configuración del intercambio fue guardada"
}).then(() => {

window.location.href = "sorteo.html";

});

});