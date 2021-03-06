//---- CLASSES ----

//Класс товара
export class Product{
    #id;//ID продукта
    #name;//Наименование товара
    #price;//Цена за единицу товара
    #picPrefix//Префикс имени файлов с изображениями товара

    constructor(name, price, picPrefix) {
        this.#id = new Uid();
        this.#name = name;
        this.#price = price;
        this.#picPrefix = picPrefix;
    }

    getId() {
        return this.#id.getUid();
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getPicPrefix() {
        return this.#picPrefix;
    }

}

//Класс товарной позиции (в корзине или на складе)
export class ProductPosition{
    #product;//Тип товара
    quanity;//Количество товара

    constructor(product, quanity) {
        this.#product = product;
        this.quanity = quanity;
    }

    getProduct() {
        return this.#product;
    }

    //Возвращает полную стоимость товарной позиции
    getTotalPrice() {
        return (this.#product.getPrice() * this.quanity);
    }

    //Возвращает Id продукта в товарной позиции
    getId() {
        return this.#product.getId();
    }


}

//Родительский класс для каталога товаров и корзины покупателя
export class Storage{
    #products = new Array();//Список товарных позиций

    #msgHeadingCapLegend = "Список товаров";//Заголовок таблицы
    #msgProductsEmpty = "Пусто";//Сообщение о том что объект пуст
    #msgButton = "Убрать"//Сообщение на кнопке напротив товара

    constructor(msgHeadingCapLegend, msgProductsEmpty, msgButton) {
        this.#msgHeadingCapLegend = msgHeadingCapLegend;//Заголовок таблицы
        this.#msgProductsEmpty = msgProductsEmpty;//Сообщение о том что объект пуст
        this.#msgButton = msgButton//Сообщение на кнопке напротив товара
    
    }
    
    //Подсчет стоимости товаров в списке
    countPrice() {
        let totalPrice = 0;//Сюда считается общая цена

        for (const item of this.#products) {
            totalPrice += ( item.getTotalPrice() );
        }
        return totalPrice;
    }

    //Поиск товара в списке по Id
    findProductPosition(productId) {
        let found = null;
        for (const item of this.#products) {
            if (item.getId() === productId) {
                found = item;
            }
        }
        return found;
    }

    //Добавление товара в список
    addItem(product, quanity) {
        //Если такой продукт уже есть в каталоге то увеличиваем его количество
        //Если нет, то добавляем новую товарную позицию
        let found = this.findProductPosition(product.getId());
        if (found !== null && quanity > 0) {
            found.quanity += quanity;
        } else {
            this.#products.push(new ProductPosition(product, quanity));
        }
    }

    //Извлечение товара из списка
    invokeItem(product, quanity) {
        //Если такой продукт уже есть в каталоге то извлекаем нужное количество
        //Если нет, то ничегоне делаем
        let found = this.findProductPosition(product.getId());
        if (found !== null && quanity > 0) {
            found.quanity -= quanity;
            if (found.quanity <= 0) { //На тот случай если пытались извлечь больше чем есть
                quanity += found.quanity;
                this.removeItem(product.getId());
            }
        }
        return quanity;//Возвращается реальное количество товаров, которое было извлечено
    }

    //Удаление товара из списка
    removeItem(productId) {
        for(var i = this.#products.length - 1; i >= 0; i--) {
            if(this.#products[i].getId() === productId) {
               this.#products.splice(i, 1);
            }
        }
    }

    //Создание html-структуры
    render() {
        let table = document.createElement("table");
        table.className = "products-list";
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        //Заголовок
        let headingRow = document.createElement('tr');
        let  headingCap = document.createElement('th');
        headingCap.innerHTML = this.#msgHeadingCapLegend;
        headingCap.colSpan = "3";
        headingRow.appendChild(headingCap);
        tbody.appendChild(headingRow);

        let legendRow = document.createElement('tr');
        let legendName = document.createElement('td');
        legendName.innerHTML = "Наименование товара";
        let LegendPrice = document.createElement('td');
        LegendPrice.innerHTML = "Цена, руб.";
        let LegendQuanity = document.createElement('td');
        LegendQuanity.innerHTML = "Кол-во, шт.";

        legendRow.appendChild(legendName);
        legendRow.appendChild(LegendPrice);
        legendRow.appendChild(LegendQuanity);
        tbody.appendChild(legendRow);    


        if (this.#products.length === 0) {//Если в списке пусто
            let tr = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerHTML = this.#msgProductsEmpty;
            cell.colSpan = "3";
            tr.appendChild(cell);
            tbody.appendChild(tr);
        } else { //Если в списке есть товары
            for (const item of this.#products) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.innerHTML = item.getProduct().getName();
                name.className = "galleryClick";
                name.id = item.getId();
                let price = document.createElement('td');
                price.innerHTML = item.getProduct().getPrice();
                let quanity = document.createElement('td');
                quanity.innerHTML = item.quanity;
                let buttonCell = document.createElement('td');
                let button = document.createElement('input');
                button.type = "button";
                button.value = this.#msgButton;
                button.id = item.getId();
                buttonCell.appendChild(button);

                tr.appendChild(name);
                tr.appendChild(price);
                tr.appendChild(quanity);
                tr.appendChild(buttonCell);
                tbody.appendChild(tr);    
            }

        }
        return table;
    }

}

//Класс корзины с товарами
export class Basket extends Storage{
    constructor() {
        super("Корзина", "Корзина пуста", "Убрать из корзины");
    }

    render() {
        let basketRender = super.render();

        if (this.countPrice() !== 0) {
            //Подсчет полной стоимости корзины
            let totalRow = document.createElement('tr');
            let totalLabel = document.createElement('td');
            totalLabel.innerHTML = "Итого:"
            let totalPrice = document.createElement('td');
            totalPrice.innerHTML = this.countPrice();
            
            totalRow.appendChild(totalLabel);
            totalRow.appendChild(totalPrice);
            basketRender.children[0].appendChild(totalRow);
        }
        
        return basketRender;
    }
}

//Класс каталога содержащео товары
export class Catalogue extends Storage{
    constructor() {
        super("Каталог товаров", "Каталог пуст", "Добавить в корзину");
    }

}

//Уникальный идентифифкатор
export class Uid{
    static #lastUid = -1;
    #uid;

    constructor() {
        this.#uid = ++Uid.#lastUid;
        console.log("generated new uid: " + this.#uid);
    }

    getUid() {
        return this.#uid;
    }

}