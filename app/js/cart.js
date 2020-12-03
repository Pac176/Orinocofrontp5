/// //////////////////////class panier//////////////////////////

class Cart {
  constructor () {
    this.products = [];
    this.products = JSON.parse(localStorage.getItem('cart'));
  }

  /// ////////////////////////lien vers validation de commande
  validCommand () {
    document.location.href = 'validation.html';
  }

  /// ///////////////////////pastille notification
  get cartNotification () {
    this.products = JSON.parse(localStorage.getItem('cart'));
    /// //////////////////////////si produit dans localstorage
    if (JSON.parse(localStorage.getItem('cart'))) {
      /// /////////////////et si n'existe pas alors création
      if (document.querySelector('.pastillePanier') == null) {
        const logoPanier = document.querySelector('.logoPanier');
        const pastille = document.createElement('notification');
        pastille.classList.add('pastillePanier');
        logoPanier.insertAdjacentElement('afterbegin', pastille);
        pastille.innerHTML = this.products.length;
      } else {
        /// //////////////////sinon juste mise a jour
        const pastille = document.querySelector('.pastillePanier');
        pastille.innerHTML = this.products.length;
        pastille.classList.add('pastillePanier');
      }
    }
  }

  /// /////////////////////effacer item du panier
  deleteFromCart () {
    const divpanier = document.querySelector('.products');
    const reset = document.querySelectorAll('.reset');
    const produit = document.querySelectorAll('.produit');
    /// //////////////////////////boucle sur les boutton supprimer
    for (let i = 0; i < reset.length; i++) {
      reset[i].addEventListener('click', () => {
        this.products = JSON.parse(localStorage.getItem('cart'));
        this.products.splice(reset[i], 1);
        /// //////////////si dernier produit et confirmation alors panier vide
        if (this.products.length === 0) {
          if (confirm('Etes vous sur de vouloir supprimer ce produit?')) {
            divpanier.removeChild(produit[i]);
            localStorage.clear();
            const logoPanier = document.querySelector('.logoPanier');
            const pastille = document.querySelector('.pastillePanier');
            logoPanier.removeChild(pastille);
            location.href = 'index.html';
          }
          /// /////////////si pas dernier alors juste effacer l'item
        } else if (confirm('Etes vous sur de vouloir supprimer ce produit?')) {
          localStorage.setItem('cart', JSON.stringify(this.products));
          divpanier.removeChild(produit[i]);
          this.prixTotalSelonQte;
          this.cartNotification;
          this.nbItems;
        }
      });
    }
  }

  /// /////////////////////fonction calcul et envoi sur localstorage
  get prixTotalQteInLocalstorage () {
    const qte = [];
    const prixPanier = [];
    const prixTotal = document.querySelector('.prixTotal ');
    const subTotal = document.querySelectorAll('.prixTotalOurs');
    const nbOurs = document.querySelectorAll('.nbOurs');
    const prixOurs = document.querySelectorAll('.prixOurs');
    for (let i = 0; i < subTotal.length; i++) {
      subTotal[i].innerHTML = nbOurs[i].value * parseInt(prixOurs[i].innerHTML) + '€';
      prixPanier[i] = parseInt(subTotal[i].innerHTML);/// ///////////////recuperation des prix pour calcul total
      const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
      prixTotal.innerHTML = prixPanier.reduce(reducer) + '€';
      localStorage.setItem('total', prixTotal.innerHTML); /// /envoi sur le localstorage pour utilisation
      qte[i] = parseInt(nbOurs[i].value);
      const quantite = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
      localStorage.setItem('Quantité', qte.reduce(quantite));/// /envoi sur le localstorage pour utilisation
    }
  }

  /// ////////////////////Fonction calcul du total commande avec variation qte
  get prixTotalSelonQte () {
    /// ///////si il y a des produits dans le panier avec par defaut quantité a 1
    if (this.products.length > 0) {
      const nbOurs = document.querySelectorAll('.nbOurs');
      for (let i = 0; i < nbOurs.length; i++) {
        this.prixTotalQteInLocalstorage;
        nbOurs[i].addEventListener('change', () => {
          this.prixTotalQteInLocalstorage;
        });
      }
    }
  }

  /// /////////////////////fonction ajout de produit dans le panier
  addToCart (value) {
    /// //////////////s'il y a un cart actif alors import des produits
    if (localStorage.getItem('cart')) {
      this.products = JSON.parse(localStorage.getItem('cart'));
      /// ////////////je test pour eviter une répétition du meme produit
      let test;
      for (const product of this.products) {
        if (product._id === value._id) {
          alert('vous avez deja ce produit dans le panier');
          return test = true; // arret de la boucle des le true
        }
      }
      /// ////////////si produit present renvoi au localstorage
      if (test === true) {
        localStorage.setItem('cart', JSON.stringify(this.products));
      } else {
        /// ////////////sinon ajouter le produit au tableau et renvoi sur localstorage
        this.products.push(value);
        localStorage.setItem('cart', JSON.stringify(this.products));
      }
      /// ///////////////////si c'est le premier produit alors envoi sur localstorage
    } else {
      localStorage.setItem('cart', JSON.stringify([value]));
    }
  }

  get nbItems () {
    const nbItems = document.querySelector('.nbItems');
    nbItems.innerHTML = this.products.length;
    localStorage.setItem('nombreitem', nbItems.innerHTML);
  }
}
