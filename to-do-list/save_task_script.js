document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText) {
        var taskList = document.getElementById('taskList');
        var li = document.createElement('li');
        li.textContent = taskText;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
            numberTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = '';
        saveTasks();
        numberTasks();
    }
});

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('taskList');

    tasks.forEach(function(taskText) {
        var li = document.createElement('li');
        li.textContent = taskText;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
            numberTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    });

    numberTasks();
}

function saveTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = [];

    taskList.querySelectorAll('li').forEach(function(li) {
        tasks.push(li.firstChild.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function numberTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = taskList.querySelectorAll('li');

    tasks.forEach(function(task, index) {
        task.firstChild.textContent = (index + 1) + '. ' + task.firstChild.textContent.replace(/^\d+\.\s*/, '');
    });
}