
const functionsContainer = document.querySelector(".main-functions-container");
const trackerForm = document.getElementById("tracker-form");









trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();
    const newItemName = trackerForm.elements[0];
    const newItemDate = trackerForm.elements[1];
    //store the input values
    console.log(newItemName);
    //create a new item div
    const newItemDiv = document.createElement('div');
    newItemDiv.classList.add('item')
    const newItemTrackerDiv = document.createElement('div')
    newItemTrackerDiv.classList.add('item__tracker')
    const itemName = document.createElement('p')
    itemName.textContent = newItemName.value;
    const itemDate = document.createElement('p')
    itemDate.textContent = newItemDate.value;

    newItemDiv.appendChild(newItemTrackerDiv)
    newItemTrackerDiv.appendChild(itemName)
    newItemTrackerDiv.appendChild(itemDate)
    // 
    const firstItemdiv = trackerForm.closest('div.add-new-item').nextElementSibling
    const itemsDiv = firstItemdiv.parentElement
    // console.log(trackerForm.classList);
    itemsDiv.insertBefore(newItemDiv, firstItemdiv)
    closeForm(trackerForm)
    emptyInputs(newItemName, newItemDate)
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
    const addNewTrackerForm = targetElement.children[0].children[0]

    if (event.target.classList.contains("add-new")) {
      targetElement.classList.add("is-open");
      if (event.target.matches(".btn__tracker")) {
      addNewTrackerForm.style.display = "block"
    }

    return;
  }
  targetElement.classList.toggle("is-open");
  addNewTrackerForm.style.display = "none"

});



function closeForm(typeofform){
  const close = typeofform.closest('div.add-new-item')
  close.style.display = 'none';
}

function emptyInputs(input, input2){
  input.value = '';
  input2.value = '';
}

