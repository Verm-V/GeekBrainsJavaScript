//---- CLASSES ----

//Класс товара
class Product{
    #name;//Наименование товара
    #price;//Цена за единицу товара

    constructor(name, price) {
        this.#name = name;
        this.#price = price;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }
}

//Класс товарной позиции (в корзине или на складе)
class Item{
    #product;//Тип товара
    #quanity;//Количество товара

    constructor(product, quanity) {
        this.#product = product;
        this.#quanity = quanity;
    }

    getProduct() {
        return this.#product;
    }

    getQuanity() {
        return this.#quanity;
    }

    //Возвращает полную стоимость товарной позиции
    getTotalPrice() {
        return (this.#product.getPrice() * this.#quanity);
    }
}

//Класс корзины
class Basket{
    #products = new Array();

    //Подсчет стоимости
    countPrice() {
        let totalPrice = 0;//Сюда считается общая цена

        for (const item of this.#products) {
            totalPrice += ( item.getTotalPrice() );
        }
        return totalPrice;
            
    }

    //Добавление товара в корзину
    addItem(product, quanity) {
        if (product instanceof Product) {
            this.#products.push(new Item(product, quanity));
            return true;
        } else {
            return false;
        }
    }

    //Переопределение метода toString
    toString() {
        let lineBasket = "";

        for (const item of this.#products) {
            lineBasket += "|" + item.getProduct().getName() + " - " + item.getProduct().getPrice() + " руб. - " + item.getQuanity() + " шт.<br>";
        }
        return lineBasket;
    }
}

//---- MAIN CODE ----

//Массив для корзины
var basket = new Basket();

//Забиваем корзину тестовыми данными
basket.addItem(new Product("Лыжи", 100), 10);
basket.addItem(new Product("Палки", 50), 10);
basket.addItem(new Product("Копалки", 10), 5);

//Подсчитываем и выводим на экран
resultOutput();

//---- FUNCTIONS ----

//Добавление товара в корзину(
function addProduct(){
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").valueAsNumber;
    var productQuanity = document.getElementById("productQuanity").valueAsNumber;
    basket.addItem(new Product(productName, productPrice), productQuanity);
    resultOutput();
}

//Вывод результата на html-страницу
function resultOutput() {
    document.getElementById("t02_01").innerHTML = (basket.toString());
    document.getElementById("t02_02").innerHTML = (basket.countPrice());
}


