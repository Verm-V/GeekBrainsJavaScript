//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Script_04() {
    //Числовые данные
    var a = rnd(0, 15);

    //Строки для вывода
    var lineContain = "Значение содержащееся в переменной ";
    var lineComment = "Вывод значениий от a до 15: ";
    var lineResult = "";

    //Проверка значений
    var aa = a;//Временная переменная для работы со значением
    switch (aa) {
        case 0:
            lineResult += (aa + ", ");
            aa++;
        case 1:
            lineResult += (aa + ", ");
            aa++;
        case 2:
            lineResult += (aa + ", ");
            aa++;
        case 3:
            lineResult += (aa + ", ");
            aa++;
        case 4:
            lineResult += (aa + ", "); 
            aa++;
        case 5:
            lineResult += (aa + ", ");
            aa++;
        case 6:
            lineResult += (aa + ", ");
            aa++;
        case 7:
            lineResult += (aa + ", ");
            aa++;
        case 8:
            lineResult += (aa + ", "); 
            aa++;
        case 9:
            lineResult += (aa + ", ");
            aa++;
        case 10:
            lineResult += (aa + ", ");
            aa++;
        case 11:
            lineResult += (aa + ", ");
            aa++;
        case 12:
            lineResult += (aa + ", "); 
            aa++;
        case 13:
            lineResult += (aa + ", ");
            aa++;
        case 14:
            lineResult += (aa + ", ");
            aa++;
        case 15:
            lineResult += (aa);
            break;
    }//Какая забавная дичь получилась.

    //Вывод результата на html-страницу
    document.getElementById("t04_01").innerHTML = (lineContain + "a = " + a);
    document.getElementById("t04_02").innerHTML = (lineComment);
    document.getElementById("t04_03").innerHTML = (lineResult);

}