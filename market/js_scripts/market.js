try { 
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
} catch {
    console.log("No authorization")
}

async function market() {
    const home_data = document.getElementById('market')
	/* removing axios
    try {
        const response = getProdutos()
    } catch (error) {
        console.error(error)
    }
    */
    const response = await axios.get('http://127.0.0.1:8000/market/')

    if (response.status == 204) {
        home_data.appendChild(document.createTextNode("Não há jogos no Marketplace agora... Que triste"))
    } else {
        const list_products = document.createElement('ul')
        let i = 0

        response.data.forEach(data_item => {
            const element_products = document.createElement('li')
            try {element_products.index_ = i} catch {console.log("i is undefined while trying to index it")}
            const element_of_element1 = document.createElement('a')
            const element_of_element2 = document.createElement('a')

            element_of_element1.innerText = 'Jogo ' + data_item.product_code
            element_of_element1.href = `../market/code.html?code=${data_item.product_code}`
            element_products.appendChild(element_of_element1)
            element_products.appendChild(document.createElement('br'))

            if (data_item.amount > 0) {
                element_of_element2.innerText = 'Sendo vendido por ' + data_item.company_cnpj + ' com estoque de ' + data_item.amount + ' peças'
            } else {
                element_of_element2.innerText = 'Era vendido por ' + data_item.company_cnpj + ', porém, estão sem estoque!'
            }
            element_of_element2.href = `../market/cnpj.html?cnpj=${data_item.company_cnpj}`
            element_products.appendChild(element_of_element2)
            element_products.appendChild(document.createElement('br'))

            criar_botao_comprar(element_products, `${data_item.company_cnpj}`, `${data_item.product_code}`, i)

            const element_buy = document.createElement('button')
            element_buy.innerText = 'Quero Comprar'
            element_buy._index = i
            // element_buy.href = `../user/make_order.html?cnpj=${data_item.company_cnpj}&code=${data_item.product_code}`
            element_buy.onclick = mostrar_botao_comprar.bind(element_buy, element_buy) 

            element_products.appendChild(element_buy)
            list_products.appendChild(element_products)
            list_products.appendChild(document.createElement('br'))
            try {i = i + 1} catch {console.log("i is undefined while trying to sum it.")}
        })
        home_data.appendChild(list_products)
    }
}

function criar_botao_comprar(parentElement, cnpj, codigo, _index) {
    console.log("Criar botao comprar: |cnpj|codigo|:" + cnpj +"|"+codigo)

    const element_comprar_hidden = document.createElement('div')
    element_comprar_hidden.id = 'botao_comprar_hidden_class'

    const element_label = document.createElement('label')
    element_label.innerText = 'Quantidade de produtos que deseja:'

    const element_input_number = document.createElement('input')
    element_input_number.type = 'number'
    element_input_number.id = 'amount'
    element_input_number.name = 'item_amount'
    element_input_number.required = true

    const element_input_submit = document.createElement('button')
    // element_input_submit.type = 'submit'
    element_input_submit.innerText = 'Comprar'
    element_input_submit.onclick = function () { comprar_jogos(cnpj, codigo, _index) }

    element_comprar_hidden.appendChild(element_label)
    element_comprar_hidden.appendChild(element_input_number)
    element_comprar_hidden.appendChild(element_input_submit)

    element_comprar_hidden.style.display = 'none'

    parentElement.appendChild(element_comprar_hidden)
}

function mostrar_botao_comprar(btn) {
    div = btn.parentElement.children[4]
    try {
        if (div.style.display == 'none') {
            div.style.display = 'block'
        } else if (div.style.display == 'block'){
            div.style.display = 'none'
        } else {
            div.style.display = 'block'
        }
    } catch {
        console.log("Erro ao mudar visibilidade de botão")
    }
}

function mostrar_botao_comprar_indice(i) {
    console.log("Tentando mostrar botao comprar com indice: " + i)
    btn = document.getElementsByName('botao_comprar_hidden')[i]

    try {
        if (btn.style.display == 'none') {
            btn.style.display = 'block'
        } else {
            btn.style.display = 'none'
        }
    } catch {
        console.log("Erro ao mudar visibilidade de botão")
    }
}

function getProdutos() {
    let url = 'http://127.0.0.1:8000/market/'
    try {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)

        xhr.send()
        
        xhr.addEventListener("load", function () {
            return this.responseText;
        });

    } catch (error) { console.error(error)}
}

function comprar_jogos(cnpj, code, indice) {
    let quantidade = quantidadeIndex(indice)
    console.log("Comprar jogos sendo chamado com, CNPJ: "+cnpj+", codigo:"+code+", quantidade:"+quantidade)

    if (quantidade < 0) {
        alert("Quantidade inválida!")
        return null
    }

    try {
        let server = "http://127.0.0.1:8000"
        let path = "/order/" + cnpj + "/" + code + "/" + quantidade
        let url = server + path

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true)
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

        xhr.addEventListener("load", function () {
            console.log("Compra de " + quantidade + " feita com sucesso")
            console.log(this.responseText);
            if (this.readyState == 4 && this.status == 201) {
                atualizarItens(indice, quantidade)
            } else if (this.status == 404) {
                alert(`Não foi possível comprar ${quantidade} do item ${code}`)
            }
        });

        xhr.send()

    } catch (error) {
        console.error(error);
    }
}

function quantidadeIndex(indice){
    return document.getElementsByName("item_amount")[indice].value
}

function getIndex(form) {
    try {return form.parentElement.index_} catch {console.log("Não consegui retornar o index.\nform: " + form)}
}

function atualizarItens(indice, quantidadeComprada) {
    a_tag = document.getElementsByTagName('li')[indice].children[2]

    textoEmLista = a_tag.text.split(' ')
    qtdAtual = textoEmLista[7]
    novaQtd = String(qtdAtual - quantidadeComprada)
    textoEmLista[7] = novaQtd

    a_tag.text = textoEmLista.join([' '])
    console.log("Novo texto: " + textoEmLista.join([' ']))

}

function app() {
    market()
}

app()
