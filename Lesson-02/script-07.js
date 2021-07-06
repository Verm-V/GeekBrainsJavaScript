var lineComment1 = "Результат строгого сравнения (===): " + (null === 0);
var lineComment2 = "Результат нестрогого сравнения (==): " + (null == 0);
var lineComment3 = "Результат сравнения (>): " + (null > 0);
var lineComment4 = "Результат сравнения (<): " + (null < 0);
var lineComment5 = "Результат сравнения (>=): " + (null >= 0);
var lineComment6 = "Результат сравнения (<=): " + (null <= 0);

//Вывод результата на html-страницу
document.getElementById("t07_01").innerHTML = (lineComment1);
document.getElementById("t07_02").innerHTML = (lineComment2);
document.getElementById("t07_03").innerHTML = (lineComment3);
document.getElementById("t07_04").innerHTML = (lineComment4);
document.getElementById("t07_05").innerHTML = (lineComment5);
document.getElementById("t07_06").innerHTML = (lineComment6);

    