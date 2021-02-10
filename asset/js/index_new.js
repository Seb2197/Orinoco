// On va récupérer l'api
const server_apiUrl = "http://localhost:3000/api/teddies";

function getDataFromServer(url, callback) {
  fetch(url)
    .then(async (result) => {
      const datas = await result.json();
      callback(datas);
    })
    
    .catch((error) => {
      console.log(error);
    });
}

function getDatas(callback) {
  getDataFromServer(server_apiUrl, callback);
}


// On affiche nos éléments dynamiquement
function displayProductCard(product) {
  const page = document.querySelector("#globalCard");
  page.innerHTML += `   <div class="globalCard">
                        <a href="./product.html?id=${product._id}" id="${product._id}">
                        <img src="${product.imageUrl}" alt="Ourson">
                        <p class="global-description">Nom: ${product.name}</p>
                        <p class="global-description">Prix: ${product.price / 100}€</p>
                        <p class="global-description">${product.description}</p>
                        </a>
                        </div>`;
}

function updateCartCounter() {
  let total = 0;
  if (localStorage.getItem("cart") != null) {
    const items = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < items.length; i++) {
      total += items[i].quantity;
    }    
  }
  const panierTotal = document.querySelector("#panierTotal");
  panierTotal.textContent = total;
}


function updateUI(datas) {
  datas.forEach((product) => {
      displayProductCard(product);
  });
  updateCartCounter();
}

function processIndex() {
  getDatas(updateUI);
}

processIndex();
