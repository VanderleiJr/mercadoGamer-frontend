window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function home() {
    try {
        const home_data = document.getElementById('home_company_profile')
        const response = await axios.get('http://127.0.0.1:8000/company/home')

        home_data.appendChild(document.createTextNode(response.data.name))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.email))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.cnpj))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.description))
    } catch (e) {
        error_message = e.message
        if(error_message.includes('401')) {
            alert('Logue-se como empresa para acessar... Redirecionando')
            window.location.href = '../company/signin.html'
        } 
    }

}

async function orders() {
    const home_data = document.getElementById('home_company_orders')
    const response = await axios.get('http://127.0.0.1:8000/company/orders')

    if(response.status == 204){
        home_data.appendChild(document.createTextNode("Sua empresa não recebeu nenhum pedido!"))
    } else {
        const list_orders = document.createElement('ul')

        response.data.forEach(data_item => {
            const element_orders = document.createElement('li')
            element_orders.innerText = data_item.game_code + ' x' + data_item.amount + ' vendido(s) para ' + data_item.customer_cpf         
            list_orders.appendChild(element_orders)
        })
        home_data.appendChild(list_orders)
    }
}

async function products() {
    const home_data = document.getElementById('home_company_products')
    const response = await axios.get('http://127.0.0.1:8000/company/products')

    if(response.status == 204){
        home_data.appendChild(document.createTextNode("Sua empresa não registrou nenhum produto!"))
    } else {
        const list_products = document.createElement('ul')

        response.data.forEach(data_item => {
            const element_products = document.createElement('li')
            element_products.innerText = data_item.product_code + ' -- Quantidade em Estoque: ' + data_item.amount         
            list_products.appendChild(element_products)
        })
        home_data.appendChild(list_products)
    }
}

function logout(){
    localStorage.clear()
    window.location.href = '../public/index.html'
}

function app(){
    home()
    orders()
    products()
}

app()
