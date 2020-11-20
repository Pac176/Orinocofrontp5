let commandUser;
let valid = [false]

//////////////////requete Post pour envoyer commandUser(contact + products)///////////////////////////////////

async function postData() {
    try {
        const validCommande = await fetch("http://localhost:3000/api/teddies/orde", {
        method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(commandUser)
        })
        let response = await validCommande.json();
        
        if ((validCommande.status == 200) || (validCommande.status == 201)) {
            let validation = document.querySelector(".validation")
            validation.setAttribute("class", "alert alert-success reussite")
            validation.innerHTML = `<h4 class="alert-heading text-center">Bien joué!</h4>
                    <p>Votre numero de commande est le: </p>
                    <hr>
                    <p class="mb-0">${response.orderId}</p>`;
        
        } else {
            let echec = document.querySelector(".validation")
    echec.setAttribute("class","alert alert-danger echec")
    echec.innerHTML=`<h4 class="alert-heading">Echec!</h4>
                    <p>Le panier est vide!</p>
                    <hr>
                    <p class="mb-0"></p>`
       }
        
     
    } catch {
        let echec = document.querySelector(".validation")
    echec.setAttribute("class","alert alert-danger echec")
    echec.innerHTML=`<h4 class="alert-heading">Echec!</h4>
                    <p>Probleme dans la requete</p>
                    <hr>
                    <p class="mb-0">Try again!!</p>`
       
    }
} 

//////////////////////////bouton de validation//////////////////////////////////////////////


export function validation() {
    

let contact = {}
let products = []
   
let nbArticles = document.querySelector(".nbArticles")
let totalCommand = document.querySelector(".totalCommande")
let qteOurs = document.querySelector(".qteOurs")
qteOurs.innerHTML = `Quantité: ${(localStorage.getItem("Quantité"))}`
nbArticles.innerHTML = `Nombre d'item(s): ${parseInt(localStorage.getItem("nombreitem"))}`
totalCommand.innerHTML = `prix total: ${parseInt(localStorage.getItem("total"))}€`

let formControl = document.querySelectorAll(".form-control")


//////////////////////////////////generer products a partir de localstorage///////////////////////


products.push(JSON.parse(localStorage.getItem("cart")))


///////////////////////////annulation commande ///////////////////////////////////////////////


let annule = document.querySelector(".annule");
annule.addEventListener("click", function (event) {
    event.preventDefault()
    document.location.href = "http://127.0.0.1:5500/app/pages/panier.html"
    localStorage.clear()
})

/////////////////////////////////////gestion du formulaire/////////////////////////////////


for (let i = 0; i < formControl.length; i++) {
    if (formControl[i].value == "") { formControl[i].classList = "form-control is-invalid" }
   }
 
for (let i = 0; i < formControl.length; i++) {
    formControl[i].addEventListener("change", function () {
          let val = formControl[i].validity
            valid[i] = val.valid
        if (formControl[i].value == "") {
            formControl[i].classList = "form-control is-invalid";
            formControl[i].nextElementSibling.classList = "invalid-feedback"
        }
        
        else if (val.patternMismatch == false) {
             formControl[i].classList = "form-control is-valid";
             formControl[i].nextElementSibling.classList = "valid-feedback";
             formControl[i].nextElementSibling.innerHTML = "ok!!";
          } 
               
////////////////////////////////////generer le contact///////////////////////////////       
    
               
       for (let i = 0; i < formControl.length; i++){
           if (formControl[i].classList.contains("is-valid")) {
              valid[i]= formControl[i].checkValidity()
              contact[`${formControl[i].id}`] = `${formControl[i].value}`
         } else {valid[i]= formControl[i].checkValidity()}
    }  commandUser = { contact, products }
        }) 
    }    
}
 
export function btnValid() {
  
let validCommand =document.querySelector(".validCommand")
let form = document.querySelector("#order-form");
form.addEventListener("submit", function (event) {
    event.preventDefault()
})
    


validCommand.addEventListener("click", function () {
     if (valid.includes(false)){
       alert("veuiller remplir le formulaire")
     } else {
         setTimeout(function () {
             postData().then(function () { localStorage.clear(); 
                });
            }, 1500)
        }
    })
}





  

 

