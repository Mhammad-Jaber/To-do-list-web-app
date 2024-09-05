const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);
    
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></li>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheckEdit(e) {
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList[0] === "trash-btn") {
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        todo.classList.toggle("completed");
    }

    if (item.classList[0] === "edit-btn") {
        const todoItem = todo.querySelector(".todo-item");
        const newText = prompt("Edit your task:", todoItem.innerText);
        if (newText !== null && newText.trim() !== "") {
            updateLocalTodos(todoItem.innerText, newText);
            todoItem.innerText = newText;
        }
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></li>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodos(oldTodo, newTodo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.indexOf(oldTodo);
    if (todoIndex !== -1) {
        todos[todoIndex] = newTodo;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}