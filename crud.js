document.querySelector("#salvar").addEventListener("click", cadastrar)

let tarefas = []

window.addEventListener("load", () => {
    tarefas = JSON.parse( localStorage.getItem("tarefas") ) || []
    atualizar()
})

function atualizar(){
   localStorage.setItem("#tarefas", JSON.stringify(tarefas))
    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach(tarefas=>document.querySelector("#tarefas").innerHTML += criarCard(tarefas))
    

     const total = tarefas.reduce(
        (acc, cadastrar) =>  acc += Number(tarefas.diculdade) , 0

    )
    const pontosObtidos = cadastros.filter(tarefas => tarefas.concluida).reduce((acc, cadastro) =>
        acc += Number(tarefas.diculdade), 0)

    document.querySelector("#pontuacao").innerHTML = total


}

function cadastrar() {
    const titulo = document.querySelector("#titulo").value
    const pontos = document.querySelector("#pontos").value
    const categoria = document.querySelector("#categoria").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const tarefa = { //JSON Java Script Object Notation
        titulo,
        pontos,
        categoria
    }

    if (!isValid(tarefa.titulo, document.querySelector("#titulo"))) return
    if (!isValid(tarefa.pontos, document.querySelector("#pontos"))) return

    tarefas.push(tarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    atualizar()
    modal.hide()
}

function isValid(valor, campo){
    if(valor.length == 0){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }else{
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }

}

function apagar(id){
    tarefas = tarefas.filter(tarefa=> tarefa.id !== id)
    atualizar()
}

function concluir(id){
    let tarefaEncontrada = 
            tarefas.find(tarefa => tarefa.id == id)
    tarefaEncontrada.concluida = true
    atualizar()
}


function criarCard(tarefa) {
    let disabled = tarefa.concluida ? "disabled" : ""

    const card = `
        <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">
            <div class="card-header">
                ${tarefa.titulo}
            </div>
            <div class="card-body">
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text">${tarefa.categoria}</p>
                <span class="badge text-bg-warning">${tarefa.pontos}pt</span>
            </div>
            <div class="card-footer">
                <a onClick="concluir(${tarefa.id})" href="#" class="btn btn-success ${disabled}" title="marcar como concluída">
                    <i class="bi bi-check2"></i>
                </a>
                <a href="#" onClick="apagar(${tarefa.id})" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
                </a>
            </div> <!-- card footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    ` 
    return card
}
