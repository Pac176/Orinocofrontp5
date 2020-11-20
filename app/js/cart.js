 
/////////////////////////class panier//////////////////////////

export class Cart {
    constructor() {
///////////////////////////propriété: produits
    this.products = []
    this.products = JSON.parse(localStorage.getItem("cart"))
        







    }
/////////////////////////////lien vers validation
    validCommand() {
       document.location.href = "http://127.0.0.1:5500/app/pages/validation.html"
    }
/////////////////////////////pastille notification
    get cartNotification() {
        this.products = JSON.parse(localStorage.getItem("cart"))
        /////////////////////////// si produit dans localstorage
        if (JSON.parse(localStorage.getItem("cart"))) {
                /////////////////// et si pastille panier n'existe pas creer pastille
                if (document.querySelector(".pastillePanier") == null) {
                    let logoPanier = document.querySelector(".logoPanier")
                    let pastille = document.createElement("notification")
                    pastille.classList.add("pastillePanier")
                    logoPanier.insertAdjacentElement("afterbegin",pastille)
                    pastille.innerHTML = this.products.length
                /////////////////// Mettre a jour pastille
                } else {
                    let pastille = document.querySelector(".pastillePanier")
                    pastille.innerHTML = this.products.length
                    pastille.classList.add("pastillePanier")
            }
        }
    }
////////////////////////////supprimer du panier
    deleteFromCart() {
        ////////////////////////je determine les variables utilisées
        let divpanier = document.querySelector(".products")
        let reset = document.querySelectorAll(".reset");
        let produit = document.querySelectorAll(".produit");
        /////////////////////////boucle sur les boutons supprimer
        for (let i = 0; i < reset.length; i++) {
                /////////////////event sur le bouton
                reset[i].addEventListener("click", () => {
                    this.products = JSON.parse(localStorage.getItem("cart"));
                    this.products.splice(reset[i], 1)
                    console.log(this.products)
                    //////////////////si il reste un seul produit
                    if (this.products.length == 0) { 
                        if (confirm("Etes vous sur de vouloir supprimer ce produit?")) {
                            //////////////et si je confirme alors
                            divpanier.removeChild(produit[i]);     
                            localStorage.clear();
                            let logoPanier = document.querySelector(".logoPanier")
                            let pastille = document.querySelector(".pastillePanier")
                            logoPanier.removeChild(pastille)  
                            let panier = document.querySelector(".panier")
                            panier.innerHTML = `<div class="alert alert-warning" role="alert">
                                     Vous n'avez rien commandé!!!
                                                                    </div>`
                        } else {/*sinon rien*/ }
                ////////////////et si plus de  un produit et confirme je renvoir sur localstorage, recalcul total et pastille
            }else if (confirm("Etes vous sur de vouloir supprimer ce produit?")){
                localStorage.setItem("cart", JSON.stringify(this.products))
                divpanier.removeChild(produit[i]);
                this.prixTotal()
                this.cartNotification
                }      
            })
        }
    }
    get prixTotal() {
        console.log(this.product)
////////////////////si il y a au moins 1 produit
        if (this.products.length > 0) {
            let prixPanier = []   /////prix des differents items du panier
            for (let i = 0; i < this.products.length; i++) {
                prixPanier[i] = `${this.products[i].price / 100}`//////////////////recuperation des prix pour calcul total
            }
            let prixTotal = document.querySelector(".prixTotal ");
            let subTotal = document.querySelectorAll(".prixTotalOurs");
            let nbOurs = document.querySelectorAll(".nbOurs");
            let prixOurs = document.querySelectorAll(".prixOurs")
            let qte = []
            let nbItems = document.querySelector(".nbItems")
            qte[0] = nbItems.innerHTML
///////////////////////////////////////////utilisation de la methode reduce sur le tableau de prix prixPanier
            const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
            prixTotal.innerHTML = prixPanier.reduce(reducer) + "€";
            localStorage.setItem("total", prixTotal.innerHTML) /////envoi sur localstorage pour recuperation et affichage dans le formulaire
//////////////////////////////////////////////affichage subtotal
            for (let i = 0; i < subTotal.length; i++) {
                subTotal[i].innerHTML = nbOurs[i].value * parseInt(prixOurs[i].innerHTML) + "€";
///////////////////////////////////////////récupération des quantités et envoi sur localstorage
                for (let i = 0; i < nbOurs.length; i++) {
                    qte[i] = parseInt(nbOurs[i].value)
                    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
                    localStorage.setItem("Quantité", qte.reduce(reducer))
                }
//////////////////////////////////////////event recalcul sur le changement de quantité avec "change" pour ne pas avoir de refresh a faire
                nbOurs[i].addEventListener("change", function () {
                    subTotal[i].innerHTML = nbOurs[i].value * parseInt(prixOurs[i].innerHTML) + "€";
                    prixPanier[i] = parseInt(subTotal[i].innerHTML)
                    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
                    prixTotal.innerHTML = prixPanier.reduce(reducer) + "€";
                    localStorage.setItem("total", prixTotal.innerHTML)
                    
                    for (let i = 0; i < nbOurs.length; i++) {
                        qte[i] = parseInt(nbOurs[i].value)
                        const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
                        localStorage.setItem("Quantité", qte.reduce(reducer))
                    }
                })
            }
        } 
    }
///////////////////////////Ajouter un produit au panier 
    addToCart(value) {
        ///////////////////si deja un produit je recupere le produit
        if (localStorage.getItem("cart")) {
            ///////////j'importe le tableau de produits
            this.products = JSON.parse(localStorage.getItem("cart"))
            let test;
            ///////////////pour eviter de remettre le meme produit plusieurs fois on test les doublons
            for (let product of this.products) {
                if (product._id == value._id) {
                    return test = true
                }
            }
            ///////////////si doublons je renvoi au localstorage
            if (test == true) {
                localStorage.setItem("cart", JSON.stringify(this.products))
            ///////////////si pas de doublon j'ajoute le produit au tableau et je renvoi le tableau sur localstorage
            }else{
                this.products.push(value)
                localStorage.setItem("cart", JSON.stringify(this.products))
                }
        /////////////////////si aucun produit je l'ajoute en créant le "cart" sur localstorage
        }else{
            localStorage.setItem("cart", JSON.stringify([value]))
           
        }
        
    }
}


   
