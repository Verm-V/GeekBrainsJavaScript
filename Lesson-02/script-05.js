//Возвращает сумму аргументов
function sum(arg1, arg2) {
    return (arg1 + arg2);
}

//Возвращает разность аргументов
function sub(arg1, arg2) {
    return (arg1 - arg2);
}

//Возвращает произведение аргументов
function mul(arg1, arg2) {
    return (arg1 * arg2);
}

//Возвращает результат деления аргументов
function div(arg1, arg2) {
    return (arg1 / arg2);
}

//вызывает для операндов функцию указанную в последнем аргументе
function mathOperation(arg1, arg2, operation) {
    var result = NaN;//Сюда пойдет результат операции

    switch (operation) {
        case "sum":
            result = sum(arg1, arg2);
            break;
        case "sub":
            result = sub(arg1, arg2);
            break;
        case "mul":
            result = mul(arg1, arg2);
            break;
        case "div":
            result = div(arg1, arg2);
            break;
    }

    return result;

}

//----------------------------------------------------------------

//тестовый скрипт для демонстрации работы функций из задания
function Script_05() {
    
    //Получение данных из полей ввода html-страницы
    var arg1 = document.getElementById("arg1").valueAsNumber;
    var arg2 = document.getElementById("arg2").valueAsNumber;
    var index = document.getElementById("operation").options.selectedIndex;
    var operation = document.getElementById("operation").options[index].text;

    //Тестирование функции
    var lineComment = "Вызвана функция ";
    var lineResult = "Результат: ";

    switch (operation) {
        case "sum":
            lineComment += "суммирования";
            break;
        case "sub":
            lineComment += "вычитания";
            break;
        case "mul":
            lineComment += "умножения";
            break;
        case "div":
            lineComment += "деления";
            break;
    }

    lineResult += mathOperation(arg1, arg2, operation);

    //Вывод результата на html-страницу
    document.getElementById("t05_01").innerHTML = (lineComment);
    document.getElementById("t05_02").innerHTML = (lineResult);

}