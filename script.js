const form = document.getElementById("form");
const input = document.getElementById("todo");
const todoList = document.getElementById("todo-list");
const hideBtn = document.getElementById("hide-btn");
const showCompletedBtn = document.getElementById("completed");
const allBtn = document.getElementById("all");
const count = document.getElementById("count");

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
  setTodosToLS(todos);
  updateUI();
  updateCount()
};

//reset Fields
const resetState = () => {
  input.value = "";
  todoList.innerHTML = "";
};

//create todo Element
const createTodoElement = (todo) => {
  const { id, todoName, checked } = todo;
  return `
    <li class="todo__list-item" onclick="handleCheckTodo('${id}')" data-id="${id}">
      <div class="todo__list-checkbox">
        <input type="radio" class="check" ${checked ? "checked" : ""} data-id="${id}">
        <span class="geekmark"></span>
      </div>
      <span class="todo__list-title ${checked ? "active" : "false"}" data-id="${id}">${todoName}</span>
      <button onclick='handleDeleteTodo(event,"${id}")' type="button" class="delete">
        <img src="images/icon-cross.svg" class="delete">
      </button>
    </li>
  `;
};


//update UI
const updateUI = () => {
  resetState();
  todos.forEach((todo) => {
    const element = createTodoElement(todo)
    todoList.insertAdjacentHTML("afterbegin", element);
  });
};
const handleCheckTodo = (id) => {
  const selectedTodo = todos.find((item) => item.id === id);
  selectedTodo.checked = !selectedTodo.checked;
  updateUI();
  updateCount();
  setTodosToLS();
};

//delete selected todo
const handleDeleteTodo = (event, id) => {
  event.stopPropagation();
  todos = todos.filter((item) => item.id !== id);
  updateUI();
  updateCount();
  setTodosToLS();
};

//get todos from Local Storage

const filterAndShowTodos = (filterFn) => {
  const todosFromLs = getAllTodosFromLs();
  const filteredTodos = todosFromLs.filter(filterFn);
  todos = filteredTodos;
  updateUI()
}

const hideCompletedTodos = () => {
  filterAndShowTodos(item => !item.checked)
};


const showCompletedTodos = () => {
  const todosFromLs = getAllTodosFromLs();
  showCompletedBtn.classList.add("active");
  allBtn.classList.remove("active");

  filterAndShowTodos(item => item.checked)
};
const showAllTodos = () => {
  todos = getAllTodosFromLs();
  updateUI();
  showCompletedBtn.classList.remove("active");
  allBtn.classList.add("active");
};
const updateCount = () => {
  const undone = todos.filter((item) => !item.checked).length;
  count.innerHTML = `${undone} items left`;
};

const getAllTodosFromLs = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
const setTodosToLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

form.addEventListener("submit", addTodo);
allBtn.addEventListener("click", showAllTodos);
hideBtn.addEventListener("click", hideCompletedTodos);
showCompletedBtn.addEventListener("click", showCompletedTodos);


//get initial Todos from LS
window.addEventListener("DOMContentLoaded", function () {
  todos = getAllTodosFromLs();
  updateUI();
  updateCount();
});