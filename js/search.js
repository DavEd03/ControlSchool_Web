document.getElementById('mostrar1').addEventListener('change', filterTable);
document.getElementById('mostrar2').addEventListener('change', filterTable);

function filterTable() {
    const filter1 = document.getElementById('mostrar1').value.toUpperCase();
    const filter2 = document.getElementById('mostrar2').value.toUpperCase();
    
    const table = document.getElementById('table-body');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const nameMatch = cells[0].textContent.toUpperCase().includes(filter1);
        const cityMatch = cells[2].textContent.toUpperCase().includes(filter2);

        // Mostrar la fila si coincide con ambos filtros
        rows[i].style.display = (nameMatch && cityMatch) ? '' : 'none';
    }
}