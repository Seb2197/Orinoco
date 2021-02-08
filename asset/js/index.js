const page = document.querySelector("#globalCard");
fetch("http://localhost:3000/api/teddies/")
  .then(async (resultat) => {
    const results = await resultat.json();
    results.forEach((teddie) => {
      teddiesCard(teddie);
    });
  })

  .catch((error) => {
    console.log(error);
  });

function teddiesCard(teddie) {
  page.innerHTML += `   <div class="globalCard">
                        <a href="./product.html?id=${teddie._id}" id="${teddie._id}">
                        <img src="${teddie.imageUrl}" alt="Ourson">
                        <p class="global-description">Nom: ${teddie.name}</p>
                        <p class="global-description">Prix: ${teddie.price / 100}€</p>
                        <p class="global-description">${teddie.description}</p>
                        </a>
                        </div>`;
}