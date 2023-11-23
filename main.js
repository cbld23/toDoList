// Se carga el DOM 
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar elementos del DOM
    const form = document.querySelector("form"); // Formulario
    const input = document.querySelector("input"); // Campo de entrada
    const ul = document.querySelector("ul"); // Lista de tareas
    const emptyMessage = document.querySelector(".empty"); // Mensaje de tareas vacías
    const taskCount = document.querySelector(".task-count span:last-child"); // Contador de tareas

    // Función para agregar una tarea a la lista
    const addTask = (taskText) => {
        // Crear un nuevo elemento de lista (li) para la tarea
        const li = document.createElement("li");
        // Establecer el texto de la tarea en el contenido del elemento de lista
        li.textContent = taskText;

        // Crear un botón "X" para eliminar la tarea
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("btn-delete"); // Agregar la clase "btn-delete" al botón

        // Agregar un evento de clic al botón para eliminar la tarea
        deleteButton.addEventListener("click", () => {
            ul.removeChild(li); // Eliminar el elemento <li> al hacer clic en el botón "X"
            updateTaskCount(); // Actualizar el contador de tareas
            saveTasksToLocalStorage(); // Guardar las tareas en localStorage después de eliminar una tarea
        });

        // Agregar el botón "X" al elemento <li>
        li.appendChild(deleteButton);

        // Agregar el elemento <li> a la lista <ul>
        ul.appendChild(li);

        // Limpiar el campo de entrada
        input.value = "";

        // Ocultar el mensaje de tareas vacías
        emptyMessage.style.display = "none";

        // Actualizar el contador de tareas
        updateTaskCount();

        // Guardar las tareas en localStorage después de agregar una tarea
        saveTasksToLocalStorage();
    };

    // Función para eliminar una tarea de la lista
    const deleteTask = (li) => {
        ul.removeChild(li); // Eliminar el elemento <li>
        updateTaskCount(); // Actualizar el contador de tareas
        saveTasksToLocalStorage(); // Guardar las tareas en localStorage después de eliminar una tarea
    };

    // Función para actualizar el contador de tareas
    const updateTaskCount = () => {
        taskCount.textContent = ul.children.length; // Actualizar el texto del contador
        if (ul.children.length === 0) {
            emptyMessage.style.display = "block"; // Mostrar el mensaje de tareas vacías si no hay tareas
        }
    };

    // Función para guardar las tareas en localStorage
    const saveTasksToLocalStorage = () => {
        // Obtener un array de textos de tareas y guardar en localStorage
        const tasks = Array.from(ul.children).map(li => li.textContent.split('X')[0].trim());
        //split('X')[0].trim(), al actualizar pintaba una X en cada tarea
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Función para cargar las tareas desde localStorage al cargar la página
    const loadTasksFromLocalStorage = () => {
        // Obtener las tareas almacenadas en localStorage
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        // Limpiar la lista antes de cargar las tareas
        ul.innerHTML = "";

        // Agregar cada tarea almacenada a la lista
        storedTasks.forEach(taskText => addTask(taskText));
    };

    // Llamar a la función para cargar las tareas almacenadas
    loadTasksFromLocalStorage();

    // Manejador de eventos para el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText); // Agregar la tarea a la lista
        }
    });
});
