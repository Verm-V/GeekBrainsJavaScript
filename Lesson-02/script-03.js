//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Script_03() {
    //Числовые данные
    var a = rnd(-15, 15);
    var b = rnd(-15, 15);
    var result;//Сюда пойдет результат

    //Строки для вывода
    var lineContain = "Значение содержащееся в переменной ";
    var lineCompare = "Переменные ";
    var lineResult = "Результат ";

    //Проверка значений
    switch ((a >= 0) + (b >= 0)) {
        case 2:
            lineCompare += "положительные, вычисляем разность.";
            result = Math.abs(a - b);
            break;
        case 1:
            lineCompare += "разных знаков, вычисляем сумму.";
            result = a + b;
            break;
        case 0:
            lineCompare += "отрицательные, вычисляем произведение.";
            result = a * b;
            break;

    }

    //Вывод результата на html-страницу
    document.getElementById("t03_01").innerHTML = (lineContain + "a = " + a);
    document.getElementById("t03_02").innerHTML = (lineContain + "b = " + b);
    document.getElementById("t03_03").innerHTML = (lineCompare);
    document.getElementById("t03_04").innerHTML = (lineResult + result);

}