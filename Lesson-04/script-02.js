//---- CLASSES ----

//Класс товара
class Product{
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

//Класс корзины
class Basket{
    #products = new Array();

    //Подсчет стоимости
    countPrice() {
        let totalPrice = 0;//Сюда считается общая цена

        for (const product of this.#products) {
            totalPrice += product.price;
        }
        return totalPrice;
            
    }

    //Добавление товара в корзину
    addProduct(product) {
        if (product instanceof Product) {
            this.#products.push(product);
            return true;
        } else {
            return false;
        }
    }

    //Переопределение метода toString
    toString() {
        let lineBasket = "";

        for (const product of this.#products) {
            lineBasket += "|" + product.name + " - " + product.price + " руб.<br>"
        }
        return lineBasket;
    }
}

//---- MAIN CODE ----

//Массив для корзины
var basket = new Basket();

//Забиваем корзину тестовыми данными
basket.addProduct(new Product("Лыжи", 100));
basket.addProduct(new Product("Палки", 10));
basket.addProduct(new Product("Копалки", 111));

//Подсчитываем и выводим на экран
resultOutput();

//---- FUNCTIONS ----

//Добавление товара в корзину(
function addProduct(){
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").valueAsNumber;
    basket.addProduct(new Product(productName, productPrice));
    resultOutput();
}

//Вывод результата на html-страницу
function resultOutput() {
    document.getElementById("t02_01").innerHTML = (basket.toString());
    document.getElementById("t02_02").innerHTML = (basket.countPrice());
}


