import { calculateDate } from "./datesHandler.js";

const functionsContainer = document.querySelector(".main-functions-container");
const trackerForm = document.getElementById("tracker-form");
const itemNameInput = trackerForm.querySelector("#new-item");
const yearInput = trackerForm.querySelector("#new-year");
const dayInput = trackerForm.querySelector("#new-day");
const monthInput = trackerForm.querySelector("#new-month");
let dateNow = new Date();
let dayNow = dateNow.getDate();
let monthNow = dateNow.getMonth() + 1;
let yearNow = dateNow.getFullYear();
dayInput.value = dayNow;
monthInput.value = monthNow;
yearInput.value = yearNow;

itemNameInput.addEventListener("input", (e) => {
  let itemNameValue = itemNameInput.value;
  if (itemNameValue.charAt(0) === " ") {
    e.target.value = "";
  }
});

//TODO---------------------------------------------------------------------------------------
const retrievedData = getData.getRetrievedData();
const retrievedDataTrackerArray = retrievedData.tracker;
//TODO                             RETRIEVE DATA AND CREATE ELEMENTS FROM STORAGE
retrievedDataTrackerArray.forEach((item) => {
  const remain = calculateDate(item.itemData);

  const div = document.createElement("div");
  div.id = item.id;
  div.classList.add("item");

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("item__tracker");

  const editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit-delete-container");
  editDeleteDiv.innerHTML = `<span class="material-icons md-21 icon-btn">
  mode_edit
  </span> <span class="material-icons md-21 icon-btn delete-div-btn">
  delete
  </span>`;

  const itemName = document.createElement("div");
  itemName.classList.add("item-name");
  itemName.innerHTML = `<span class="material-icons">
  explore
  </span><p>${item.itemNome}</p>`;

  const itemDate = document.createElement("p");
  itemDate.textContent = `Data:  ${item.itemData}`;

  const itemRemain = document.createElement("div");
  itemRemain.classList.add("remain-info-div");
  itemRemain.style.backgroundColor = remain.colorStatus;
  itemRemain.innerHTML = `<p>${remain.dataFormatada}</p>`;

  div.appendChild(innerDiv);
  innerDiv.appendChild(editDeleteDiv);
  innerDiv.appendChild(itemName);
  innerDiv.appendChild(itemDate);
  innerDiv.appendChild(itemRemain);

  const parentDiv = document
    .querySelector(".function-tracker")
    .querySelector(".inner");
  parentDiv.insertBefore(div, parentDiv.children[1]);
});
//TODO-------------------------------------------------------------------------------------

//TODO                               CREATES A NEW ELEMENT ON USER CONFIRM FORM AND SENDS IT TO STORAGE
trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let validated;

  const itemNameValue = itemNameInput.value;
  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;
  validated = validateInputs(
    itemNameInput,
    dayInput,
    monthInput,
    yearInput,
    dayNow,
    monthNow,
    yearNow
  );
  if (!validated) {
    return;
  }

  const newItemDiv = document.createElement("div");
  newItemDiv.id = window.uuid.v4();
  newItemDiv.classList.add("item");

  const newItemTrackerDiv = document.createElement("div");
  newItemTrackerDiv.classList.add("item__tracker");

  const itemName = document.createElement("div");
  itemName.classList.add("item-name");
  itemName.innerHTML = `<span class="material-icons">
  explore
  </span><p>${itemNameValue}</p>`;

  const editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit-delete-container");
  editDeleteDiv.innerHTML = `<span class="material-icons md-21 icon-btn">
  mode_edit
  </span> <span class="material-icons md-21 icon-btn delete-div-btn">
  delete
  </span>`;

  const itemDate = document.createElement("p");
  itemDate.textContent = `${dayValue}/${monthValue}/${yearValue} `;
  const dateFormat = `${dayValue}/${monthValue}/${yearValue}`;
  // console.log("Date format: ", dateFormat);
  const remain = calculateDate(dateFormat);

  const itemRemain = document.createElement("div");
  itemRemain.classList.add("remain-info-div");
  itemRemain.style.backgroundColor = remain.colorStatus;
  itemRemain.innerHTML = `<p>${remain.dataFormatada}</p>`;

  newItemDiv.appendChild(newItemTrackerDiv);
  newItemTrackerDiv.appendChild(editDeleteDiv);
  newItemTrackerDiv.appendChild(itemName);
  newItemTrackerDiv.appendChild(itemDate);
  newItemTrackerDiv.appendChild(itemRemain);

  let divData = {
    itemNome: itemNameValue,
    itemData: `${dayValue}/${monthValue}/${yearValue} `,
    id: newItemDiv.id,
  };
  window.bridge.sendData(divData);

  if (trackerForm.closest("div.add-new-item").nextElementSibling) {
    const firstItemdiv =
      trackerForm.closest("div.add-new-item").nextElementSibling;
    const itemsDiv = firstItemdiv.parentElement;
    itemsDiv.insertBefore(newItemDiv, firstItemdiv);
  } else console.log("oi");

  closeForm(trackerForm);
  emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
});
//TODO----------------------------------------------------------------------------------------------

