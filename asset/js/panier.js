const productDesc = document.querySelector("#globalCard");

function teddieDesc(teddie) {
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
}

function pageProduct(oursonID) {
  fetch("http://localhost:3000/api/teddies/" + oursonID)
    .then(async (resultat) => {
      const result = await resultat.json();
      teddie = result;
      teddieDesc(teddie);
    })
    .catch((error) => {
      console.log(error);
    });
}
