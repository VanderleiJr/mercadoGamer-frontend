window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

function new_product_db() {
    const form_new_product = document.getElementById('form_new_product')

    form_new_product.onsubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post('http://127.0.0.1:8000/company/products/new', {
                name: form_new_product.name.value,
                upc_ean: form_new_product.upc_ean.value,
                region: form_new_product.region.value,
                console: form_new_product.console.value,
                year: form_new_product.year.value,
                price: form_new_product.price.value,
                description: form_new_product.description.value
            })
            alert(`Jogo ${form_new_product.name.value} cadastrado com sucesso no Banco de Dados`)
        } catch(e) {
            error_message = e.message
            if(error_message.includes('409')) {
                alert('Jogo já cadastrado...')
            } else if(error_message.includes('401')) {
                alert('Logue-se como empresa para acessar... Redirecionando')
                window.location.href = '../company/signin.html'
            } 
        }
    }
}

function app(){
    new_product_db()
}

app()
