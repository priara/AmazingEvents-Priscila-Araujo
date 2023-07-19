let contenedorStats = document.getElementById("tablamayor")
let contenedorStats1 = document.getElementById("tablamenor")
let contenedorStats2 = document.getElementById("tablalargo")
let tableCategoria = document.getElementById("tableCategoria")
let tableCategoria2 = document.getElementById("tablecategoria2")


let eventos = []
let date;
let esmitate;
let capacidad;
let assistance;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        eventos = data.events
        // assistance = eventos.map(evento => evento.assistance)
        // capacidad = eventos.map(evento => evento.capacity)
        // estimate = eventos.map (evento => evento.estimate)
        date = data.currentDate

        
        const arrayOrdenado = Array.from(eventos).sort(function (a,b){
            return b.capacity - a.capacity
        })
        console.log(arrayOrdenado);
        let mayorCapacidad = arrayOrdenado[0].capacity
        let mayorCapacidadNombre = arrayOrdenado[0].name
        console.log(mayorCapacidad);
        let eventosPasados = eventos.filter(evento => evento.date < date)
        eventosPasados.sort((a, b) => calcularPorcentajeAsistenciaAlto(a.assistance, a.capacity) - calcularPorcentajeAsistenciaAlto(b.assistance, b.capacity))
        let eventosFuturos = eventos.filter(evento => evento.date >= date)
        console.log(eventosFuturos);
        let eventoMenor = eventosPasados[0];
        let eventoMayor = eventosPasados[eventosPasados.length-1];
        let porcentaje1 = calcularPorcentajeAsistenciaAlto(eventoMayor.assistance, eventoMayor.capacity)
        let porcentaje2 = calcularPorcentajeAsistenciaAlto(eventoMenor.assistance, eventoMenor.capacity)
        tabla1(eventoMayor, contenedorStats, porcentaje1.toFixed(2))
        tabla1(eventoMenor, contenedorStats1, porcentaje2.toFixed(2))
        tabla2(mayorCapacidadNombre, contenedorStats2, mayorCapacidad.toLocaleString())

        let categoriaPasada = eventosPasados.map(eventosPasados => eventosPasados.category)
        let categoriaPasadaArray = Array.from(new Set(categoriaPasada))
        console.log(categoriaPasadaArray);

        const estadisticasPas = categoriaPasadaArray.map(categoria => {
            let eventosCategoriaPas = eventosPasados.filter( evento => evento.category == categoria )
            let gananciaCategoria = 0            
            eventosCategoriaPas.forEach( (evento) => {
                let {price, assistance} = evento
                let resultadoGanancia = price * assistance
                gananciaCategoria = gananciaCategoria + resultadoGanancia 
            } )
            let porcentajeAsistencia = 0
            eventosCategoriaPas.forEach( (evento) => {
                let {capacity, assistance} = evento
                let resultadoPorcentaje = assistance / (capacity / 100)
                porcentajeAsistencia += resultadoPorcentaje
            } )
            let aux = {
                nombre: categoria,
                eventos: eventosCategoriaPas,
                ganancias: gananciaCategoria.toLocaleString(),
                porcentajeDeAsistencia: (porcentajeAsistencia / eventosCategoriaPas.length).toFixed()
            }
            return aux
        })
        
        console.log(estadisticasPas)
        let categoriaFuturo = eventosFuturos.map(eventosFuturos => eventosFuturos.category)
        let categoriaFuturoArray = Array.from(new Set(categoriaFuturo))
        console.log(categoriaFuturoArray);

        const estadisticasFuturo = categoriaFuturoArray.map(categoria => {
            let eventosCategoriaFuturo = eventosFuturos.filter( evento => evento.category == categoria )
            let gananciaCategoria = 0            
            eventosCategoriaFuturo.forEach( (evento) => {
                let {price, estimate} = evento
                let resultadoGanancia = price * estimate
                gananciaCategoria = gananciaCategoria + resultadoGanancia 
            } )
            let porcentajeAsistencia = 0
            eventosCategoriaFuturo.forEach( (evento) => {
                let {capacity, estimate} = evento
                let resultadoPorcentaje = estimate / (capacity / 100)
                porcentajeAsistencia += resultadoPorcentaje
            } )
            let aux = {
                nombre: categoria,
                eventos: eventosCategoriaFuturo,
                ganancias: gananciaCategoria.toLocaleString(),
                porcentajeDeAsistencia: (porcentajeAsistencia / eventosCategoriaFuturo.length).toFixed()
            }
            return aux
        })

        mostrarTabla(estadisticasPas, tableCategoria)
        mostrarTabla(estadisticasFuturo, tableCategoria2)
}
)
.catch(error => console.log(error))



function calcularPorcentajeAsistenciaAlto(assistance, capacidad){
    let porcentaje = (assistance / capacidad) *100
    return porcentaje
}
function tabla1(evento, htmlContenedor, porcentaje1){
    htmlContenedor.innerHTML = `
    <td colspan="1" class="p-3">${evento.name} ${porcentaje1} %</td>`
}
function tabla2(evento, htmlContenedor, capacidad){
    htmlContenedor.innerHTML = `
    <td colspan="1" class="p-3">${evento} ${capacidad}</td>`
}

function crearTabla(aux) {
        return `<tr>
            <td colspan="1" class="tabla2y3 p-3">${aux.nombre}</td>
            <td colspan="1" class=" tabla2y3p-3">${aux.ganancias}</td>
            <td colspan="1" class=" tabla2y3 p-3">${aux.porcentajeDeAsistencia} %</td>
            </tr>`
        }

function mostrarTabla(eventos, elementHTML) {
        let template = ""
        for (let evento of eventos) {
            template += crearTabla(evento)
    }elementHTML.innerHTML+=template
}
