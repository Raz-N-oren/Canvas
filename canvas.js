let refreshIntervalId = setInterval(randomRectangle, 1000);

function randomRectangle() {
    let randomX = Math.trunc(Math.random() * 549);
    let randomY = Math.trunc(Math.random() * 341);
    let randomWidth = Math.trunc(10 + Math.random() * 51);
    let randomHeight = Math.trunc(10 + Math.random() * 51);
    drawRectangle(randomX, randomY, randomWidth, randomHeight);
}

let myCanvas = document.getElementById("my-canvas");
let pencil = myCanvas.getContext("2d");

let xElement = document.getElementById("tex-box-x");
let yElement = document.getElementById("text-box-y");
let widthElement = document.getElementById("text-box-width");
let heightElement = document.getElementById("text-box-height");

let errorsParagraphElement = document.getElementById("errors-paragraph");

let shapeParagraph = document.getElementById("calculated-shape");

myCanvas.addEventListener('click', getPoint, false);

let clickedX;
let clickedY;

function getPoint(event) {
    clickedX = event.offsetX;
    clickedY = event.offsetY;
}

function calculateAndDraw() {
    shapeParagraph.innerHTML = "";

    let errorsParagraphElement = document.getElementById("errors-paragraph");
    if (errorsParagraphElement != null) {
        errorsParagraphElement.remove();
    }

    let x = +xElement.value;
    let y = +yElement.value;
    let width = +widthElement.value;
    let height = +heightElement.value;

    try {
        validateInput(xElement, x, yElement, y, widthElement, width, heightElement, height);
        drawRectangle(x, y, width, height);
        calculateShapeOfRectangle(width, height);
        clearInputsAndErrors();
    }
    catch (e) {
        console.error(e);
        writeErrorsDetailsToUser(e.message);
    }

}

function drawRectangle(x, y, width, height) {
    pencil.strokeStyle = getRandomColor();
    pencil.strokeRect(x, y, width, height); // x, y, width, height
}

function validateInput(xElement, x, yElement, y, widthElement, width, heightElement, height) {
    if (errorsParagraphElement != null) {
        errorsParagraphElement.remove();
    }

    xElement.style.border = "";
    yElement.style.border = "";
    widthElement.style.border = "";
    heightElement.style.border = "";

    let errorMessage = '';
    if (x == '') {
        errorMessage = errorMessage + "X can not be empty. <br>";
        xElement.style.border = "3px solid red";
    }
    else if (x < 0) {
        errorMessage = errorMessage + "X can not be negative number. <br>";
        xElement.style.border = "3px solid red";
    }
    else if (x > 600) {
        errorMessage = errorMessage + "X can not be bigger than 600. <br>";
        xElement.style.border = "3px solid red";
    }
    else if (x + width > 600) {
        errorMessage = errorMessage + "X and width together can not be bigger than 600. <br>";
        xElement.style.border = "3px solid red";
        widthElement.style.border = "3px solid red";
    }

    if (y == '') {
        errorMessage = errorMessage + "Y can not be empty. <br>";
        yElement.style.border = "3px solid red";
    }
    else if (y < 0) {
        errorMessage = errorMessage + "Y can not be negative number. <br>";
        yElement.style.border = "3px solid red";
    }
    else if (y > 400) {
        errorMessage = errorMessage + "Y can not be bigger than 400. <br>";
        xElement.style.border = "3px solid red";
    }
    else if (y + height > 400) {
        errorMessage = errorMessage + "Y and height together can not be bigger than 400. <br>";
        yElement.style.border = "3px solid red";
        heightElement.style.border = "3px solid red";
    }

    if (width == '') {
        errorMessage = errorMessage + "Width can not be empty. <br>";
        widthElement.style.border = "3px solid red";
    }
    else if (width > 600) {
        errorMessage = errorMessage + "Width can not be bigger than 600. <br>";
        widthElement.style.border = "3px solid red";
    }
    else if (width < 0) {
        errorMessage = errorMessage + "Width can not be negative. <br>";
        widthElement.style.border = "3px solid red";
    }

    if (height == '') {
        errorMessage = errorMessage + "Height can not be empty. <br>";
        heightElement.style.border = "3px solid red";
    }
    else if (height > 600) {
        errorMessage = errorMessage + "Height can not be bigger than 600. <br>";
        heightElement.style.border = "3px solid red";
    }
    else if (height < 0) {
        errorMessage = errorMessage + "Height can not be negative. <br>";
        heightElement.style.border = "3px solid red";
    }

    if (errorMessage != '') {
        throw new Error(errorMessage);
    }

}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calculateShapeOfRectangle(width, height) {
    let shapeOfRectangle = width * height;
    shapeParagraph.innerHTML = "The shape of the rectangle is " + shapeOfRectangle;

}

function writeErrorsDetailsToUser(errorMessage) {

    let errorsParagraphElement = document.createElement("p");
    errorsParagraphElement.setAttribute("id", "errors-paragraph");
    errorsParagraphElement.innerHTML = errorMessage;

    let errorsDivElement = document.getElementById("errors-div");
    errorsDivElement.append(errorsParagraphElement);
}

function clickAndDraw() {
    if (clickedX && clickedY) {
        drawRectangle(clickedX, clickedY, 30, 30);
    }
    else {
        alert("Please click on the canvas before you click the button")
    }
}

function clearCanvas() {
    pencil.clearRect(0, 0, 600, 400);

}

function clearInputsAndErrors(){
    let errorsParagraphElement = document.getElementById("errors-paragraph");
    if (errorsParagraphElement != null) {
        errorsParagraphElement.remove();
    }

    shapeParagraph.innerHTML = "";
    xElement.value = "";
    yElement.value = "";
    widthElement.value = "";
    heightElement.value = "";
    xElement.style.border = "";
    yElement.style.border = "";
    widthElement.style.border = "";
    heightElement.style.border = "";

}