const productDesc = document.querySelector("#globalCard");
const params = new URL(document.location).searchParams;
const id = params.get("id");

fetch("http://localhost:3000/api/teddies/" + id)
  .then(async (resultat) => {
    const result = await resultat.json();
    teddie = result;
    teddieDesc(teddie);
  })
  .catch((error) => {
    console.log(error);
  });

function teddieDesc(teddie) {
  productDesc.innerHTML += ` <div class="globalCard">
                          <img src="${teddie.imageUrl}" alt="Ourson">
                          <p class="global-description">Nom: ${teddie.name}</p>
                          <p class="global-description">Prix: ${
                            teddie.price / 100
                          }€</p>
                          <p class="global-description">${
                            teddie.description
                          }</p>
                          <div class="globalSelect">
                          <h2 class="globalH2Select">Choisis ta couleur</h2>
                        <select>
                          <option value="1">Tan</option>
                          <option value="2">Chocolate</option>
                          <option value="3">Black</option>
                          <option value="4">White</option>
                      </select>
                      </div>
                        </div>`;
}
