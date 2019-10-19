import createPoint from './main.js';

let searchDataButton = document.getElementById("search-data");
let addDataButton = document.getElementById("add-data");

function injectData(element, objData) {
    Object.keys(objData).forEach(key => {
        console.log(key, objData[key]);
    });
}

function getColorSelector() {
    let colors = [
        "red",
        "pink",
        "orange",
        "yellow",
    ];
}

searchDataButton.addEventListener("click", function () {
    let divWithData = document.createElement("div");
    this.parentElement.appendChild(divWithData);
});

addDataButton.addEventListener("click", function () {
    let controls = [];
    let inputCoordName = document.createElement("input");
    let colorSelector = getColorSelector();
    let pickButton = document.createElement("button");

    inputCoordName.setAttribute("placeholder", "Name");
    inputCoordName.setAttribute("id", "coordName");
    pickButton.innerText = "Pick";
    pickButton.addEventListener("click", () => {
        createPoint("orange");
        let container = this.parentElement;
        //let co
        //container.replaceChild()
    });

    controls.push(document.createElement("br"));
    controls.push(inputCoordName);
    controls.push(pickButton);

    this.parentElement.append(...controls);
});