document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('table');

    let draggingEle;
    let draggingColumnIndex;
    let placeholder;
    let list;
    let isDraggingStarted = false;
    let clickHandlerCalled = false;

    let mouse_x = 0;
    let mouse_y = 0;

    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
        nodeB.parentNode.insertBefore(nodeA, nodeB);
        parentA.insertBefore(nodeB, siblingA);
    };

    const isOnLeft = function (nodeA, nodeB) {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    };

    const cloneTable = function () {
        const rect = table.getBoundingClientRect();

        list = document.createElement('div');
        list.classList.add('clone-list');
        list.style.position = 'absolute';
        list.style.left = `${rect.left}px`;
        list.style.top = `${rect.top}px`;
        table.parentNode.insertBefore(list, table);

        table.style.visibility = 'hidden';

        const originalCells = [].slice.call(table.querySelectorAll('tbody td'));

        const originalHeaderCells = [].slice.call(table.querySelectorAll('th'));
        const numColumns = originalHeaderCells.length;

        originalHeaderCells.forEach(function (headerCell, headerIndex) {
            const width = parseInt(window.getComputedStyle(headerCell).width);

            const item = document.createElement('div');
            item.classList.add('draggable');

            const newTable = document.createElement('table');
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${width}px`;

            const th = headerCell.cloneNode(true);
            let newRow = document.createElement('tr');
            newRow.appendChild(th);
            newTable.appendChild(newRow);

            const cells = originalCells.filter(function (c, idx) {
                return (idx - headerIndex) % numColumns === 0;
            });
            cells.forEach(function (cell) {
                const newCell = cell.cloneNode(true);
                newCell.style.width = `${width}px`;
                newRow = document.createElement('tr');
                newRow.appendChild(newCell);
                newTable.appendChild(newRow);
            });

            item.appendChild(newTable);
            list.appendChild(item);
        });
    };

    const mouseDownHandler = function (e) {
        draggingColumnIndex = [].slice.call(table.querySelectorAll('th')).indexOf(e.target);

        mouse_x = e.clientX - e.target.offsetLeft;
        mouse_y = e.clientY - e.target.offsetTop;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if (!isDraggingStarted) {
            isDraggingStarted = true;

            cloneTable();

            draggingEle = [].slice.call(list.children)[draggingColumnIndex];
            draggingEle.classList.add('dragging');

            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.width = `${draggingEle.offsetWidth}px`;
        }

        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - mouse_y}px`;
        draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - mouse_x}px`;

        mouse_x = e.clientX;
        mouse_y = e.clientY;


        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;

        if (prevEle && isOnLeft(draggingEle, prevEle)) {
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        if (nextEle && isOnLeft(nextEle, draggingEle)) {
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function () {
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.classList.remove('dragging');
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        const endColumnIndex = [].slice.call(list.children).indexOf(draggingEle);

        isDraggingStarted = false;

        list.parentNode.removeChild(list);

        table.querySelectorAll('tr').forEach(function (row) {
            const cells = [].slice.call(row.querySelectorAll('th, td'));
            draggingColumnIndex > endColumnIndex
                ? cells[endColumnIndex].parentNode.insertBefore(
                    cells[draggingColumnIndex],
                    cells[endColumnIndex]
                )
                : cells[endColumnIndex].parentNode.insertBefore(
                    cells[draggingColumnIndex],
                    cells[endColumnIndex].nextSibling
                );
        });

        table.style.removeProperty('visibility');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const clickHandler = function (e) {
        clickHandlerCalled = true;
        const headerElement = e.currentTarget;
        let headerRow = headerElement.parentElement;

        headerRow = Array.from(headerRow.cells);
        let columnIndex = 0;
        for (let i = 0; i < headerRow.length; i++) {
            if (headerRow[i] === headerElement) {
                columnIndex = i;
                break;
            }
        }

        const table = document.getElementById("table");

        for (let i = 0, row; row = table.rows[i]; i++) {
            row.cells[columnIndex].classList.toggle("invisible");
        }

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    table.querySelectorAll('th').forEach(function (headerCell) {
        headerCell.classList.add('draggable');
        headerCell.addEventListener('mousedown', mouseDownHandler);
        headerCell.addEventListener('click', clickHandler);
    });

    const createResizableColumn = function (col, resizer) {
        let x = 0;
        let w = 0;
        let nextColumn = undefined;
        let nextColumnWidth = 0;
        let lastWidth = 0;
        let lastNextColumnWidth = 0;

        const getWidth = function (element) {
            const styles = window.getComputedStyle(element);
            return parseInt(styles.width, 10);
        }

        const mouseDownHandlerResize = function (e) {
            x = e.clientX;
            w = getWidth(col);
            lastWidth = w;

            let headerRow = col.parentElement;

            headerRow = Array.from(headerRow.cells);
            let nextColumnIndex = 0;
            for (let i = 0; i < headerRow.length; i++) {
                if (headerRow[i] === col) {
                    nextColumnIndex = i + 1;
                    break;
                }
            }

            if (nextColumnIndex < headerRow.length) {
                nextColumn = headerRow[nextColumnIndex];
                nextColumnWidth = getWidth(nextColumn);
                lastNextColumnWidth = nextColumnWidth;
            } else {
                let stylesheet = document.styleSheets[0];

                let headerRow = col.parentElement;
                headerRow = Array.from(headerRow.cells);
                for (let i = 0; i < headerRow.length; i++) {
                    const header = headerRow[i];
                    header.style.width = `${getWidth(header)}px`
                }
                stylesheet.cssRules[0].style.width = "auto";
            }

            document.addEventListener('mousemove', mouseMoveHandlerResize);
            document.addEventListener('mouseup', mouseUpHandlerResize);

            e.stopPropagation();
        };

        const mouseMoveHandlerResize = function (e) {
            const dx = e.clientX - x;
            const old_width = col.style.width;
            col.style.width = `${w + dx}px`;

            const newComnputedWidth = getWidth(col);
            if (newComnputedWidth == lastWidth) {
                col.style.width = old_width;
                return;
            }
            if (nextColumn) {
                const nextColumnOldWidth = nextColumn.style.width;
                nextColumn.style.width = `${nextColumnWidth - dx}px`;
                const nextColumnNewComputedWidth = getWidth(nextColumn);
                if (getWidth(nextColumn) == lastNextColumnWidth) {
                    col.style.width = old_width;
                    nextColumn.style.width = nextColumnOldWidth;
                    return;
                }

                lastNextColumnWidth = nextColumnNewComputedWidth;
            }

            lastWidth = newComnputedWidth;


        };

        const mouseUpHandlerResize = function () {
            document.removeEventListener('mousemove', mouseMoveHandlerResize);
            document.removeEventListener('mouseup', mouseUpHandlerResize);

            let headerRow = col.parentElement;

            headerRow = Array.from(headerRow.cells);
            let columnIndex = 0;
            for (let i = 0; i < headerRow.length; i++) {
                if (headerRow[i] === col) {
                    columnIndex = i;
                    break;
                }
            }

            const table = document.getElementById("table");


            clickHandlerCalled = false;
            setTimeout(function (table) {

                if (clickHandlerCalled) {
                    for (let i = 0, row; row = table.rows[i]; i++) {
                        row.cells[columnIndex].classList.toggle("invisible");
                    }
                }
            }, 0, table)

        };

        resizer.addEventListener('mousedown', mouseDownHandlerResize);
    };



    const cols = table.querySelectorAll('th');
    [].forEach.call(cols, function (col) {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer');
        resizer.style.height = `${table.offsetHeight}px`;
        col.appendChild(resizer);
        createResizableColumn(col, resizer);
    });



});
