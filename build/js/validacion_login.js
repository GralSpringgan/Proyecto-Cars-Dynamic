const loginEmail = document.querySelector('.emailIngresa');
const loginContraseña = document.querySelector('.contraseñaIngresa');
const btnLogin = document.querySelector('#BtnLogin');
const loadin = document.querySelector('.loader')
const datosLs = JSON.parse(localStorage.getItem('usuario'));
 
//evento

btnLogin.addEventListener('click', ingresar);
loginEmail.addEventListener('input', valores);
loginContraseña.addEventListener('input', valores);

//funciones

function valores(e){
    const campo = e.target.id
    
    if(loginContraseña.value.trim()==='' && loginEmail.value.trim()===''){
        alerta('los campos no pueden ir vacios')
    }else{
        limpiarAlertas()
    }
}

function ingresar(){
    if(loginEmail.value === datosLs.Email && loginContraseña.value === datosLs.Contraseña){
        console.log('los datos son iguales')
        loadin.classList.remove('noloader')

        setTimeout(()=>{
            loadin.classList.add('noloader')
            window.location.href = 'Car.html'
        },3000)

    }else{
        loginContraseña.value='';
        alerta('El email o contraseña no son correctos');
    }
}

function alerta(contenido){
    limpiarAlertas()

    const alerta = document.createElement('P');
    alerta.classList.add('alerta-error');
    alerta.textContent= contenido;
    loginContraseña.parentNode.appendChild(alerta);
}

function limpiarAlertas(){
    const limpiar = document.querySelector('.alerta-error');

    if(limpiar){
        limpiar.remove();
    }
}


