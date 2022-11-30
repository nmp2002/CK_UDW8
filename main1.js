// console.log("it is running");

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navBar');

if (bar){ 
    bar.addEventListener('click', ()=>{
        nav.classList.add('active');
    })
} 

if (close){ 
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
} 

// cart page js over here

let carts = document.querySelectorAll(".cart");

let products = [
    {name: 'AMERICANO', tag: 'P3(1)', price: 29, inCart: 0},
    {name: 'KHANKHUDI', tag: 'M1', price: 25, inCart: 0},
    {name: 'HIGHLANDER', tag: 'M2', price: 20, inCart: 0},
    {name: 'ADIDAS', tag: 'm3', price: 39, inCart: 0},
    {name: 'ABSTRACT ELEMENT', tag: 'P1', price: 24, inCart: 0},
    {name: 'REEBOK', tag: 'P3', price: 30, inCart: 0},
    {name: 'ADIDAS', tag: 'M5', price: 49, inCart: 0},
    {name: 'KRISHA', tag: 'm6', price: 49, inCart: 0},
    {name: 'ROADSTER', tag: 'm9', price: 29, inCart: 0},
    {name: 'HIGHLANDER', tag: 'M10', price: 49, inCart: 0},
    {name: 'NAUTICA', tag: 'm11', price: 30, inCart: 0},
    {name: 'MAST & HARBOUR', tag: 'm12', price: 19, inCart: 0},
    {name: 'HIGHLANDER', tag: 'm13', price: 249, inCart: 0},
    {name: 'US POLO', tag: 'm14', price: 40, inCart: 0},
    {name: 'ROADSTER', tag: 'm15', price: 24, inCart: 0},
    {name: 'HIGHLANDER', tag: 'm16', price: 29, inCart: 0},
    {name: 'ANOUK', tag: 'w2', price: 89, inCart: 0},
    {name: 'LIBAS', tag: 'w4', price: 59, inCart: 0},
    {name: 'VARANGA', tag: 'w6', price: 109, inCart: 0},
    {name: 'ANOUK', tag: 'w5', price: 49, inCart: 0},
    {name: 'INDU ERA', tag: 'w7', price: 29, inCart: 0},
    {name: 'KUDOS', tag: 'w8', price: 30, inCart: 0},
    {name: 'LIBAS', tag: 'W9', price: 249, inCart: 0},
    {name: 'ABSTRACT', tag: 'w1', price: 19, inCart: 0},
    {name: 'ANOUK', tag: 'w10', price: 89, inCart: 0},
    {name: 'LIBAS', tag: 'w11', price: 59, inCart: 0},
    {name: 'VARANGA', tag: 'w12', price: 109, inCart: 0},
    {name: 'ANOUK', tag: 'w13', price: 49, inCart: 0},
    {name: 'INDU ERA', tag: 'w14', price: 29, inCart: 0},
    {name: 'KUDOS', tag: 'w15', price: 30, inCart: 0},
    {name: 'LIBAS', tag: 'w16', price: 249, inCart: 0},
    {name: 'ABSTRACT', tag: 'w17', price: 19, inCart: 0}
]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        console.log("added to cart");
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {
        document.querySelector('.logout-bag span').textContent = productNumbers;
    } 
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.logout-bag span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.logout-bag span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("my cartItems are", cartItems);

    if(cartItems != null){
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }       
        cartItems[product.tag].inCart += 1;    
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product){
    // console.log("the product price is", product.price);

    let cartCost = localStorage.getItem('totalCost');
    // console.log("the cart price is", cartCost);
    // console.log(typeof cartCost);

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    // console.log(cartItems);

    if(cartItems && productContainer){
        // console.log("run");
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product">
                <i id="bar" class="far fa-times"></i>
                <img src ="./IMG/${item.tag}.jpg">
                <span> ${item.name}</span>
            </div>   
            <div class = "price"> $${item.price},00</div>
            <div class = "quantity">
                <ion-icon name="arrow-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </div> 
            <div class="total">
                $${item.inCart * item.price},00
            </div> 
            `
        });

        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h4 class = "basketTotalTitle"> Basket Total </h4>
                <h4 class = "basketTotal"> $${cartCost},00 </h4>
            </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();