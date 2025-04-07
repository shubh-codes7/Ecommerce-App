if(localStorage.getItem("currUser")){
let cart = JSON.parse(localStorage.getItem("cart"))
let tabContainer = document.querySelector("#tabContainer")
console.log(cart)

renderCheckoutItems()



let totalSum = cart.reduce((a, b) => a + Number(b.price), 0).toFixed(2)
document.querySelector("#totalPrice").innerText = `$ ${totalSum}`

document.querySelector("#checkOutBtn").addEventListener("click", (e)=>{
  var options = {
    key: "rzp_test_oJUxFwfIgCPOg2", 
    amount: totalSum * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
})

//remove from cart
tabContainer.addEventListener("click", (e)=>{
  if(e.target.classList.contains('removeBtn')){
    console.log(e.target.getAttribute("data-idx"))
    let productIdx = e.target.getAttribute("data-idx")

    cart.splice(productIdx, 1)
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    render(cart, "tabContainer")
    totalSum = cart.reduce((a, b) => a + Number(b.price), 0).toFixed(2)
    document.querySelector("#totalPrice").innerText = `$ ${totalSum}`
    renderCheckoutItems()

  }
})

render(cart, "tabContainer")


//render
function render(category, container){
    let idx = 0;
    tabContainer.innerHTML = ''
    category.forEach(product => {
      document.querySelector(`#${container}`).innerHTML += `
      <div class="item">
        <img src="${product.image}" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">S,M,L</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating:${product.rating.rate}</div>
        </div>
        <button class="removeBtn" data-idx=${idx++}>Remove from Cart</button>
      </div>
    `
    })
}


function renderCheckoutItems(){
  if(cart.length == 0){
    document.querySelector("#checkout-items").innerHTML = "<h4 style='text-align: center; color: red; margin-top: 150px;'>Add items to cart</h4>"
  }else{
    document.querySelector("#checkout-items").innerHTML = ''
    cart.forEach(item => {
      document.querySelector("#checkout-items").innerHTML += `
        <li class="item">
          <span id="title">${item.title}</span>
          <span id="price">$ ${item.price}</span>
        </li>
      `
    })
  }
}


}else{
  document.querySelector("body").innerHTML = `
      <p style="color: red;">You are not logged in!</p>
      <a style="color: blue;" href="/login.html">Login=></a>
  `
}
