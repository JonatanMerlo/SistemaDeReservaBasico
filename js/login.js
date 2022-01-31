if (localStorage.getItem('users') == null) {
    localStorage.setItem("users", JSON.stringify(usuariosDB))
}
window.addEventListener('load', () =>{
    let usuariosLocalStorage = JSON.parse(localStorage.getItem('users'))
    const LOGIN = document.forms[0]
    let spans = document.querySelectorAll('span')
    let input = document.querySelectorAll('input')
    

    LOGIN.addEventListener('submit', (e) =>{
        e.preventDefault();
        let vacio = elementoVacio(this.userName.value) || elementoVacio(this.userPassword.value)
        if(!vacio){
            userExist(userName.value, userPassword.value, usuariosLocalStorage)
            LOGIN.reset()
        }else{
            if (elementoVacio(this.userName.value && elementoVacio(this.userPassword.value))) {
                errorElementosVacios(spans[1], input[1])
                errorElementosVacios(spans[0], input[0])
            }else if(elementoVacio(this.userPassword.value)){
                errorElementosVacios(spans[1], input[1])
            }else{
                errorElementosVacios(spans[0], input[0])
            }

        }
    })

    function userExist(userName, userPassword, usuarios){
        let existe = false;
        usuarios.forEach(usuario => {
            if(usuario.userName == userName && usuario.userPassword == userPassword){
                existe = true;
                localStorage.setItem('user', JSON.stringify(usuario))
                location.href = './api.html'
            }
        })
        if(!existe){
            for (let i = 0; i < 2; i++) {
                spans[i].classList.remove('hidden')
                input[i].classList.add('errorBox')
                
            }
            setTimeout(() => {
                for (let i = 0; i < 2; i++) {
                    spans[i].classList.add('hidden')
                    input[i].classList.remove('errorBox')
                    
                }
            }, 3000)
            
        }
        
        
    }
})

function elementoVacio(elemento) {
    let vacio = false;
    if (elemento.length == 0) {
        vacio =  true;
    }
    return vacio;
}

function errorElementosVacios(span, input){
    span.innerHTML = "El campo no puede estar vacio"
    span.classList.remove('hidden')
    input.classList.add('errorBox')
    setTimeout(() => {
        span.classList.add('hidden')
        input.classList.remove('errorBox')
    }, 3000)
}
