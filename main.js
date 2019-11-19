(function() {
  const formEl = document.querySelector("form");
  const ulEl = document.querySelector("#todo-list"); // the ul for the todolist
  const clearSelect = document.querySelector("#clearSelected");
  const clearAll = document.querySelector("#clearAll");
  const toDoArray = localStorage["storageKey"] //if "storageKey is true"
    ? JSON.parse(localStorage["storageKey"]) //then parse storagekey
    : []; // or an empty array this will save previous userinputs and avoid overwriting/erasing previous everytime page is loaded

  //event listener for new to-do function
  formEl.addEventListener("submit", createNewToDo);
  function createNewToDo(e) {
    e.preventDefault();

    //function variables
    const userInput = document.querySelector("#text-input").value; // gets user input
    const addToDoItem = document.createElement("li"); // create li

    const deleteBtn = document.createElement("button"); // create delete btn
    deleteBtn.textContent = "x"; // delete btn text
    deleteBtn.className = "delete-btn";

    const checkBox = document.createElement("input"); // create checkbox
    checkBox.setAttribute("type", "checkbox"); // checkbox attributes
    checkBox.className = "check-box";

    //add checkbox chunk
    addToDoItem.appendChild(checkBox);
    checkBox.addEventListener("click", function() {
      if (checkBox.checked) {
        addToDoItem.className = "checked-list-item";
        return;
      }
      addToDoItem.className = "unchecked-list-item";
    });

    //adding list item chink
    if (userInput == "") {
      alert("please enter something valid");
      return false;
    }
    addToDoItem.className = "list-item"; // add class to li
    addToDoItem.appendChild(document.createTextNode(userInput));
    ulEl.appendChild(addToDoItem);

    //add delete button chunk
    addToDoItem.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function() {
      addToDoItem.remove();
      removeItem(userInput);
      function removeItem(deletedItem) {
        let index = toDoArray.indexOf(deletedItem);
        toDoArray.splice(index, 1);
      }
      saveToLocalStorage();
    });

    //clear selected chunk
    clearSelect.addEventListener("click", function() {
      if (checkBox.checked == true) {
        addToDoItem.remove();
        deleteSelectedItems(userInput);

        function deleteSelectedItems(selected) {
          let selectedItems = toDoArray.indexOf(selected);
          if (selectedItems > -1) {
            toDoArray.splice(selectedItems, 1);
          }
        }
        saveToLocalStorage();
      }
    });

    //clear all chunk
    clearAll.addEventListener("click", function() {
      addToDoItem.remove();
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
      //storage variables
      const storageLiEl = document.createElement("li");
      storageLiEl.className = "list-item";

      const storageDeleteBtn = document.createElement("button");
      storageDeleteBtn.textContent = "x";
      storageDeleteBtn.className = "delete-btn";

      const storageCheckBox = document.createElement("input");
      storageCheckBox.setAttribute("type", "checkbox");
      storageCheckBox.className = "check-box";

      //storage checkboxes
      storageLiEl.appendChild(storageCheckBox);
      storageCheckBox.addEventListener("click", function() {
        if (storageCheckBox.checked) {
          storageLiEl.className = "checked-list-item";
          return;
        }
        storageLiEl.className = "unchecked-list-item";
      });

      //adding list items
      ulEl.appendChild(storageLiEl);
      storageLiEl.appendChild(document.createTextNode(item));

      //storage delete buttons
      storageLiEl.appendChild(storageDeleteBtn);
      storageDeleteBtn.addEventListener("click", function() {
        storageLiEl.remove();
        removeArrayItem(item);

        function removeArrayItem(deletedItem) {
          let index = toDoArray.indexOf(deletedItem);
          toDoArray.splice(index, 1);
        }
        saveToLocalStorage();
      });

      //clear checked items from storage
      clearSelect.addEventListener("click", function() {
        if (storageCheckBox.checked) {
          storageLiEl.remove();
          deleteStorageSelected(item);

          function deleteStorageSelected(deleteSelected) {
            let storageIndex = toDoArray.indexOf(deleteSelected);
            if (storageIndex > -1) {
              toDoArray.splice(storageIndex, 1);
            }
          }
          saveToLocalStorage();
        }
      });

      //clear all storage
      clearAll.addEventListener("click", function() {
        storageLiEl.remove();
        localStorage.clear();
      });
    });
  };
})();
