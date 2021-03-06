//Объект содержащий разложение числа на цифры
class numObj{
    constructor(units, tens, hundreds) {
        this.единицы = units;
        this.десятки = tens;
        this.сотни = hundreds;
    }
    //Переопределение метода toString
    toString() {
        let keys = Object.keys(this);
        return ("{\'" + keys[0] + "\': " + this.единицы + ", \'" + keys[1] + "\': " + this.десятки + ", \'" + keys[2] + "\': " + this.сотни + "}");
    }
}

//Преобразует число в объект
function numberToObject(num) {
    
    //Разложение числа на разряды
    //Перевод строки в массив символов и переворот для удобства расчленения
    let numString = (String(num)).split('').reverse().join('');

    //Разбор по разрядам на цифры, с заменой отсутствующих на 0
    let units = (typeof numString[0] === 'undefined' ) ? 0 : numString[0];
    let tens = (typeof numString[1] === 'undefined' ) ? 0 : numString[1];
    let hundreds = (typeof numString[2] === 'undefined' ) ? 0 : numString[2];

    return new numObj(units, tens, hundreds);
}

//Скрипт для проверки функции преобразования числа в объект
function script_01() {
    //Сообщения для пользователя
    const NUM_IS_BIG = "Число слишком большое";
    const NUM_IS_BELLOW_ZERO = "Число меньше нуля";
    const NUM_IS_NOT_INTEGER = "Число не целое";

    let lineResult = "";
    let num = document.getElementById("inputNumber").valueAsNumber;//Вводимое число
    let objFromNum = new Object(); //Здесь будет содержаться итоговый объект

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
