window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function products() {
    const home_data = document.getElementById('home_company_products')
    const response = await axios.get('http://127.0.0.1:8000/company/products')

    if(response.status == 204){
        home_data.appendChild(document.createTextNode("Sua empresa não registrou nenhum produto!"))
    }
}

function app(){
    products()
}

app()
