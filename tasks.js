var tasks_array = [];
tasks_array = JSON.parse(localStorage.getItem('tasks_array')) || [];

var completed_tasks_array = [];
completed_tasks_array = JSON.parse(localStorage.getItem('completed_tasks_array')) || [];

const uncompleted_tasks_container = document.getElementById("uncompleted-tasks");
const completed_tasks_container = document.getElementById("completed-tasks");
const task = document.getElementById("task");
const add_task_form = document.querySelector("#get-task");


if (tasks_array.length <= 0) {
      uncompleted_tasks_container.innerHTML += "";
}
else {
      tasks_array.map(task => {
            uncompleted_tasks_container.innerHTML += `
            <div class="d-flex justify-content-between border border-start-0 border-end-0 p-3 mx-5">
            <div class="form-check d-flex align-items-center">
            <input onclick="changeChecked(event);" class="form-check-input" type="checkbox" value="${task}">
            <label class="form-check-label mx-2">
            ${task.split('-').join(' ')}
            </label>
            </div>
            <button onclick="deleteTask(event);" class="btn btn-default del-btn">Delete</button>
            </div>
            `
      })
}

if (completed_tasks_array.length <= 0) {
      completed_tasks_container.innerHTML += "";
}
else {
      completed_tasks_array.map(task => {
            completed_tasks_container.innerHTML += `
            <div class="d-flex justify-content-between border border-start-0 border-end-0 p-3 mx-5">
            <div class="form-check d-flex align-items-center">
            <input onclick="changeChecked(event);" class="form-check-input" type="checkbox" value=${task} checked>
            <label class="form-check-label mx-2 text-muted text-decoration-line-through"
                              >
                              ${task.split('-').join(' ')}
                              </label>
                              </div>
                              <button onclick="deleteTask(event);" class="btn btn-default del-btn">Delete</button>
                              </div>
                              `
      })
}

const addTask = (e) => {
      e.preventDefault();
      tasks_array.push(task.value.split(' ').join('-'));
      localStorage.setItem('tasks_array', JSON.stringify(tasks_array));
      uncompleted_tasks_container.innerHTML += `
      <div class="d-flex justify-content-between border border-start-0 border-end-0 p-3 mx-5">
      <div class="form-check d-flex align-items-center">
      <input onclick="changeChecked(event);" class="form-check-input" type="checkbox" value="${task.value.split(' ').join('-')}">
      <label class="form-check-label mx-2">
      ${task.value.split('-').join(' ')}
      </label>
      </div>
      <button onclick="deleteTask(event);" class="btn btn-default del-btn">Delete</button>
      </div>
      `
      task.value = "";

}

const deleteTask = (e) => {
      tasks_array = JSON.parse(localStorage.getItem('tasks_array')) || [];
      completed_tasks_array = JSON.parse(localStorage.getItem('completed_tasks_array')) || [];
      if (e.target.parentElement.parentElement.id === "uncompleted-tasks") {
            if (tasks_array.length > 0 && task.value !== null) {
                  var name = e.target.parentElement.querySelector('.form-check-input').value;
                  tasks_array.splice(tasks_array.indexOf(name), 1)
                  localStorage.setItem('tasks_array', JSON.stringify(tasks_array));
            }
      }
      else {
            if (completed_tasks_array.length > 0 && task.value !== null) {
                  var name = e.target.parentElement.querySelector('.form-check-input').value;
                  completed_tasks_array.splice(completed_tasks_array.indexOf(name), 1)
                  localStorage.setItem('completed_tasks_array', JSON.stringify(completed_tasks_array));
            }
      }
      e.target.parentElement.remove()
}

const changeChecked = (e) => {
      if (e.target.checked) {
            // console.log(e.target.checked);
            completed_tasks_container.innerHTML += `
                        <div class="d-flex justify-content-between border border-start-0 border-end-0 p-3 mx-5">
                        <div class="form-check d-flex align-items-center">
                        <input onclick="changeChecked(event);" class="form-check-input" type="checkbox" value=${e.target.value} checked>
                        <label class="form-check-label mx-2 text-muted text-decoration-line-through"
                                          >
                                          ${e.target.value.split('-').join(' ')}
                                          </label>
                                          </div>
                                          <button class="btn btn-default ">Delete</button>
                                          </div>
                                          `

            if (tasks_array.includes(e.target.value)) {
                  completed_tasks_array.push(e.target.value);
                  tasks_array.splice(tasks_array.indexOf(e.target.value), 1);
                  localStorage.setItem('tasks_array', JSON.stringify(tasks_array));
                  localStorage.setItem('completed_tasks_array', JSON.stringify(completed_tasks_array));
                  e.target.parentElement.parentElement.remove();
            }

            console.log(tasks_array)
            console.log(completed_tasks_array)
      }
      else {
            // console.log('oooooooooo');
            uncompleted_tasks_container.innerHTML += `
            <div class="d-flex justify-content-between border border-start-0 border-end-0 p-3 mx-5">
            <div class="form-check d-flex align-items-center">
            <input onclick="changeChecked(event);" class="form-check-input" type="checkbox" value="${e.target.value}">
            <label class="form-check-label mx-2">
            ${e.target.value.split('-').join(' ')}
            </label>
            </div>
            <button onclick="deleteTask(event);" class="btn btn-default del-btn">Delete</button>
            </div>
            `

            if (completed_tasks_array.includes(e.target.value)) {
                  tasks_array.push(e.target.value);
                  completed_tasks_array.splice(completed_tasks_array.indexOf(e.target.value), 1);
                  localStorage.setItem('tasks_array', JSON.stringify(tasks_array));
                  localStorage.setItem('completed_tasks_array', JSON.stringify(completed_tasks_array));
                  e.target.parentElement.parentElement.remove();
            }
            console.log(tasks_array)
            console.log(completed_tasks_array)
      }
}

let dark_mode = localStorage.getItem('dark_mode')


const enableDarkMode = () => {
      document.body.classList.add('dark-mode')
      localStorage.setItem('dark_mode', 'enabled')
}

const disableDarkMode = () => {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('dark_mode', null)
}


const checkMode = (e) => {
      dark_mode = localStorage.getItem("dark_mode")
      if (e.target.checked) {
            enableDarkMode();
      }
      else {
            disableDarkMode();
      }

}

if (dark_mode === "enabled") {
      enableDarkMode();
      document.getElementById('flexSwitchCheckDefault').checked = true;
}

add_task_form.addEventListener("submit", addTask);