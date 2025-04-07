if(localStorage.getItem("currUser")){

let fname = document.querySelector("#fname")
let lname = document.querySelector("#lname")

let Opwd = document.querySelector("#Opwd")
let Npwd = document.querySelector("#Npwd")
let cNpwd = document.querySelector("#cNpwd")

let saveInfoBtn = document.querySelector("#saveInfo")
let changePwBtn = document.querySelector("#changePw")
let logoutBtn = document.querySelector("#logout")

let form1 = document.querySelector("#form1")
let form2 = document.querySelector("#form2")

let currUser = JSON.parse(localStorage.getItem("currUser"))
let users = JSON.parse(localStorage.getItem("users"));


form1.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(fname.value !== '', lname.value !== ''){ 
        let filteredUsers = users.filter(user => {
            return user.email !== currUser.email
        })


        let obj = {
            email: currUser.email,
            password: currUser.password,
            fname: fname.value,
            lname: lname.value
        }

        filteredUsers.push(obj)
        localStorage.setItem("users", JSON.stringify(filteredUsers))
        form1.reset()
    }else{
        alert("All fields are required!")
    }

})



form2.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(Opwd.value !== '', Npwd.value !== '', cNpwd.value !== ''){
        if(Opwd.value === currUser.password){
            if(Npwd.value === cNpwd.value){
                let filteredUsers = users.filter(user => {
                    return user.email === currUser.email
                })

                let idx = users.findIndex(item => item.email == currUser.email)

                filteredUsers[0].password = Npwd.value;

                users[idx] = filteredUsers[0];
            
                localStorage.setItem("users", JSON.stringify(users))
                form1.reset()
            }
        }else{
            alert("Password is incorrect!")
        }
    }else{
        alert("All field are required!")
    }
})


logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("currUser")
    location.reload()
})



}else{
    document.querySelector("body").innerHTML = `
        <p style="color: red;">You are not logged in!</p>
        <a href="http://127.0.0.1:5501/login.html">Login</a>
    `
}










