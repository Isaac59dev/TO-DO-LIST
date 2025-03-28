// Evento para adicionar tarefa ao clicar no botão
document.getElementById('addTaskButton').addEventListener('click', addTask);
// Evento para adicionar tarefa ao pressionar Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// Carrega tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Ordenar tarefas em ordem alfabética
    tasks.sort((a, b) => a.text.localeCompare(b.text));

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        li.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
                <span class="checkbox-custom"></span>
            </label>
            <span>${task.text}</span>
            <span class="delete" onclick="deleteTask(${task.id})">🗑️</span>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderiza as tarefas ao carregar a página
renderTasks();
