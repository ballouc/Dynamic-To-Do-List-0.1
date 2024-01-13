const listHeading = document.getElementById('list-heading');
const listName = document.getElementById('list-name');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const task = document.getElementById('task');
const addNewTask = document.getElementById('add-task-prompt');
const taskInput = document.getElementById('task-input');
const taskForm = document.getElementById('new-task-form');

const promptCancel = document.getElementById('cancel-prompt');
const promptSubmit = document.getElementById('submit-prompt');
const editBtn = document.getElementById('edit-task-button');
const deleteBtn = document.getElementById('delete-task-button');


// The task list initializes to be empty or grabs localstorage
const currentTasks = JSON.parse(localStorage.getItem("data")) || [];

// When the 'add-task'button' is pressed, it opens the dialog
// element "addNewTask" and prompts the user for input.
// The input is then applied to a new Task object, and saved
// in both local storage and appended to the taskList using
// innerHTML and template literals.

// The task we're currently focused on / pointing to
let thisTask = {};

const addOrUpdateTask = () => {

    // Find the index
    const dataArrIndex = currentTasks.findIndex((item) => item.id === thisTask.id);

    const taskObj = {
        id: `${taskInput.value.toLowerCase().split(' ').join('-')}`,
        description: taskInput.value,
    };

    // If the task is not current present
    if(dataArrIndex === -1){
        // Insert at the end
        currentTasks.unshift(taskObj);
    } else {
        // Allows us to edit already-existing tasks.
        currentTasks[dataArrIndex] = taskObj;
    }

    // Save to local storage
    localStorage.setItem("data", JSON.stringify(currentTasks));
    updateTaskContainer();
    cleanForm(); 
}

const updateTaskContainer = () => {
    taskList.innerHTML = "";

    currentTasks.forEach(({ id, description }) => {
        (taskList.innerHTML += 
            `<div class="task" id="${id}">
                <div id="task-info">
                    <p id="task-name" onclick="crossText(this)">${description}</p>
                </div>
                <div id="task-settings">
                    <button id="edit-task-button" class="minimal-button" onclick="editTask(this)"><i class="fa-solid fa-gear"></i></button>
                    <button id="delete-task-button" class="minimal-button" onclick="deleteTask(this)"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`)
    })
}

const cleanForm = () => {
    taskForm.reset();
    addNewTask.close();
}

const crossText = (e) => {
    if(e.classList.contains("strike-through")){
        e.classList.remove("strike-through");
    } else {
        e.classList.add("strike-through");
    }

}

// Button event listeners
addTaskBtn.addEventListener('click', () => {
    addNewTask.showModal();
});

promptCancel.addEventListener('click', () => {
    cleanForm();
});


const deleteTask = (buttonEl) => {
    // Find the index of the element within the currentTasks array
    const dataArrIndex = currentTasks.findIndex((item) => item.id === buttonEl.parentElement.parentElement.id);

    // Find the parent of the container and remove it
    buttonEl.parentElement.parentElement.remove();
    // In the currentTasks array, remove 1 element at the found index.
    currentTasks.splice(dataArrIndex, 1);
    // Set 'data' to store our current copy of currentTasks (overwrites)
    localStorage.setItem("data", JSON.stringify(currentTasks));
}

const editTask = (buttonEl) => {
    const dataArrIndex = currentTasks.findIndex((item) => item.id === buttonEl.parentElement.parentElement.id);
    thisTask = currentTasks[dataArrIndex];
    taskInput.value = thisTask.description;
    addNewTask.showModal();

}

// Adding an event listener to the form allows the easiest method of
// preventing page refresh and adding action to the form submit.
// (As opposed to adding a listener to the button)
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateTask();
})




