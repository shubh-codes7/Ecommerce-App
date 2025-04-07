
let fname = document.querySelector("#fname")
let lname = document.querySelector("#lname")
let mail = document.querySelector("#mail")
let pwd = document.querySelector("#pwd")
let cpwd = document.querySelector("#cpwd")
let signupBtn = document.querySelector("#signup")
let form = document.querySelector("form")
let msg = document.querySelector("p")
    
form.addEventListener("submit", (e)=> {
    e.preventDefault()
    
    if(fname.value == '' || lname.value == '' || mail.value == '' || pwd.value == '' || cpwd.value == ''){
        msg.innerText = "all fields are required!"
        msg.style.color = "red"
    }else if(pwd.value !== cpwd.value){
        msg.innerText = "Passwords do not match"
        msg.style.color = "red"
    }else{
        let users = JSON.parse(localStorage.getItem('users') ?? "[]")
        let filteredUser = users.filter(user => user.email === mail.value)
        if(filteredUser.length > 0){
            msg.innerText = "User already exists!"
            msg.style.color = "red"
        }else{
            users.push({
                email: mail.value,
                password: pwd.value,
                fname: fname.value,
                lname: lname.value
            })

            msg.style.color = "green"   
            msg.innerText = "Data stored successfully!\t\tredirecting to login page..."
            localStorage.setItem("users", JSON.stringify(users))
            form.reset()
            setTimeout(()=>{
                window.location.href = "./login.html"
            }, 1500)
        }

        
    }
})


