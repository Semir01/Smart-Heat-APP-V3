var Users_Info = [
    {
        username: "admin",
        password: "smartheat2024",
    }
]

const LogIn = document.getElementById('LogIn');
const Username = document.getElementById('Username');
const Password = document.getElementById('Password');

LogIn.addEventListener('click', () => {
    let Log_User = Users_Info.find(u => u.username === Username.value && u.password === Password.value);

    if (ValideInputs()) {
        if (Log_User) {
            sessionStorage.setItem('Log_User', JSON.stringify(Log_User));
            setTimeout(() => {
                window.location.href = "devices.html";
            }, 100);
        }
        else{
            console.log("Error - wrong username or password");
        }
    }
})

const SetError = (Element, message) => {
    const InputControl = Element.parentElement;
    const errorDisplay = InputControl.querySelector('.error');

    errorDisplay.innerText = message;

    InputControl.classList.add('styled-Error');
    InputControl.classList.add('error');
    InputControl.classList.remove('success');
}

const SetSuccess = Element =>{
    const InputControl = Element.parentElement;
    const errorDisplay = InputControl.querySelector('.error');

    errorDisplay.innerText = '';
    InputControl.classList.add('success');
    InputControl.classList.remove('error');
}

function ValideInputs(){
    const username = Username.value.trim();
    const password = Password.value.trim();

    let statusLogin = true;

    if(username === ""){
        SetError(Username,'Username is required');
        statusLogin = false;
    }

    if(password === ""){
        SetError(Password,"Password is required");
        statusLogin = false;
    }

    return statusLogin;
}