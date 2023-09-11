document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('sortable-table');
  const thList = table.querySelectorAll('th');

  thList.forEach(function(th) {
      th.addEventListener('click', function() {
          const isNumeric = th.getAttribute('data-sort') === 'numeric';
          sortTable(table, th.cellIndex, isNumeric);
      });
  });

  function sortTable(table, columnIndex, isNumeric) {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort(function(rowA, rowB) {
          const cellA = rowA.cells[columnIndex].textContent;
          const cellB = rowB.cells[columnIndex].textContent;

          if (isNumeric) {
              return parseFloat(cellA) - parseFloat(cellB);
          } else {
              return cellA.localeCompare(cellB);
          }
      });

      rows.forEach(function(row) {
          tbody.appendChild(row);
      });
  }
});