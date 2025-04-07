if(localStorage.getItem("products")){
  let products = JSON.parse(localStorage.getItem("products"))
  let mens = products.filter(items => items.category === "men's clothing")
  let womens = products.filter(items => items.category === "women's clothing")
  let jewellery = products.filter(items => items.category === "jewelery")
  let electronics = products.filter(items => items.category === "electronics")

  let input = document.querySelector("#input")
  let menSection = document.querySelector("#menCloth")
  let womenSection = document.querySelector("#womenCloth")

  let tabContainer = document.querySelector("#tabContainer")

  let cart = []

  //render initial mens and womens section
  render(mens, "menCloth")
  render(womens, "womenCloth")


  //search functionality
  sessionStorage.setItem("currTab", JSON.stringify(products))

  input.addEventListener("input", (e)=>{
    let currTab = JSON.parse(sessionStorage.getItem("currTab"))
  
    let filteredData = currTab.filter(product => 
      product.price.toString().includes(e.target.value) || product.category.toLowerCase().includes(e.target.value) || product.title.toLowerCase().includes(e.target.value)
    )


    tabContainer.innerHTML = ''
    menSection.style.display = "none"
    menSection.previousElementSibling.style.display = "none"
    womenSection.previousElementSibling.style.display = "none"
    womenSection.style.display = "none"
    render(filteredData, "tabContainer")
  })



  //add to cart
  tabContainer.addEventListener("click", (e)=>{
    let currTab = JSON.parse(sessionStorage.getItem("currTab"))

    if(e.target.classList.contains('addBtn')){
      console.log(e.target.getAttribute("data-idx"))
      let productIdx = e.target.getAttribute("data-idx")
      cart.push(currTab[productIdx])
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log(cart)
    }
    
  })

  //men's cloth add to cart
  menSection.addEventListener("click", (e)=>{
    if(e.target.classList.contains('addBtn')){
      console.log(e.target.getAttribute("data-idx"))
      let productIdx = e.target.getAttribute("data-idx")
      cart.push(mens[productIdx])
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log(cart)
    }
  })
  
  //women's cloth add to cart
  womenSection.addEventListener("click", (e)=>{
    if(e.target.classList.contains('addBtn')){
      console.log(e.target.getAttribute("data-idx"))
      let productIdx = e.target.getAttribute("data-idx")
      cart.push(womens[productIdx])
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log(cart)
    }
  })

  
  //Tab event listeners
  document.querySelector(".filters").addEventListener("click", (e)=>{
    if(e.target.classList.contains("filter")){

      document.querySelectorAll(".filter").forEach(tab => {
        tab.classList.remove("active")
      })
      e.target.classList.toggle("active")

      tabContainer.innerHTML = ''

      menSection.style.display = "none"
      menSection.previousElementSibling.style.display = "none"
      womenSection.previousElementSibling.style.display = "none"
      womenSection.style.display = "none"
      
      if(e.target.innerText == "All"){
        render(products, "tabContainer")
        sessionStorage.setItem("currTab", JSON.stringify(products))
      }else if(e.target.innerText == "Mens"){
        render(mens, "tabContainer")
        sessionStorage.setItem("currTab", JSON.stringify(mens))
      }else if(e.target.innerText == "Womens"){
        render(womens, "tabContainer")
        sessionStorage.setItem("currTab", JSON.stringify(womens))
      }else if(e.target.innerText == "Jewellery"){
        render(jewellery, "tabContainer")
        sessionStorage.setItem("currTab", JSON.stringify(jewellery))
      }else if(e.target.innerText == "Electronics"){
        render(electronics, "tabContainer")
        sessionStorage.setItem("currTab", JSON.stringify(electronics))
      }
    }
  })


}else{
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("products", JSON.stringify(data))
      location.reload()
    }) 
}


//render
function render(category, container){
  let idx = 0;
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
      <button class="addBtn" data-idx=${idx++}>Add to Cart</button>
    </div>
  `
  })
}

