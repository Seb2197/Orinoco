// var request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//   }
// };
// request.open(
//   "GET",
//   `http://localhost:3000/api/teddies`
// );
// console.log(request);
// request.send();

const page = document.querySelector("#globalCard");

fetch("http://localhost:3000/api/teddies")
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
                        <img src="${teddie.imageUrl}" alt="Ourson">
                        <p class="global-description">Nom: ${teddie.name}</p>
                        <p class="global-description">Prix: ${teddie.price}</p>
                        <p class="global-description">${teddie.description}</p>
                        </div>`;
}
