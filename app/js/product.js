import { Cart } from "./Cart.js"
let cartClass = new Cart()


let urlTeddies = "http://localhost:3000/api/teddies"  ////url API

//////////////////////////construction de l'url de chaque produit pour le 2e requete/////////////////////

const searchParams = new URLSearchParams(window.location.search);
const urlId = searchParams.get("id");
const urlApiId = urlTeddies + "/" + urlId



///////////////////2eme requete avec ID////////////////////////////////////////

 export async function getDataIdFromApi() {
  try {              
    const reponse = await fetch(urlApiId);
    let product = await reponse.json();
    return product
  }catch (erreur) {
    alert(`Erreur: ${erreur.message}`)
  };
   
 }

//////////////////////fonction affichage du detail produit////////////////////////////////

export function showProductDetail(productFromApi) {
  let target = document.querySelector(".teddies");
    target.setAttribute("style", "justify-content:center")
    target.innerHTML = ""
  let domproduct = document.createElement("product");
    target.appendChild(domproduct);
    domproduct.classList.add("teddie", "col-12", "col-md-9", "col-lg-9", "col-xl-6")
    domproduct.innerHTML = `<div class="card cardDetail" style="text-decoration: none; color:black; display:flex;  ">
                                            <div class="card-body">
                                              <h2 style="font-family: 'Schoolbell', cursive;" class="card-title text-center">${productFromApi.name}</h2>
                                              <img style="width:50% justify-content:center" id="${productFromApi._id}" class="card-img-top" src="${productFromApi.imageUrl}" alt="..."><br>
                                              
                                              <p><u>Description du produit:</u></p>
                                              <p class="card-text description"><em>${productFromApi.description}</em></p>
                                              <div class="selecteurOption" ><select class="selectpicker" style="width:75%;"></select></div>
                                              <p class="card-text prix"><strong>${productFromApi.price / 100}€</strong></p>
                                              
                                              <button id="btn_panier" type="button" class="btn btn-outline-success">Ajouter au panier</button>
                                            </div>
                                        </div>`
  
//////////////////////////////////////////////////////////////////ajout option couleur//////////////////////////////////
  
  let selectOption = document.querySelector(".selectpicker");
  let optionTitle = document.createElement("option");
    optionTitle.innerHTML = "selectionnez la couleur..." 
    selectOption.appendChild(optionTitle)
      for (let value of productFromApi.colors) { 
            let option = document.createElement("option");
            selectOption.appendChild(option)
              option.innerHTML = `${value}`
  }
  
  /////////////////////////////////////////////////////////////////////Erreure en cas de selection sans couleur ou ajout au panier////////////////////////////////////////

    let btnPanier = document.querySelector("#btn_panier");
    let selectColor = document.querySelector(".selectpicker")
      btnPanier.addEventListener("click", () => {
        if (selectColor.value == "selectionnez la couleur...") {
          return alert("veuillez selectionner une couleur")
        }else {
          cartClass.addToCart(productFromApi)   ////////////////////appel de la fonction de la class cart
          cartClass.cartNotification         
         
    }  
  }) 
}
////////////////////////////////////////////fonction page produit

export function pageProduct(){
getDataIdFromApi().then(function (product) {
showProductDetail(product); //appel de la fonction productsdetail
    })
}

