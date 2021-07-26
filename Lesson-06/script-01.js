import { Product, Basket, Catalogue} from './classes.js';

//Создаем каталог и корзину
var catalogue = new Catalogue();
var basket = new Basket();


function CreateCatalogue() {
    console.log("btn pressed.")
    //let catalogue = document.getElementById("catalogue");//Находим элемент в котором будет представлен каталог товаров
}



//Очищает DOM элемент от всех его дочерних элементов.
function clearItem(item) {
    //Удаляем все внутренности из board
    while (item.firstChild) {
        item.firstChild.remove();
    }
    
}


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
    let modal = document.getElementById("modal");
    modal.className = "modal";
}

//Закрытие галереи
function CloseGallery() {
    let modal = document.getElementById("modal");
    modal.className = "modal-closed";
}

//---- INIT ----
window.addEventListener('load', Init);

function Init() {
    console.log("page loaded.")

    //Создание набора товаров
    var product01 = new Product("Товар0", 100);
    var product02 = new Product("Товар1", 50);
    var product03 = new Product("Товар2", 1);

    //Создаем каталог и наполняем его тестовыми товарами
    catalogue.addItem(product01, 5);
    catalogue.addItem(product03, 3);
    catalogue.addItem(product02, 2);
    
    renderAll();

    let closeBtn = document.getElementById("closebtn");
    closeBtn.addEventListener('click', CloseGallery);
}


