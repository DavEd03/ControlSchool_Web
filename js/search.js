document.getElementById('mostrar1').addEventListener('keyup', filterTable);
document.getElementById('mostrar2').addEventListener('keyup', filterTable);

function filterTable() {
    const filter1 = document.getElementById('mostrar1').value.toUpperCase();
    const filter2 = document.getElementById('mostrar2').value.toUppeerCase();
    
    const table = document.getElementById('table-body');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const nameMatch = cells[0].textContent.toLowerCase().includes(filter1);
        const cityMatch = cells[2].textContent.toLowerCase().includes(filter2);

        // Mostrar la fila si coincide con ambos filtros
        rows[i].style.display = (nameMatch && cityMatch) ? '' : 'none';
    }
}