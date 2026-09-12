let todoArr = [
    { id: 1, task: "Finish HW", done: false },
    { id: 2, task: "Revise Notes", done: false }
];

const todoForm = document.querySelector("#todo-form"); // input + addButton
const todoInput = document.querySelector("#todo-input"); // input
const todoBtn = document.querySelector("#todo-btn"); // input
const todoList = document.querySelector("#todo-list"); // ul
const taskCount = document.querySelector("#task-count"); // My tasks
const completedTasks = document.querySelector("#completed-tasks"); // Completed
const cancelUpdBtn = document.querySelector("#cancel-upd-btn"); // Completed


function pushTaskInArr(taskId, taskName) {
    const id = taskId;
    let task = taskName;
    let done = false;
    todoArr.push({ id, task, done });
    taskCount.textContent = `MY TASKS (${todoArr.length})`;
};

function dltTaskFromArr(taskId) {
    todoArr = todoArr.filter(todo => {
        if (todo.id !== Number(taskId)) return todo;
    });
    taskCount.textContent = `MY TASKS (${todoArr.length})`;
};

function toggleTaskStatusInArr(taskId) {
    todoArr = todoArr.map(todo => {
        if (todo.id === Number(taskId)) todo.done = !todo.done;
        return todo;
    });
};

function updateTaskInArr(taskId, taskName) {
    todoArr = todoArr.map(todo => {
        if (todo.id === Number(taskId)) todo.task = taskName;
        return todo;
    });
};

function createLi(taskId, taskName) {
    const li = document.createElement("li");
    li.dataset.id = taskId;
    li.className = "flex gap-2.5 items-center border border-slate-300 rounded-lg pl-4 pr-3 py-2";
    li.innerHTML = `<input class="h-4 w-4 accent-indigo-500" type="checkbox" name="" id="">
                    <p class="flex-1 cursor-default">${taskName}</p>
                    <button class="bg-green-400 rounded-md p-3 py-1.5 text-xs text-white cursor-pointer">Edit</button>
                    <button class="bg-red-400 rounded-md px-3 py-1.5 text-xs text-white cursor-pointer">Delete</button>`;
    console.log(li);
    todoList.append(li);
};

function toggleLi(checkbox, todo, text) {
    console.log(checkbox.checked);
    checkbox.checked = !checkbox.checked;
    console.log(checkbox.checked);
    todo.classList.toggle("bg-slate-200");
    todo.classList.toggle("text-slate-400");
    text.classList.toggle("line-through");
    completedTasks.textContent = `COMPLETED : ${todoArr.filter(todo => todo.done).length}`;
};

function updateLi(taskId, taskName) {
    const todos = todoList.querySelectorAll("li");
    // const todos = [...liNodeList];
    todos.forEach(todo => {
        // console.log(todo.dataset.id);
        // console.log(Number(taskId));
        if (todo.dataset.id === taskId) {
            const p = todo.querySelector("p");
            p.textContent = taskName;
        };
    })
};

function removeLi(todo) {
    todo.remove();
    completedTasks.textContent = `COMPLETED : ${todoArr.filter(todo => todo.done).length}`;

};

function renderExistingLi() {
    todoArr.forEach(todo => createLi(todo.id, todo.task));
    taskCount.textContent = `MY TASKS (${todoArr.length})`;
    completedTasks.textContent = `COMPLETED : ${todoArr.filter(todo => todo.done).length}`;
};

function startUpdate(taskId) {
    const todo = todoArr.find(todo => todo.id === Number(taskId));
    todoInput.value = todo.task;
    todoBtn.textContent = "Update";
    todoBtn.classList.remove("bg-violet-500");
    todoBtn.classList.add("bg-orange-500");
    cancelUpdBtn.classList.remove("hidden");
};

function cancelUpdate() {
    updateId = 0;
    todoInput.value = "";
    todoBtn.textContent = "Add";
    todoBtn.classList.add("bg-violet-500");
    todoBtn.classList.remove("bg-orange-500");
    cancelUpdBtn.classList.add("hidden");
};


let updateId = 0;
renderExistingLi();


todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Date.now();
    let task = todoInput.value.trim();

    if (!task) return;

    if (updateId) {
        updateTaskInArr(updateId, task);
        updateLi(updateId, task);
        // updateId = 0;
        cancelUpdate();
        console.log("Updated");
        console.log(todoArr);

    } else {
        pushTaskInArr(id, task);
        createLi(id, task);
        console.log(todoArr);
    };
});


todoList.addEventListener("click", (e) => {
    const btn = e.target.closest("button"); //btn
    const todo = e.target.closest("li"); //li
    const id = todo?.dataset.id;
    const checkbox = todo?.querySelector("input"); //checkbox
    const text = todo?.querySelector("p"); //p

    
    if (todo && !btn) { // todo list item or checkbox clicked
        if (e.target === checkbox) checkbox.checked = !checkbox.checked;
        toggleTaskStatusInArr(id);
        toggleLi(checkbox, todo, text);
        console.log(todoArr);
    };

    if (btn?.textContent === "Edit") { // edit button clicked
        startUpdate(id);
        updateId = id;
        console.log("Editing");
    };

    if (btn?.textContent === "Delete") { // delete button clicked
        dltTaskFromArr(id);
        removeLi(todo);
        console.log("Deleted");
        console.log(todoArr);
    };
});


cancelUpdBtn.addEventListener("click", (e) => {
    cancelUpdate();
})