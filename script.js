const start = document.querySelector('#start');
const proceed = document.querySelector('#proceed');
const createTask = document.querySelector('#create-task');
const newTask = document.querySelector('#new-task');
const taskCount = document.querySelector('#task-count');

const overlay = document.querySelector('#overlay');
const userPrompt = document.querySelector('#user-prompt');

const user = document.querySelector('#user');
const userName = document.querySelector('#user-name');

const home = document.querySelector('#home');
const app = document.querySelector('#app');

const tasks = [];

start.addEventListener('click', function () {
	togglePrompt(userPrompt);
});

overlay.addEventListener('click', function () {
	overlay.style.display = 'none';
	let allModals = document.querySelectorAll('.prompt');
	allModals.forEach((modal) => {
		modal.style.display = 'none';
	});
});

proceed.addEventListener('click', function () {
	home.style.display = 'none';
	app.style.display = 'block';
	togglePrompt(userPrompt);
	displayUser(user.value);
	displayTask();
	taskCount.textContent = tasks.length;
});

createTask.addEventListener('click', function () {
	togglePrompt(newTask);
});

const taskName = document.querySelector('#task');
const save = document.querySelector('#save');

save.addEventListener('click', function () {
	const taskInput = taskName.value;
	tasks.push(taskInput);
	taskCount.textContent = tasks.length;

	togglePrompt(newTask);
	taskName.value = '';
	displayTask();
});

// Delete Task
// Event delegation for dynamically added delete buttons
document.querySelector('#tasks-list').addEventListener('click', function (event) {
	if (event.target.classList.contains('delete')) {
		const taskId = event.target.dataset.id;
		deleteTask(taskId);
	}
});

// Finish Task
// Event delegation for dynamically added delete buttons
document.querySelector('#tasks-list').addEventListener('click', function (event) {
	if (event.target.classList.contains('checkbox')) {
		const checkboxElement = event.target;
		const taskTextElement = checkboxElement.nextElementSibling; // Get the next sibling element (span) which contains the task text

		checkboxElement.classList.toggle('checked');
		taskTextElement.classList.toggle('checked');

		let checkedTask = 0;
		document.querySelectorAll('.checkbox').forEach(function (task) {
			if (task.classList.contains('checked')) {
				checkedTask++;
			}
		});
		taskCount.textContent = tasks.length - checkedTask;
	}
});

function displayTask() {
	let lists = '';
	tasks.forEach(function (task, index) {
		lists += `
					<li class="item">
						<span class="checkbox"></span>
						<span class="task-text">${task}</span>
						<span class="delete" data-id="${index}">&times;</span>
					</li>
		`;
	});
	document.querySelector('#tasks-list').innerHTML = lists;
}

function deleteTask(id) {
	tasks.splice(id, 1);
	displayTask();
	taskCount.textContent = tasks.length;
}

function finishTask(id) {}

function togglePrompt(modal) {
	if (getComputedStyle(overlay).display === 'none') {
		overlay.style.display = 'block';
		modal.style.display = 'block';
	} else {
		overlay.style.display = 'none';
		modal.style.display = 'none';
	}
}

function displayUser(name) {
	if (name === '') {
		name = 'User';
	} else {
		name = name;
	}
	userName.textContent = name;
}

function updateDateTime() {
	// Get the current date and time
	const now = new Date();

	// Extract individual components
	let hours = now.getHours();
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const period = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12 || 12; // Convert to 12-hour format
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = now.getFullYear();

	// Update the HTML element with the formatted date and time
	document.getElementById('date-time').innerHTML = `
        <p>${hours}:${minutes}:${seconds} <span>${period}</span></p>
        <p>${getDayOfWeek(now)}, ${day} ${getMonthName(month)} ${year}</p>
    `;
}

function getDayOfWeek(date) {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[date.getDay()];
}

function getMonthName(month) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return months[Number(month) - 1];
}

// Call the function once to update the date and time immediately
updateDateTime();

// Update the date and time every second (1000ms)
setInterval(updateDateTime, 1000);
