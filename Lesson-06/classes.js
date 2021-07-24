//---- CLASSES ----

//Класс товара
export class Product{
    #id;//ID продукта
    #name;//Наименование товара
    #price;//Цена за единицу товара

    constructor(name, price) {
        this.#id = new Uid();
        this.#name = name;
        this.#price = price;
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

//Класс корзины с товарами
export class Basket{
    #products = new Array();//Список товаров с количеством

    //Подсчет стоимости
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

    //Добавление товара в список
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

    //Создание html-структуры корзины
    render() {
        let table = document.createElement("table");
        table.className = "products-list";
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        //Заголовок
        let headingRow = document.createElement('tr');
        let  headingCap = document.createElement('th');
        headingCap.innerHTML = "Корзина покупателя";
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
            cell.innerHTML = "Корзина пуста";
            cell.colSpan = "3";
            tr.appendChild(cell);
            tbody.appendChild(tr);
        } else { //Если в списке есть товары
            for (const item of this.#products) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.innerHTML = item.getProduct().getName();
                let price = document.createElement('td');
                price.innerHTML = item.getProduct().getPrice();
                let quanity = document.createElement('td');
                quanity.innerHTML = item.quanity;
                let buttonCell = document.createElement('td');
                let button = document.createElement('input');
                button.type = "button";
                button.value = "Убрать из корзины";
                button.id = item.getProduct().getId();
                buttonCell.appendChild(button);

                tr.appendChild(name);
                tr.appendChild(price);
                tr.appendChild(quanity);
                tr.appendChild(buttonCell);
                tbody.appendChild(tr);    
            }
            //Подсчет полной стоимости корзины
            let totalRow = document.createElement('tr');
            let totalLabel = document.createElement('td');
            totalLabel.innerHTML = "Итого:"
            let totalPrice = document.createElement('td');
            totalPrice.innerHTML = this.countPrice();
            
            totalRow.appendChild(totalLabel);
            totalRow.appendChild(totalPrice);
            tbody.appendChild(totalRow);

        }
        return table;
    }

}

//Класс каталога содержащео товары
export class Catalogue{
    #products = new Array();//Список товаров с количеством

    //Поиск товара в списке по id
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

    //Добавление товара в список
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

    //Создание html-структуры каталога
    render() {
        let table = document.createElement("table");
        table.className = "products-list";
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        //Заголовок
        let headingRow = document.createElement('tr');
        let  headingCap = document.createElement('th');
        headingCap.innerHTML = "Каталог товаров";
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
            cell.innerHTML = "Каталог пуст";
            cell.colSpan = "3";
            tr.appendChild(cell);
            tbody.appendChild(tr);
        } else { //Если в списке есть товары
            for (const item of this.#products) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.innerHTML = item.getProduct().getName();
                let price = document.createElement('td');
                price.innerHTML = item.getProduct().getPrice();
                let quanity = document.createElement('td');
                quanity.innerHTML = item.quanity;
                let buttonCell = document.createElement('td');
                let button = document.createElement('input');
                button.type = "button";
                button.value = "Добавить в корзину";
                button.id = item.getProduct().getId();
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