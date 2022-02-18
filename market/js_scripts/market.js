async function market() {
    const home_data = document.getElementById('market')
    const response = await axios.get('http://127.0.0.1:8000/market/')

    if(response.status == 204){
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
            
            const element_buy = document.createElement('a')
            element_buy.innerText = 'Comprar'
            element_buy.href = `../user/make_order.html?cnpj=${data_item.company_cnpj}&code=${data_item.product_code}`
            element_products.appendChild(element_buy)

            list_products.appendChild(element_products)
            list_products.appendChild(document.createElement('br'))
        })
        home_data.appendChild(list_products)
    }
}

function app(){
    market()
}

app()
