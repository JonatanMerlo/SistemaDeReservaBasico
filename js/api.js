if (localStorage.getItem('user') == null) {
    location.href = '../index.html'
}
window.addEventListener('load', () => {
    let avalibleTimesLocalStorage = JSON.parse(localStorage.getItem('avalibleTimes'))
    let cerrarSesion = document.querySelector('a')
    let contenedorHorarios = document.querySelector('ul')
    let saludo = document.querySelector('span')
    let usuarioJSON = localStorage.getItem('user')
    let usuario = JSON.parse(usuarioJSON)

    saludo.innerHTML = `${usuario.firstName}`
    

    for (let i = 0; i < avalibleTimes.length; i++) {
        if(avalibleTimesLocalStorage == null){
            renderizarHorarios(avalibleTimes,usuario,contenedorHorarios,i)
        }else{
            renderizarHorarios(avalibleTimesLocalStorage,usuario,contenedorHorarios,i)
            avalibleTimes = avalibleTimesLocalStorage;
        }

    }

    let horariosLi = document.querySelectorAll('li')

    horariosLi.forEach((horarioLi, index) => {
        horarioLi.addEventListener('click', () => {
            if(horarioLi.classList.contains('selected')){
                    horarioLi.removeAttribute('id')
                    horarioLi.classList.remove('selected')
                    avalibleTimes[index].userId = ""
                    avalibleTimes[index].reserved = false;

            }else if(!horarioLi.classList.contains('selectedForOtherUser')){
                horarioLi.setAttribute('id',usuario.id)
                horarioLi.classList.add('selected')
                avalibleTimes[index].userId =  usuario.id
                avalibleTimes[index].reserved = true;
            }
            
            console.log(horarioLi.getAttribute('id'))
            avalibleTimesLocalStorage = avalibleTimes;
            actualizarLocalStorage(avalibleTimesLocalStorage)
        })
    })
    
    terminarSesion(cerrarSesion)
    

})

function terminarSesion(cerrarSesion) {
    cerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('user')
        location.href = './login.html'

    })
}

function actualizarLocalStorage(avalibleTimesLocalStorage){
    localStorage.setItem('avalibleTimes', JSON.stringify(avalibleTimesLocalStorage));
}

function actualizarEstadoReserva(avalibleTimes){
    localStorage.setItem('avalibleTimes', JSON.stringify(avalibleTimes))
}

function renderizarHorarios(avalibleTimes, usuario,contenedorHorarios,i) {
    let li = document.createElement('li')
    li.style.cursor = 'pointer'
    if (avalibleTimes[i].reserved) {
        if(usuario.id !== avalibleTimes[i].userId){
            li.classList.remove('selected')
            li.classList.add('selectedForOtherUser')
            li.style.cursor = ''
        }else{
            li.classList.add('selected')
            li.classList.remove('selectedForOtherUser')
            li.setAttribute('id',avalibleTimes[i].userId)
        }
    }
    li.innerHTML = avalibleTimes[i].time;
    contenedorHorarios.appendChild(li)
}