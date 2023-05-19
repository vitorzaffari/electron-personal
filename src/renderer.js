import { createItemAndAppend, displayJsonItens, saveJsonItens } from "./jsonFunctions.js";

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
dayInput.value = dayNow < 10 ? `0${dayNow +1}` : dayNow+1;
monthInput.value = monthNow < 10 ? `0${monthNow}` : monthNow;
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
displayJsonItens(retrievedDataTrackerArray)

//TODO-------------------------------------------------------------------------------------


//TODO                               CREATES A NEW ELEMENT ON USER CONFIRM FORM AND SENDS IT TO STORAGE
trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let validated;

  const itemNameValue = itemNameInput.value;
  let dayValue = dayInput.value;
  let monthValue = monthInput.value;
  const yearValue = yearInput.value;

  validated = validateInputs(  itemNameInput, dayInput, monthInput, yearInput,  dayNow, monthNow, yearNow );
  if (!validated) {
    return;
  }

  const dateFormat = `${dayValue}/${monthValue}/${yearValue}`;
  const newId = window.uuid.v4();
  createItemAndAppend(dateFormat, newId, itemNameValue)
  saveJsonItens(itemNameValue, dayValue, monthValue, yearValue, newId)
  closeForm(trackerForm);
  emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
});
//TODO----------------------------------------------------------------------------------------------

functionsContainer.addEventListener("click", (event) => {
  
  const eventTarget = event.target;
  const functionHeader = eventTarget.closest("div.title.expand");
  if (functionHeader) {

    const contentContainer = functionHeader.nextElementSibling;
    const functionForm = contentContainer.querySelector(".add-new-item");
    if (eventTarget.matches(".add-new")) {
      contentContainer.classList.toggle("is-open", true);
      functionForm.classList.add("is-open");
      itemNameInput.focus();
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
      const confirmDiv = eventTarget.nextElementSibling;
      confirmDiv.style.opacity = "1";
      confirmDiv.style.zIndex = "10";
      const clickHandler = (e) => {
        if (e.target.classList.contains("__yes")) {
          const removeDiv = eventTarget.closest("div.item");
          const itemToRemoveId = removeDiv.id;
          console.log(itemToRemoveId);
          removeDiv.remove();
          window.bridge.removeData(itemToRemoveId);
        } else if (e.target.classList.contains("__no")) {
          confirmDiv.style.opacity = "0";
          confirmDiv.style.zIndex = "-1";
          confirmDiv.removeEventListener("click", clickHandler)
        }
      }
      confirmDiv.addEventListener("click", clickHandler);
    } else if (eventTarget.matches(".edit-div-btn")) {
      
    }
  }
});



function closeForm(typeofform) {
  const close = typeofform.closest("div.add-new-item");
  close.classList.remove("is-open");
}

function emptyInputs(input, input2, input3, input4) {
  input.value = "";
  input2.value = dayNow+1;
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

// const themeSrc = document.getElementById("theme-src");
// const toggleDarkbtn = document.getElementById("toggle-dark-mode");

// toggleDarkbtn.addEventListener("click", async () => {
//   const isDarkMode = await window.darkMode.toggle();
//   themeSrc.innerHTML = isDarkMode ? "Dark" : "Light";
// });
