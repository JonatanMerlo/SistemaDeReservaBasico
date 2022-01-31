window.addEventListener('load', () => {
    let usuariosLocalStorageJSON = localStorage.getItem('users')
    let usuariosLocalStorage = JSON.parse(usuariosLocalStorageJSON)
    const ERROR = document.querySelectorAll('span')
    const CARACTERESNOVALIDOS = ['1','2','3','4','5','6','7','8','9','0',',','.',';',':','-','_','[','[','^','}',']','*','~','+','¡','¿','?','|','°','¬','!','#','$','%','&','(',')','=']
    const FORM = document.forms[0];


    FORM.addEventListener('submit', (e)=>{
        e.preventDefault()
        let firstName = this.firstName.value;
        let lastName = this.lastName.value;
        let email = this.email.value;
        let userName = this.userName.value;
        let userPassword = this.userPassword.value;
        let repeatPassword = this.repeatPassword.value;
        let id = Math.round(Math.random()*10000000000 + 100000)

        let algunCampoVacio = elementoVacio(firstName) || elementoVacio(lastName) || elementoVacio(email) || elementoVacio(userName) || elementoVacio(userPassword) || elementoVacio(repeatPassword)
        let sonIguales = contraseñasIguales(userPassword, repeatPassword)
        let esEmail = esUnEmail(email)

            if (!algunCampoVacio && sonIguales && esEmail) {
                let user = {
                    id:id,
                    firstName:firstName,
                    lastName:lastName,
                    userName:userName,
                    userPassword:userPassword
                }

                usuariosLocalStorage.push(user)
                localStorage.setItem("users", JSON.stringify(usuariosLocalStorage))

                user = {};

                location.href = "../index.html"
            }
            if(!esEmail && !elementoVacio(email)){
                ERROR[2].classList.remove("hidden")
                ERROR[2].innerHTML = "Debe ser un email valido"
                this.email.classList.add("errorBox")
                setTimeout(() => {
                    ERROR[2].classList.add("hidden")
                    this.email.classList.remove("errorBox")
                },5000)
            }
            if(!sonIguales && !elementoVacio(userPassword) && !elementoVacio(repeatPassword)){
                ERROR[4].classList.remove("hidden")
                ERROR[5].classList.remove("hidden")
                ERROR[4].innerHTML = "Las contraseñas deben ser iguales"
                ERROR[5].innerHTML = "Las contraseñas deben ser iguales"
                this.userPassword.classList.add("errorBox")
                this.repeatPassword.classList.add("errorBox")
                setTimeout(() => {
                    ERROR[4].classList.add("hidden")
                    ERROR[5].classList.add("hidden")
                    this.userPassword.classList.remove("errorBox")
                    this.repeatPassword.classList.remove("errorBox")
                },5000)   
            }
            if(algunCampoVacio){
                for (let i = 0; i < 6; i++) {
                    if(FORM[i].value.length == 0){
                        ERROR[i].innerHTML = "El campo no puede estar vacio"
                        ERROR[i].classList.remove("hidden");
                        FORM[i].classList.add("errorBox")
                    };                
                }
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => {
                        ERROR[i].classList.add("hidden");
                        FORM[i].classList.remove("errorBox")
                    }, 4000)
                }
            }
            
    }) 



    
}) 


function elementoVacio(elemento) {
    let vacio = false;
    if (elemento.length == 0) {
        vacio =  true;
    }
    return vacio;
}

function caracteresValidos(caracteresInvalidos, elemento) {
    let contieneCaracterInvalido = false
    caracteresInvalidos.forEach(caracter, () =>{
        if(elemento.contains(caracter)){
            contieneCaracterInvalido = true;
        }
    })

    return contieneCaracterInvalido;
}

function esUnEmail(email){
    if(email.includes('@')){
        return true
    }
    return false
}

function contraseñasIguales(contraseña, repetirContrasenia){
    if(contraseña === repetirContrasenia){
        return true
    }
    return false
}


