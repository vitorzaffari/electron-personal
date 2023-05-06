const functionsContainer = document.querySelector(".main-functions-container");
const trackerForm = document.getElementById("tracker-form");
const addTrackerBtn = document.getElementById("tracker-btn");
const addTodoBtn = document.getElementById("todo-btn");
const addTimerBtn = document.getElementById("timer-btn");
const addCopyBtn = document.getElementById("copy-btn");
const addCalendarBtn = document.getElementById("calendar-btn");


trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newItemName = trackerForm.elements[0];
  const newItemDate = trackerForm.elements[1];
  //store the input values
  // console.log(newItemName);
  //create a new item div
  const newItemDiv = document.createElement("div");
  newItemDiv.classList.add("item");
  const newItemTrackerDiv = document.createElement("div");
  newItemTrackerDiv.classList.add("item__tracker");
  const itemName = document.createElement("p");
  itemName.textContent = newItemName.value;
  const itemDate = document.createElement("p");
  itemDate.textContent = newItemDate.value;

  newItemDiv.appendChild(newItemTrackerDiv);
  newItemTrackerDiv.appendChild(itemName);
  newItemTrackerDiv.appendChild(itemDate);
  //
  const firstItemdiv =
    trackerForm.closest("div.add-new-item").nextElementSibling;
  const itemsDiv = firstItemdiv.parentElement;
  // console.log(trackerForm.classList);
  itemsDiv.insertBefore(newItemDiv, firstItemdiv);
  closeForm(trackerForm);
  emptyInputs(newItemName, newItemDate);
  // insertBefore(newItemDiv, trackerForm.closest('div.add-new-item').
  // nextElementSibling.firstChild)
});

functionsContainer.addEventListener("click", (event) => {
  //listens for a click on the functions container
  const clickedElement = event.target.closest("div");
  //clickedElement is the div with the title of the function ("tracker, to-do")
  const targetElement = clickedElement.nextElementSibling;
  //target element is the div.content
  if (targetElement === null || !targetElement.classList.contains("content"))
    return;


  const fnctFormDiv = targetElement.children[0].children[0];
// the first children[0] is the "inner" div, and its children[0] is the ALWAYS the FORM
// which is hidden by default 

  if (event.target.classList.contains("add-new")) {
    targetElement.classList.add("is-open");
//if the "Add new" button is clicked it'll show the current list of items of the div, if any

    //show the corresponding form
    if (event.target.matches(".btn__tracker")) {
      fnctFormDiv.style.display = "block";
    }
    if (event.target.matches(".btn__todo")) {
      fnctFormDiv.style.display = "block";
    }
    if (event.target.matches(".btn__timer")) {
      fnctFormDiv.style.display = "block";
    }
    if (event.target.matches(".btn__copy")) {
      fnctFormDiv.style.display = "block";
    }
    if (event.target.matches(".btn__calendar")) {
      fnctFormDiv.style.display = "block";
    }

    return;
  }

//if the title div is clicked while the form is open it'll close and hide it
  targetElement.classList.toggle("is-open");
  closeForm(fnctFormDiv)
  // fnctFormDiv.style.display = "none";
});










function closeForm(typeofform) {
  const close = typeofform.closest("div.add-new-item");
  close.style.display = "none";
}

function emptyInputs(input, input2) {
  input.value = "";
  input2.value = "";
}





////////////////////////////////////////////////////////////////////
let title = "Meu aaa1";
window.electronAPI.setTitle(title);

const btn = document.querySelector(".test-btn");
const filePathElement = document.getElementById("filePath");
btn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

const counter2 = document.getElementById("counter2");
window.electronAPI.onUpdateCounter((event, value) => {
  const oldValue = Number(counter2.innerText);
  const newValue = oldValue + value;
  counter2.innerText = newValue;
  event.sender.send("counter-value", newValue);
});

const counter = (document.getElementById(
  "counter"
).innerHTML = `This app is usging Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), and Elctron (v${versions.electron()})`);

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

func();


const themeSrc = document.getElementById('theme-src')
const toggleDarkbtn = document.getElementById('toggle-dark-mode')
const resetBtn = document.getElementById('reset')

toggleDarkbtn.addEventListener('click', async() => {
  const isDarkMode = await window.darkMode.toggle()
  console.log(isDarkMode);
  themeSrc.innerHTML = isDarkMode ? 'Dark' : "Light";
})

resetBtn.addEventListener('click', async() => {
    await window.darkMode.system()
    themeSrc.innerHTML = 'System'
})




/////////////////////////////////////////////////////////////////////////