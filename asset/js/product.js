// On fais une fonction pour récupérer les paramètre de l'id
function getProductIDFromUrl() {
  const params = new URL(document.location).searchParams;
  return params.get("id");
}

// On récupère l'id de notre api avec une verification en cas d'erreur
async function getProduct(id) {
  const url = "http://localhost:3000/api/teddies/" + id;  
  const response = await fetch(url);
  if (!response.ok) {
    const msg = `Une erreur est survenue : ${response.status} = ${response.statusText}`;
    throw new Error(msg);
  }
  let result = await response.json();    
  return result;        
}


// On ajoute une fonction qui permet d'avoir la valeur de la totalité des éléments dans notre product.html
function updatePanierTotal() {
  if (localStorage.getItem('cart') != null) {
    const items = JSON.parse(localStorage.getItem('cart'));
    const panierTotal = document.querySelector("#panierTotal");
    let total = 0;
    
    for (let i=0; (i < items.length); i++) {
      total += items[i].quantity;
    }
    
    panierTotal.textContent = total;
  }
}

// On ajoute les éléments sélectionner dans le localStorage dans un tableau et avec les quantité de chaque produit sélectionner.
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
    updatePanierTotal(items.length);
  } 
  else {
    items = JSON.parse(localStorage.getItem('cart'));
    console.log(items);
    //items.forEach((prod) => {
    for (let i=0; (i < items.length); i++) {
      if (item.id === items[i]._id && item.color === items[i].color) { 
        items[i].quantity++; 
        newItem = false;
      }
    }

    if (newItem) { items.push(tempItem); }
    localStorage.setItem('cart', JSON.stringify(items));
  }

  updatePanierTotal();
}


function displayProduct(product) {
  console.log("DisplayProduct");  
  let colors = product.colors;
  let productItem = {
    _id: product._id,
    quantity:1,
    color: ""
  };

  let productCard = ` <div class="globalCard">
                          <img src="${product.imageUrl}" alt="Ourson">
                          <p class="global-description">Nom: ${product.name}</p>
                          <p class="global-description">Prix: <span id="globalPrice">${product.price / 100}€</span></p>
                          <p class="global-description">${product.description}</p>
                          <div class="globalSelect">
                          <h2 class="globalH2Select">Choisis ta couleur</h2>
                          <select id="globalColor">`;  
  for (let i = 0; (i < colors.length); i++) {
    productCard += `<option value="${colors[i]}">${colors[i]}</option>`;
  }
  productCard += `</select><a id="BtnAdd" class="BtnAdd" href="#">Ajouter au panier</a></div></div>`;

  const productContainer = document.querySelector("#globalCard");
  productContainer.innerHTML += productCard;

  const selectBtn = document.querySelector("#BtnAdd");
  selectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let select = document.getElementById("globalColor");
    productItem.color = select.options[select.selectedIndex].value;
    addProductToCart(productItem);
  });
}

async function productRun() {    
  updatePanierTotal();
  let prod;

  getProduct(getProductIDFromUrl()).then(datas => {
    prod = datas;    
    displayProduct(prod);
  });  
}


/* POINT D'ENTREE */

productRun();
