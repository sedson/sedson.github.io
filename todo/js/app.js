//------------------------------------------------
// Variable for global state
//------------------------------------------------
const tasks = [];
const completedTasks = [];

//------------------------------------------------
// Changing the JS representations of tasks
//------------------------------------------------
const addTask = (task) => {
  if (task.length > 0) {
    task.split("\n").forEach(item => {
      tasks.push(item);
    });
  }
}

const doTask = (index) => {
  let task = tasks.splice(index, 1);
  completedTasks.push(task);
}

const undoTask = (index) => {
  let undoneTask = completedTasks.splice(index, 1);
  tasks.push(undoneTask);
}

const deleteTask = (index) => {
  completedTasks.splice(index, 1);
}

// Sibling index helper from ->
// https://stackoverflow.com/questions/5913927/get-child-node-index
// obviously easier in jQuery
const siblingIndex = (node) => {
  return Array.prototype.indexOf.call(node.parentNode.children, node);
}

//------------------------------------------------
// DOM functions
//------------------------------------------------
const makeTodoItem = (task, parentElem) => {
  let div = document.createElement("div");
  div.innerHTML = `<button></button><p>${task}</p>`;
  div.classList.add("todo-item");
  parentElem.appendChild(div);
}

const makeDoneItem = (task, parentElem) => {
  let div = document.createElement("div");
  div.innerHTML = `<button></button><p>${task}</p><a>delete</a>`;
  div.classList.add("done-item");
  parentElem.appendChild(div);
}

const domUpdate = () =>{
  // clear the lists
  document.querySelectorAll("#todo-list div, #completed div").forEach(item => {
    item.remove();
  });

  // rebuild the gui from the internal data
  let todo = document.querySelector("#todo-list");
  for(let task of tasks){
    makeTodoItem(task, todo);
  }
  let completed = document.querySelector("#completed");
  for(let task of completedTasks){
    makeDoneItem(task, completed)
  }
}

//------------------------------------------------
// Event handlers
//------------------------------------------------
const submit = () => {
  let input = document.querySelector("#input-box");
  addTask(input.value);
  input.value = "";
  domUpdate();
}

// Handle button when clicked from the todo list
const doTaskButtons = (event) => {
  if (event.target.tagName === "BUTTON") {
    let parentElem = event.target.parentNode;
    console.log(siblingIndex(parentElem));
    doTask(siblingIndex(parentElem) - 1); // subtract 1 because of the h1 at the beggining
    domUpdate();
  }
}

// Handle button or link when clicked from the done list
const doCompleteButtons = (event) => {
  // The link inside the div is the delete link
  if (event.target.tagName === "A") {
    let parentElem = event.target.parentNode;
    deleteTask(siblingIndex(parentElem) - 1)
    domUpdate();
    return;
  }

  if (event.target.tagName === "BUTTON") {
    let parentElem = event.target.parentNode;
    undoTask(siblingIndex(parentElem) - 1)
    domUpdate();
  }
}

//------------------------------------------------
// Add listeners on document ready
//------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#submit").addEventListener("click", submit);
  document.querySelector("#todo-list").addEventListener("click", doTaskButtons);
  document.querySelector("#completed").addEventListener("click", doCompleteButtons);
});
