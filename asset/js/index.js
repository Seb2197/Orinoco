// On déclare des variables const pour récupérer les ids de l'index.html
const page = document.querySelector("#globalCard");
const panierTotal = document.querySelector("#panierTotal");

// On déclare la variable totalProduits à zéro
let productTotal = 0;

// Si l'ajout de productSave est égale ou supérieur à null, on ajoute productTotal de zéro et sinon le productSave est ajouter dans un localStorage conserver dans producTotal
if (localStorage.getItem("productSave") === null) {
  productTotal = 0;
} else {
  productTotal = localStorage.getItem("productSave");
}
//On ajoute le nmbr de produit dans notre index.html
panierTotal.textContent = productTotal;

// On fais une fonction avec comme paramètre teddie qui permet de pouvoir récupérez les valeurs de l'api
function teddiesCard(teddie) {
  // On ajoute notre résultat dynamiquement en créeant une div avec les informations voulue
  page.innerHTML += `   <div class="globalCard">
                        <a href="./product.html?id=${teddie._id}" id="${teddie._id}">
                        <img src="${teddie.imageUrl}" alt="Ourson">
                        <p class="global-description">Nom: ${teddie.name}</p>
                        <p class="global-description">Prix: ${teddie.price / 100}€</p>
                        <p class="global-description">${teddie.description}</p>
                        </a>
                        </div>`;
}

// On ajoute une fonction qui permet d'avoir la valeur de la totalité des éléments dans notre index.html
function updatePanierTotal() {
  if (localStorage.getItem("cart") != null) {
    const items = JSON.parse(localStorage.getItem("cart"));
    const panierTotal = document.querySelector("#panierTotal");
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += items[i].quantity;
    }

    panierTotal.textContent = total;
  }
}

// On récupère l'api et on transforme le résultat en json et on fais une boucle pour afficher nos éléments dynamiquement et pourvoir afficher d'autre élément de l'api automatiquement
fetch("http://localhost:3000/api/teddies/")
  .then(async (resultat) => {
    const results = await resultat.json();
    results.forEach((teddie) => {
      teddiesCard(teddie);
    });
    updatePanierTotal();
  })
  
  .catch((error) => {
    console.log(error);
  });




