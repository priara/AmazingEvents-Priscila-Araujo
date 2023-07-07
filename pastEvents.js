
let contenedorTarjetas = document.getElementById("sectionTarjetas")

function crearTarjeta(objeto) {
    return `<div class="container mt-3 col-md-4 col-xl-3">
            <div class="container2 col-12 col-md-12 d-flex justify-content-center align-items-center">
            <div class="card text-center p-3 fondodiv col-10 col-md-12 ">
            <img src=${objeto.image} class="card-img-top col-9 col-md-5" alt="...">
            <div class="card-body ">
            <h5 class="card-title fw-bold">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            <div class="d-flex justify-content-evenly">
            <p>Price: ${objeto.price}</p>
            <a href="../pages/details.html" class="btn btn-primary ">Details</a>
            </div>
            </div>
            </div>
            </div>
            </div>`
}

function mostrarTarjetas(eventos, contenedorTarjetas) {
    for (let evento of eventos){
        contenedorTarjetas.innerHTML += crearTarjeta(evento); 
    } 
}
function filtrarEventos(eventos, currentDate) {
    let eventosPasados = []
    for (let evento of eventos){
        if (evento.date < currentDate) {
            eventosPasados.push(evento)
        }
    }
    return eventosPasados
}
let eventosPasados = filtrarEventos(data.events, data.currentDate)

mostrarTarjetas(eventosPasados, contenedorTarjetas)
console.log(eventosPasados);