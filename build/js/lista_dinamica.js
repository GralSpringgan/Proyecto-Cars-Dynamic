//Apartado nombre de usuario
const usuarioHeader = document.querySelector('.nombre-usuario'); 
const datosLS = JSON.parse(localStorage.getItem('usuario'));

usuarioHeader.textContent = datosLS.Usuario; 

//Agregar y quitar al HTML

const contenedorAutos = document.querySelector('.contenedor-autos')

function agregarAutos(lista){
    limpiarHTML()

    lista.forEach(autitos => {
        const contenedorDiv = document.createElement('DIV');
        contenedorDiv.classList.add('ON'); 
        contenedorAutos.appendChild(contenedorDiv)
        const autos=
        `<div class="divAutos">
            <div class="autoImg">
                <img src="${autitos.img}" alt="208">
            </div>
            <div class="autoDescripcion">
                <p> ${autitos.marca+' '+autitos.nombre}<br>
                ${autitos.puertas} puertas con caja ${autitos.transmision}<br>
                PRECIO: ${autitos.precio}</p>
            </div>
            <div class="boton">
                <button id='${autitos.id}' class="agregar">Agregar al carro</button> 
            </div >
        </div>`

        contenedorDiv.innerHTML = autos; 
    });

}

agregarAutos(autos)

function limpiarHTML(){
    const remover = document.querySelectorAll('.ON')

    if(remover){
        remover.forEach(quitando => {
            quitando.remove()
        });
    }
}

//------------------FILTROS Y CARRITO------------------------

const marcas = document.querySelector('#marca');
const precioMinimo = document.querySelector('#precioMinimo');
const precioMaximo = document.querySelector('#precioMaximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision')
const filtrarBTn = document.querySelector('.boton-filtro')

const cantidadCarrito = document.querySelector('.p-cantidad');

const autoselect = {
    marca:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:''
};

let Carrito=[];

//eventos
eventoChange(marcas,filtroMarca);
eventoChange(precioMinimo,filtroPrecioMini);
eventoChange(precioMaximo,filtroPrecioMax);
eventoChange(puertas,filtroPuerta);
eventoChange(transmision,filtroTransmision);
BotonesAgregarCarrito();


filtrarBTn.addEventListener('click',()=>{
    limpiarHTML()
    filtrarAuto()
    BotonesAgregarCarrito()

})

//FUNCIONES

function BotonesAgregarCarrito(){

    const AgregarBtn = document.querySelectorAll('.agregar');
    AgregarBtn.forEach((e)=>{
        e.addEventListener('click',(e)=>{
            e.preventDefault()
    
            const id = e.target.id;
            const resultadoID =  autos.find(autoID=>autoID.id == id)
    
            const repetido = Carrito.some(producto =>producto.id == id)
    
            if(repetido){
                alert(`El producto ${resultadoID.nombre} ya esta agregado en el carrito de compras`)
            }else{
                Carrito.push(resultadoID);
                cantidadCarrito.textContent = Carrito.length;
                crearListaProductos(Carrito);
            }
    
            
        })
    })
}

function eventoChange(seleccion, tipoFiltro){
    seleccion.addEventListener('change', tipoFiltro);
}

//llenar el obj autoselct con sus eventos

function filtroMarca(e){
    autoselect.marca = e.target.value;
};

function filtroPrecioMini(e){
    autoselect.minimo = e.target.value;
};

function filtroPrecioMax(e){
    autoselect.maximo = e.target.value;
};

function filtroPuerta(e){
    autoselect.puertas = e.target.value;
};

function filtroTransmision(e){
    autoselect.transmision = e.target.value;
}


//filtro de la lista

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarPrecioMax).filter(filtrarPrecioMin); 
    
    if(resultado.length){

        agregarAutos(resultado);
    }else{
        alert('sin resultados')
    }
}

//devolver del array de objetos los autos filtrados

function filtrarMarca(autito){
    const {marca} = autoselect;

    if(marca){
        return autito.marca === marca;
    } 
    return autito;
};


function filtrarPuertas(autito){
    const {puertas} = autoselect

    if(puertas){
        return autito.puertas == puertas;
    }
    return autito;
}

function filtrarTransmision(autito){
    const {transmision} = autoselect;

    if(transmision){
        return autito.transmision === transmision 
    }
    return autito;

}

function filtrarPrecioMax(autito){
    const {maximo} = autoselect;

    if(maximo){
        return autito.precio <= maximo;
    }
    return autito;
}

function filtrarPrecioMin(autito){
    const {minimo} = autoselect;

    if(minimo){
        return autito.precio >= minimo;
    }
    return autito;
}

//Llenar el carrito 

function crearListaProductos(array){
    contenedorProductos.innerHTML=''; 

    array.forEach(producto=>{
        const productosHTML = `
        <div class="producto">
        <img class="producto-clase" src="${producto.img}">
        <p class="producto-parrafo">${producto.nombre}</p>
        <p class="producto-parrafo">$${producto.precio}</p>
        <button class="producto-eliminar" id='${producto.id}'>X</button>
        </div>`;

        contenedorProductos.innerHTML += productosHTML;     
    });

    const borrarAuto = document.querySelectorAll('.producto-eliminar'); 

    borrarAuto.forEach(boton=>{
        boton.addEventListener('click',(e)=>{
            removerAuto(e); 
        })
    }) 

} 

function carritoVacio(){
    const borrarAlerta = document.querySelector('.alertaVacio');

    if(borrarAlerta){
        borrarAlerta.remove();
    }

    if(Carrito.length <1){  

        const alertaVacio = document.createElement('H5');
        alertaVacio.textContent = 'El carrito esta vacio'; 
        alertaVacio.classList.add('alertaVacio');
    
        contenedorProductos.appendChild(alertaVacio);
    } 
}

//------------------MODAL---------------------
const cerrarModalBtn = document.querySelector('.cerrar-modal');
const modal = document.querySelector('.modal');
const carritoBTN = document.querySelector('.carrito');
const contenedorProductos = document.querySelector('.contenedor-productos'); 

//eventos

carritoBTN.addEventListener('click',()=>{
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    carritoVacio() 
});

cerrarModalBtn.addEventListener('click',()=>{
    modal.style.display = 'none'; 
    document.body.style.overflow = 'auto'; 
});

//funciones

function removerAuto(e){
    const IDborrar = e.target.id;
    
    const indice = Carrito.findIndex(auto=>auto.id == IDborrar);

    if(indice != -1){
        Carrito.splice(indice, 1)
    }

    crearListaProductos(Carrito);
    cantidadCarrito.textContent = Carrito.length;
    carritoVacio()

}

function comprarProductos(){
    const btnComprar = document.querySelector('.comprar-modal')
    
    btnComprar.addEventListener('click',()=>{
        contenedorProductos.innerHTML=''

        const alertaCompra = document.createElement('DIV');
        const alertaParrafo = document.createElement('P');
        alertaParrafo.classList.add('compraParrafo');
        alertaCompra.classList.add('alertaCompra');
        alertaCompra.appendChild(alertaParrafo);
        alertaParrafo.textContent= 'Gracias por su compra'; 
        contenedorProductos.appendChild(alertaCompra);
    })


}
comprarProductos()








 


