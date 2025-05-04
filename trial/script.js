function main() {
  cart();
}

// Function مجمعة كل فانكشنز الكارت
function cart() {
  // all cart rows from the table
  var cartRows = document.querySelectorAll("tbody tr"); // select all 34an na5od kol el rows

  Quantity(cartRows);
  Remove(cartRows);
  Checkout();
  loadCart();
}

// Function بتاخد الايتيم من الستوردج و تعرضه قالكارت
function loadCart() {
  var cartstorage = localStorage.getItem("cart"); // بناخد الايتم اللي فالستوردج فالمكان اللي اسمه كارت
  var cart = []; // اراي نحط فيها المنتجات اللي جاية من الميموري
  if (cartstorage) {
    cart = JSON.parse(cartstorage); // بتخلي الكلام اوبجيكتش
  }

  // بادي التيبول كله
  var table = document.querySelector("tbody");

  // بيشوف الكارت فاضية ولا لا
  if (cart.length == 0) {
    table.innerHTML =
      "<tr><td colspan='5' class='empty-message'>Your cart is empty.</td></tr>";
    document.querySelector(".checkout-btn").style.display = "none";
    return;
  }

  // بيمسح الروز اللي معمولها انشيالايز فالاول
  table.innerHTML = "";

  // رو جديد لكل ايتيم هيجي من الشوب
  for (i = 0; i < cart.length; i++) {
    var item = cart[i];
    var row = document.createElement("tr"); //بيعمل اليمينت جديد رو جديد فالجدول

    // بنية الجدول اللي هيتحط فيه المنتجات
    row.innerHTML =
      "<td>" +
      item.name +
      "</td>" +
      '<td class="cart-quantityPar">' +
      '<input class="cart-quantityip" type="number" value="' +
      item.quantity +
      '" min="1" data-id="' +
      item.id +
      '">' +
      "</td>" +
      '<td class="cart-price">$' +
      item.price.toFixed(2) +
      "</td>" +
      '<td class="item-total">$' +
      (item.price * item.quantity).toFixed(2) +
      "</td>" +
      '<td><button class="remove-btn" data-id="' +
      item.id +
      '">Remove</button></td>';

    table.appendChild(row);
  } // بتضيف الصف الجديد كا ابن للاب اللي هو التيبول }

  // ابديت للتوتال اللي فالصفوف و تحت
  CartTotals();
  Quantity(document.querySelectorAll("tbody tr"));
  Remove(document.querySelectorAll("tbody tr"));
  document.querySelector(".checkout-btn").style.display = "inline";
} // كدا فانكشان اللود كارت خلصت

// فانكشن بتغير الكميات فالصفوف اللي فالجدول
function Quantity(rows) {
  for (var i = 0; i < rows.length; i++) {
    var quantityInput = rows[i].querySelector("input");

    quantityInput.onchange = function () {
      var itemId = this.getAttribute("data-id");
      var newQuantity = parseInt(this.value);

      // Update cart in Storage
      updateCartItemQuantity(itemId, newQuantity);

      // تعديل التوتال اللي فالرو لما تغير الكمية
      var price = parseFloat(
        this.parentElement.nextElementSibling.innerText.replace("$", "") // (this) de 3ayda 3la el input bta3 el quantity
      );
      var totalCell = this.parentElement.nextElementSibling.nextElementSibling;
      totalCell.innerText = "$" + (price * newQuantity).toFixed(2);

      // zai el recursion fl C
      CartTotals();
    };
  }
}

// فانكشك بتغير الكمية فالكارت
function updateCartItemQuantity(itemId, newQuantity) {
  var cartstorage = localStorage.getItem("cart");
  var cart = [];
  if (cartstorage) {
    cart = JSON.parse(cartstorage);
  }

  for (i = 0; i < cart.length; i++) {
    if (cart[i].id == itemId) {
      cart[i].quantity = newQuantity;
      break;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// فانكشن لازرار الريموف
function Remove(rows) {
  for (var i = 0; i < rows.length; i++) {
    var btn = rows[i].querySelector(".remove-btn");

    btn.onclick = function () {
      var itemId = this.getAttribute("data-id");
      removeItem(itemId);
    };
  }
}

// فانكشن للتشيك اوت
function Checkout() {
  var button = document.querySelector(".checkout-btn");
  button.onclick = function () {
    alert("Proceeding to checkout...");
  };
}

// فانكشن الريموف اللي استخدمناها ففانكسن ازار الريموف
function removeItem(id) {
  var cartstorage = localStorage.getItem("cart");
  var cart = [];
  if (cartstorage) {
    cart = JSON.parse(cartstorage);
  }

  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id != id) {
      newCart.push(cart[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
  loadCart(); // تحديث الكارت مش اكتر
}

// فانكشن اللي بتحسب التوتال و بتغيره
function CartTotals() {
  var rows = document.querySelectorAll("tbody tr");
  var subtotal = 0;

  // لوب علي كل صف فالجدول
  for (var n = 0; n < rows.length; n++) {
    var priceText = rows[n].querySelector(".cart-price").innerText;
    var price = parseFloat(priceText.replace("$", "")); // بتحول الاسعار المكتوبة لارقام ممكن نتعامل معاها
    var quantityInput = rows[n].querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value); // بنحول الكميات لارقام هتضرب فالاسعار عشان تطلع التوتال
    subtotal += price * quantity;
  }

  var tax = subtotal * 0.05;
  var total = subtotal + tax;
  // Store the total in localStorage
  localStorage.setItem("cartTotal", total.toFixed(2));

  // الحتة اللي تحت اللي فيها التوتال
  document.querySelector(".cart-summary p:nth-child(2)").innerText =
    "Subtotal: $" + subtotal.toFixed(2); // tofixed de hya hya zy el %.2f fl C
  document.querySelector(".cart-summary p:nth-child(3)").innerText =
    "Tax (5%): $" + tax.toFixed(2);
  document.querySelector(".cart-summary p strong").innerText =
    "Total: $" + total.toFixed(2);
}

// عشان المين تشتغل اول ما الصفحة تفتح
window.onload = main;
