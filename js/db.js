const firebaseConfig = {
    apiKey: "AIzaSyBIb5nB7I0E5BM2ZaKYQHv0aSWCC2FMBGE",
    authDomain: "controlschool-9fdc0.firebaseapp.com",
    databaseURL: "https://controlschool-9fdc0-default-rtdb.firebaseio.com",
    projectId: "controlschool-9fdc0",
    storageBucket: "controlschool-9fdc0.firebasestorage.app",
    messagingSenderId: "999306012944",
    appId: "1:999306012944:web:be011a6be63004f53b9d95",
    measurementId: "G-T1CCLT7RKX"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  // Referencia a tu tabla en Firebase
  var ref = database.ref('/Alumnos/DGS/10/210904091/Calificaciones/U1');

  // Escuchar datos de Firebase
  ref.on('value', function(snapshot) {
    var data = snapshot.val();
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Limpiar la tabla

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${key}</td>
                <td>${data[key].name}</td>
                <td><button class="btn btn-info" onclick="showDetails('${key}')">Ver Detalles</button></td>
            `;
            tableBody.appendChild(row);
        }
    }
});

// Mostrar detalles en el modal
function showDetails(id) {
    var ref = database.ref('your_table/' + id);
    ref.once('value').then(function(snapshot) {
        var data = snapshot.val();
        document.getElementById('modal-content').innerText = JSON.stringify(data, null, 2);
        $('#myModal').modal('show');
    });
}