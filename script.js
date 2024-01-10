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
const editTask = document.getElementById('edit-task-button');
const deleteTask = document.getElementById('delete-task-button');

// Array which keeps a list of Strings for current tasks.
// Tasks could be transformed into objects for additional info.
const currentTasks = [];

// When the 'add-task'button' is pressed, it opens the dialog
// element "addNewTask" and prompts the user for input.
// The input is then applied to a new Task object, and saved
// in both local storage and appended to the taskList using
// innerHTML and template literals.

// 


// When promptSubmit is pressed...
// Add the name of the task to currentTasks
// create a Task element and append it to task-list innerHTML
// save currentTasks to local storage.
const addTask = (e) => {
    taskForm.innerHTML += 
    `<div class="task">
        <div id="task-info">
            <p id="task-name">${e.value}</p>
        </div>
        <div id="task-settings">
            <button id="edit-task-button" class="minimal-button"><i class="fa-solid fa-gear"></i></button>
            <button id="delete-task-button" class="minimal-button"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`
}

const cleanForm = () => {
    taskForm.reset();
    addNewTask.close();
}


// Button event listeners
addTaskBtn.addEventListener('click', () => {
    addNewTask.showModal();
});

promptCancel.addEventListener('click', () => {
    cleanForm();
});

promptSubmit.addEventListener('click', (e) => {
    addTask();
    cleanForm();
});

