
import {crearTarjeta, mostrarTarjetas, filtrarPorCategoria, filtrarCruzado, mostrarValor, filtradoSearch,  limpieza , crearCheckbox, mostrarCheckbox } from './funciones.js'
let contenedorTarjetas = document.getElementById("sectionTarjetas")
let contenedorParaCheckbox = document.getElementById("contenedorParaCheckbox")

let eventos = []
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        eventos = data.events
        console.log(eventos)
        mostrarTarjetas(eventos, contenedorTarjetas, crearTarjeta)
        let categoryArray = data.events.map(eventos => eventos.category)
        new Set(categoryArray)
        let setDeCategorias = new Set(categoryArray);
        let arrayCategorias = Array.from(setDeCategorias)
        console.log(setDeCategorias);
        mostrarCheckbox(arrayCategorias, contenedorParaCheckbox)
})
.catch(error => console.log(error))


//escuchador de eventos

let inputBusqueda = document.getElementById("inputTypeSearch")
inputBusqueda.addEventListener("input", ()=>{
    // inputvalue guarda lo que ingresa el usuario
    let inputValue = mostrarValor(inputBusqueda)
    let check = document.querySelectorAll("input[type='checkbox']:checked")
    let categoriasCheckeadas = Array.from(check).map(check => check.value);
    let resultadoArray = filtrarCruzado(eventos, categoriasCheckeadas, inputValue)
    limpieza(contenedorTarjetas)
    if(resultadoArray.length == 0 ){
        return contenedorTarjetas.innerHTML="NO MATCHES"
    }else if(resultadoArray.lenght == 0){
        return mostrarTarjetas(eventos, contenedorTarjetas, crearTarjeta)
    }else{
        return mostrarTarjetas(resultadoArray, contenedorTarjetas, crearTarjeta)
    }
}) 


contenedorParaCheckbox.addEventListener("change", (e) => {
    let check = document.querySelectorAll("input[type='checkbox']:checked")
    let categoriasCheckeadas = Array.from(check).map(check => check.value);
    let inputValue = mostrarValor(inputBusqueda)
    let resultadoArray = filtrarCruzado(eventos, categoriasCheckeadas, inputValue)
    limpieza(contenedorTarjetas)
    if(categoriasCheckeadas.length == 0 && inputValue.lenght > 0 && resultadoArray.lenght == 0 || categoriasCheckeadas.length == 0 && inputValue.lenght > 0){
        return elementoHTML.innerHTML="NO MATCHES"
    }else if(resultadoArray.lenght == 0 && categoriasCheckeadas.length > 0){
        return elementoHTML.innerHTML="NO MATCHES"
    }else if(resultadoArray.lenght == 0){
        return mostrarTarjetas(eventos, contenedorTarjetas, crearTarjeta)
    }else{
        return mostrarTarjetas(resultadoArray, contenedorTarjetas, crearTarjeta)
    }
}) 

//funciones

// function crearTarjeta(objeto) {
//     return `<div class="container p-4 col-md-6 col-xl-4">
//     <div class="container2 col-12 col-md-12 d-flex justify-content-center align-items-center">
//     <div class="card text-center p-3 fondodiv col-10 col-md-12 ">
//     <img src=${objeto.image} class="card-img-top col-9 col-md-5" alt="...">
//     <div class="card-body ">
//     <h5 class="card-title fw-bold">${objeto.name}</h5>
//     <p class="card-text">${objeto.description}</p>
//     <div class="d-flex justify-content-evenly">
//     <p>Price: ${objeto.price} USD</p>
//     <a href="../pages/details.html?parametro=${objeto._id}" id="botondetails" class="btn btn-primary ">Details</a>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>`
// }

// function mostrarTarjetas(eventos) {
//     let template = ""
//     for (let evento of eventos) {
//         template += crearTarjeta(evento)
//     }contenedorTarjetas.innerHTML+=template
// }

// function filtrarPorCategoria(eventos, categoriasCheckeadas){
//     if(categoriasCheckeadas.length == 0){
//         return eventos
//     }else{
//     let aux = eventos.filter(evento => categoriasCheckeadas.includes(evento.category))
//     return aux
//     }
// }

// function filtrarCruzado(eventos, categoriasCheckeadas, inputValue){
//     let filtroSearch = filtradoSearch(eventos, inputValue)
//     let filtroCategoria = filtrarPorCategoria(filtroSearch, categoriasCheckeadas)
//     return filtroCategoria
// }

// function mostrarValor(input){
//     let valorInput = input.value
//     return valorInput
// }


// function filtradoSearch (array, inputValue){
//     let resultado = array.filter(evento => evento.name.toLowerCase().includes(inputValue.toLowerCase()))
//     return resultado
// }

// function limpieza(){
//     return contenedorTarjetas.innerHTML = ""
// }
// function crearCheckbox(category) {
//     return `<label for="${category}">${category}</label>
//     <input type="checkbox" id="${category}" name="${category}" value="${category}" class="categorias d-flex align-items-center">`
// }

// function mostrarCheckbox(array, donde){
//     for(let categoria of array){
//         donde.innerHTML += crearCheckbox(categoria)
//     }
// }
