let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];//Список букв для подписей клеток

//Рисование шахматной доски
function DrawBoard() {
    let board = document.getElementById("board");//Находим элемент в котором будем создавать шахматную доску
    clearItem(board);//Очищаем ее

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

//Расставляет на доске фигуры в виде букв (вызывается из html-документа)
function FiguresArrangementLetters() {
    FiguresArrangement(false);
}

//Расставляет на доске фигуры в виде картинок (вызывается из html-документа)
function FiguresArrangementPictures() {
    FiguresArrangement(true);
}

//Расстановка фигур на доске
//isFigurePicture: true - фигуры картинками, false - фигуры текстом
function FiguresArrangement(isFigurePicture) {
    DrawBoard();//Рисует доску (на тот случай если она еще не нарисована)
    let cellLabel = "";

    //Расстановка пешек
    for (let i = 0; i < 8; i++){
        cellLabel = letters[i] + "2";
        ArrangeSingleFigure(cellLabel, "P", true, isFigurePicture);
        cellLabel = letters[i] + "7";
        ArrangeSingleFigure(cellLabel, "P", false, isFigurePicture);
    }

    //Расстановка остальных фигур (сначала белые, потом черные)
    let color = true;
    let row = 1;
    do {
        cellLabel = "A" + row;
        ArrangeSingleFigure(cellLabel, "R", color, isFigurePicture);
        cellLabel = "B" + row;
        ArrangeSingleFigure(cellLabel, "N", color, isFigurePicture);
        cellLabel = "C" + row;
        ArrangeSingleFigure(cellLabel, "B", color, isFigurePicture);
        cellLabel = "D" + row;
        ArrangeSingleFigure(cellLabel, "Q", color, isFigurePicture);
        cellLabel = "E" + row;
        ArrangeSingleFigure(cellLabel, "K", color, isFigurePicture);
        cellLabel = "F" + row;
        ArrangeSingleFigure(cellLabel, "B", color, isFigurePicture);
        cellLabel = "G" + row;
        ArrangeSingleFigure(cellLabel, "N", color, isFigurePicture);
        cellLabel = "H" + row;
        ArrangeSingleFigure(cellLabel, "R", color, isFigurePicture);

        color = !color;
        row = 8;
    } while (!color)


}

//Устанавливает фигуру (текстовым обозначением) на доске
//cellLabel: координаты клетки (например E2)
//figure: буквенное обозначение фигуры
//isFigureWhite: true - фигура белая, false - фигура черная
function ArrangeSingleFigure(cellLabel, figure, isFigureWhite, isFigurePicture) {
    let cell = document.getElementById(cellLabel);
    if (isFigurePicture) {
        let picture = document.createElement('img');
        let fileName = "./pics/" + figure + (isFigureWhite ? "White" : "Black") + ".png";
        picture.src = fileName;
        cell.appendChild(picture);    
    } else {
        let text = document.createElement('span');
        text.innerHTML = figure;
        text.className = isFigureWhite ? "white-figure" : "black-figure";
        cell.appendChild(text);    
    }

}


//Очищает DOM элемент от всех его дочерних элементов.
function clearItem(item) {
        //Удаляем все внутренности из board
        while (item.firstChild) {
            item.firstChild.remove();
        }
    
}