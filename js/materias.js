
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";


import { getDatabase, ref, set,onValue, update, remove} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";



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


const agregar=document.getElementById('btn-success');
    agregar.addEventListener('click', function(event){
        event.preventDefault();
        const materiaId = document.getElementById('codigo').value;
        const materiaTeacher = document.getElementById('maestro').value;
        const materiaCuatri = document.getElementById('cuatri').value;
        const materiaCarrera = document.getElementById('carrera').value;
        const materiaName = document.getElementById('nombre').value;
     
      set(ref(database, '/Materias/' + materiaId), {
           Nombre: materiaName,
           Cuatrimestre:materiaCuatri,
           Carrera:materiaCarrera,
           Maestro:materiaTeacher,
           Codigo:materiaId,
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


    function loadData(){
        const dbRef= ref(database, "/Materias/");
        onValue(dbRef, (snapshot) =>
        {
            const tableBody = document.getElementById("table-body").getElementsByTagName('tbody')[0];
            tableBody.innerHTML="";
            const data= snapshot.val();
                for (const cod in data){
                    const row= tableBody.insertRow();
                    const cellCampo1= row.insertCell(0);
                    const cellCampo2= row.insertCell(1);
                    const cellCampo3= row.insertCell(2);
                    const cellCampo4= row.insertCell(3);
                    const cellCampo5 = row.insertCell(4);
                    const cellActions= row.insertCell(5);

                    const hiddenInput= document.createElement('input');
                    hiddenInput.type='hidden';
                    hiddenInput.value= cod;
                    hiddenInput.id= 'codigo-'+ cod;
                    row.appendChild(hiddenInput);

                    
                    cellCampo1.textContent=cod || "";
                    cellCampo2.textContent=data[cod].Nombre || "";
                    cellCampo3.textContent=data[cod].Cuatrimestre || "";
                    cellCampo4.textContent=data[cod].Carrera || "";
                    cellCampo5.textContent=data[cod].Maestro||"";

                    const editButton=document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.id="btn-open-modal";
                    editButton.onclick = function() {
                    openEditModal(cod, data[cod]); // Abre el modal de edición
                    };
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.className = 'btn btn-danger btn-sm';
                    deleteButton.onclick = function() {
                    openDeleteModal(cod); // Abre el modal de eliminación
                     };
                     cellActions.appendChild(editButton);
                     cellActions.appendChild(deleteButton);
                }

        });
    }

    document.addEventListener('DOMContentLoaded', (event)=>{
        loadData();
    });

    function openEditModal(recordId, recordData){
        document.getElementById('nombre1').value=recordData.Nombre;
        document.getElementById('maestro1').value=recordData.Maestro;
        document.getElementById('carrera1').value=recordData.Carrera;
        document.getElementById('cuatri1').value=recordData.Cuatrimestre;
        const uidInput = document.getElementById('codigo1'); // Asegúrate de tener un campo oculto en el modal
        uidInput.value = recordId;
        $('#editModal').data('recordId',recordId);
        $('#editModal').modal('show');

    }
     function openDeleteModal(recordId){
        $('deleteModal').data('recordId', recordId);
        $('deleteModal').modal('show');
     }

     const modificar=document.getElementById('saveButton');
     modificar.addEventListener('click', function(event){
        event.preventDefault();
        const materiaId1 = document.getElementById('codigo1').value;
        const materiaTeacher1 = document.getElementById('maestro1').value;
        const materiaCuatri1 = document.getElementById('cuatri1').value;
        const materiaCarrera1 = document.getElementById('carrera1').value;
        const materiaName1 = document.getElementById('nombre1').value;
        
        update(ref(database,'/Materias/' +materiaId1),{
            Nombre: materiaName1,
           Cuatrimestre:materiaCuatri1,
           Carrera:materiaCarrera1,
           Maestro:materiaTeacher1,
        }).then(()=>{
            alert("Datos Actualizados correctamente");
            location.reload();
        }).catch((error)=>{
            const errorCode= error.code;
            const errorMessage= error.message;
            alert("Ocurrió un problema, intente más tarde")
        });
        
     })