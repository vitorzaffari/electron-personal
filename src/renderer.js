import { calculateDate } from "./datesHandler.js";
const remaining = calculateDate(9,12,2023);
console.log(remaining);


const functionsContainer = document.querySelector(".main-functions-container");
const trackerForm = document.getElementById("tracker-form");
const addTrackerBtn = document.getElementById("tracker-btn");
// const addTodoBtn = document.getElementById("todo-btn");
// const addTimerBtn = document.getElementById("timer-btn");
// const addCopyBtn = document.getElementById("copy-btn");
// const addCalendarBtn = document.getElementById("calendar-btn");
const itemNameInput = trackerForm.querySelector("#new-item");
const yearInput = trackerForm.querySelector("#new-year");
const dayInput = trackerForm.querySelector("#new-day");
const monthInput = trackerForm.querySelector("#new-month");

const retrievedData = getData.getRetrievedData();
// console.log(retrievedData, " Funcionou!");
// console.log(retrievedData.tracker);

const retrievedDataTrackerArray = retrievedData.tracker;
retrievedDataTrackerArray.forEach((item) => {

  const remain = calculateDate(item.itemData)

  const div = document.createElement("div");
  div.classList.add("item");

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("item__tracker");

  const itemName = document.createElement("p");
  itemName.textContent = `Nome = ${item.itemName}`;

  const itemDate = document.createElement("p");
  itemDate.textContent = `Data = ${item.itemData}`;

  
  const itemRemain = document.createElement("p");
  itemName.textContent = `Faltam aproximadamente ${remain.remainingDays} dias`;

  div.appendChild(innerDiv);
  innerDiv.appendChild(itemName);
  innerDiv.appendChild(itemDate);
  innerDiv.appendChild(itemRemain);

  const parentDiv = document.querySelector('.function-tracker').querySelector('.inner');
  parentDiv.insertBefore(div, parentDiv.children[1]);
});

let dateNow = new Date();
let dayNow = dateNow.getDate();
let monthNow = dateNow.getMonth() + 1;
let yearNow = dateNow.getFullYear();
// console.log(dayNow, monthNow, yearNow);

yearInput.value = yearNow;
yearInput.min = yearNow;

itemNameInput.addEventListener("input", (e) => {
  let itemNameValue = itemNameInput.value;

  if (itemNameValue.charAt(0) === " ") {
    e.target.value = "";
  }
});

trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let validated;

  const itemNameValue = itemNameInput.value;
  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;

  validated = validateInputs(
    itemNameInput,
    dayValue,
    monthValue,
    yearValue,
    dayNow,
    monthNow,
    yearNow
  );
  if (!validated) {
    return;
  }

  const futureDateObj = new Date(`${yearValue}-${monthValue}-${dayValue}`);
  const dateDiff = futureDateObj - dateNow;
  const diffDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 30);
  const diffDMonths = Math.floor(diffDays / 365);

  console.log(
    `Faltam ${diffDays} dias, ${diffYears} meses e ${diffDMonths} anos para a data ${futureDateObj}`
  );

  
  
  const newItemDiv = document.createElement("div");
  newItemDiv.classList.add("item");
  
  const newItemTrackerDiv = document.createElement("div");
  newItemTrackerDiv.classList.add("item__tracker");
  
  const itemName = document.createElement("p");
  itemName.textContent = itemNameValue;
  
  const itemDate = document.createElement("p");
  itemDate.textContent = `${dayValue}-${monthValue}-${yearValue} `;
  const remain = calculateDate(`${dayValue}-${monthValue}-${yearValue}`)
  
    const itemRemain = document.createElement("p");
    itemRemain.textContent = `Faltam aproximadamente ${remain.remainingDays} dias`;

  newItemDiv.appendChild(newItemTrackerDiv);
  newItemTrackerDiv.appendChild(itemName);
  newItemTrackerDiv.appendChild(itemDate);
  newItemTrackerDiv.appendChild(itemRemain);

  let divData = {
    itemNome: itemNameValue,
    itemData: `${dayValue}-${monthValue}-${yearValue} `,
  };
  window.bridge.sendData(divData);

  if(trackerForm.closest("div.add-new-item").nextElementSibling){
    const firstItemdiv =
      trackerForm.closest("div.add-new-item").nextElementSibling;
    const itemsDiv = firstItemdiv.parentElement;
    // console.log(trackerForm.classList);
    itemsDiv.insertBefore(newItemDiv, firstItemdiv);
  } else console.log("oi");


  closeForm(trackerForm);
  emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
  // insertBefore(newItemDiv, trackerForm.closest('div.add-new-item').
  // nextElementSibling.firstChild)
});

