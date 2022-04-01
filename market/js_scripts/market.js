async function market() {
    const home_data = document.getElementById('market')
    const response = await axios.get('http://127.0.0.1:8000/market/')

    if (response.status == 204) {
        home_data.appendChild(document.createTextNode("Não há jogos no Marketplace agora... Que triste"))
    } else {
        const list_products = document.createElement('ul')

        response.data.forEach(data_item => {
            const element_products = document.createElement('li')
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

            criar_botao_comprar(element_products, `${data_item.company_cnpj}`, `${data_item.product_code}`)

            const element_buy = document.createElement('input')
            element_buy.type = 'button'
            element_buy.value = 'Quero Comprar'
            // element_buy.href = `../user/make_order.html?cnpj=${data_item.company_cnpj}&code=${data_item.product_code}`
            element_buy.onclick = mostrar_botao_comprar

            document.getElementById('')

            element_products.appendChild(element_buy)
            list_products.appendChild(element_products)
            list_products.appendChild(document.createElement('br'))
        })
        home_data.appendChild(list_products)
    }
}

function criar_botao_comprar(parentElement, cnpj, codigo) {
    element_comprar_hidden = document.createElement('form')
    element_comprar_hidden.name = 'form_compra'
    element_comprar_hidden.id = 'botao_comprar_hidden'
    element_comprar_hidden.cnpj = cnpj
    element_comprar_hidden.codigo_produto = codigo

    const element_label = document.createElement('label')
    element_label.innerText = 'Quantidade de produtos que deseja:'

    const element_input_number = document.createElement('input')
    element_input_number.type = 'number'
    element_input_number.id = 'amount'
    element_input_number.required = true

    const element_input_submit = document.createElement('input')
    element_input_submit.type = 'submit'
    element_input_submit.value = 'Comprar'

    element_comprar_hidden.appendChild(element_label)
    element_comprar_hidden.appendChild(element_input_number)
    element_comprar_hidden.appendChild(element_input_submit)

    element_comprar_hidden.style.display = 'none'

    parentElement.appendChild(element_comprar_hidden)
}

function mostrar_botao_comprar() {
    console.log("Botao hidden na função de mostrar: " + document.getElementById("botao_comprar_hidden"))

    try {
        if (document.getElementById("botao_comprar_hidden").style.display == 'none') {
            document.getElementById("botao_comprar_hidden").style.display = 'block'
        } else {
            document.getElementById("botao_comprar_hidden").style.display = 'none'
        }
    } catch {
        console.log("some error")
    }
}

function comprar_jogos(cnpj, code, quantidade) {
    try {
        let url = "http://127.0.0.1:8000/order/" + cnpj + "/" + code + "/" + quantidade

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false)

        xhr.onreadystatechange = function () {
            alert("Compra de " + quantidade + " feita com sucesso, código " + code + ", cnpj " + cnpj)
        }
    } catch {
        console.log("some other error")
    }
}

function app() {
    market()
}

app()
