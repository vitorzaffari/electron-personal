const parentOfTitles = document.querySelector(".main-functions-container");

const addBtn = document.querySelectorAll(".btn")










parentOfTitles.addEventListener("click", (event) => {
  //listens for a click on the function container
  const clickedElement = event.target.closest("div");
  //clickedElement is the div with the title of the function ("tracker, to-do")
  const targetElement = clickedElement.nextElementSibling;
  //target element is the div.content

  // Check if the target element is hidden and toggle it accordingly
  // console.log(clickedElement.children);

  if (targetElement === null || !targetElement.classList.contains('content')) return;
  
  if (event.target.classList.contains('add-new')){
    targetElement.classList.remove("hidden");
    targetElement.style.maxHeight = `${(targetElement.scrollHeight) + 20}px`;
    return
  }
  //Checks if the clicked div has a sibling and if that sibling has a class content
  // console.log(clickedElement.children);
  // console.log(event.target === addBtn);
  // console.log(event.target.classList.contains('btn'))

  targetElement.classList.toggle("hidden");


  targetElement.style.maxHeight = targetElement.classList.contains("hidden")
    ? "0px" : `${(targetElement.scrollHeight) + 20}px`;



  //Sets the max height to the targetElement to 0 if it contains
  //the 'hidden' class or dinamically gets the div's full height,
  //without `${targetElement.scrollHeight}px` the animation would be broken;
});

