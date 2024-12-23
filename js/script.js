function geraCor(){
    let display = document.querySelector('.display')
    
    document.addEventListener('click', event => {
        const e = event.target
        
        let container = document.querySelector('.container')

        let cor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        
        console.log(cor)

        if(e.classList.contains('geraCor')){
            display.style.backgroundColor = cor
            display.innerText = cor
            container.style.backgroundColor = cor
        }

    })

}

geraCor()