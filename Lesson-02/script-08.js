//рекурсивно возводит числов в степень
function power(val, pow) {
    if (pow === 0) {
        return 1;
    }

    if (pow > 1) {
        return (val * power(val, pow - 1));
    }
    else {
        return val;
    }
}


//тестовый скрипт для демонстрации работы функций из задания
function Script_08() {
    
    //Получение данных из полей ввода html-страницы
    var val = document.getElementById("val").valueAsNumber;
    var pow = document.getElementById("pow").valueAsNumber;

    var lineResult = "Результат: " + power(val, pow);

    //Вывод результата на html-страницу
    document.getElementById("t08_01").innerHTML = (lineResult);

}