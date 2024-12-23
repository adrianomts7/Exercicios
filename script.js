const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi(){
    const li = document.createElement('li')
    return li
}

inputTarefa.addEventListener('keypress', e => {
    if(e.keyCode === 13){
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
        limpaInput()
    }
})

function limpaInput(){
    inputTarefa.value = ' '
    inputTarefa.focus()
}

function criaBotaoApagar(li){
    li.innerText += ' '
    const botaApagar = document.createElement('button')
    botaApagar.innerText = 'Apagar'
    botaApagar.setAttribute('class', 'apagar')
    li.appendChild(botaApagar)
}

function criaTarefa(textoInput){
    const li = criaLi()
    li.innerText = textoInput
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', () => {
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', event => {
    const e = event.target

    if(e.classList.contains('apagar')){
        e.parentElement.remove()
        salvarTarefas()
    }

})

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaTarefas = []

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefaSalvas(){
    const tarefa = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(tarefas)

    for(let tarefa of listaTarefas){
        criaTarefa(tarefa)
    }

}

adicionarTarefaSalvas()