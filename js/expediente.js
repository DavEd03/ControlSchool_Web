
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

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
const database = getDatabase(app);


function loadData() {
    const dbRef = ref(database, 'Expedientes/');
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
                const cellCampo6 = row.insertCell(5)
                const cellActions = row.insertCell(6);
               
                
                
                 // Muestra el UID
                cellCampo1.textContent = uid|| ""; // Reemplaza 'campo1' con el nombre real del campo
                cellCampo2.textContent = data[uid].Certificado_Bach || ""; // Reemplaza 'campo2' con el nombre real del campo
                cellCampo3.textContent = data[uid].Comprobante_pago || ""; // Reemplaza 'campo3' con el nombre real del campo
                cellCampo4.textContent = data[uid].Curp || ""; // Reemplaza 'campo4' con el nombre real del campo
                cellCampo5.textContent = data[uid].Acta_nacimiento || ""; // Reemplaza 'campo5' con el nombre real del campo
                cellCampo6.textContent = data[uid].RFC ||"";
            
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