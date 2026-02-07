let cart = JSON.parse(localStorage.getItem("cart")) ||[];


function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    if (item) item.qty++;
    else cart.push({name, price, qty: 1});
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let div = document.getElementById("cart");
    if(!div) return;

    div.innerHTML = "";
    let total = 0;
    

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        div.innerHTML +=` 
        <p>${item.name} x ${item.qty} - GHS ${item.price * item.qty}
        <button onclick="removeItem(${i})">X</button></P>`; 
    });
    
    div.innerHTML += `<h3>Total: GHS ${total}</h3>`;
}

function removeItem(i) {
    cart.splice(i,1);
    saveCart();
}

function placeOrder() {
    let msg = "RIFAS FRAGRANCE ORDER%0A%0A";
    let total = 0;

    cart.forEach(item => {
        msg +=`${item.name} x ${item.qty} - GHS ${item.price * item.qty}%0A`;
        total += item.price * item.qty;
    });

    msg += `%0ATotal: GHS ${total}%0APayment via Mobile Money`;


    window.open("https://wa.me/233538274741?text="+msg,"_blank");
}

function changeImage(id, src) {
    document.getElementById(id).src = src;
}


displayCart();