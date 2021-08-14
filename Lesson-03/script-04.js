var stars = 20;//количество строк в звездной пирамиде

//Вариант с выводом в консоль
console.log("Задание №4");

var lineConsole = "";

for (i = 0; i < stars; i++){
    lineConsole += "*";
    console.log(lineConsole);
}

//-----------------------------------------

//Вариант с выводом на html-страницу
var lineSingle = "";
var lineResult = "";

for (i = 0; i < stars; i++){
    lineSingle += "*";
    lineResult += lineSingle + "<br>";
}

//Вывод результата на html-страницу
document.getElementById("t04_01").innerHTML = (lineResult);


