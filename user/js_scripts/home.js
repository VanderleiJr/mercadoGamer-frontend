window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function home() {
    try {
        const home_data = document.getElementById('home_user_profile')
        const response = await axios.get('http://127.0.0.1:8000/user/home')

        home_data.appendChild(document.createTextNode(response.data.name))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.email))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.telephone))
        home_data.appendChild(document.createElement('br'))
        home_data.appendChild(document.createTextNode(response.data.birth_date))
    } catch (e) {
        error_message = e.message
        if(error_message.includes('401')) {
            alert('Logue-se como usuário para acessar... Redirecionando')
            window.location.href = '../user/signin.html'
        } 
    }
}

async function orders() {
    const home_data = document.getElementById('home_user_orders')
    const response = await axios.get('http://127.0.0.1:8000/user/orders')

    if(response.status == 204){
        home_data.appendChild(document.createTextNode("Você não fez nenhum pedido!"))
    } else {
        const list_orders = document.createElement('ul')

        response.data.forEach(data_item => {
            const element_orders = document.createElement('li')
            element_orders.innerText = data_item.game_code + ' x' + data_item.amount + ' comprados da empresa ' + data_item.market_cnpj  
            list_orders.appendChild(element_orders)
        })
        home_data.appendChild(list_orders)
    }
}

function logout(){
    localStorage.clear()
    window.location.href = '../public/index.html'
}

function marketplace(){
    window.location.href = '../market/market.html'
}

function app(){
    home()
    orders()
}

app()
