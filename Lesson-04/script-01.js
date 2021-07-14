//Конструктор объекта содержащего цифры числа
function obj(units, tens, hundreds) {
    this.единицы = units;
    this.десятки = tens;
    this.сотни = hundreds;

    //Переопределение метода toString
    this.toString = function () {
        var keys = Object.keys(this);
        return ("{\'" + keys[0] + "\': " + this.единицы + ", \'" + keys[1] + "\': " + this.десятки + ", \'" + keys[2] + "\': " + this.сотни + "}");
    }
}

//Преобразует число в объект
function numberToObject(num) {
    
    //Разложение числа на разряды
    //Перевод строки в массив символов и переворот для удобства расчленения
    var numString = (String(num)).split('').reverse().join('');
    //Разбор по разрядам на цифры, с заменой отсутствующих на 0
    var units = (typeof numString[0] === 'undefined' ) ? 0 : numString[0];
    var tens = (typeof numString[1] === 'undefined' ) ? 0 : numString[1];
    var hundreds = (typeof numString[2] === 'undefined' ) ? 0 : numString[2];

    return new obj(units, tens, hundreds);;
}

//Скрипт для проверки функции преобразования числа в объект
function script_01() {
    //Сообщения для пользователя
    const NUM_IS_BIG = "Число слишком большое";
    const NUM_IS_BELLOW_ZERO = "Число меньше нуля";
    const NUM_IS_NOT_INTEGER = "Число не целое";

    var lineResult = "";
    var num = document.getElementById("inputNumber").valueAsNumber;//Вводимое число
    var objFromNum = new Object(); //Здесь будет содержаться итоговый объект

    //Проверка входного значениия
    if (num > 999) {
        lineResult = NUM_IS_BIG;
    } else if (num < 0) {
        lineResult = NUM_IS_BELLOW_ZERO;
    } else if (!Number.isInteger(num)) {
        lineResult = NUM_IS_NOT_INTEGER;
    } else {
        objFromNum = numberToObject(num);//Получаем объект разложенный на цифры
        lineResult = objFromNum.toString();//Приведение к тексту для вывода в консоль и html
    }
    
    //Вывод информации в html-документ и в консоль
    document.getElementById("t01_01").innerHTML = (lineResult);
    console.log(lineResult);
    return objFromNum;
}
