import { Cart } from "./Cart.js"
import { pageIndex} from "./index.js"
import { displayCart } from "./panier.js"
import { pageProduct} from "./product.js"
import {validation, btnValid} from "./validation.js"
let cartClass = new Cart()
cartClass.cartNotification    // notification panier
let url = window.location.pathname



 
 
//////////////////////////construction de l'url de chaque produit pour le 2e requete/////////////////////

switch (url) {
    case "/app/pages/index.html":pageIndex()
        break;
    case "/app/pages/product.html":pageProduct()
        break;
    case"/app/pages/panier.html": displayCart()
        break;
    case"/app/pages/validation.html": validation(),btnValid()
        break;
}



