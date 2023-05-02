const functionsContainer = document.querySelector(".main-functions-container");

const addNewTracker = document.querySelector(".btn__tracker");

functionsContainer.addEventListener("click", (event) => {
  //listens for a click on the functions container
  const clickedElement = event.target.closest("div");
  //clickedElement is the div with the title of the function ("tracker, to-do")
  const targetElement = clickedElement.nextElementSibling;
  //target element is the div.content
  if (targetElement === null || !targetElement.classList.contains("content"))
    return;

  if (event.target.classList.contains("add-new")) {
    targetElement.classList.add("is-open");
    if (event.target.matches(".btn__tracker")) {
      console.log(targetElement.children[0]);
      const newItem = document.createElement("div")
      newItem.classList.add("item");
      const newItemTracker = document.createElement("div")
      newItemTracker.classList.add("item__tracker")
      const itemName = document.createElement("p");
      itemName.textContent = "O que eu digitei"
     
      newItem.appendChild(newItemTracker);
      newItemTracker.appendChild(itemName)
      targetElement.children[0].insertBefore(newItem, targetElement.children[0].firstChild)
    
    }

    return;
  }
  targetElement.classList.toggle("is-open");
});
