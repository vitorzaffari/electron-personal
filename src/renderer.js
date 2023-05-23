import {
  createItemAndAppend,
  displayJsonItens,
  saveJsonItens,
} from "./jsonFunctions.js";

const functionsContainer = document.querySelector(".main-functions-container");
const trackerForm = document.getElementById("tracker-form");
const itemNameInput = trackerForm.querySelector("#new-item");
const yearInput = trackerForm.querySelector("#new-year");
const dayInput = trackerForm.querySelector("#new-day");
console.log(dayInput);

const monthInput = trackerForm.querySelector("#new-month");
let dateNow = new Date();
let dayNow = dateNow.getDate();
let monthNow = dateNow.getMonth() + 1;
let yearNow = dateNow.getFullYear();
dayInput.value = dayNow < 10 ? `0${dayNow + 1}` : dayNow + 1;
monthInput.value = monthNow < 10 ? `0${monthNow}` : monthNow;
yearInput.value = yearNow;

itemNameInput.addEventListener("input", (e) => {
  let itemNameValue = itemNameInput.value;
  if (itemNameValue.charAt(0) === " ") {
    e.target.value = "";
  }
});

const retrievedData = getData.getRetrievedData();
const retrievedDataTrackerArray = retrievedData.tracker;
displayJsonItens(retrievedDataTrackerArray);

trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let validated;

  const itemNameValue = itemNameInput.value;
  let dayValue = dayInput.value;
  let monthValue = monthInput.value;
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

  const dateFormat = `${dayValue}/${monthValue}/${yearValue}`;
  const newId = window.uuid.v4();
  createItemAndAppend(dateFormat, newId, itemNameValue);
  saveJsonItens(itemNameValue, dayValue, monthValue, yearValue, newId);
  closeForm(trackerForm);
  emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
});
//
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
          confirmDiv.removeEventListener("click", clickHandler);
        }
      };
      confirmDiv.addEventListener("click", clickHandler);
    } else if (eventTarget.matches(".edit-div-btn")) {
      // console.log(eventTarget.closest('.item'));
      editElement(eventTarget);
    }
  }
});

function closeForm(typeofform) {
  const close = typeofform.closest("div.add-new-item");
  close.classList.remove("is-open");
}

function emptyInputs(input, input2, input3, input4) {
  input.value = "";
  input2.value = dayNow + 1;
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

function editElement(event) {
  
  console.log(event.closest(".item__tracker"));
  const elementContainer = event.closest(".item__tracker");
  const nameElement = elementContainer.querySelector(".item-name");
  
  const dateElement = elementContainer.querySelector(".blank_div");
  
  const editElement = elementContainer.querySelector(".edit-delete-container");
  console.log(editElement.parentNode);

  const remailElement = elementContainer.querySelector(".remain-info-div");
  let nameContent = nameElement.querySelector("p").innerText;
  let dateContent = dateElement.querySelector("p").innerText;
  const [day, month, year] = dateContent.split("/");
  // ! saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  //wraps the name input
  const newNameInputWrap = document.createElement("div");
  newNameInputWrap.classList.add("form-icon-input-wrap");
  const badgeSpan = document.createElement("span");
  badgeSpan.classList.add("material-icons");
  badgeSpan.classList.add("md-21");
  badgeSpan.classList.add("badge");
  badgeSpan.innerHTML = `badge`;
  newNameInputWrap.append(badgeSpan);
  const nameInput = document.createElement("input");
  nameInput.classList.add("text-input");
  nameInput.type = "text";
  nameInput.value = nameContent;
  const newNameInputDiv = document.createElement("div");
  newNameInputDiv.classList.add("tracker_label_wrap");
  const newNameInvalidDiv = document.createElement("div");
  newNameInvalidDiv.classList.add("text-invalid");
  newNameInvalidDiv.innerHTML = `<p>Invalid</p>`;
  newNameInputDiv.append(nameInput);
  newNameInputDiv.append(newNameInvalidDiv);
  newNameInputWrap.append(newNameInputDiv)
//dates


  const newDateInputWrap = document.createElement("div");
  newDateInputWrap.classList.add("form-icon-input-wrap")
  const alarmSpan = document.createElement("span");
  alarmSpan.classList.add("material-icons");
  alarmSpan.classList.add("md-21");
  alarmSpan.innerHTML = `alarm`;
  newDateInputWrap.append(alarmSpan)



  const newDayInputDiv = document.createElement("div");
  newDayInputDiv.classList.add("tracker_label_wrap")

  const newMonthInputDiv = document.createElement("div");
  newMonthInputDiv.classList.add("tracker_label_wrap")

  const newYearInputDiv = document.createElement("div");
  newYearInputDiv.classList.add("tracker_label_wrap")

                                      const newDayInvalidDiv = document.createElement("div");
                                      newDayInvalidDiv.classList.add("text-invalid");
                                      newDayInvalidDiv.innerHTML = `<p>Invalid</p>`;
  
  // !teste ---------------------------------------------------
                                      const newMonthInvalidDiv = document.createElement("div");
                                      newMonthInvalidDiv.classList.add("text-invalid");
                                      newMonthInvalidDiv.innerHTML = `<p>Invalid</p>`;

                                      const newYearInvalidDiv = document.createElement("div");
                                      newYearInvalidDiv.classList.add("text-invalid");
                                      newYearInvalidDiv.innerHTML = `<p>Invalid</p>`;



  const dateDayInput = document.createElement("input");
  const dateMonthInput = document.createElement("input");
  const dateYearInput = document.createElement("input");
  //day
  dateDayInput.type = "number";
  dateDayInput.min = "1";
  dateDayInput.max = "31";
  dateDayInput.value = day;
  //month
  dateMonthInput.type = "number";
  dateMonthInput.min = "1";
  dateMonthInput.max = "12";
  dateMonthInput.value = month;
  //year
  dateYearInput.type = "number";
  dateYearInput.min = yearNow;
  dateYearInput.max = "9999";
  dateYearInput.value = year;


  newDayInputDiv.append(dateDayInput)
  newDayInputDiv.append(newDayInvalidDiv)

  newMonthInputDiv.append(dateMonthInput)
  newMonthInputDiv.append(newMonthInvalidDiv)

  newYearInputDiv.append(dateYearInput)
  newYearInputDiv.append(newYearInvalidDiv)

  newDateInputWrap.append(newDayInputDiv)
  newDateInputWrap.append(newMonthInputDiv)
  newDateInputWrap.append(newYearInputDiv)

//edition buttons div
const editButtonsDiv = document.createElement("div");
editButtonsDiv.classList.add('edit-delete-container')
editButtonsDiv.innerHTML = `
<input type="submit" value="done_all" class="btn add material-icons" />

<button type="button"class="btn cancel material-icons">cancel</button>`;


  nameElement.parentNode.replaceChild(newNameInputWrap, nameElement);
  nameInput.focus();
  dateElement.parentNode.replaceChild(newDateInputWrap, dateElement);
  editElement.parentNode.replaceChild(editButtonsDiv, editElement);

  nameElement.style.borderBottom = "1px solid white";
  dateElement.style.borderBottom = "1px solid white";
  remailElement.style.opacity = "0.2";
  console.log(nameContent);
  console.log(dateContent);

  // <div class="form-icon-input-wrap">
  //                     <span class="material-icons md-21 badge">
  //                       badge
  //                     </span>
  //                     <div class="tracker_label_wrap">
  //                       <input
  //                         type="text"
  //                         id="new-item"
  //                         class="text-input"
  //                       />
  //                       <div class="text-invalid"><p>Invalid</p></div>
}
