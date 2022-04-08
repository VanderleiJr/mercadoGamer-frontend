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
    // Recebo o forms completo do HTML
    const home_data = document.getElementById('home_company_products')
    
    // Seto a URL
    const urlRequest = "http://127.0.0.1:8000/company/products"

    // Abro a requisição como GET
    let xhr = new XMLHttpRequest()
    xhr.open('GET', urlRequest, true)
    xhr.responseType = 'json'
    

    // Mudo o cabeçalho de Authorization e o Content-Type
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'))
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xhr.onload = function() {
        
        if(xhr.status == '204'){
            home_data.appendChild(document.createTextNode("Sua empresa não registrou nenhum produto!"))
        } else {
            let data = xhr.response
            const list_products = document.createElement('ul')
            list_products.id = 'lista'

            data.forEach(data_item => {
                const element_products = document.createElement('li')
                element_products.innerText = data_item.product_code + ' -- Quantidade em Estoque: ' + data_item.amount         
                list_products.appendChild(element_products)
            })

            home_data.appendChild(list_products)
        }
    }
    xhr.send(null)
    
}

function reload_product() {
    // Recebo o forms completo do HTML
    const home_data = document.getElementById('home_company_products')
    
    // Seto a URL
    const urlRequest = "http://127.0.0.1:8000/company/products"

    // Abro a requisição como GET
    let xhr = new XMLHttpRequest()
    xhr.open('GET', urlRequest, true)
    xhr.responseType = 'json'

    // Mudo o cabeçalho de Authorization e o Content-Type
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'))
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    // Atualiza sempre que há uma atualização na função
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === '204'){
                home_data.appendChild(document.createTextNode("Sua empresa não registrou nenhum produto!"))
            } else {
                let data = xhr.response
                
                // Cria uma lista com o ID='lista'
                const list_products = document.createElement('ul')
                list_products.id = 'lista'

                // Preenche a lista
                data.forEach(data_item => {
                    const element_products = document.createElement('li')
                    element_products.innerText = data_item.product_code + ' -- Quantidade em Estoque: ' + data_item.amount     
                    list_products.appendChild(element_products)
                })

                // Substitui a lista antiga pela nova, com os dados atualizados
                home_data.replaceChild(list_products, lista)
            }
        }
    }
    // Métodos GETS, são enviados com o parametro NULL
    xhr.send(null)
}

function new_product_stock() {
    event.preventDefault()

    // Recebo o forms completo do HTML
    const form_new_stock = document.getElementById('form_new_stock')

    // Retiro as informações e salvo em variáveis
    let upc_ean = form_new_stock.upc_ean.value
    let amount = form_new_stock.amount.value
    const urlRequest = "http://127.0.0.1:8000/company/products"

    // Abro a requisição como POST
    let xhr = new XMLHttpRequest()
    xhr.open('POST', urlRequest, true)

    // Mudo o cabeçalho de Authorization e o Content-Type
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'))
    
    // Quando o estado for atualizado, faça isso:
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {    // Necessário pra somente executar na última mudança de estado
            if(xhr.status == '404') {       
                alert('Não há um jogo com este código, verifique e tente novamente!')
            } else if(xhr.status == '401') {
                alert('Logue-se como empresa para acessar... Redirecionando')
                window.location.href = '../company/signin.html'
            } else {
                reload_product()
            }
        }
    }

    // Envia as informações em forma de JSON ao backend
    let data = { 'product_code': upc_ean, 'amount': amount }
    
    // Ao enviar pelo método POST, necessita de 'dados'
    xhr.send(JSON.stringify(data));
}


function logout(){
    localStorage.clear()
    window.location.href = '../public/index.html'
}

home()
orders()
products()

let bnt = document.getElementById("btn_stock")
bnt.addEventListener("click", new_product_stock)

