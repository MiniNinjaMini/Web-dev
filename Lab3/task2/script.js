
  const form = document.getElementById('todoForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') {
      return;
    }

    const listItem = document.createElement('li');

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    checkbox.addEventListener('change', function () {
      textSpan.classList.toggle('done');
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '🗑';

    deleteButton.addEventListener('click', function () {
      taskList.removeChild(listItem);
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(textSpan);

    listItem.appendChild(taskContainer);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = '';
  });
