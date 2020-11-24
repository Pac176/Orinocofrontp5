
import { Cart } from "./Cart.js"
let cartClass = new Cart()



export function displayCart() {          /////////////////////////////////Fonction affichage cart
   
   
    let passCommand = document.querySelector("#passCommand")
    passCommand.addEventListener("click", () => {
    cartClass.validCommand()//////////////////////////////////////////////appel de la validation sur l'event
    })
    if (JSON.parse(localStorage.getItem("cart"))) {   ////////////////////////affichage sous condition de localstorage
        for (let i = 0; i < cartClass.products.length; i++) {
           
            
            let target = document.querySelector(".products");
            let importPanier = document.createElement("tr");
            importPanier.classList.add("produit")
            target.appendChild(importPanier);
            importPanier.innerHTML = `<td data-th="Produit">
                                            <div class="row">
                                                <div class="col-md-3 text-left">
                                                    <img src=${cartClass.products[i].imageUrl} alt=""
                                                        class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                                </div>
                                                <div class="col-md-9 text-left mt-sm-2">
                                                    <h4>${cartClass.products[i].name}</h4>
                                                    <p class="font-weight-light"><em></em></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class ="prixOurs" data-th="Price">${cartClass.products[i].price / 100}€</td>
                                        <td data-th="Quantity">
                                        
                                            <input type="number" class="nbOurs form-control form-control-lg text-center" value="1">
                                        </td>
                                        <td class="actions" data-th="">
                                            <div class="text-right">
                                                    <button class="reset btn btn-white border-secondary bg-white btn-md mb-2">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                                <td  class ="prixTotalOurs text-center" data-th="Sous total">€</td>
                                                <div></div>
                                            </div>
                                        </td>`;
            
            }   cartClass.prixTotalSelonQte /////////////////////////////appel prix total
                cartClass.cartNotification /////////////////////////appel notification
                cartClass.deleteFromCart() /////////////////////////appel possibilité d'effacer 
                cartClass.nbItems/////fonction affichage nb items
        
    } else {
        let panier = document.querySelector(".panier")////////////////////////////////////si panier vide
        panier.innerHTML = `<div class="alert alert-warning panierVide" role="alert">
                                     Vous n'avez rien commandé!!!
                                                                    </div>`}



}
        

         
        
        

































 











 



