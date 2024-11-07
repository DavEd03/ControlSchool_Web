
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getDatabase, ref, set,onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

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

//Agregar datos a la base de datos
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
                set(ref(database, '/Alumnos/' + Carrera1 + '/' + "Calificaciones"+ Matricula1), {
                    Status:"Sin registros"
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

function loadData() {
    const dbRef = ref(database, 'Cuentas/');
    onValue(dbRef, (snapshot) => {
        const tableBody = document.getElementById("table-body").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
        const data = snapshot.val();
            
            for (const uid in data) {
                const row = tableBody.insertRow();
                const cellCampo1 = row.insertCell(0);
                const cellCampo2 = row.insertCell(1);
                const cellCampo3 = row.insertCell(2);
                const cellCampo4 = row.insertCell(3);
                const cellCampo5 = row.insertCell(4);
                const cellCampo6 = row.insertCell(5);
                const cellCampo7 = row.insertCell(6);
                const cellActions = row.insertCell(7);
                
                 // Muestra el UID
                cellCampo1.textContent = data[uid].Matricula || ""; // Reemplaza 'campo1' con el nombre real del campo
                cellCampo2.textContent = data[uid].Nombre || ""; // Reemplaza 'campo2' con el nombre real del campo
                cellCampo3.textContent = data[uid].Apellidos || ""; // Reemplaza 'campo3' con el nombre real del campo
                cellCampo4.textContent = data[uid].Carrera || ""; // Reemplaza 'campo4' con el nombre real del campo
                cellCampo5.textContent = data[uid].Cuatri || ""; // Reemplaza 'campo5' con el nombre real del campo
                cellCampo6.textContent = data[uid].Correo || ""; // Reemplaza 'campo6' con el nombre real del campo
                cellCampo7.textContent = data[uid].Password || ""; // Reemplaza 'campo7' con el nombre real del campo
            
             // Crear botones para editar y eliminar
             const editButton = document.createElement('button');
             editButton.textContent = 'Editar';
             editButton.className = 'btn btn-primary btn-sm';
             editButton.onclick = function() {
                 openEditModal(uid, data[uid]); // Abre el modal de edición
             };
 
             const deleteButton = document.createElement('button');
             deleteButton.textContent = 'Eliminar';
             deleteButton.className = 'btn btn-danger btn-sm';
             deleteButton.onclick = function() {
                 openDeleteModal(uid); // Abre el modal de eliminación
             };
 
             // Añadir los botones a la celda de acciones
             cellActions.appendChild(editButton);
             cellActions.appendChild(deleteButton);
            
            }
        });
    }

    // Ejecutar la función loadData al cargar la página
    document.addEventListener('DOMContentLoaded', (event) => {
        loadData();
    });

    function openEditModal(recordId, recordData) {
        // Establecer los valores actuales en el modal de edición
        document.getElementById('dataField').value = recordData.Nombre; // Por ejemplo, puedes poner el nombre en un campo de entrada
        $('#editModal').data('recordId', recordId); // Guardar el ID en el modal
        $('#editModal').modal('show'); // Mostrar el modal de edición
    }
    
    function openDeleteModal(recordId) {
        $('#deleteModal').data('recordId', recordId); // Guardar el ID en el modal
        $('#deleteModal').modal('show'); // Mostrar el modal de eliminación
    }