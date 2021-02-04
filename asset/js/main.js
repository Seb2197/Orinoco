var descriptionglobal = document.querySelector(".description-global");
var description = document.querySelector(".description");
var global = document.querySelector(".global");
var peluche1 = document.querySelector(".peluche1");
var peluche2 = document.querySelector(".peluche2");
var peluche3 = document.querySelector(".peluche3");

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    descriptionglobal.innerText = `${response[0].name}`;
    description.innerText = `${response[0].price}€`;
    global.innerText = `${response[0].description}`;
    peluche1.innerText = `${response[2].name}`;
    peluche2.innerText = `${response[2].price}€`;
    peluche3.innerText = `${response[0].description}`;
  }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();


// var test = document.querySelector(".global-fond");

// test.innerHTML = ('hello wolrd');