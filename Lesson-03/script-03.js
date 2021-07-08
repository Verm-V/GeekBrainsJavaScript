//Вариант с выводом в консоль
console.log("Задание №3");

for (i = 0; i <= 9; console.log(i++)){
}

//-----------------------------------------

//Вариант с выводом на html-страницу
var lineResult = "";

for (i = 0; i <= 9; lineResult += i++){
}

//Вывод результата на html-страницу
document.getElementById("t03_01").innerHTML = (lineResult);



