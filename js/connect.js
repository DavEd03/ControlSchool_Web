
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getDatabase, ref, set,onValue, update } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


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
            alert("Registro exitoso: Tus datos han sido guardados correctamente.");
            limpiar();
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
                // Dentro del bucle for que genera las filas de la tabla
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.value = uid; // Guardar el UID en el campo oculto
                hiddenInput.id = 'uid-' + uid; // Asignar un ID único si es necesario
                row.appendChild(hiddenInput); // Agregar el campo oculto a la fila
                
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
             editButton.id="btn-open-modal"
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
        document.getElementById('nombre1').value = recordData.Nombre;
        document.getElementById('matricula1').value=recordData.Matricula;
        document.getElementById('apellido1').value=recordData.Apellidos; 
        document.getElementById('correo1').value=recordData.Correo;
        document.getElementById('password1').value=recordData.Password;
        document.getElementById('carrera1').value=recordData.Carrera;
        document.getElementById('cuatri1').value=recordData.Cuatri;
        document.getElementById('uid1').value=recordData.uid;
        const uidInput = document.getElementById('uid1'); // Asegúrate de tener un campo oculto en el modal
        uidInput.value = recordId;

        $('#editModal').data('recordId', recordId); // Guardar el ID en el modal
        $('#editModal').modal('show'); // Mostrar el modal de edición
    }
    
    function openDeleteModal(recordId) {
        $('#deleteModal').data('recordId', recordId); // Guardar el ID en el modal
        $('#deleteModal').modal('show'); // Mostrar el modal de eliminación
    }
    function limpiar(){
        document.getElementById('nombre').value = "";
        document.getElementById('matricula').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('correo').value = "";
        document.getElementById('password').value = "";
        document.getElementById('carrera').value = "";
        document.getElementById('cuatri').value = "";
    }
    
    //modificar datos en la base de datos
    const modificar=document.getElementById('saveButton');
    modificar.addEventListener('click', function(event){
        event.preventDefault();
        const uid1 = document.getElementById('uid1').value;
        const Correo1 = document.getElementById('correo1').value;
        const password1 = document.getElementById('password1').value;
        const Nombre1 = document.getElementById('nombre1').value;
        const Carrera1 = document.getElementById('carrera1').value;
        const Cuatrimestre1 = document.getElementById('cuatri1').value;
        const Matricula1 = document.getElementById('matricula1').value;
        const Apellidos1 = document.getElementById('apellido1').value;
       
      update(ref(database, '/Cuentas/' + uid1), {
            Apellidos: Apellidos1,
            Carrera: Carrera1,
            Nombre: Nombre1,
            Cuatri: Cuatrimestre1,
            Matricula: Matricula1,
            Password: password1, // Ten cuidado al manejar contraseñas
            Correo: Correo1
        })
        .then(() => {
            alert("Datos actualizados exitosamente.");
            location.reload();
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("ERROR: Ha ocurrido un problema al actualizar los datos: " + error.message);
        });
        
       
    
    
    })
    // Suponiendo que tienes el UID del documento que deseas eliminar
    const eliminarButton = document.getElementById('eliminarButton');
    eliminarButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const uidToDelete = document.getElementById('uidToDelete').value; // Obtener el UID del documento a eliminar

    // Referencia al documento que deseas eliminar
    const docRef = doc(database, 'Cuentas', uidToDelete);

    // Eliminar el documento
    deleteDoc(docRef)
        .then(() => {
            alert("Documento eliminado exitosamente.");
            location.reload(); // Recargar la página o actualizar la vista
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("ERROR: Ha ocurrido un problema al eliminar el documento: " + error.message);
        });
});