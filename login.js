let mail = document.querySelector("#mail")
let pwd = document.querySelector("#pwd")
let login = document.querySelector("#login")
let form = document.querySelector("form")

function generateToken(){
    return Math.random(0, 100000).toString()
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(mail.value == '' || pwd.value == ''){
        msg.innerText = "all fields are required!"
        msg.style.color = "red"
    }else{
    let users = JSON.parse(localStorage.getItem('users') ?? '[]')
    let filteredUser = users.filter(user => user.email === mail.value)
    if(filteredUser.length > 0){
        if(pwd.value === filteredUser[0].password){
            msg.textContent = `Login successful!
            redirecting to shopping page...`
            msg.style.color = "green"

            localStorage.setItem("currUser", JSON.stringify({
                email: mail.value,
                password: pwd.value,
                token: generateToken()
            }))

            setTimeout(()=>{
                window.location.href = "./shop"
            }, 1500)
        }else{
            msg.textContent = `Password incorrect`
            msg.style.color = "red"
        }
    }else{
        //user not exists
        msg.innerText = "User does not exists!\t"
        msg.style.color = "red"
        msg.innerHTML += ("<a href='./index.html'>Go to SignUp Page</a>")
    }
}

})
