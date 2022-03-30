async function market_cnpj() {
    const home_data = document.getElementById('marketplace')
    
    cnpj = window.location.search.split('=')[1]

    try {
        const response = await axios.get(`http://127.0.0.1:8000/market/cnpj/${cnpj}`)
        
        const element_game_name = document.createElement('h3')
        element_game_name.innerText = response.data.name
        home_data.appendChild(element_game_name)

        if(!response.data.list.length) {
            home_data.appendChild(document.createTextNode("Não há jogos sendo vendidos por essa empresa"))
        } else {
            const list_products = document.createElement('ul')

            console.log(response.data.list.length)

            response.data.list.forEach(data_item => {
                const element_products = document.createElement('li')
                const element_of_element1 = document.createElement('p')
                const element_of_element2 = document.createElement('p')
                element_of_element1.innerText = 'Produto ' + data_item.product_code
                element_products.appendChild(element_of_element1)
                element_of_element2.innerText = data_item.amount + ' unidades em estoque'
                element_products.appendChild(element_of_element2)
                    
                list_products.appendChild(element_products)
            })
            home_data.appendChild(list_products)
        }
    } catch(e) {
        alert("Esta empresa não foi cadastrada no nosso Banco de Dados")
        window.location.href = '../market/market.html'
    }
}

function app(){
    market_cnpj()
}

app()
