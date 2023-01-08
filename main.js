const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);

function addToDo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    saveLocalToDos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-regular fa-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-poo"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);

    todoInput.value = "";
}


function deleteCheck(e){
  const item = e.target;

  if (item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    
    todo.classList.add("fall");

    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
      todo.remove();
    });
  }

  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    
    todo.classList.toggle("completed");
    todo.addEventListener('completed', function(){
      editButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    });
  }
}

function saveLocalToDos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;

  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);


    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-regular fa-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-poo"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;

  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
