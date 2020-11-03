class Cart{

    constructor(title='Shopping Cart', basketQuantity='no', currency = "£", checkoutButton="yes"){
        //Create cart structure
        this.currency = currency;
        this.cartContainer = document.getElementById('cart-container');
        //create Cart Title
        let cartTitle = document.createElement('h2');
        cartTitle.setAttribute('class', 'cart-title');
        cartTitle.innerText = title;
        this.cartContainer.appendChild(cartTitle);
        this.cartTitleElement = cartTitle;
        
        //create Cart Table
        this.cartTable = document.createElement('table');
        this.cartTable.setAttribute('class', 'cart-table');
        
        this.cartContainer.appendChild(this.cartTable);
        //create the header row
        this.headerRow = document.createElement('tr');
        

        let itemCell = document.createElement('th');
        itemCell.setAttribute = ('class', 'table-title' )
        itemCell.innerText=('Item');

        let quantityCell = document.createElement('th');
        quantityCell.setAttribute = ('class', 'table-title')
        quantityCell.innerText=('Quantity');
        

        let priceCell = document.createElement('th');
        priceCell.setAttribute = ('class', 'table-title' )
        priceCell.innerText=('Price');
        let actionCell = document.createElement('th');
        actionCell.setAttribute = ('class', 'table-title' )
        actionCell.innerText=('Action');

        this.headerRow.appendChild(itemCell);
        this.headerRow.appendChild(quantityCell);
        this.headerRow.appendChild(priceCell);
        this.headerRow.appendChild(actionCell);

        this.cartTable.appendChild(this.headerRow);

        this.cartTotalElement = document.createElement('h3');
        this.cartTotalElement.setAttribute('id', 'cart-total');
        this.cartContainer.appendChild(this.cartTotalElement);

        this.emptyCartDiv = document.createElement('div');
        this.emptyCartDiv.setAttribute('class', 'empty-cart-div')
        this.cartContainer.appendChild(this.emptyCartDiv);
        this.customerCart = [];
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.setLocalStorage = this.setLocalStorage.bind(this);
        
        this.totalCart = this.totalCart.bind(this);
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.updateCartQuantity = this.updateCartQuantity.bind(this);
        this.onload = true;

        let checkoutDiv = document.createElement('div')
        checkoutDiv.setAttribute('class', 'checkout-div');
        if(checkoutButton==="yes"){
            let checkoutBtn = document.createElement('button');
            checkoutBtn.setAttribute('id', 'checkout-btn');
            checkoutBtn.innerText = "Check Out";
            checkoutDiv.appendChild(checkoutBtn);
            this.cartContainer.appendChild(checkoutDiv);
        }

        if(basketQuantity ==='yes'){
        this.basketNumber = document.getElementById('basket-number');
        this.basketQuantity = 'yes'
        }else{
            console.log("Basket Quantity not selected");
        }
    }

        //set Local Storage
        setLocalStorage(){
            if (typeof(Storage) !== "undefined") {
                let jsonCart = JSON.stringify(this.customerCart);
                localStorage.setItem('cart', jsonCart);
                let cartQuantity=0;

                this.customerCart.forEach( item => {
                    cartQuantity = cartQuantity + Number(item[2]);
                    console.log(cartQuantity)
                })
                localStorage.setItem('cartQuantity', cartQuantity);

            console.log('storage set')
            } else {
            console.log('No webstorage support');
            }
        }
        //set Local Storage
        getLocalStorage(){
            if (typeof(Storage) !== "undefined") {
                let localCart = localStorage.getItem('cart');
            console.log(localCart)
                this.customerCart = JSON.parse(localCart);
                
            } else {
            console.log('No webstorage support');
            }
        }
    
    //public function
    addCartItem(id, item, quantity, price){

        if(this.customerCart!=null){
            this.customerCart.push([
                id,
                item, 
                quantity, 
                price, 
            ])
        } else{
            this.customerCart =[
                [id,
                item, 
                quantity, 
                price, ]
            ];
        }
        this.setLocalStorage();
        this.renderCart();
    }

    //private function
    renderCart(){
        //If the cart is loading for the first time, check local storage
        if(this.onload===true){
            this.getLocalStorage();
            this.onload= false;
        }
        //If the cart is empty, display an empty cart message
        if(this.customerCart===null ){
            this.clearCartItems();
            let emptyCartText = document.createElement('p');
            emptyCartText.innerText = 'Cart Empty';
            emptyCartText.setAttribute('class', 'empty-cart-text');
            this.emptyCartDiv.appendChild(emptyCartText);
            //calculate the cart Total, which in this case will be nil
            this.totalCart();
        }else{
            //render cart

            //clear previous items
            this.clearCartItems();
            //add each item in the customer cart variable with a loop
            for(let i=0; i < this.customerCart.length; i++){
                //create a base row called tableRow
                let tableRow = document.createElement('tr');
                tableRow.setAttribute('class', 'table-row');
                //create a series of table divs to attach to the cart with data
                let tableDiv1 = document.createElement('td');
                tableDiv1.setAttribute('class', 'table-row-div');
                tableDiv1.innerText = this.customerCart[i][1];

                let tableDiv2 = document.createElement('td');
                tableDiv2.innerText = this.customerCart[i][2];
                tableDiv2.setAttribute('class', 'table-row-div');

                let tableDiv3 = document.createElement('td');  
                tableDiv3.innerText = this.currency + this.customerCart[i][3];
                tableDiv3.setAttribute('class', 'table-row-div');

                let tableDiv4 = document.createElement('td');  
                tableDiv4.setAttribute('class', 'table-row-div');
                //Create a remove button
                let removeButton = document.createElement('button');
                removeButton.setAttribute('class', 'remove-button');
                removeButton.setAttribute('value', i);
                removeButton.innerText = "Remove";
                removeButton.addEventListener('click', this.deleteCartItem);
                //append the remove button to the div
                tableDiv4.appendChild(removeButton);
                //Append all 4 divs to the row
                tableRow.appendChild(tableDiv1);
                tableRow.appendChild(tableDiv2);
                tableRow.appendChild(tableDiv3);
                tableRow.appendChild(tableDiv4);
                //Append the row to the cart
               this.cartTable.appendChild(tableRow);
            }
            //delete 'empty cart' message if its there
            this.emptyCartDiv.innerHTML = "";
        }
          //update the cart quantity
            this.updateCartQuantity();
            //calculate the cart total
            this.totalCart();
     }
    //public function
    deleteCartItem(e){
        let itemNo = e.target.value;
        console.log(itemNo);
        //remove the particular item from the cart array
        console.log(this.customerCart);
        this.customerCart.splice(itemNo, 1);
        //record in local storage again
        this.setLocalStorage();
        //re-render the cart
        this.renderCart();
    }
    //private function
    totalCart(){
        let cartTotal = 0;
        if(this.customerCart !=null){
            for(let i=0; i < this.customerCart.length; i++){
                let cartQuantity = this.customerCart[i][2];
                let cartItemPrice = this.customerCart[i][3];
                let cartRowTotal = cartQuantity * cartItemPrice;
                cartTotal = cartTotal + cartRowTotal;
        }
         this.cartTotalElement.innerText = `Total: ${this.currency}${cartTotal.toFixed(2)}`;  
        }else{
            this.cartTotalElement.innerText = `Total: ${this.currency}0.00`;  
        }
        }


    //private function
    clearCartItems(){
        let tableRowDivs = document.getElementsByClassName('table-row-div');
       let tableRows = document.getElementsByClassName('table-row');
        while(tableRowDivs[0]){
            tableRowDivs[0].parentNode.removeChild(tableRowDivs[0]);
        }
        while(tableRows[0]){
            tableRows[0].parentNode.removeChild(tableRows[0]);
       }
    }

    //private function
     updateCartQuantity(){
        let customerQuantity = 0;
        //check local storage for the quantity of goods in the cart
            if (typeof(Storage) !== "undefined") {
                if(localStorage.getItem('cartQuantity')){
                    let localCartQuantity = localStorage.getItem('cartQuantity');
                    console.log(localCartQuantity)
                    customerQuantity = JSON.parse(localCartQuantity);
                }
            }
        this.basketNumber.innerText = "(" + customerQuantity + ")"
}
}
