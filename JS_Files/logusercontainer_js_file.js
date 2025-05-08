const LogUser_Container = document.getElementById('LogUser_Container');
const DropDown = document.getElementById('DropDown');
const Logout = document.getElementById('Logout');
const User_Username = document.getElementById('User_Username');

document.addEventListener('DOMContentLoaded', () => {
    LogUser_Container.addEventListener('click', () => {
        if (DropDown.style.display === "none")
            DropDown.style.display = "flex"
        else
            DropDown.style.display = "none"
    })

    Logout.addEventListener('click',()=>{
        window.location.href = "index.html";
    })

    let User = JSON.parse(sessionStorage.getItem('Log_User'));
    User_Username.innerText = User.username;
})


