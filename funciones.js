export function crearTarjeta(objeto) {
    return `<div class="container p-4 col-md-6 col-xl-4">
    <div class="container2 col-12 col-md-12 d-flex justify-content-center align-items-center">
    <div class="card text-center p-3 fondodiv col-10 col-md-12 ">
    <img src=${objeto.image} class="card-img-top col-9 col-md-5" alt="...">
    <div class="card-body ">
    <h5 class="card-title fw-bold">${objeto.name}</h5>
    <p class="card-text">${objeto.description}</p>
    <div class="d-flex justify-content-evenly">
    <p>Price: ${objeto.price} USD</p>
    <a href="../pages/details.html?parametro=${objeto._id}" id="botondetails" class="btn btn-primary ">Details</a>
    </div>
    </div>
    </div>
    </div>
    </div>`
}


export function mostrarTarjetas(eventos, elementoHTML, crearTarjeta) {
    let template = ""
    for (let evento of eventos) {
        template += crearTarjeta(evento)
    }elementoHTML.innerHTML+=template
}

export function filtrarPorCategoria(eventos, categoriasCheckeadas) {
    if (categoriasCheckeadas.length == 0) {
    return eventos
    } else {
    let aux = eventos.filter(evento =>categoriasCheckeadas.includes(evento.category))
    return aux
    }
}

export function filtrarCruzado(eventos, categoriasCheckeadas, inputValue) {
    let filtroSearch = filtradoSearch(eventos, inputValue);
    let filtroCategoria = filtrarPorCategoria(filtroSearch, categoriasCheckeadas);
    return filtroCategoria
}

export function mostrarValor(input){
    let valorInput = input.value
    return valorInput
}

export function filtradoSearch(array, inputValue) {
    let resultado = array.filter((evento) =>
    evento.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    return resultado;
}

export function limpieza(elementoHTML){
    return elementoHTML.innerHTML = ""
}

export function crearCheckbox(category) {
    return `<label for="${category}">${category}</label>
    <input type="checkbox" id="${category}" name="${category}" value="${category}" class="categorias d-flex align-items-center">`
}

export function mostrarCheckbox(array, donde){
    for(let categoria of array){
        donde.innerHTML += crearCheckbox(categoria)
    }
}