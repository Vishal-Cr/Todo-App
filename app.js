const todoInput=document.getElementById('input');
const todoList=document.getElementById('todo_List');
const todoFilter = document.querySelector(".todo-filter");
const activeTodos = document.querySelector(".active-stats");
const themeImage = document.querySelector(".image");
const container = document.getElementById("#todo_List");
const body = document.querySelector(".whole-page");
const inputContainer = document.querySelector(".input_container");
const todosContainer = document.querySelector(".todo-list-container");
const buttons = document.querySelectorAll(".btn");
todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo(event);
    todoInput.value = "";
  }
});
let counter = 0;

const addTodo = (event) => {
  if (event.target.value.length > 0) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-div");
    todoContainer.setAttribute("draggable", true);
    todoContainer.classList.add("draggable");

    const circle = document.createElement("div");
    circle.classList.add("todo-circle");
    todoContainer.appendChild(circle);

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-list");
    todoContainer.appendChild(newTodo);

    const cross = document.createElement("img");
    cross.src = "./images/icon-cross.svg";
    cross.classList.add("img-cross");
    todoContainer.appendChild(cross);

    todoList.appendChild(todoContainer);
    counter += 1;
    setCounter(counter);
    todoContainer.addEventListener("click", (event) => {
      const item = event.target;

      if (item.classList[0] === "todo-circle") {
        circle.classList.toggle("checked");
        todoContainer.classList.toggle("checked");
        newTodo.classList.toggle("checked");
      }
      if (item.classList[0] === "todo-list") {
        circle.classList.toggle("checked");

        todoContainer.classList.toggle("checked");
        newTodo.classList.toggle("checked");
      }

      if (item.classList[0] === "img-cross") {
        const classStore = item.classList[0];

        const todo = item.parentElement;
        counter -= 1;
        todo.remove();
        setCounter(counter);
      }
    });
  }

  let dragSense = false;
  for (let i = 0; i < todoList.childNodes.length; i++) {
    if ((todoList.childNodes[i].className = "draggable")) {
      dragSense = true;
      break;
    }
  }
  if (dragSense) {
    setDraggable();
  }
};

function setCounter(itemLeft) {
  activeTodos.innerText = itemLeft + " " + "Left";
}

//Todo Filter
todoFilter.addEventListener("click", (e) => {
  const todos = Array.from(todoList.children);

  let arr = [];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "clear":
        if (todo.classList.contains("checked")) {
          arr.push(todo.classList.contains("checked"));

          todo.remove();
        } else {
          todo.style.display = "flex";
        }
    }
  });

  counter = counter - arr.length;
  setCounter(counter);
  arr = [];
});

//Draggable and Dropable Events
function setDraggable() {
  const draggableItems = document.querySelectorAll(".draggable");
  draggableItems.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(todoList, e.clientY);

    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      todoList.appendChild(draggable);
    } else {
      todoList.insertBefore(draggable, afterElement);
    }
  });
}
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//Theme Switcher:-

themeImage.addEventListener("click", () => {
  themeImage.classList.toggle("light");
  body.classList.toggle("light-bg");
  inputContainer.classList.toggle("light-bg");
  todoInput.classList.toggle("light-bg");
  todosContainer.classList.toggle("light-bg");
  todoList.classList.toggle("light-bg");
  todoFilter.classList.toggle("light-bg");
  buttons.forEach((item) => item.classList.toggle("light-bg"));
});