var tasks = [];
var count = 0;
var deleteId = null;
var editedId = null;

var addBtn = document.getElementById("addTaskButton");
var popupForm = document.getElementById("popupForm");
var cancelButton = document.getElementById("cancelButton");
var applyButton = document.getElementById("applyButton");

var confirmDeleteButton = document.getElementById("confirmDeleteButton");
var updatedTaskInput = document.getElementById("editTaskInput");
var editCloseBtn = document.getElementById("editPopupCloseBtn");
var deleteCloseBtn = document.getElementById("deletePopupCloseBtn");
var deletePopUp = document.getElementById("deletePopUpContainer");
var editPopUp = document.getElementById("editPopUp");

addBtn.addEventListener("click", () => {
  popupForm.style.display = "block";
});

cancelButton.addEventListener("click", () => {
  popupForm.style.display = "none";
});

applyButton.addEventListener("click", () => {
  var userInput = document.getElementById("noteInput");
  if (userInput.value != "") {
    popupForm.style.display = "none";
    addTask(userInput.value);
    userInput.value = "";
  } else {
    alert("Empty Note!");
  }
});
function addTask(task) {
  count++;
  tasks.push({ id: count, text: task });

  showTasks();
}

function showTasks() {
  var taskList = document.getElementById("taskList");
  taskList.className = "task-group-container";
  taskList.innerHTML = "";
  document.body.appendChild(taskList);

  tasks.forEach((item) => {
    // console.log(item, "single task");????

    var li = document.createElement("li");
    li.className = "task-container";
    li.style.display = "flex";
    li.style.flexDirection = "row";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "15px";
    li.style.width = "600px";
    li.style.height = "50px";
    li.style.border = "2px solid #6C63FF";
    li.style.borderRadius = "10px";
    taskList.appendChild(li);

    //Adding the icons container into the line container.

    var checkmarkText = document.createElement("aside");
    checkmarkText.className = "left-task-icons";
    checkmarkText.style.display = "flex";
    checkmarkText.style.flexDirection = "row";
    checkmarkText.style.alignItems = "center";
    (checkmarkText.style.gap = "10px"), li.appendChild(checkmarkText);

    // Adding the checkbox into the line container
    let checkMark = document.createElement("input");
    checkMark.id = "taskCheckbox";
    checkMark.type = "checkbox";
    checkMark.style.width = "30px";
    checkMark.style.height = "30px";
    checkmarkText.appendChild(checkMark);

    // Adding the text of the task into the line container.
    var taskText = document.createElement("p");
    taskText.className = "task-text";
    taskText.style.fontSize = "20px";
    taskText.textContent = item.text;
    checkmarkText.appendChild(taskText);
    // p=document.getElementById("noteInput");
    //Adding the icons container into the line container.

    var iconsContainer = document.createElement("div");
    iconsContainer.className = "task-icons";
    li.appendChild(iconsContainer);
    //Adding the icons to the task icon container.
    var editIcon = document.createElement("img");
    editIcon.className = "edit-icon";
    editIcon.src = "./edit-icon.svg";
    editIcon.style.width = "25px";
    editIcon.style.height = "25px";
    iconsContainer.appendChild(editIcon);
    var trashIcon = document.createElement("img");
    trashIcon.className = "trash-icon";
    trashIcon.src = "./icons/delete-icon.svg";
    trashIcon.style.width = "25px";
    trashIcon.style.height = "25px";
    iconsContainer.appendChild(trashIcon);

    trashIcon.addEventListener("click", () => {
      deleteId = item.id;
      deletePopUp.style.display = "block"; // Show delete-popup
    });

    editIcon.addEventListener("click", () => {
      updatedTaskInput.value = item.text;
      editedId = item.id;
      editPopUp.style.display = "block"; // Show edit-popup
    });
  });
}

confirmDeleteButton.addEventListener("click", () => {
  deleteTask(deleteId);
  deletePopUp.style.display = "none"; // Hide delete-popup
});

function deleteTask(deleteId) {
  tasks = tasks.filter((task) => task.id !== deleteId);
  showTasks();
}

document.getElementById("cancelDeleteButton").addEventListener("click", () => {
  deletePopUp.style.display = "none"; // Hide delete-popup
});

document.getElementById("saveEditButton").addEventListener("click", () => {
  editTask(editedId, updatedTaskInput.value);
  editPopUp.style.display = "none"; // Hide edit-popup
});

function editTask(ahmedId, ahmedText) {
  var task = tasks.find((item) => item.id == ahmedId);
  if (task) {
    task.text = ahmedText;
  }
  showTasks();
}

editCloseBtn.addEventListener("click", () => {
  editPopUp.style.display = "none";
});

deleteCloseBtn.addEventListener("click", () => {
  deletePopUp.style.display = "none";
});
