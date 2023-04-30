const parentOfTitles = document.querySelector(".main-functions-container");











parentOfTitles.addEventListener("click", (event) => {
  // Get the clicked element and its target sibling element
  const clickedElement = event.target;
  const targetElement = clickedElement.parentElement.nextElementSibling;


  // Check if the target element is hidden and toggle it accordingly
  if (targetElement) {
    //Checks if the clicked element has a parent that has a sibling
    targetElement.classList.toggle("hidden");
    targetElement.style.maxHeight =
    targetElement.classList.contains('hidden')? "0px" : `${targetElement.scrollHeight}px`;
  }
//   } else if (!targetElement.classList.contains("hidden")) {
//     targetElement.classList.add("hidden");
//     targetElement.style.maxHeight = `0px`;
//   }
});