functionsContainer.addEventListener("click", (event) => {
  //listens for a click on the functions container
  const clickedElement = event.target.closest("div");
  //clickedElement is the div with the title of the function ("tracker, to-do")
  const targetElement = clickedElement.nextElementSibling;
  //target element is the div.content
  if (targetElement === null || !targetElement.classList.contains("content")) {
    if (event.target.classList.contains("cancel")) {
      let formDiv = event.target.closest(".add-new-item");
      closeForm(formDiv);
      emptyInputs(itemNameInput, dayInput, monthInput, yearInput);
      return;
    } else {
      return;
    }
  }

  const fnctFormDiv = targetElement.querySelector(".add-new-item");

  // the first children[0] is the "inner" div, and its children[0] is the ALWAYS the FORM
  // which is hidden by default

  if (event.target.classList.contains("add-new")) {
    targetElement.classList.add("is-open");
    //if the "Add new" button is clicked it'll show the current list of items of the div, if any

    //show the corresponding form
    if (event.target.matches(".btn__tracker")) {
      fnctFormDiv.classList.add("is-open");
    }
    if (event.target.matches(".btn__todo")) {
      fnctFormDiv.classList.add("is-open");
    }
    if (event.target.matches(".btn__timer")) {
      fnctFormDiv.classList.add("is-open");
    }
    if (event.target.matches(".btn__copy")) {
      fnctFormDiv.classList.add("is-open");
    }
    if (event.target.matches(".btn__calendar")) {
      fnctFormDiv.classList.add("is-open");
    }

    return;
  }

  //if the title div is clicked while the form is open it'll close and hide it
  targetElement.classList.toggle("is-open");

  closeForm(fnctFormDiv);
  // fnctFormDiv.style.display = "none";
});

function closeForm(typeofform) {
  const close = typeofform.closest("div.add-new-item");
  // close.style.display = "grid";
  close.classList.remove("is-open");
}

function emptyInputs(input, input2, input3, input4) {
  input.value = "";
  input2.value = 1;
  input3.value = 1;
  input4.value = 2023;
}

function validateInputs(
  input,
  input2,
  input3,
  input4,
  dayNow,
  monthNow,
  yearNow
) {
  console.log("inputs:", input.value, input2, input3, input4);
  let returnValue = true;

  if (input.value === "") {
    console.log("Nome inválido", input);
    returnValue = false;
  }
  if (input4 < yearNow) {
    console.log("Ano invalido");
    returnValue = false;
  }

  if (input4 == yearNow && input3 < monthNow) {
    console.log("Mes invalido");
    returnValue = false;
  }

  if (input4 == yearNow && input3 == monthNow && input2 <= dayNow) {
    console.log("Dia invalido");
    returnValue = false;
  }

  return returnValue;
}

const themeSrc = document.getElementById("theme-src");
const toggleDarkbtn = document.getElementById("toggle-dark-mode");
const resetBtn = document.getElementById("reset");

toggleDarkbtn.addEventListener("click", async () => {
  const isDarkMode = await window.darkMode.toggle();
  themeSrc.innerHTML = isDarkMode ? "Dark" : "Light";
});

resetBtn.addEventListener("click", async () => {
  await window.darkMode.system();
  themeSrc.innerHTML = "System";
});

/////////////////////////////////////////////////////////////////////////
