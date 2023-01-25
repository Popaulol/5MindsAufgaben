function toggleColumn(column) {
    var table = document.getElementById("table");

    for (var i = 0, row; row = table.rows[i]; i++) {
        row.cells[column].classList.toggle("invisible");
    }
}
let moving_column = null;
function moveColumn(column) {
    
}

document.onmouseup = (e) => {}
