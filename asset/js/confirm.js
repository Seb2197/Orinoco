// On créez nos éléments
const thanks = document.createElement('h2');
const details = document.createElement('h3');
const adresse = document.createElement('p')
const orderID = document.createElement('p');
const contact = document.createElement('p');
const total = document.createElement('p');

// On écris le texte pour nos éléments
thanks.textContent = "MERCI D'AVOIR COMMANDER NOS OURS EN PELUCHE. NOUS ESPERONS QU'ILS VOUS FERONT DE GROS CALINS !"
details.textContent = "Voici les details de votre commande :"
const datas = JSON.parse(localStorage.getItem("contact"));
contact.textContent = "Au nom : "  + datas.firstName + " " + datas.lastName;
adresse.textContent = "Adresse de livraison : " + datas.address + " Ville : " + datas.city;
orderID.textContent = "Numéro de référence : " + localStorage.getItem("orderID");
total.textContent = "Montant de votre commande " + localStorage.getItem("cartTotal") + "€";

// On envoie nos éléments dans notre html
globalConfirm = document.querySelector("#globalConfirm");
globalConfirm.appendChild(thanks);
globalConfirm.appendChild(details);
globalConfirm.appendChild(contact);
globalConfirm.appendChild(adresse);
globalConfirm.appendChild(orderID);
globalConfirm.appendChild(total);





