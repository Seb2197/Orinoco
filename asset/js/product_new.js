const server_apiUrl = "http://localhost:3000/api/teddies/";

let localProductData;
let UrlID;
let amount = 0;

function updateCartCounter(count) {
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

function getProductIDFromUrl() {
  const params = new URL(document.location).searchParams;
  UrlID =  params.get("id");
}


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

function addProductToCart(item) {

  let items = [];
  let tempItem = {
    id: item._id,
    quantity:1,
    color: item.color
  };
  
  let newItem = true;

  if (localStorage.getItem('cart') === null) {
    items.push(tempItem);
    localStorage.setItem('cart', JSON.stringify(items));   
    updateCartCounter();
  } 
  else {
    items = JSON.parse(localStorage.getItem('cart'));
    
    for (let i=0; (i < items.length); i++) {
      if (item.id === items[i]._id && item.color === items[i].color) { 
        items[i].quantity++; 
        newItem = false;
      }
    }

    if (newItem) { items.push(tempItem); }
    localStorage.setItem('cart', JSON.stringify(items));
  }
  updateCartCounter();
}

function displayProduct(product) { 
  let colors = product.colors;
  let productItem = {
    _id: product._id,
    quantity:1,
    color: ""
  };

  let productCard = ` <div class="globalCard">
                          <img src="${product.imageUrl}" alt="Ourson">
                          <p class="global-description">Nom: ${product.name}</p>
                          <p class="global-description">Prix: <span id="globalPrice">${product.price / 100}</span>€</p>
                          <p class="global-description">${product.description}</p>
                          <div class="globalSelect">
                          <h2 class="globalH2Select">Choisis ta couleur</h2>
                          <select id="globalColor">`;  
  for (let i = 0; (i < colors.length); i++) {
    productCard += `<option value="${colors[i]}">${colors[i]}</option>`;
  }
  productCard += `</select><a id="BtnAdd" class="selectBtn" href="#">Ajouter au panier</a></div></div>`;

  const productContainer = document.querySelector("#globalCard");
  productContainer.innerHTML += productCard;

  const selectBtn = document.querySelector("#BtnAdd");
  selectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const select = document.getElementById("globalColor");
    const price = document.getElementById("globalPrice");
    amount++;
    let priceTotal = amount * (product.price / 100);
    price.textContent = priceTotal;
    productItem.color = select.options[select.selectedIndex].value;
    addProductToCart(productItem);
  });
}

function handleServerProductData(data) {
  displayProduct(data);
}


function getProduct() {
  getDataFromServer(server_apiUrl + UrlID, handleServerProductData);
}



function processProduct() {  
  getProductIDFromUrl();
  updateCartCounter();
  getProduct();
}


/* POINT D'ENTREE */

processProduct();
