const form = document.querySelector("#form");
const task = document.querySelector("#task");
const containerTask = document.querySelector("#task-container");
let tasks = [];

eventos()
function eventos() {
	form.addEventListener("submit", taskDatos)

	containerTask.addEventListener("click", deleteTask);

	document.addEventListener("DOMContentLoaded", () => {
		tasks = JSON.parse(localStorage.getItem("task")) || []; 
		crearHTML();
	})
}

function taskDatos(e) {
	e.preventDefault();

	if (task.value.trim() !== '') {
		infoTask = {
			id:Date.now(),
			task: task.value
		}
		
		tasks = [...tasks, infoTask];
		crearHTML();
	}
}

function crearHTML() {

	containerTask.innerHTML = ''
	task.value = ''

	tasks.forEach(task => {
		const div = document.createElement("div");
		div.classList.add("task");

		div.innerHTML = `
			<p>${task.task}</p>
			<a href="#" class="task__eliminar" id=${task.id}>X</a>
		`

		containerTask.appendChild(div);
	})

		localStorage.setItem("task", JSON.stringify(tasks));
	

}

function deleteTask(e) {
	if(e.target.classList.contains("task__eliminar")){
		const id = e.target.id;
		tasks = tasks.filter(task => task.id != id);
		console.log(tasks)
		crearHTML();
	}
}
