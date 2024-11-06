import { doesNotMatch } from "assert";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBIb5nB7I0E5BM2ZaKYQHv0aSWCC2FMBGE",
    authDomain: "controlschool-9fdc0.firebaseapp.com",
    projectId: "controlschool-9fdc0",
    storageBucket: "controlschool-9fdc0.appspot.com",
    messagingSenderId: "999306012944",
    appId: "1:999306012944:web:be011a6be63004f53b9d95",
    measurementId: "G-T1CCLT7RKX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const submit = document.getElementById('btnIniciar');
submit.addEventListener("click", function (event) {
    event.preventDefault()
    const Correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const Nombre = document.getElementById('nombre').value;
    const Carrera = document.getElementById('carrera').value;
    const Cuatrimestre= document.getElementById('Cuatri').value;
    const Matricula= document.getElementById('matricula').value;
    const Apellidos= document.getElementById('apellido').value;

    createUserWithEmailAndPassword(auth, correo, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // Guardar los datos del usuario en Realtime Database
            set(ref(database, 'usuarios/' + user.uid), {
                email: email,
                institucion: institucion,
                semestre: semestre
            })
            .then(() => {
                Swal.fire({
                    position: "",
                    icon: "success",
                    title: "Registro exitoso",
                    showConfirmButton: false,
                    timer: 1500
                  });
                
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Error al guardar los datos: " + error.message
                  });
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Error al guardar los datos: " + error.message
              });
            // ..
        });

})
