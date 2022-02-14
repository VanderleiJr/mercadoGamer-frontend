window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

cnpj = window.location.search.split('=')[1].split('&')[0]
code = window.location.search.split('=')[2]

async function make_order(){
    const form_order_data = document.getElementById('order_form_amount')

    form_order_data.onsubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`http://127.0.0.1:8000/order/${cnpj}/${code}/${form_order_data.amount.value}`)
            window.location.href = '../user/home.html'
            return false
        } catch(e) {
            error_message = e.message
            if(error_message.includes('404')){
                alert("Não há estoque desse produto para esse pedido!")
            } else {
                alert("Você precisa estar logado para realizar uma compra!")
                window.location.href = '../user/signin.html'
            }
            
        }
    }


}


function app(){
    make_order()
}

app()