functionsContainer.addEventListener("click", (event) => {
  //listens for a click on the functions container
  // console.log(event.target);
  const eventTarget = event.target;
  const functionHeader = eventTarget.closest("div.title.expand");
  if (functionHeader) {
    const contentContainer = functionHeader.nextElementSibling;
    // console.log("Function Header exists and is has a sibling called Content");
    const functionForm = contentContainer.querySelector(".add-new-item");
    if (eventTarget.matches(".add-new")) {
      contentContainer.classList.toggle("is-open", true);
      functionForm.classList.add("is-open");
    } else {
      contentContainer.classList.toggle("is-open");
    }
  } else if (!functionHeader) {
    if (eventTarget.classList.contains("cancel")) {
      const functionForm = eventTarget.closest(".add-new-item");
      closeForm(functionForm);
      emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
      return;
    } else if (eventTarget.matches(".delete-div-btn")) {
      const removeDiv = eventTarget.closest("div.item");
      const itemToRemoveId = removeDiv.id;
      console.log(itemToRemoveId);
      removeDiv.remove();
      window.bridge.removeData(itemToRemoveId);
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeForm(typeofform) {
  const close = typeofform.closest("div.add-new-item");
  // close.style.display = "grid";
  close.classList.remove("is-open");
}

function emptyInputs(input, input2, input3, input4) {
  input.value = "";
  input2.value = dayNow;
  input3.value = monthNow;
  input4.value = yearNow;
}

function validateInputs(
  nomeInput,
  dayInput,
  monthInput,
  yearInput,
  dayNow,
  monthNow,
  yearNow
) {
  // console.log("inputs:", nome.value, input2, input3, input4);
  let returnValue = true;

  if (nomeInput.value === "") {
    console.log("Nome inválido", nomeInput);
    setError(nomeInput);
    returnValue = false;
  }
  if (yearInput.value < yearNow) {
    console.log("Ano invalido");

    setError(yearInput);
    setError(monthInput);
    setError(dayInput);
    returnValue = false;
  }

  if (yearInput.value == yearNow && monthInput.value < monthNow) {
    console.log("Mes invalido");
    setError(monthInput);
    setError(dayInput);
    returnValue = false;
  }

  if (
    yearInput.value == yearNow &&
    monthInput.value == monthNow &&
    dayInput.value <= dayNow
  ) {
    console.log("Dia invalido");
    setError(dayInput);
    returnValue = false;
  }

  return returnValue;
}

let timeoutId;
function setError(input) {
  clearTimeout(input.timeoutId);
  input.classList.add("invalid-input");
  input.nextElementSibling.style.opacity = "1";
  input.nextElementSibling.style.transition = "100ms";

  const clearError = () => {
    input.nextElementSibling.style.transition = "300ms";
    input.nextElementSibling.style.opacity = "0";
    input.classList.remove("invalid-input");
  };

  input.timeoutId = setTimeout(clearError, 4000);
}

const themeSrc = document.getElementById("theme-src");
const toggleDarkbtn = document.getElementById("toggle-dark-mode");

toggleDarkbtn.addEventListener("click", async () => {
  const isDarkMode = await window.darkMode.toggle();
  themeSrc.innerHTML = isDarkMode ? "Dark" : "Light";
});
