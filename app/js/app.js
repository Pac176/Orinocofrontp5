import { pageIndex} from "./index.js"
import { displayCart } from "./panier.js"
import { pageProduct} from "./product.js"
import {validation, btnValid} from "./validation.js"

   // notification panier
let url = window.location.pathname

 
//////////////////////////Switch entre les differentes page en fonction de l'url/////////////////////

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



