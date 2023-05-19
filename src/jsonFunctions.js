import { calculateDate } from "./datesHandler.js";

export function displayJsonItens(arr) {
  arr.forEach((item) => {
    createItemAndAppend(item.itemData, item.id, item.itemNome)
});
}

export function saveJsonItens(nome, day, month, year, id) {
        let data = {
            itemNome: nome,
            itemData: `${day}/${month}/${year} `,
            id: id
        }
        window.bridge.sendData(data);
}

export function editJsonItem() {}

function createDiv(class1, id = "") {
  const div = document.createElement("div");
  div.id = id;
  div.classList.add(class1);
  return div;
}

export function createItemAndAppend(dateDate, id, itemsName){
    const date = calculateDate(dateDate);
    const outerDiv = createDiv("item", id);
    const innerDiv = createDiv("item__tracker");
    const editDeleteDiv = createDiv("edit-delete-container");
    const itemName = createDiv("item-name");
    const itemDate = createDiv("blank_div");
    const infoDiv = createDiv("remain-info-div")


    editDeleteDiv.innerHTML = `
    <span class="material-icons md-21 icon-btn edit-div-btn">
        mode_edit
    </span> 
    <span class="material-icons md-21 icon-btn delete-div-btn">
        delete
    </span>
    <div class="delete-confirm">
        <p>Are you sure? </p>
        <div class="gap-wrap">
            <button type='button' class="btn __yes">Yes</button>
            <button type="button" class="btn __no">No</button>
        </div>
    </div>`;
    itemName.innerHTML = `<span class="material-icons">
    explore
    </span><p>${itemsName}</p>`;
    itemDate.innerHTML = `<p>${dateDate}</p>`
    infoDiv.style.backgroundColor = date.colorStatus;
    infoDiv.innerHTML = `<p>${date.dataFormatada}</p>`;


    outerDiv.appendChild(innerDiv);
    innerDiv.appendChild(editDeleteDiv);
    innerDiv.appendChild(itemName);
    innerDiv.appendChild(itemDate);
    innerDiv.appendChild(infoDiv);

    const parentDiv = document.querySelector(".function-tracker").querySelector(".inner");
    if(parentDiv.children.length === 1){
        parentDiv.appendChild(outerDiv);
    } else {
        parentDiv.insertBefore(outerDiv, parentDiv.children[1]);
    }
}