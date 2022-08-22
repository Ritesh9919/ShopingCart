let label = document.getElementById('label');
let cart = document.getElementById('shoping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    let cartIcon = document.getElementById('cartamount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0);

};

calculation()

let generateCartItem = () => {
    if (basket.length !== 0) {
        return cart.innerHTML = basket.map((x) => {

            let { id, item } = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
     <div class="cart-item">
     <img width="100" src="${img}" alt=""/>
     <div class="details">
     <div class="title-price">
     <h4 class="title-price-2">
     <p>${name}</p>
     <p class="cart-item-price">$ ${price}</p>
     </h4>
     <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
     </div>
     
      <div class="button">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
             </div>
     <h3>$ ${item * search.price}</h3>
     </div>
     </div> 
      `;


        }).join("")
    } else {
        cart.innerHTML = ``
        label.innerHTML = `
    <h2>Cart is empty</h2>
    <a href="index.html">
    <button class="homeBtn">Back to home</button>
    </a>
    `;
    }
};

generateCartItem()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1;

    }

    generateCartItem()
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;

    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem()
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
    totalAmount()
};

let removeItem = (id) => {
    let selectedItem = id;
    //console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItem()
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));

}

let clearCart = () => {
    basket = [];
    generateCartItem();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));

}


let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x
            let search = shopItemData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((a, b) => a + b, 0);
        //console.log(amount);

        label.innerHTML = `<h2>Total Bill: $ ${amount}</h2>
<button class="checkout">Checkount</button>
<button onclick="clearCart()" class="removeAll">Clear cart</button>
`;
    } else return;

}

totalAmount()
