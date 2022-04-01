async function market_code() {
    const home_data = document.getElementById('empresas_disp')
    
    code = window.location.search.split('=')[1]

    try {
        const response = await axios.get(`http://127.0.0.1:8000/market/code/${code}`)

        const element_game_name = document.createElement('h3')
        element_game_name.innerText = response.data.name
        home_data.appendChild(element_game_name)

        if(!response.data.list.length) {
            home_data.appendChild(document.createTextNode("Não há empresas vedendo este jogo agora... Que triste"))
        } else {
            const list_products = document.createElement('ul')

            response.data.list.forEach(data_item => {
                const element_products = document.createElement('li')
                const element_of_element1 = document.createElement('p')
                const element_of_element2 = document.createElement('p')
                element_of_element1.innerText = 'Sendo vendido por ' + data_item.company_cnpj
                element_products.appendChild(element_of_element1)
                element_of_element2.innerText = data_item.amount + ' produtos em estoque'
                element_products.appendChild(element_of_element2)
                    
                list_products.appendChild(element_products)
            })
            home_data.appendChild(list_products)
        }
    } catch(e) {
        alert("Este jogo não foi cadastrado no nosso Banco de Dados")
        window.location.href = '../market/market.html'
    }
}

function app(){
    market_code()
}

app()
