


let shoppingCart = new Cart('Your Cart', 'yes', '$','yes');
let addToCartButtons = document.getElementsByClassName('add-to-cart-button');
let displayCart = document.getElementById('cart-visibility');
let basketNumber = document.getElementById('basket-number');
let cartButton = document.getElementById('show-hide-cart');
cartButton.addEventListener('click', toggleCart);

//attach event listeners to add to cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', (e)=> {
    let itemSection = e.target.parentElement;
    let productId = itemSection.getElementsByClassName('product-id')[0].value;
    let productTitle = itemSection.getElementsByClassName('product-title')[0].innerText;
    let productPrice = itemSection.getElementsByClassName('price')[0].innerText;
    let productQuantity = itemSection.getElementsByClassName('quantity-input')[0].value;
    //run the shopping cart 'add cart item function with the target information
    shoppingCart.addCartItem(productId, productTitle, productQuantity, productPrice);
      
    });
}
dragElement(document.getElementById("cart-container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//test to set a value in local storage for toggle cart function until I get cart.js working

function toggleCart(){
    
    let cart = document.getElementById('cart-container');
    cart.classList.toggle('hide-cart' );

    if(cart.classList.contains('hide-cart')){

        displayCart.innerText = "Show Cart ";
        shoppingCart.updateCartQuantity();
    }else{
        displayCart.innerText = "Hide Cart ";
        shoppingCart.updateCartQuantity();
    }
    console.log('toggle')
}


//onload
//create the cart
shoppingCart.renderCart();
//update the cart quantity in the basket number element
shoppingCart.updateCartQuantity();
//toggle the cart initially to hide it
toggleCart();

