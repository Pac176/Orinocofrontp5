
let commandUser;
let valid = [false]

//////////////////requete Post pour envoyer commandUser(contact + products)///////////////////////////////////
let validCommande;

function postData() {
    validCommande = fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(commandUser), mode:'cors'
    }).then(response => response.json()); return validCommande
}
 
function affichageValidation(response) {
       if (response.orderId) {
    let prixTotal = localStorage.getItem("total")
    let validation = document.querySelector(".validation")
    validation.setAttribute("class","alert alert-success reussite")
           validation.innerHTML = `<h4 class="alert-heading text-center">Commande validée!</h4>
                    <hr>
                    <p>Prix total: ${prixTotal}</p>
                    <p>Votre numero de commande est le: </p>
                    <p class="mb-0">${response.orderId}</p>
                    <hr>
                    <p> Vous allez recevoir une confirmation a l'adresse suivante: ${commandUser.contact.email}</p>`;
           localStorage.clear()
           
   } else {
    let echec = document.querySelector(".validation")
    echec.setAttribute("class","alert alert-danger echec")
    echec.innerHTML=`<h4 class="alert-heading">Echec!</h4>
                    <p>La requete n'a pas aboutie</p>
                    <hr>
                    <p class="mb-0">Vérifier que le panier n'est pas vide</p>`
  }
}

function affichageErreure(e) {
    let echec = document.querySelector(".validation")
    echec.setAttribute("class","alert alert-danger echec")
    echec.innerHTML=`<h4 class="alert-heading">Echec!</h4>
                    <p>Erreure au moment de la requete!</p>
                    <hr>
                    <p class="mb-0">${e.message}</p>`
}

/////////////////////////bouton de validation//////////////////////////////////////////////


export function validation() {
    
    let nbArticles = document.querySelector(".nbArticles")
    let totalCommand = document.querySelector(".totalCommande")
    let qteOurs = document.querySelector(".qteOurs")
        qteOurs.innerHTML = `Quantité: ${(localStorage.getItem("Quantité"))}`
        nbArticles.innerHTML = `Nombre d'item(s): ${parseInt(localStorage.getItem("nombreitem"))}`
        totalCommand.innerHTML = `prix total: ${parseInt(localStorage.getItem("total"))}€`
    let formControl = document.querySelectorAll(".form-control")
   
    ///////////////////////////annulation commande ///////////////////////////////////////////////

    let annule = document.querySelector(".annule");
        annule.addEventListener("click",  (event) => {

        if (confirm("Etes vous sur de vouloir annuler votre commande?")) {
            event.preventDefault()
            document.location.href = "http://127.0.0.1:5500/app/pages/index.html"
            localStorage.clear()
            // Code à éxécuter si le l'utilisateur clique sur "OK"
} else {
    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
}
         
    })

    /////////////////////////////////////gestion du formulaire/////////////////////////////////

    for (let i = 0; i < formControl.length; i++) {
        formControl[i].addEventListener("change", () => {
            let val = formControl[i].validity
            
            if (val.valueMissing == true || val.patternMismatch == true) {
                valid[i] = val.valid
                formControl[i].classList = "form-control is-invalid"
                formControl[i].nextElementSibling.classList = "invalid-feedback";
                formControl[i].nextElementSibling.innerHTML = `${formControl[i].id} is not valid`
            
                   
            } else if (formControl[i].validity.patternMismatch == false) {
                valid[i] = val.valid
                formControl[i].classList = "form-control is-valid";
                formControl[i].nextElementSibling.classList = "valid-feedback";
                formControl[i].nextElementSibling.innerHTML = "champ valide"
            }
        
            /////////////////////////////////////generer commandUser pour la requete post///////////////////////////////   
            let contact = {}
            let products = []
            products.push(JSON.parse(localStorage.getItem("cart")))
            for (let i = 0; i < formControl.length; i++) {
                if (formControl[i].classList.contains("is-valid")) {
                    valid[i] = formControl[i].checkValidity()
                    contact[`${formControl[i].id}`] = `${formControl[i].value}`
                } else { valid[i] = formControl[i].checkValidity() }
            } commandUser = { contact, products }
        })
    }
}
 
///////////////////////////////////////////////////////requete post si le formulaire est valide

export function btnValid() {
  
let validCommand =document.querySelector(".validCommand")
let form = document.querySelector("#order-form");
    form.addEventListener("submit", () => {
        event.preventDefault()
    })
    
validCommand.addEventListener("click", () => {
        if (!JSON.parse(localStorage.getItem("cart"))) {
           alert("Vous ne pouvez pas commander, le panier est vide")
        }
        else if (valid.includes(false)){
            alert("veuiller remplir le formulaire")
       } else {
        setTimeout(function () {
        postData().then(response => affichageValidation(response))
        .catch(error => affichageErreure(error) )}, 1500)
        }
    })
}





  

 

