//variables

const emailRegistro = document.querySelector('.email-registro');
const Usuario = document.querySelector('.usuario-registro');
const ContraseñaRegistro = document.querySelector('.contraseña-registro');
const RepetirContraseñaRegistro =document.querySelector('.rptcontraseña-registro');
const contenedor = document.querySelector('.registro');   
const btnRegistro = document.querySelector('#BtnRegistro');
const spinner = document.querySelector('.loader')

const usuarioRegistrado ={
    Email: '',
    Usuario:'',
    Contraseña:''
    
}


//Evento

emailRegistro.addEventListener('input',validarCelda); 
Usuario.addEventListener('input', validarCelda);
ContraseñaRegistro.addEventListener('input',validarCelda);
RepetirContraseñaRegistro.addEventListener('input',validarCelda);
btnRegistro.addEventListener('click', cargarDatos)


//funciones

function validarCelda(e){
    const celda = e.target.parentNode; 
    const valor = e.target.value;
    const nombre = e.target.id;     

    if(valor.trim() === ''){
        errorAlerta(celda,`El campo ${nombre} es obligatorio`);
    }else if(nombre == 'Email' && !emailValido(emailRegistro.value)){
        errorAlerta(celda, 'el email no es valido');
    }else{
        limpiarAlerta(celda);
    };

    usuarioRegistrado[e.target.id] = e.target.value.trim().toLowerCase();

    habilitarSubmit()
}
        
function errorAlerta(lugar, contenido){
    limpiarAlerta(lugar);

    const crearParrafo = document.createElement('P');
    crearParrafo.classList.add('alerta-error');
    crearParrafo.textContent = contenido; 
    lugar.appendChild(crearParrafo);      
} 

function limpiarAlerta(last){
    const remover = last.querySelector('.alerta-error');
    if(remover){
        remover.remove();
    }

}

function emailValido(valorEmail){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(valorEmail); 
    return resultado;
}

function cargarDatos(){

    spinner.classList.remove('noloader')
    setTimeout(()=>{

        if(ContraseñaRegistro.value != RepetirContraseñaRegistro.value){
            errorAlerta(RepetirContraseñaRegistro.parentElement,'Las contraseñas no coinciden')
            spinner.classList.add('noloader')
            ContraseñaRegistro.value =''
            RepetirContraseñaRegistro.value=''
            return;
        }else{
            usuarioRegistrado.Email = emailRegistro.value;
            usuarioRegistrado.Usuario = Usuario.value;
            usuarioRegistrado.Contraseña = ContraseñaRegistro.value;
        
            localStorage.setItem('usuario',JSON.stringify(usuarioRegistrado));
            alert('Usuario Registrado Correctamente')
        
            window.location.href='indexLogin.html';
           
        }
        
    },2500);

}

function habilitarSubmit(){
    if(Object.values(usuarioRegistrado).includes('')){
        btnRegistro.classList.add('disabled')
    }else{
        btnRegistro.classList.remove('disabled')
    };

}

export function test(nombre){
    return console.log(nombre)  
} 