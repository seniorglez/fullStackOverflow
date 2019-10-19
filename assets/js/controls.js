import selectPoint from './main.js';

let searchDataButton = document.getElementById("search-data");
let addDataButton = document.getElementById("add-data");

function injectData(element, objData) {
    Object.keys(objData).forEach(key => {
        console.log(key, objData[key]);
    });
}


searchDataButton.addEventListener("click", function () {
    let divWithData = document.createElement("div");
    this.parentElement.appendChild(divWithData);
});

addDataButton.addEventListener("click", function () {
    let controls = [];
    let inputCoordName = document.createElement("input");
    let pickButton = document.createElement("button");

    inputCoordName.setAttribute("placeholder", "Name");
    inputCoordName.setAttribute("id", "coordName");
    pickButton.innerText = "Pick";
    pickButton.addEventListener("click", () => {
        selectPoint();
    });

    controls.push(document.createElement("br"));
    controls.push(inputCoordName);
    controls.push(pickButton);

    this.parentElement.append(...controls);
});