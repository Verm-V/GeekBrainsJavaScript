var totalPrice = 0;
var lineBasket = "";

//Массив для корзины
var basket = new Array();

//Забиваем корзину тестовыми данными
basket.push(["Лыжи", 100]);
basket.push(["Палки", 10]);
basket.push(["Копалки", 111]);

//Подсчитываем и выводим на экран
countBasketPrice();
resultOutput();

//Подсчет стоимости товаров в корзине
function countBasketPrice() {
    totalPrice = 0;//Сюда считается общая цена

    var i = 0;
    while (i < basket.length) {
        totalPrice += basket[i][1];
        i++;
    }
}

//Добавление товара в корзину
function addGoods(){
    var goodName = document.getElementById("goodName").value;
    var goodPrice = document.getElementById("goodPrice").valueAsNumber;
    basket.push([goodName, goodPrice]);
    countBasketPrice();
    resultOutput();
}

//Вывод результата на html-страницу
function resultOutput() {
    lineBasket = "";
    for (i = 0; i < basket.length; i++){
        lineBasket += "|" + basket[i][0] + " - " + basket[i][1] + " руб.<br>"
    }

    document.getElementById("t02_01").innerHTML = (lineBasket);
    document.getElementById("t02_02").innerHTML = (totalPrice);
}


