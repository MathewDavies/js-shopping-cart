# JavaScript Shopping Cart # 

This is a module that can be added to a page to create a shopping cart.

## Set up information ##

To put a shopping cart where you want on your page, put a Div element on the page with an ID of "cart-container" and load the JavaScript file. Leave the div empty as the JavaScript will populate the file.
```html
    <div id="cart-container> </div>
```
You must then instaniate the cart class and call the render cart method like so:
```javascript
    let shoppingCart = new Cart('Your Cart');
    shoppingCart.renderCart();
```
## Options ##

There are several options you can have for the cart. These are Cart title, whether to have an element that displays the cart quantity and which currency for the cart. These are all done by putting parameters into the new cart.

### Cart Title ###

As it says on the tin, you can display a custom title on your cart. The default is 'Shopping Cart' but you might want to call it 'Cart' or 'Basket' or something else. When you instantiate the cart, simply put the title down as your first variable.

If you want to alter other variables, you should put in a cart title first, as you will confuse the class otherwise.

### Adding a quantity to your cart display button ###

On sites such as Amazon it is common to have a the number of items displayed in a basket. There is an option for this when you first create the cart object.  If this option is chosen, the module will count the quantity each time you render the cart and put it into local storage and update an element with an id of 'basket-quantity.

As an example, you could display a basket button like so:

```html
<button id="show-hide-cart"><span id="cart-visibility">Show Basket </span><span id="basket-number">(0)</span></button>
```
The text between the basket-number span will be updated when the page loads and with each changing of the cart.

To select the option, include 'yes' as the second variable when loading the cart. For example:
```javascript
let shoppingCart = new Cart('Your Cart', 'yes');
```
### Selecting a currency ###

By default, the cart will display British Pounds as a currency, however this is simple to change by adding in a third Parameter. To display dollars for example, you could instantiate the cart like so:

```javascript
let shoppingCart = new Cart('Your Cart', 'yes', '$');
```

### Adding Items to the Cart ###

You can add items to the cart by calling the add items method of the class and passing in the item, quantity and price. Both the price and the quantity should be integers - the currency is set as explained above. 

An example of calling the function would be:

```javascript
shoppingCart.addCartItem(item, quantity, price)
```
Note that in this case 'shoppingCart is the name of the variable you have named to instantiate the class, with the above examples.

We cannot provide a specific function to pass get the item, price and quantity as these will differ depending on how you display your pages and what class names and Ids you attach to your products. We have however provided an example of how you might do this on the github. 

## Deleting and clearing the cart ##

A clear and delete button are provided within the module which allows you to delete items from the cart. 


## Styling the Cart ##

We have provided a style sheet for the cart on Gitbub as an example however it can be styled how you want. To see the HTML of the cart when rendered and the classes available, create the cart on a web page, inspect the page and view the elements. This will allow you to see the cart structure so you can create your own HTML

#####Insert finished cart here######

## Output ##

We have created a checkout button for the cart, which you can attach an event handler so you can take an action. This button is optional so if you wish to have a seperate checkout button, simply select no as the fourth option when instantiating the cart object.

For example: 
```javascript
let shoppingCart = new Cart('Your Cart', 'yes', '$', 'no');
```
If you select yes, a button will be rendered as so:

```html
<button id="checkout-btn>Check Out</button>
```
This button doesn't have any functionality, so it is up to you to either manipulate it with JavaScript, for example, by wrapping a form around it and allowing it to execute a PHP post request or by adding a JavaScript Event Handler and attaching an appropriate function. 

To get the information from the cart is simple, as it is all in local storage under the variable name 'cart', stored as JSON. 

It is also available as a JavaScript  array called customer cart. For example:

```JavaScript
let cartData = shoppingCart.customerCart;
```
Recovering the information this way may be advisable as local storage is not available on every browser. 

