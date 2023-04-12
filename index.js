// globle variables
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
const appSitting = {
  databaseURL:
    "https://add-to-cart-c1d8f-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSitting);
const db = getDatabase(app);
const itemsInCart = ref(db, "itemsInCart");
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const cart = document.getElementById("cart");

// event listeners
addButton.addEventListener("click", function () {
  const inputvalue = inputField.value;
  inputField.value = "";
  push(itemsInCart, inputvalue);
});

// remove item from cart
cart.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("cart-item")) {
    cart.innerHTML = "";
    const id = target.dataset.id;
    remove(ref(db, `itemsInCart/${id}`));
  }
});

onValue(itemsInCart, (snapshot) => {
  if (snapshot.exists()) {
    const itemsArr = Object.entries(snapshot.val());
    cart.innerHTML = "";
    for (let i = 0; i < itemsArr.length; i++) {
      const currentItemID = itemsArr[i][0];
      const currentItemName = itemsArr[i][1];
      cart.innerHTML += `<li class="cart-item" data-id=${currentItemID}>${currentItemName}</li>`;
    }
  } else {
    cart.innerHTML = `<li class="no-items">No items</li>`;
  }
});
