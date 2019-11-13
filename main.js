const formEl = document.querySelector("form");
const submitItem = document.querySelector("#submitBtn"); // submit button
const ulEl = document.getElementById("todo-list"); // the ul for the todolist
const clearSelect = document.querySelector("#clearSelected");
const clearAll = document.querySelector("#clearAll");
const inputArray = [];
const liAdd = document.createElement("li");
//event listener for addItem function
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
  liAdd.appendChild(checkBox);
  checkBox.addEventListener("click", function() {
    if (checkBox.checked == true) {
      liAdd.style.textDecoration = "line-through";
      return;
    }
    liAdd.style.textDecoration = "none";
  });

  formEl.reset(); // resets input text field

  //adding list item chink
  liAdd.className = "list-item"; // add class to li
  liAdd.appendChild(document.createTextNode(userInput));
  ulEl.appendChild(liAdd);

  //set local storage
  inputArray.push(userInput);
  localStorage.setItem("storageKey", JSON.stringify(inputArray));
  console.log(inputArray);

  //add button chunk
  liAdd.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function() {
    liAdd.remove();
  });

  //clear selected chunk
  clearSelect.addEventListener("click", function() {
    if (checkBox.checked == true) {
      liAdd.remove();
    }
  });

  //clear all chunk
  clearAll.addEventListener("click", function() {
    liAdd.remove();
    localStorage.clear();
  });
}

window.onload = function() {
  example = JSON.parse(localStorage.getItem("storageKey"));
  console.log(example);
  ulEl.appendChild(liAdd);
  liAdd.appendChild(document.createTextNode(example));

  for (i = 0; i < example.length; i++) {
    //console.log(example);
    //console.log(localStorage.getItem(localStorage.key(i)));
    //console.log(example.length);
    //   liAdd.appendChild(document.createTextNode(example));
    //   ulEl.appendChild(liAdd);
  }
};

// if (example === null) {
//   getStorage = [];
//   return;
// } else {
//   getStorage = localStorage.getItem("tasks");
//   liAdd.innerHTML = getStorage;
// }

//let getStorage = JSON.parse(localStorage.getItem("storageKey"));

//localStorage.removeItem("");
//array creation loop for local storage
