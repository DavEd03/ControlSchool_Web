
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
                const cellCampo6 = row.insertCell(5);
                const cellActions = row.insertCell(6);

                const hiddenInput= document.createElement('input');
                hiddenInput.type='hidden';
                hiddenInput.value= uid;
                hiddenInput.id= 'codigo-'+ uid;
                row.appendChild(hiddenInput);
               
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
             editButton.id="btn-open-modal";
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
            //cellActions.appendChild(deleteButton);
            
            }
        });
    }

    // Ejecutar la función loadData al cargar la página
    document.addEventListener('DOMContentLoaded', (event) => {
        loadData();
    });
    function openEditModal(recordId, recordData) {
        // Establecer los valores actuales en el modal de edición
        document.getElementById('matricula1').value=recordId;
        document.querySelector(`input[name="cert"][value="${recordData.Certificado_Bach === "SI" ? "SI" : "NO"}"]`).checked = true; 
    document.querySelector(`input[name="pago"][value="${recordData.Comprobante_pago === "SI" ? "SI" : "NO"}"]`).checked = true;
    document.querySelector(`input[name="rfc"][value="${recordData.RFC === "SI" ? "SI" : "NO"}"]`).checked = true;
    document.querySelector(`input[name="curp"][value="${recordData.Curp === "SI" ? "SI" : "NO"}"]`).checked = true;
    document.querySelector(`input[name="acta"][value="${recordData.Acta_nacimiento === "SI" ? "SI" : "NO"}"]`).checked = true;

        $('#editModal').data('recordId', recordId); // Guardar el ID en el modal
        $('#editModal').modal('show'); // Mostrar el modal de edición
    }
        // Agregar el listener para el botón
        function openDeleteModal(recordId) {
            $('#deleteModal').data('recordId', recordId); // Guardar el ID en el modal
            $('#deleteModal').modal('show'); // Mostrar el modal de eliminación
        
                const eliminarButton = document.getElementById('confirmDeleteButton');
                eliminarButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    // Referencia a la ruta del nodo que deseas eliminar
                    const refToDelete = ref(database, 'Expedientes/' + recordId);
    
                    // Eliminar el nodo
                    remove(refToDelete)
                        .then(() => {
                            alert("Documento eliminado exitosamente.");
                            // Aquí podrías actualizar la interfaz para reflejar la eliminación sin recargar la página
                            document.getElementById('deleteModal').style.display = 'none';
                            location.reload();
                        })
                        .catch((error) => {
                            console.error('Error al eliminar el documento: ', error);
                            alert("ERROR: Ha ocurrido un problema al eliminar el documento: " + error.message);
                        });
                });
            }
            const modificar = document.getElementById('saveButton');
            modificar.addEventListener('click', function(event) {
                event.preventDefault();
            
                // Obtener el ID del expediente
                const expedienteId = document.getElementById("matricula1").value;
            
                // Obtener los valores de los radio buttons seleccionados
                const actanw = document.querySelector('input[name="acta"]:checked')?.value;
                const rfcnw = document.querySelector('input[name="rfc"]:checked')?.value;
                const pagonw = document.querySelector('input[name="pago"]:checked')?.value;
                const curpnw = document.querySelector('input[name="curp"]:checked')?.value;
                const certnw = document.querySelector('input[name="cert"]:checked')?.value;
            
                // Crear un objeto con los datos a actualizar
                const dataToUpdate = {
                    Acta_nacimiento: actanw,
                    RFC: rfcnw,
                    Comprobante_pago: pagonw,
                    Curp: curpnw,
                    Certificado_Bach: certnw
                };
            
                // Actualizar los datos en la base de datos
                update(ref(database, 'Expedientes/' + expedienteId), dataToUpdate)
                    .then(() => {
                        alert("Datos Actualizados correctamente");
                        location.reload();
                    })
                    .catch((error) => {
                        alert("Ocurrió un problema, intente más tarde");
                    });
            });