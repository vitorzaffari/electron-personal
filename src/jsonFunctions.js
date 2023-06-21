import { calculateDate } from "./datesHandler.js";

export function displayJsonItens(arr) {
  arr.forEach((item) => {
    createItemAndAppend(item.itemData, item.id, item.itemNome);
  });
}

export function saveJsonItens(nome, day, month, year, id) {
  let data = {
    itemNome: nome,
    itemData: `${day}/${month}/${year} `,
    id: id,
  };
  window.bridge.sendData(data);
}

export function editJsonItem() {}

function createDiv(class1, id = "") {
  const div = document.createElement("div");
  div.id = id;
  div.classList.add(class1);
  return div;
}

export function createItemAndAppend(dateDate, id, itemsName) {
  const date = calculateDate(dateDate);
  const outerDiv = createDiv("item", id);
  const innerDiv = createDiv("item__tracker");
  const editDeleteDiv = createDiv("edit-delete-container");
  const itemName = createDiv("item-name");
  const itemDate = createDiv("blank_div");
  const infoDiv = createDiv("remain-info-div");

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
  itemDate.innerHTML = `<p>${dateDate}</p>`;
  infoDiv.style.backgroundColor = date.colorStatus;
  infoDiv.innerHTML = `<p>${date.dataFormatada}</p>`;

  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(editDeleteDiv);
  innerDiv.appendChild(itemName);
  innerDiv.appendChild(itemDate);
  innerDiv.appendChild(infoDiv);

  const parentDiv = document
    .querySelector(".function-tracker")
    .querySelector(".inner");
  if (parentDiv.children.length === 1) {
    parentDiv.appendChild(outerDiv);
  } else {
    parentDiv.insertBefore(outerDiv, parentDiv.children[1]);
  }
}

export function createNewTimer(name, hoursValue, minutesValue, secondsValue) {
  hoursValue < 10 ? (hoursValue = `0${hoursValue}`) : hoursValue;
  minutesValue < 10 ? (minutesValue = `0${minutesValue}`) : minutesValue;
  secondsValue < 10 ? (secondsValue = `0${secondsValue}`) : secondsValue;

  let timerFormat = `<p>${hoursValue}:${minutesValue}:${secondsValue}</p>`;

//   console.log(
//     "Is hour empty? => ",
//     !hoursValue,
//     hoursValue == 0,
//     hoursValue === 0
//   );
//   console.log(
//     "Is minutes empty? => ",
//     !minutesValue,
//     minutesValue == 0,
//     minutesValue === 0
//   );
//   console.log(
//     "Is seconds empty? => ",
//     !secondsValue,
//     secondsValue == 0,
//     secondsValue === 0
//   );

  const outerDiv = createDiv("item");
  const innerDiv = createDiv("timer-div");
  const itemName = createDiv("item-name");
  const timerDisplay = createDiv("blank_div");

  itemName.innerHTML = `<p>${name}</p>`;
  timerDisplay.innerHTML = timerFormat;

  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(itemName);
  innerDiv.appendChild(timerDisplay);

  const parentDiv = document
    .querySelector(".function-timer")
    .querySelector(".inner");
  if (parentDiv.children.length === 1) {
    parentDiv.appendChild(outerDiv);
  } else {
    parentDiv.insertBefore(outerDiv, parentDiv.children[1]);
  }
  return ([`
  ${hoursValue}:${minutesValue}:${secondsValue}`, timerDisplay
]);
}

export function countdown(string, item) {
  let [hours, minutes, seconds] = string.split(":");
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  let countdownInterval = setInterval(() => {
      
      if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        }

    formatTime(hours,minutes,seconds)

    const display = item.querySelector('p')
    // console.log(display);
    display.innerHTML = formatTime(hours,minutes,seconds)
    
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(countdownInterval);
      display.innerHTML ="Countdown over!";
      return;
    }
  }, 1000);
  
}


function formatTime(hours, minutes, seconds){
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}