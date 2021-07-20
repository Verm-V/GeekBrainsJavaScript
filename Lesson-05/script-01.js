//Рисование шахматной доски
function drawBoard() {
    let board = document.getElementById("board");
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];//Список букв для подписей клеток
    clearItem(board);

    var table = document.createElement("table");
    table.className = "chess-board";

    //Создание структуры доски
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for(var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 10; j++){

            //Создание клеток доски
            switch (true) {
                case (i === 0 || j === 0 || i === 9 || j === 9)://Клетки с подписями
                    var cell = document.createElement('th')
                    break;
                case (i > 0 && i < 9 && j > 0 && j < 9)://Игровые клетки
                    var cell = document.createElement('td')

                    //Игровые клетки, четные - белые, нечетные - черные
                    if ((i + j) % 2 === 0) {
                        cell.className = "white";
                    } else {
                        cell.className = "black";
                    }

                    //Расстановка ID для клеток (для будущего использования)
                    cell.id = (letters[j - 1] + (9 - i));
                    break;
            }

            //Расстановка номеров
            if (i > 0 && i < 9) {
                cell.innerHTML = (j === 0 || j=== 9) ? (9 - i)    : ''
            }
            //Расстановка букв
            if (j > 0 && j < 9) {
                cell.innerHTML = (i === 0 || i=== 9) ? letters[j - 1] : ''
            }

            tr.appendChild(cell);
        }
        tbody.appendChild(tr);
    }
    board.appendChild(table);

    console.log("test");
}

function FiguresArrangementLetters() {
    
}

//Очищает DOM элемент от всех его дочерних элементов.
function clearItem(item) {
        //Удаляем все внутренности из board
        while (item.firstChild) {
            item.firstChild.remove();
        }
    
}