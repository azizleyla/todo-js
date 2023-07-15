const form = document.getElementById("form");
const input = document.getElementById("todo");
const todoList = document.getElementById("todo-list");
const hideBtn = document.getElementById("hide-btn");
const showCompletedBtn = document.getElementById("completed");
const allBtn = document.getElementById("all");

//declare todos
let todos = [];

//create new todo
const addTodo = (e) => {
  e.preventDefault();

  const inputValue = input.value;
  const todo = {
    id: crypto.randomUUID(),
    checked: false,
    todoName: inputValue,
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateTodos(todos);
};

//reset Fields
const resetState = () => {
  input.value = "";
  todoList.innerHTML = "";
};

//update UI
const updateTodos = (todos) => {
  resetState();
  console.log("tt", todos);
  todos.forEach((todo) => {
    const { todoName, id, checked } = todo;
    let element = `
           <li class="todo__list-item" onclick="handleCheckTodo('${
             todo.id
           }')" data-id="${id}">
        <div class="todo__list-checkbox">
        <input type="radio" class="check"  ${
          checked ? "checked" : ""
        }  data-id="${id}">
        <span class="geekmark"></span>
        </div>
          <span class="todo__list-title ${
            checked ? "active" : "false"
          }" data-id="${id}">${todoName}</span>
         
            <button  onclick='handleDeleteTodo(event,"${
              todo.id
            }")' type="button" class="delete">
            <img src="images/icon-cross.svg" class="delete" data-id="${
              todo.id
            }">
            </button>
       </li>
        `;

    todoList.insertAdjacentHTML("afterbegin", element);
  });
};
const handleCheckTodo = (id) => {
  const selectedTodo = todos.find((item) => item.id === id);
  selectedTodo.checked = !selectedTodo.checked;

  updateTodos(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};

//delete selected todo
const handleDeleteTodo = (event, id) => {
  event.stopPropagation();
  todos = todos.filter((item) => item.id !== id);
  updateTodos(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};
form.addEventListener("submit", addTodo);

//get todos from Local Storage
const getAllTodosFromLs = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
//get initial Todos from LS
window.addEventListener("DOMContentLoaded", function () {
  const todosFromLs = getAllTodosFromLs();
  updateTodos(todosFromLs);
  todos = todosFromLs;
});
let isFlag = false;

const hideCompletedTodos = () => {
  const todosFromLs = getAllTodosFromLs();

  let filteredTodos = todosFromLs.filter((item) => !item.checked);
  updateTodos(filteredTodos);
  todos = filteredTodos;
};

const showCompletedTodos = () => {
  const todosFromLs = getAllTodosFromLs();
  let filteredTodos = todosFromLs.filter((item) => item.checked);
  updateTodos(filteredTodos);
  todos = filteredTodos;
};
const showAllTodos = () => {
  todos = getAllTodosFromLs();
  updateTodos(todos);
};

allBtn.addEventListener("click", showAllTodos);
hideBtn.addEventListener("click", hideCompletedTodos);

showCompletedBtn.addEventListener("click", showCompletedTodos);
