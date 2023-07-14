let contenedorTarjetas = document.getElementById("sectionTarjetas");
let contenedorParaCheckbox = document.getElementById("contenedorParaCheckbox");
console.log(contenedorParaCheckbox);
let arrayEvents = data.events;

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
            <a href="../pages/details.html?parametro=${objeto._id}" id="botondetails" class="btn btn-primary ">Details</a>
            </div>
            </div>
            </div>
            </div>
            </div>`;
}

function mostrarTarjetas(eventos) {
  let aux1 = "";
  for (let evento of eventos) {
    aux1 += crearTarjeta(evento);
  }
  return (contenedorTarjetas.innerHTML += aux1);
}
function filtrarEventos(eventos, currentDate) {
  let eventosPasados = [];
  for (let evento of eventos) {
    if (evento.date < currentDate) {
      eventosPasados.push(evento);
    }
  }
  return eventosPasados;
}
let eventosPasados = filtrarEventos(data.events, data.currentDate);

mostrarTarjetas(eventosPasados, contenedorTarjetas);
console.log(eventosPasados);

//sprint 3

let inputBusqueda = document.getElementById("inputTypeSearch");
inputBusqueda.addEventListener("input", () => {
  // inputvalue guarda lo que ingresa el usuario
  let inputValue = mostrarValor(inputBusqueda);
  let check = document.querySelectorAll("input[type='checkbox']:checked");
  let categoriasCheckeadas = Array.from(check).map((check) => check.value);
  let resultadoArray = filtrarCruzado(
    eventosPasados,
    categoriasCheckeadas,
    inputValue
  );
//   limpieza();
  if (resultadoArray.length == 0 && inputValue.lenght > 0) {
    return (contenedorTarjetas.innerHTML = "NO HAY COINCIDENCIAS");
  } else if (resultadoArray.lenght == 0) {
    return mostrarTarjetas(eventosPasados);
  } else {
    return mostrarTarjetas(resultadoArray);
  }
});

function mostrarValor(input) {
  let valorInput = input.value;
  return valorInput;
}

function filtradoSearch(array, inputValue) {
  let resultado = array.filter((evento) =>
    evento.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  return resultado;
}

function limpieza() {
  return (contenedorTarjetas.innerHTML = "");
}

let categoryArray = data.events.map((evento) => evento.category);
new Set(categoryArray);

let setDeCategorias = new Set(categoryArray);
let arrayCategorias = Array.from(setDeCategorias);

function crearCheckbox(category) {
  return `<label for="${category}">${category}</label>
    <input type="checkbox" id="${category}" name="category" value="${category}" class="categorias">`;
}

function mostrarCheckbox(array, donde) {
  for (let categoria of array) {
    donde.innerHTML += crearCheckbox(categoria);
  }
}
mostrarCheckbox(arrayCategorias, contenedorParaCheckbox);

contenedorParaCheckbox.addEventListener("change", (e) => {
  let check = document.querySelectorAll("input[type='checkbox']:checked");
  let categoriasCheckeadas = Array.from(check).map((check) => check.value);
  console.log(categoriasCheckeadas);
  // let events = data.events;
  let inputValue = mostrarValor(inputBusqueda);
  console.log(inputValue);
  console.log(inputBusqueda);
  let resultadoArray = filtrarCruzado(
    eventosPasados,
    categoriasCheckeadas,
    inputValue
  );
  console.log(resultadoArray);
  limpieza();
  if (
    (categoriasCheckeadas.length == 0 &&
      inputValue.lenght > 0 &&
      resultadoArray.lenght == 0) ||
    (categoriasCheckeadas.length == 0 && inputValue.lenght > 0)
  ) {
    return (contenedorTarjetas.innerHTML = "NO HAY COINCIDENCIAS");
  } else if (resultadoArray.lenght == 0 && categoriasCheckeadas.length > 0) {
    return (contenedorTarjetas.innerHTML = "NO HAY COINCIDENCIAS");
  } else if (resultadoArray.lenght == 0) {
    return mostrarTarjetas(eventosPasados);
  } else {
    return mostrarTarjetas(resultadoArray);
  }
});

function filtrarPorCategoria(arrayEventos, categoriasCheckeadas) {
  if (categoriasCheckeadas.length == 0) {
    return arrayEventos;
  } else {
    let aux = arrayEventos.filter((evento) =>
      categoriasCheckeadas.includes(evento.category)
    );
    return aux;
  }
}

function filtrarCruzado(arrayEventos, categoriasCheckeadas, inputValue) {
  let filtroSearch = filtradoSearch(arrayEventos, inputValue);
  let filtroCategoria = filtrarPorCategoria(filtroSearch, categoriasCheckeadas);
  return filtroCategoria;
}
