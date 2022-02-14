window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function orders() {
    const home_data = document.getElementById('home_company_orders')
    const response = await axios.get('http://127.0.0.1:8000/company/orders')

    if(response.status == 204){
        home_data.appendChild(document.createTextNode("Sua empresa não recebeu nenhum pedido!"))
    } else {
        const list_orders = document.createElement('ul')

        response.data.forEach(data_item => {
            const element_orders = document.createElement('li')
            const element_of_element1 = document.createElement('p')
            const element_of_element2 = document.createElement('p')
            element_of_element1.innerText = 'Pedido #' + data_item.id + ' Data: ' + data_item.order_date
            element_orders.appendChild(element_of_element1)
            element_of_element2.innerText = data_item.amount + 'x ' + data_item.game_code + ' vendido(s) para: ' + data_item.customer_cpf
            element_orders.appendChild(element_of_element2)
                
            list_orders.appendChild(element_orders)
        })
        home_data.appendChild(list_orders)
    }
}

function app(){
    orders()
}

app()
