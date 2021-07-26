function init(){
	var images = document.getElementsByClassName("tumbnail");
	for (const item of images) {
		item.onclick = changeBigPicture;
	}
}
function changeBigPicture(eventObj){
	var appDiv = document.getElementById("big_picture");
	appDiv.innerHTML = "";	
	var eventElement = eventObj.target;
	var imageNameParts = eventElement.id.split("_");
	var src = "img/gallery/big/" + imageNameParts[1] + ".png";
	var imageDomElement = document.createElement("img");
	imageDomElement.src = src;
	appDiv.appendChild(imageDomElement);
}
window.onload = init;