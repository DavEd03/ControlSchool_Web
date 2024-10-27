import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIb5nB7I0E5BM2ZaKYQHv0aSWCC2FMBGE",
    authDomain: "controlschool-9fdc0.firebaseapp.com",
    projectId: "controlschool-9fdc0",
    storageBucket: "controlschool-9fdc0.appspot.com",
    messagingSenderId: "999306012944",
    appId: "1:999306012944:web:be011a6be63004f53b9d95",
    measurementId: "G-T1CCLT7RKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const submit = document.getElementById('btnIniciar');
submit.addEventListener("click", function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Login Account...")
            window.location.href = "menu.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Denegado",
                text: "correo y/o contraseña incorrecta"
              });
            // ..
        });

})