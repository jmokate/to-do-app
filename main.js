const formEl = document.querySelector("form");
const submitItem = document.querySelector("#submitBtn"); // submit button
const ulEl = document.getElementById("todo-list"); // the ul for the todolist
const clearSelect = document.querySelector("#clearSelected");
const clearAll = document.querySelector("#clearAll");
formEl.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  console.log("hello");
  //function variables
  const userInput = document.querySelector("#text-input").value; // gets user input
  const liAdd = document.createElement("li"); // create li

  const deleteBtn = document.createElement("button"); // create delete btn
  deleteBtn.textContent = "x"; // delete btn text

  const checkBox = document.createElement("input"); // create checkbox
  checkBox.setAttribute("type", "checkbox"); // checkbox attributes

  //add checkbox chunk
  // const checkBox = document.createElement("input");
  // checkBox.setAttribute("type", "checkbox");
  liAdd.appendChild(checkBox);
  checkBox.addEventListener("click", function() {
    if (checkBox.checked == true) {
      liAdd.style.textDecoration = "line-through";
      return;
    }
    liAdd.style.textDecoration = "none";
  });

  //adding list item chink
  // const userInput = document.querySelector("#text-input").value; // gets user input
  // const liAdd = document.createElement("li"); // create li
  liAdd.className = "list-item"; // add class to li
  liAdd.appendChild(document.createTextNode(userInput));
  ulEl.appendChild(liAdd);

  formEl.reset(); // resets text-input field

  //add button chunk
  // const deleteBtn = document.createElement("button");
  // deleteBtn.textContent = "x";
  liAdd.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function() {
    liAdd.remove();
  });

  //clear selected chunk
  clearSelect.addEventListener("click", function() {
    if (checkBox.checked == true) {
      //ulEl.removeChild(liAdd);
      liAdd.remove();
    }
  });

  //clear all chunk
  clearAll.addEventListener("click", function() {
    liAdd.remove();
  });
}
