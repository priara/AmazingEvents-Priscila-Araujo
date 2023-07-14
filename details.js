//URL search params
let parametro = location.search;
let parametros = new URLSearchParams(parametro)
console.log(parametros);

let id = parametros.get('parametro')
console.log(id);

let events = data.events;
let cadaEvento = events.find(evento => evento._id === id)
console.log(cadaEvento);

let contenedorSection = document.getElementById('contenedor')
console.log(contenedorSection);

function crearTarjetaDetails(elementoHTML, evento) {
        elementoHTML.innerHTML += `
            <div class="fondodivdetails col-12 d-md-flex justify-content-md-center">
            <div div class="row g-0 col-12 col-md-8 " >
            <div class="col-md-4 col-10 col-md-10">
            <img src="${evento.image}" class="img-fluid-details rounded-start col-12 col-md-12 " alt="...">
            </div>
            <div class="col-md-12 col-12">
            <div class="card-body-details col-10">
            <h5 class="card-title text-center">${evento.name}</h5>
            <p class="card-text">Date: ${evento.date}</p>
            <p class="card-text ">Description:${evento.description}</p>
            <p class="card-text">Place: ${evento.place}</p>
            <p class="card-text">Price: ${evento.price}</p>
            </div>
            </div>
            </div>
            </div> `
}

crearTarjetaDetails(contenedorSection, cadaEvento)