//URL search params

let contenedorSection = document.getElementById('contenedor')
console.log(contenedorSection);
let parametro = location.search;
        console.log(parametro);
        console.log([location]);
let parametros = new URLSearchParams(parametro)
        console.log(parametros);
let id = parametros.get('parametro')
        console.log(id);   

let eventos= []
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        eventos = data.events
        console.log(eventos) 
        let cadaEvento = eventos.find(evento => evento._id == id)
        console.log(cadaEvento)
        crearTarjetaDetails(contenedorSection, cadaEvento)
        })
        .catch(error => console.log(error))

//FUNCIONES
function crearTarjetaDetails(elementoHTML, evento) {
        elementoHTML.innerHTML += `<div class="detailscard p-2 rounded h-50 w-sm-25 ">
                                <div class="row g-0 ">
                                <div class="col-md-4">
                                <img src="${evento.image}" class="img-fluid rounded-start object-fit-cover h-100 w-100" alt="...">
                                </div>
                                <div class="col-md-8 col-12 ">
                                <div class="card-bodydetails ps-3 ">
                                <h4 class="card-title fw-bold text-center">${evento.name}</h4>
                                <h6 class="card-text">${evento.description}</h6>
                                <p class="card-text"><small class="">${evento.date}</p>
                                <p class="card-text">Place: ${evento.place}</p>
                                <p class="card-text"> Price: ${evento.price} USD</p>
                                <p class="card-text">Capacity: ${evento.capacity}</p>
                                </div>
                                </div>
                                </div>
                                </div>`
}