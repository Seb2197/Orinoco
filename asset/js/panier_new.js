const server_apiUrl = "https://backendp5.herokuapp.com/api/teddies/";

let totalProductInCart = 0;
let productsDatas = [];
let currentProductIndex;

let totalCommand = 0;
let totalAmount;

function updateCartCounter() {
  
  if (localStorage.getItem("cart") != null) {
    const items = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < items.length; i++) {
      totalProductInCart += items[i].quantity;
    }    
  }
  const panierTotal = document.querySelector("#panierTotal");
  panierTotal.textContent = totalProductInCart;
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
// On retourne un message d'erreur si jamais il n'a pas réussi à trouver l'élément
async function getProductApi(id) {
  const url = "https://backendp5.herokuapp.com/api/teddies/" + id;
  const response = await fetch(url);
  if (!response.ok) {
    const msg = `Une erreur est survenue : ${response.status} = ${response.statusText}`;
    throw new Error(msg);
  }
  let result = await response.json();    
  return result;        
}
// On supprime les éléments du localStorage
function removeProduct(index) {
  let datas = JSON.parse(getDatasFromCart()); 
  let id = datas[index].id;

  for (let i =0; (i < datas.length); i++) {
    if (id == datas[i].id) {
        datas.splice(i, 1);      
    }
  }

  localStorage.setItem('cart', JSON.stringify(datas)); 
  productContainer = document.querySelector("#globalCard").innerHTML = "";  
  datas = JSON.parse(getDatasFromCart()); 
  if (!datas.length) { 
    totalProductInCart = 0;
    localStorage.clear(); 
    document.querySelector("#globalCount").remove();

  }
  totalCommand = 0;
  compileCart(datas);
  displayCart();
  updateCartCounter();
}

//On créez la carte et on créez le btn delette
function renderProduct(product) { 
  
  let colors = productsDatas[currentProductIndex].details;
  let count = productsDatas[currentProductIndex].count;
  let totalPrice = (product.price / 100) * count;
  totalCommand += totalPrice;
  let productCard = ` <div class="globalCard">
                          <img src="${product.imageUrl}" alt="Ourson">
                          <p class="global-description">Nom: ${product.name}</p>
                          <p class="global-description">Quantité : ${count}&nbsp Prix: <span id="globalPrice">${totalPrice}</span>€</p>
                          <p class="global-description">${product.description}</p>
                          <h2 class="global-description ">Commandes par couleur</h2>
                          <div class="globalSelect">`;
                          
  for (let i = 0; (i < colors.length); i++) {
    productCard += `<p class="globalH2Select">${colors[i].color} : ${colors[i].quantity}</p>`;
  }
  productCard += `<a id="BtnRemove" data-index="${currentProductIndex}"class="btnRemove selectBtn" href="#">Supprimer ce produit</a></div>`;
  productCard += '</div>';
  
  const productContainer = document.querySelector("#globalCard");
  productContainer.innerHTML += productCard;

  const BtnRemoves = document.querySelectorAll(".btnRemove");
  BtnRemoves.forEach( (el) => {
      el.addEventListener("click", (e) => {
      e.preventDefault();
      let idx = e.target.dataset.index;
      removeProduct(idx);
    });
  });  
}

function getDatasFromCart() {
  if (totalProductInCart > 0) {
    const datas =  localStorage.getItem('cart');
    return datas;

  }
  else {
    return null;
  }
}

function handleServerProductData(data) {
  renderProduct(data);
}

function getProduct(id) {
  getDataFromServer(server_apiUrl + id, handleServerProductData);
}

function findProductIndex(id) {  
  let result = -1;
  
  if (!productsDatas.length) { return result; }

  for (let i = 0; (i < productsDatas.length); i++) {
    if (productsDatas[i].id == id) {
      result = i;
      break;
    }
  }
  return result;
}

// On récupère les éléments et les ajoute dans un tableau
function compileCart(datas) {

  productsDatas = [];
  for (let i = 0; (i < datas.length); i++) {
    
    let itemDetails = {
      quantity : -1,
      color:""
    };

    let item = {
      id:"",
      details:[],
      count:""
    };
          
    let idx = findProductIndex(datas[i].id);    
    if (idx > -1) {     
      itemDetails.quantity = datas[i].quantity;
      itemDetails.color = datas[i].color;
      productsDatas[idx].details.push(itemDetails);
      productsDatas[idx].count += itemDetails.quantity;
    }
    else {
      itemDetails.quantity = datas[i].quantity;
      itemDetails.color = datas[i].color;
      item.id = datas[i].id;    
      item.count = itemDetails.quantity;  
      item.details.push(itemDetails);      
      productsDatas.push(item);
    }
  }
}

