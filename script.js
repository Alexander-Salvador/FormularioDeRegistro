import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';


// Configuración de Firebase (reemplaza con tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyC_ZBAm-95MYu2Kd439X0y3V07FUhzzyYM",
    authDomain: "formulario-de-registro-d15b5.firebaseapp.com",
    projectId: "formulario-de-registro-d15b5",
    storageBucket: "formulario-de-registro-d15b5.firebasestorage.app",
    messagingSenderId: "1091951636426",
    appId: "1:1091951636426:web:af653e9ea9f041d76ba933",
    measurementId: "G-YJ04HQMSXP"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();

// Manejar el envío del formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    const validations = [
        () => validateName(),
        () => validateEmail(),
        () => validatePassword()
    ];

    if (!validations.every(validation => validation())) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }
    // Obtener los datos del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // BACK END - FIREBASE
    db.collection("users").add({
        name: validateName(),
        email: validateEmail(),
        password: validatePassword()
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('formulario').reset();
            alert('Formulario enviado correctamente');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Ocurrió un error al enviar el formulario.');
        });


})



// Validar campo de nombre
function validateName() {
    let name = document.getElementById('name').value.trim();
    let nameError = document.getElementById('nError')

    if (name === '') {
        nameError.textContent = 'Por favor, introduce tus nombres'
        nameError.classList.add('errorMessage')
    } else {
        nameError.textContent = ''
        nameError.classList.remove('errorMessage')
    }
    return name;
}

// Validar campo de correo electrónico
function validateEmail() {
    let email = document.getElementById('email').value.trim();
    let errorEmail = document.getElementById('eError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        errorEmail.textContent = 'Por favor, introduce tu correo electrónico';
        errorEmail.classList.add('errorMessage');
    } else if (!emailPattern.test(email)) {
        errorEmail.textContent = 'El correo electrónico no es válido';
        errorEmail.classList.add('errorMessage');
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('errorMessage');
    }
    return email;
}

// Validar campo de password
function validatePassword() {
    let password = document.getElementById('password').value.trim();
    let errorPassword = document.getElementById('pError')

    if (password.length < 8) {
        errorPassword.textContent = 'La contraseña debe tener mínimo 8 caracteres'
        errorPassword.classList.add('errorMessage')
    } else {
        errorPassword.textContent = ''
        errorPassword.classList.remove('errorMessage')
    }
    return password;
}



