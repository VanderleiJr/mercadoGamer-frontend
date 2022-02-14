window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

function new_product_stock() {
    const form_new_stock = document.getElementById('form_new_stock')

    form_new_stock.onsubmit = async (event) => {
        event.preventDefault()


        try {
            await axios.post('http://127.0.0.1:8000/company/products', {
                product_code: form_new_stock.upc_ean.value,
                amount: form_new_stock.amount.value
            })
            alert(`Jogo ${form_new_stock.upc_ean.value} cadastrado com sucesso no Estoque`)
        } catch(e) {
            error_message = e.message
            if(error_message.includes('404')) {
                alert('Não há um jogo com este código, verifique e tente novamente!')
            } else if(error_message.includes('401')) {
                alert('Logue-se como empresa para acessar... Redirecionando')
                window.location.href = '../company/signin.html'
            } 
        }
    }
}

function app(){
    new_product_stock()
}

app()
