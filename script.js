// ===============================
// PASSWORDFORGE v1.0
// ===============================

const password = document.getElementById("password");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");
const showPassword = document.getElementById("showPassword");

const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const message = document.getElementById("message");

const themeToggle = document.getElementById("themeToggle");

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBER = "0123456789";
const SYMBOL = "!@#$%^&*()_-+=<>?/{}[]";

length.addEventListener("input", () => {

    lengthValue.textContent = length.value;

});

function randomChar(chars){

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return chars[array[0] % chars.length];

}

function generatePassword(){

    let characters = "";

    if(uppercase.checked) characters += UPPER;
    if(lowercase.checked) characters += LOWER;
    if(numbers.checked) characters += NUMBER;
    if(symbols.checked) characters += SYMBOL;

    if(characters.length === 0){

        message.textContent = "Selecciona al menos una opción.";

        password.value = "";

        return;

    }

    let result = "";

    for(let i=0;i<length.value;i++){

        result += randomChar(characters);

    }

    password.value = result;

    message.textContent = "";

    updateStrength(result);

}

generate.addEventListener("click", generatePassword);

length.addEventListener("input", generatePassword);

uppercase.addEventListener("change", generatePassword);
lowercase.addEventListener("change", generatePassword);
numbers.addEventListener("change", generatePassword);
symbols.addEventListener("change", generatePassword);// ===============================
// FORTALEZA
// ===============================

function updateStrength(pass){

    let score = 0;

    if(pass.length >= 8) score++;
    if(pass.length >= 12) score++;
    if(pass.length >= 16) score++;

    if(/[A-Z]/.test(pass)) score++;
    if(/[a-z]/.test(pass)) score++;
    if(/[0-9]/.test(pass)) score++;
    if(/[^A-Za-z0-9]/.test(pass)) score++;

    if(score <= 2){

        strengthText.textContent = "Débil";
        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";

    }else if(score <= 4){

        strengthText.textContent = "Media";
        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";

    }else if(score <= 6){

        strengthText.textContent = "Fuerte";
        strengthFill.style.width = "75%";
        strengthFill.style.background = "#3b82f6";

    }else{

        strengthText.textContent = "Muy fuerte";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";

    }

}

// ===============================
// COPIAR
// ===============================

copy.addEventListener("click", async () => {

    if(password.value === "") return;

    try{

        await navigator.clipboard.writeText(password.value);

        message.textContent = "✅ Contraseña copiada";

        setTimeout(() => {

            message.textContent = "";

        },2000);

    }catch{

        message.textContent = "No se pudo copiar.";

    }

});

// ===============================
// MOSTRAR / OCULTAR
// ===============================

showPassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        showPassword.textContent = "🙈";

    }else{

        password.type = "password";
        showPassword.textContent = "👁️";

    }

});

// ===============================
// MODO OSCURO
// ===============================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeToggle.textContent = "☀️";

    }else{

        themeToggle.textContent = "🌙";

    }

});

// ===============================
// INICIO
// ===============================

generatePassword();