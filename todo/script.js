//variables
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//functions
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",check);
filterOption.addEventListener("click",filterTodo);


//adding a to do item
function addTodo(event){
    event.preventDefault();
    const todoDiv= document.createElement("div");
    //to do div
    todoDiv.classList.add("todo");
    //to do li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add to local storage
    saveToLocal(todoInput.value);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'> </i>";
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'> </i>";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //append to list
    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function check(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === "delete-button"){
        item.parentElement.classList.add("fall");
        removeTodos(item.parentElement);
        todoList.addEventListener("transitionend",function(){
            item.parentElement.remove();
        });
        
    }

    if(item.classList[0] === "complete-button"){
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else{
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveToLocal(todo){
    //check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        event.preventDefault();
        const todoDiv= document.createElement("div");
        //to do div
        todoDiv.classList.add("todo");
        //to do li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'> </i>";
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);
        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'> </i>";
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);
        //append to list
        todoList.appendChild(todoDiv);
    })
}

function removeTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}