// Prix total de la commande
function displayProduct(index) {  
    getProductApi(productsDatas[index].id).then((datas) => {
    currentProductIndex = index;    
    renderProduct(datas); 
    localStorage.setItem('cartTotal', totalCommand);
    const globCount = document.querySelector('#globCount');
    globCount.textContent = `Total de votre commande: ${totalCommand}€`;    
  });
}

function displayCart() {
  for (let i = 0; (i < productsDatas.length); i++) {
    displayProduct(i);
  }

}

// Récupération des valeurs du formulaire
function submitForm() {
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    productsDatas.forEach( (p) => {
      products.push(p.id);
    });
    
    let contactItems = JSON.stringify({contact, products});
    fillOrder(contactItems);
}

//Renvoie les données du formulaire
function fillOrder(contactItems) {

  fetch(server_apiUrl + "order", { mode: 'cors' }, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //mode:'cors',
        body: contactItems
    }).then(response => {

        return response.json();

    }).then( r => {
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderID', JSON.stringify(r.orderId));
        
        localStorage.removeItem('cart');
        window.location.replace("./confirm.html");
    })
    .catch((e) => {        
        console.log(e);
    })
}


// Formulaire
function renderForm() {
    const divTitleForm = document.createElement('div');
    divTitleForm.id = "divTitleForm";
    const titleForm = document.createElement('h2');
    titleForm.id = 'placeOrder';
    titleForm.classList = 'placeOrder';
    titleForm.textContent = "Passez commande !";
    const popupForm = document.createElement('div');
    popupForm.id = "popup";
    popupForm.classList.add("popup");
    const popupBox = document.createElement('div');
    popupBox.classList.add("popup__box");
    const btnClose = document.createElement('a');
    btnClose.classList.add("popup__box-close");
    btnClose.href = '#';
    btnClose.innerHTML ="&times;";
    popupBox.appendChild(btnClose);
    const divForm = document.createElement('div');
    divForm.classList.add('form-container');
    divForm.innerHTML = `
                <form action="" id="form1">
                    <div class="form__group">
                        <input type="text" name="lastName" id="lastName" class="form__input" placeholder=" " required  pattern="^[A-Z]{1}[a-z\ ]+$">
                        <span class="form__input-focus"></span>
                        <label class="form__label" for="lastName">LastName</label>
                    </div>
                    <div class="form__group">
                        <input type="text" name="firstName" id="firstName" class="form__input" placeholder=" " required  pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$">
                        <span class="form__input-focus"></span>
                        <label class="form__label" for="firstName">FirstName</label>
                    </div>
                    <div class="form__group">
                        <input type="text" name="address" id="address" class="form__input" placeholder=" " required  pattern="^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$">
                        <span class="form__input-focus"></span>
                        <label class="form__label" for="address">Adress</label>
                    </div>

                    <div class="form__group">
                        <input type="text" name="city" id="city" class="form__input" placeholder=" " required  pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$">
                        <span class="form__input-focus"></span>
                        <label class="form__label" for="city">City</label>
                    </div>

                    <div class="form__group">
                        <input type="email" name="email" id="email" class="form__input" placeholder=" " required  pattern="^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})+$">
                        <span class="form__input-focus"></span>
                        <label class="form__label" for="email">Email</label>
                     </div>
                     <div class="form__group">
                        <button type="submit" class="btn-submit" id='btnSubmit' value="Validez votre commande !">Validez votre commande !</button>
                     </div>
                 </form>`;                    
    divTitleForm.appendChild(titleForm);
    popupBox.appendChild(divTitleForm);
    popupBox.appendChild(divForm);
    popupForm.appendChild(popupBox);
    document.querySelector('body').appendChild(popupForm);
    const formConfirm = document.querySelector("#form1");
    formConfirm.addEventListener("submit", (e) => {
      submitForm();    
    });

}

function processCart() {  
  updateCartCounter();
  let datas = JSON.parse(getDatasFromCart()); 
  if (totalProductInCart > 0) { 
    compileCart(datas);
    
    
    const productContainer = document.querySelector("#globalCard");
    const globalCount = document.createElement("div");
    globalCount.id = "globalCount";
    globalCount.classList.add('globalCount');
    const globCount = document.createElement('p');
    globCount.id = "globCount";
    
    const confirmBtn = document.createElement('a');
    confirmBtn.id = "btnConfirm";
    confirmBtn.href = '#popup';
    confirmBtn.classList.add('selectBtn');    
    confirmBtn.textContent = 'Confirmez votre commande';  
    globalCount.appendChild(globCount);
    globalCount.appendChild(confirmBtn);
    productContainer.after(globalCount);

    displayCart();
    renderForm();
  }
}


/* POINT D'ENTREE */

processCart();
