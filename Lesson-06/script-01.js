import { Product, Basket, Catalogue, Storage} from './classes.js';
window.addEventListener('load', Init);

//Создаем каталог и корзину
var stock = new Storage();//Здесь будут храниться типы товаров (имитация базы данных)
var catalogue = new Catalogue();//Каталог содержащий товарные позиции для продажи
var basket = new Basket();//Корзина пользователя


//======== INIT ========

//Инициализация после загрузки окна
function Init() {
    console.log("page loaded.")

    //Создание набора товаров
    var products = new Array();
    products.push(new Product("Mecha Golem", 75, "Mecha_Golem"));
    products.push(new Product("Mecha N", 50, "Mecha_N"));
    products.push(new Product("Mobile Storage", 10, "Mobile_Storage"));
    products.push(new Product("Quadruped Tank", 100, "Quadruped_Tank"));

    //Создаем каталог и фейк базы данных и наполняем их тестовыми товарами
    for (const item of products) {
        stock.addItem(item, 1);
        catalogue.addItem(item, rnd(1, 5));
    }

    renderAll();

    //Вешаем событие на кнопку закрытия в галее
    let closeBtn = document.getElementById("closebtn");
    closeBtn.addEventListener('click', CloseGallery);
}


//======== Рендер каталога и корзины на странице ========

//Перерисовывает на странице структуру каталога и корзины
function renderAll() {
    var catalogueRender = document.getElementById("catalogue");//Куда будет рендерится каталог
    var basketRender = document.getElementById("basket");//Куда будет рендерится корзина

    clearItem(catalogueRender);
    clearItem(basketRender);

    //Создаем html-объекты
    catalogueRender.appendChild(catalogue.render());
    basketRender.appendChild(basket.render());
    

    //Навешиваем на все кнопки события по клику
    //Кнопки каталога
    var allButtons = catalogueRender.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', AddProductToBasket);
    }
    var allGalleryClicks = catalogueRender.getElementsByClassName('galleryClick');
    for (let item of allGalleryClicks) {
        item.addEventListener('click', OpenGallery);
    }

    //Кнопки корзины
    var allButtons = basketRender.getElementsByTagName('input');
    for (let item of allButtons) {
        item.addEventListener('click', RemoveProductFromBasket);
    }
    var allGalleryClicks = basketRender.getElementsByClassName('galleryClick');
    for (let item of allGalleryClicks) {
        item.addEventListener('click', OpenGallery);
    }

}


//======== События ========

//Событие по клику на кнопку "добавить в корзину"
function AddProductToBasket(eventObj ) {
    let productPosition = catalogue.findProductPosition(Number.parseInt(eventObj.target.id));

    if (productPosition !== null) {
        let quanity = catalogue.invokeItem(productPosition, 1)
        basket.addItem(productPosition.getProduct(), quanity);
    }

    renderAll();
}

//Событие по клику на кнопку "удалить из корзины"
function RemoveProductFromBasket(eventObj ) {
    let productPosition = basket.findProductPosition(Number.parseInt(eventObj.target.id));

    if (productPosition !== null) {
        let quanity = basket.invokeItem(productPosition, productPosition.quanity)
        catalogue.addItem(productPosition.getProduct(), quanity);
    }

    renderAll();
}

//Открытие галереи
function OpenGallery(eventObj) {
    console.log(eventObj.target.id);
    let productPosition = stock.findProductPosition(Number.parseInt(eventObj.target.id));
    let pictureTag = productPosition.getProduct().getPicPrefix();

    let modal = document.getElementById("modal");
    modal.className = "modal";

    let tumbnails = document.getElementById("tumbnails");
    tumbnails.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
        let td = document.createElement("td");
        let src = "img/gallery/small/" + pictureTag + "_" + i + ".jpg";
        let image = document.createElement("img");
        image.id = pictureTag + "_" + i;
        image.src = src;
        image.onclick = ChangeBigPictureEvent;
        td.appendChild(image);
        tumbnails.appendChild(td);
    }
    ChangeBigPicture(pictureTag + "_" + 1);

}

//Событие по клику на миниатюре в галерее
function ChangeBigPictureEvent(eventObj) {
    let pictureTag = eventObj.target.id;
    ChangeBigPicture(pictureTag);
}

//Фактическое изменение большое картинки в галерее
function ChangeBigPicture(pictureTag) {
    let bigPicture = document.getElementById("big_picture");
	bigPicture.innerHTML = "";	
    let src = "img/gallery/big/" + pictureTag + ".jpg";
	let imageDomElement = document.createElement("img");
	imageDomElement.src = src;
	bigPicture.appendChild(imageDomElement);
}

//Закрытие галереи
function CloseGallery() {
    let modal = document.getElementById("modal");
    modal.className = "modal-closed";
}


//======== Вспомогательные функции ========

//Очищает DOM элемент от всех его дочерних элементов.
function clearItem(item) {
    //Удаляем все внутренности из board
    while (item.firstChild) {
        item.firstChild.remove();
    }
    
}

//Возвращает случайное число в заданном диапазоне
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




