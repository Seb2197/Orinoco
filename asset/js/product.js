const productDesc = document.querySelector("#globalCard");
const test = document.querySelector("#globalCard");
let teddie;
const params = new URL(document.location).searchParams;
const id = params.get("id");
let productCount = 0;
let productTotal = 0;
if (localStorage.getItem("productSave") === null) {
  productTotal = 0;
} else {
  productTotal = localStorage.getItem("productSave");
}
const panierTotal = document.querySelector("#panierTotal");
panierTotal.textContent = productTotal;


// A copier et à le mettre dans une fonction
fetch("http://localhost:3000/api/teddies/" + id)
  .then(async (resultat) => {
    const result = await resultat.json();
    teddie = result;
    teddieDesc();
  })
  .catch((error) => {
    console.log(error);
  });

function teddieDesc() {
  colorsOurs = teddie.colors;
  var global = ` <div class="globalCard">
                          <img src="${teddie.imageUrl}" alt="Ourson">
                          <p class="global-description">Nom: ${teddie.name}</p>
                          <p class="global-description">Prix: <span id="globalPrice">${
                            teddie.price / 100
                          }€</span></p>
                          <p class="global-description">${
                            teddie.description
                          }</p>
                          <div class="globalSelect">
                          <h2 class="globalH2Select">Choisis ta couleur</h2>
                          <select>`;

  for (let i = 0; i < colorsOurs.length; i++) {
    global += `<option value="${teddie.colors[i]}">${teddie.colors[i]}</option>`;
  }
  global += `</select><a id="selectBtn" class="selectBtn" href="#">Ajouter au panier</a></div></div>`;
  productDesc.innerHTML += global;



  //Panier

  const selectBtn = document.querySelector("#selectBtn");
  const globalPrice = document.querySelector("#globalPrice");
  selectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (productTotal < 20) {
      if (productCount < 6) {
        productCount++;
        productTotal++;
        localStorage.setItem("productSave", productTotal.toString());
        globalPrice.textContent = `${(teddie.price / 100) * productCount}€`;
        panierTotal.textContent = productTotal;
      } else {
        alert("Vous ne pouvez pas ajouter plus de 6 produits !");
      }
    } else {
      alert(
        "Vous ne pouvez pas ajoutez plus de 20 produits dans votre panier !"
      );
    }
  });
}
