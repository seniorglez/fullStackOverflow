import createPoint from './main.js';
import create_country_layer from './countryColors.js';

let searchDataButton = document.getElementById("search-data");
let addDataButton = document.getElementById("add-data");

function injectData(element, objData) {
    Object.keys(objData).forEach(key => {
        console.log(key, objData[key]);
    });
}

// Creates and return a new color selector
function getColorSelector() {
    let colors = [
        "red",
        "blue",
        "green",
        "purple",
        "orange",
        "yellow",
    ];

    let selectorElement = document.createElement("select");

    colors.forEach(color => {
        let colorOption = document.createElement("option");

        colorOption.setAttribute("value", color);
        colorOption.innerText = color;
        selectorElement.appendChild(colorOption);
    });

    return selectorElement;
}

searchDataButton.addEventListener("click", function () {
    let divWithData = document.createElement("div");
    let divColorLegend = document.getElementById("legend");
    this.parentElement.removeChild(divColorLegend);
    this.parentElement.append(divWithData);
    this.parentElement.append(divColorLegend);
    create_country_layer();
});

addDataButton.addEventListener("click", function () {
    let controls = [];
    let inputCoordName = document.createElement("input");
    let colorSelector = getColorSelector();
    let pickButton = document.createElement("button");

    inputCoordName.setAttribute("placeholder", "Name");
    inputCoordName.setAttribute("id", "coordName");
    pickButton.setAttribute("id", "button-pick");
    pickButton.innerText = "Pick";
    pickButton.addEventListener("click", () => {
        createPoint(colorSelector.value);
        let container = pickButton.parentElement;
    });

    controls.push(document.createElement("br"));
    controls.push(inputCoordName);
    controls.push(colorSelector);
    controls.push(pickButton);

    this.parentElement.append(...controls);
});


// Creates a paragraph with coords info and removes controls
export default function generateCoordParagraph() {
    let container = document.getElementById("add-data").parentElement;
    let pickButton = document.getElementById("button-pick");
    let inputCoordName = document.getElementById("coordName");
    let colorSelector = getColorSelector();

    let coordNameParagraph = document.createElement("span");
    let delButton = document.createElement("button");
    delButton.innerText = "x";

    delButton.addEventListener("click", () => {
        container.removeChild(coordNameParagraph.previousElementSibling);
        container.removeChild(coordNameParagraph);
        container.removeChild(delButton);
    })

    console.log(colorSelector.selectedIndex);
    coordNameParagraph.innerText = inputCoordName.value;
    
    container.removeChild(pickButton.previousSibling);
    container.replaceChild(coordNameParagraph, pickButton.previousSibling);
    container.replaceChild(delButton, pickButton);
}