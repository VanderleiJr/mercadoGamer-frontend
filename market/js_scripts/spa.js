let botao_comprar = document.getElementById("comprar")
botao_comprar.addEventListener("click", comprar_itens)

function comprar_itens() {
    let inputQuantidade = document.getElementsById("quantidade")
    let url = "request.com/" + inputQuantidade

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)

    xhr.onreadystatechange = function () {
        alert("Compra de " + inputQuantidade + " feita com sucesso")
        atualizarItens()
    }
}

function atualizarItens() {
    continue
}
