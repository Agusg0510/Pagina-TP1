const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let errors = [];
    
    if(firstname_input){
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    } 
    else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }
    
    if (errors.length > 0){
        error_message.innerText = errors.join(". ");
    } else if(errors.length === 0){
        localStorage.setItem('isLoggedIn', true);
        window.location.replace('ABM.html');
    }
})

function setFieldError(inputElement, message){
    const parent = inputElement.parentElement;
    parent.classList.add('incorrect');
    const errorMsgP = parent.querySelector('.error-message');
    if(errorMsgP) {
        errorMsgP.innerText = message;
    }
}

function getSignupFormErrors(firstname, email, password, repeatPassword){
    let errors = [];

    if(firstname === '' || firstname == null){
        errors.push('Se requiere el nombre');
        setFieldError(firstname_input, 'Se requiere el nombre');
    }
    if(email === '' || email == null){
        errors.push('Se requiere el mail');
        setFieldError(email_input, 'Se requiere el mail');
    }
    if(password === '' || password == null){
        errors.push('Se requiere una contraseña');
        setFieldError(password_input, 'Se requiere una contraseña');
    }
    if(password.length < 8){
        errors.push('La contraseña debe tener por lo menos 8 caracteres')
        setFieldError(password_input, 'La contraseña debe tener por lo menos 8 caracteres');
    }
    if(password !== repeatPassword){
        errors.push('Las contraseñas no coinciden');
        setFieldError(password_input, '');
        setFieldError(repeat_password_input, 'Las contraseñas no coinciden');
    }
    
    return errors;
}

function getLoginFormErrors(email, password){
    let errors = [];

    if(email === '' || email == null){
        errors.push('Se requiere el mail');
        setFieldError(email_input, 'Se requiere el mail');
    }
    if(password === '' || password == null){
        errors.push('Se requiere una contraseña');
        setFieldError(password_input, 'Se requiere una contraseña');
    }
    return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            const errorMsgP = input.parentElement.querySelector('.error-message');
            if(errorMsgP){
                errorMsgP.innerText = '';
            }
        }
    })
})