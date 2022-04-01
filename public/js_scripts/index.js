let user_button = document.getElementById("user_button")
user_button.addEventListener("click", user_links)

let company_button = document.getElementById("comp_button")
company_button.addEventListener("click", company_links)

function user_links(){
    try {
        if (document.getElementById("signup-user").style.display == 'none') {
            document.getElementById("signup-user").style.display = 'block';
            document.getElementById("signin-user").style.display = 'block';
            user_button.innerText = "ÁREA DO USUÁRIO ⇈";
        } else {
            document.getElementById("signup-user").style.display = 'none';
            document.getElementById("signin-user").style.display = 'none';
            user_button.innerText = "ÁREA DO USUÁRIO ⇊";
        }
    } catch {
        console.log("Não foi possível chamar a função!")
    }
}

function company_links(){
    try {
        if (document.getElementById("signup-company").style.display == 'none') {
            document.getElementById("signup-company").style.display = 'block';
            document.getElementById("signin-company").style.display = 'block';
            company_button.innerText = "ÁREA DA EMPRESA ⇈";
        } else {
            document.getElementById("signup-company").style.display = 'none';
            document.getElementById("signin-company").style.display = 'none';
            company_button.innerText = "ÁREA DA EMPRESA ⇊";
        }
    } catch {
        console.log("Não foi possível chamar a função!")
    }
}
