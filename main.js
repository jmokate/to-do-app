const formEl = document.querySelector("form");
const submitItem = document.querySelector("#submitBtn"); // submit button
const ulEl = document.getElementById("todo-list"); // the ul for the todolist
const clearSelect = document.querySelector("#clearSelected");
const clearAll = document.querySelector("#clearAll");
const toDoArray = localStorage["storageKey"] //if "storageKey is true"
  ? JSON.parse(localStorage["storageKey"]) //then parse storagekey
  : []; // this will save previous userinputs and avoid overwriting/erasing previous everytime page is loaded

const liAdd = document.createElement("li");
const checkBox = document.createElement("input"); // create checkbox
checkBox.setAttribute("type", "checkbox");
const deleteBtn = document.createElement("button"); // create delete btn
deleteBtn.textContent = "x";
const userInput = document.querySelector("#text-input").value; // gets user input

//event listener for new to-do function
formEl.addEventListener("submit", createNewToDo);
function createNewToDo(e) {
  e.preventDefault();
  // console.log("hello");
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

  //adding list item chink
  liAdd.className = "list-item"; // add class to li
  liAdd.appendChild(document.createTextNode(userInput));
  ulEl.appendChild(liAdd);

  //add delete button chunk
  liAdd.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function() {
    liAdd.remove();
    removeItem(userInput);
    function removeItem(deletedItem) {
      let index = toDoArray.indexOf(deletedItem);
      toDoArray.splice(index, 1);

      console.log(deletedItem);
      console.log(index);
      console.log(toDoArray);
    }
    localStorage.setItem("storageKey", JSON.stringify(toDoArray));
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

  formEl.reset(); // resets input text field

  //set local storage
  toDoArray.push(userInput);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("storageKey", JSON.stringify(toDoArray));
}

// retreieve storage on window load
window.onload = function() {
  const savedStorage = JSON.parse(localStorage.getItem("storageKey")) || [];

  savedStorage.forEach(function(item) {
    let storageArray = [];
    storageArray.push(savedStorage); ///this was the last thing done - maybe fix?

    let storageLiEl = document.createElement("li");
    let storageDeleteBtn = document.createElement("button");
    storageDeleteBtn.textContent = "x";
    let storageCheckBox = document.createElement("input"); // create checkbox
    storageCheckBox.setAttribute("type", "checkbox");

    ulEl.appendChild(storageLiEl);

    storageLiEl.appendChild(document.createTextNode(item));
    storageLiEl.appendChild(storageCheckBox);
    storageCheckBox.addEventListener("click", function() {
      //debugger;
      if (storageCheckBox.checked == true) {
        storageLiEl.style.textDecoration = "line-through";
        //saveToLocalStorage();
        return;
      }
      liAdd.style.textDecoration = "none";
      //saveToLocalStorage();
    });
    storageLiEl.appendChild(storageDeleteBtn);

    storageDeleteBtn.addEventListener("click", function() {
      storageLiEl.remove();
      removeArrayItem(item);

      function removeArrayItem(deletedItem) {
        // debugger;
        //pass in to-do item text in deleted parameter
        //use indexOf array method to return items index check
        //store item index in a variable
        //then splice
        let index = storageArray.indexOf(deletedItem);
        storageArray.splice(index, 1);
        //localStorage.setItem("storageKey", JSON.stringify(storageArray));
        console.log(deletedItem);
        console.log(index);
        console.log(storageArray);
      }
      localStorage.setItem("storageKey", JSON.stringify(storageArray));
    });
    //CLEAR ALL SELECTED FROM LOCAL STORAGE
    clearSelect.addEventListener("click", function() {
      //debugger;
      if (storageCheckBox.checked == true) {
        storageLiEl.remove();
        removeArraySelected(item);

        function removeArraySelected(deleteSelected) {
          let multipleIndex = storageArray.indexOf(deleteSelected);
          if (deleteSelected !== -1) {
            storageArray.splice(multipleIndex, 1);
            localStorage.setItem("storageKey", JSON.stringify(storageArray));
            console.log(deleteSelected);
            console.log(multipleIndex);
            console.log(storageArray);
          }
        }
      }
    });

    clearAll.addEventListener("click", function() {
      storageLiEl.remove();
      localStorage.clear();
    });
  });
};

// function deleteStorageItem() {
//   let storageArray = savedStorage;

//   storageArray.forEach(item => {
//     let arrayItem = item;
//     if (arrayItem == item) storageArray.splice(item, 1);
//     storageArray.splice(item);

//     console.log(storageArray);
//     console.log(arrayItem);
//   });
// }
