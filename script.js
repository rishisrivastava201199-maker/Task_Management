
let tasks = [];
let editId = null;


const form = document.getElementById("task-form");

const taskInput = document.getElementById("task-input");

const taskDescription = document.getElementById("task-description");

const taskPriority = document.getElementById("task-priority");

const taskList = document.getElementById("task-list");

const submitBtn = document.getElementById("submit-btn");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = taskInput.value.trim();

    const description = taskDescription.value.trim();

    const priority = taskPriority.value;


  

    if (editId === null) {

        const task = {

            id: Date.now(),

            name: name,

            description: description,

            priority: priority

        };

        tasks.push(task);

    }



    else {

        const task = tasks.find(function (task) {

            return task.id === editId;

        });


        if (task) {

            task.name = name;

            task.description = description;

            task.priority = priority;

        }


        editId = null;

        submitBtn.textContent = "Add Task";

    }


   

    displayTasks();


   

    form.reset();

});




function displayTasks() {

    taskList.innerHTML = "";


    tasks.forEach(function (task) {

        const taskCard = document.createElement("div");

        taskCard.className = "task-card";


        taskCard.innerHTML = `

            <h3>${task.name}</h3>

            <p>${task.description}</p>

            <p class="priority">
                Priority: ${task.priority}
            </p>

            <div class="task-buttons">

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });

}



function editTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });


    if (!task) {
        return;
    }


    taskInput.value = task.name;

    taskDescription.value = task.description;

    taskPriority.value = task.priority;


    editId = id;

    submitBtn.textContent = "Update Task";

}




function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


   
    if (editId === id) {

        editId = null;

        submitBtn.textContent = "Add Task";

        form.reset();

    }


    displayTasks();

}

