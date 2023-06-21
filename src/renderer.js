import { calculateDate } from "./datesHandler.js";
import {
  createItemAndAppend,
  displayJsonItens,
  saveJsonItens,
  createNewTimer,
  countdown
} from "./jsonFunctions.js";

const retrievedData = getData.getRetrievedData();
const retrievedDataTrackerArray = retrievedData.tracker;
displayJsonItens(retrievedDataTrackerArray);



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
dayInput.value = dayNow < 10 ? `0${dayNow + 1}` : dayNow + 1;
monthInput.value = monthNow < 10 ? `0${monthNow}` : monthNow;
yearInput.value = yearNow;

itemNameInput.addEventListener("input", (e) => {
  let itemNameValue = itemNameInput.value;
  if (itemNameValue.charAt(0) === " ") {
    e.target.value = "";
  }
});

const timerForm = document.getElementById("timer-form");
const timerItem = document.getElementById("timer-name")
const timerHours = document.getElementById("timer-hours")
const timerMinutes = document.getElementById("timer-minutes")
const timerSeconds = document.getElementById("timer-seconds")


timerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const ___format = timerItem.value.trim()
    const hasName = ___format !== '';
    // console.log("Does the item have a value", hasName, " Value:", ___format);
    
    let secondsValue =parseInt(timerSeconds.value);
    let minutesValue =parseInt(timerMinutes.value);
    let hoursValue =parseInt(timerHours.value);
    const isSecondsEmpty = secondsValue == 0;
    const isMinutesEmpty = minutesValue == 0;
    const isHoursEmpty = hoursValue == 0;
    const secNeedsFormat = secondsValue >59;
    // console.log("Is seconds empty? :", isSecondsEmpty);
    // console.log("Is minutes empty? :", isMinutesEmpty);
    // console.log("Is hours empty? :", isHoursEmpty);
    // console.log("Seconds need formating? :", secNeedsFormat);
    if (secNeedsFormat) {
      // console.log("Minutes from seconds: ",Math.floor(secondsValue/60));
      const extraMinutesFromSecs = Math.floor(secondsValue/60)
      // console.log("Remaninig Seconds: ",secondsValue-(extraMinutesFromSecs*60));
      // console.log("Current Minutes value: ", minutesValue);
      minutesValue = minutesValue + extraMinutesFromSecs
      // console.log("Updated Minutes value: ", minutesValue);
      secondsValue = secondsValue-(extraMinutesFromSecs*60)
      // console.log("Updated Seconds Value: ", secondsValue);
    
    }
    const minNeedsFormat = minutesValue >59;
    // console.log("Minutes need formating? :", minNeedsFormat);

    // console.log("Hours:", hoursValue, " Minutes: ", minutesValue, " Seconds: ", secondsValue);
    
    if (minNeedsFormat) {
      // console.log("Need to format this: ",minutesValue);
      
      // console.log("Hours from minutes: ",Math.floor(minutesValue/60));
      const extraHourFromMins = Math.floor(minutesValue/60)
      // console.log("How many additional hours? =>", extraHourFromMins);
      // console.log("Minutes before formatting => ", minutesValue);
      // console.log("Hours before formatting => ", hoursValue);

      hoursValue = hoursValue + extraHourFromMins;
      minutesValue = minutesValue - (extraHourFromMins*60)
      // console.log("Minutes after formatting => ", minutesValue);
      // console.log("Hours after formatting => ", hoursValue);
      

    }
    // console.log("Hours:", hoursValue, " Minutes: ", minutesValue, " Seconds: ", secondsValue);

    const [countString, item] = createNewTimer(___format, hoursValue, minutesValue, secondsValue);
    
    // console.log(countString, item);
    countdown(countString, item)
})


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
    // console.log(functionForm);
    
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


function editElement(event) {
  
  console.log(event.closest(".item__tracker"));
  const elementContainer = event.closest(".item__tracker");
  const elementId = elementContainer.parentElement.id;
  const nameElement = elementContainer.querySelector(".item-name");
  
  const dateElement = elementContainer.querySelector(".blank_div");
  
  const editElement = elementContainer.querySelector(".edit-delete-container");

  const remainElement = elementContainer.querySelector(".remain-info-div");
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
<input type="submit" id="confirm_edit" value="done" class="btn  material-icons" />

<button type="button" id="cancel_edit" class="btn  material-icons">close</button>`;


  nameElement.parentNode.replaceChild(newNameInputWrap, nameElement);
  nameInput.focus();
  dateElement.parentNode.replaceChild(newDateInputWrap, dateElement);
  editElement.parentNode.replaceChild(editButtonsDiv, editElement);


  remainElement.style.opacity = "0.2";
  // console.log(nameContent);
  // console.log(dateContent);
  
  nameInput.addEventListener("input", (e) => {
    let itemNameValue = nameInput.value;
    if (itemNameValue.charAt(0) === " ") {
      e.target.value = "";
    }
  });

  editButtonsDiv.addEventListener('click', (e) => {

    let newDateContent = `${dateDayInput.value}/${dateMonthInput.value}/${dateYearInput.value}`
    // console.log(newDateContent);
    
    let nameDidChange = checkForChanges(nameContent, nameInput.value);
    let dateDidChange = checkForChanges(dateContent, newDateContent);
      // console.log(e.target);
      if(e.target.id ==="confirm_edit"){

        if(!nameDidChange){
          let isOkay = validateInputs(nameInput);
          if (isOkay) {
            nameElement.querySelector('p').innerText = nameInput.value
            newNameInputWrap.parentNode.replaceChild(nameElement, newNameInputWrap);
          } else {
            console.log("Input inválido");
            return
          }

        } else {
          newNameInputWrap.parentNode.replaceChild(nameElement, newNameInputWrap);
        }

        const formatDate = calculateDate(newDateContent)
        remainElement.style.opacity = ""
        remainElement.style.backgroundColor = formatDate.colorStatus
        remainElement.innerHTML = `<p>${formatDate.dataFormatada}</p>`

        if(!dateDidChange){
          dateElement.querySelector('p').innerText = newDateContent;
          newDateInputWrap.parentNode.replaceChild(dateElement, newDateInputWrap);
        } else {
          newDateInputWrap.parentNode.replaceChild(dateElement, newDateInputWrap);
        }
        editButtonsDiv.parentNode.replaceChild(editElement,editButtonsDiv);

        const data = {itemNome:nameInput.value, itemData: `${dateDayInput.value}/${dateMonthInput.value}/${dateYearInput.value}`, id:elementId}
      window.bridge.editData(data)
      }

      if (e.target.id === "cancel_edit") {
        newNameInputWrap.parentNode.replaceChild(nameElement, newNameInputWrap);
        newDateInputWrap.parentNode.replaceChild(dateElement, newDateInputWrap);
        remainElement.style.opacity = ""
        editButtonsDiv.parentNode.replaceChild(editElement,editButtonsDiv);

      }
    })
}

function checkForChanges(firstValue, finalValue){
  // console.log("Fist value: ", firstValue);
  // console.log("Second value: ", finalValue);
  // console.log("Equal? ", finalValue === firstValue);
  return finalValue === firstValue;
  
}




function validateInputs(
  nomeInput = '',
  dayInput = '',
  monthInput = '',
  yearInput = '',
  dayNow = '',
  monthNow = '',
  yearNow = ''
) {
  let returnValue = true;

  if (nomeInput.value === "") {
    console.log("Nome inválido", nomeInput);
    setError(nomeInput);
    returnValue = false;
    console.log(nomeInput.value);
    
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
  console.log(returnValue);
  
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
