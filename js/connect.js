
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

const submit = document.getElementById('btn-success');
submit.addEventListener("click", function (event) {
    event.preventDefault();
    const Correo1 = document.getElementById('correo').value;
    const password1 = document.getElementById('password').value;
    const Nombre1 = document.getElementById('nombre').value;
    const Carrera1 = document.getElementById('carrera').value;
    const Cuatrimestre1 = document.getElementById('cuatri').value;
    const Matricula1 = document.getElementById('matricula').value;
    const Apellidos1 = document.getElementById('apellido').value;

    createUserWithEmailAndPassword(auth, Correo1, password1)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const uid = user.uid;

            // Guardar los datos del usuario en Realtime Database
            set(ref(database, '/Cuentas/' + uid), {
                Apellidos: Apellidos1,
                Carrera: Carrera1,
                Nombre: Nombre1,
                Cuatri: Cuatrimestre1,
                Matricula: Matricula1,
                Password: password1,
                Correo: Correo1
            })
            .then(() => {
                // Guardar los datos en el nodo "Alumnos"
                set(ref(database, '/Alumnos/' + Carrera1 + '/' + Matricula1), {
                    Calificaciones
                })
                .then(() => {
                    alert("Registro exitoso: Tus datos han sido guardados correctamente.");
                })
                .catch((error) => {
                    alert("ERROR: Ha ocurrido un problema al guardar los datos en Alumnos: " + error.message);
                });
            })
            .catch((error) => {
                alert("ERROR: Ha ocurrido un problema al guardar los datos en Cuentas: " + error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("ERROR: Ha ocurrido un problema al crear el usuario: " + error.message);
        });
});
