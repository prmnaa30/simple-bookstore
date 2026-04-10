const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const todoTextInput = document.getElementById('todo-text-input');
const colorRadios = document.querySelectorAll('input[type="radio"][name="color"]');
const addTodoButton = document.querySelector('.add-todo-btn'); 
const todoListContainer = document.querySelector('.todo-list-container');
const sortAscendingButton = document.querySelector('.sort-ascending');
const sortDescendingButton = document.querySelector('.sort-descending');
const searchInput = document.querySelector('.search-input');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos(listToRender = todos) {
    todoListContainer.innerHTML = '';

    if (listToRender.length === 0 && searchInput.value === '') {
        todoListContainer.innerHTML = '<p style="text-align: center; color: #777;">Tidak ada tugas yang tersedia. Tambahkan yang baru!</p>';
        localStorage.setItem('todos', JSON.stringify(todos));
        return;
    } else if (listToRender.length === 0 && searchInput.value !== '') {
        todoListContainer.innerHTML = '<p style="text-align: center; color: #777;">Tidak ditemukan tugas untuk pencarian ini.</p>';
        return;
    }

    listToRender.forEach((todo) => {
        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');
        
        todoCard.style.backgroundColor = todo.color; 
        
        const originalIndex = todos.findIndex(t => 
            t.text === todo.text && t.date === todo.date && t.time === todo.time
        );

        todoCard.innerHTML = `
            <h3>${todo.text}</h3>
            <p class="time">${todo.time}</p>
            <p class="date">${todo.date}</p>
            <button class="delete-btn" data-index="${originalIndex}"><i class="fas fa-trash-alt"></i></button>
        `;
        
        const deleteButton = todoCard.querySelector('.delete-btn');
        deleteButton.addEventListener('click', handleDelete);

        todoListContainer.appendChild(todoCard);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodo() {
    const text = todoTextInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    let color = '';

    colorRadios.forEach(radio => {
        if (radio.checked) {
            color = radio.value; 
        }
    });

    if (text && date && time && color) {
        const newTodo = {
            text: text,
            date: date,
            time: time,
            color: color
        };

        todos.push(newTodo);
        renderTodos();
        
        todoTextInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        colorRadios[0].checked = true; 
        searchInput.value = '';
    } else {
        alert('Mohon lengkapi semua field (Tugas, Tanggal, Waktu, dan Warna)!');
    }
}

function handleDelete(event) {
    const indexToDelete = event.currentTarget.dataset.index;
    
    todos.splice(indexToDelete, 1);
    
    renderTodos();
}

function sortByDateTime(order = 'ascending') {
    todos.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        if (order === 'ascending') {
            return dateA - dateB; 
        } else {
            return dateB - dateA; 
        }
    });

    renderTodos();
}

function searchTodo() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderTodos(todos);
        return;
    }

    const filteredTodos = todos.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm)
    );

    renderTodos(filteredTodos);
}

addTodoButton.addEventListener('click', createTodo); 
sortAscendingButton.addEventListener('click', () => sortByDateTime('ascending'));
sortDescendingButton.addEventListener('click', () => sortByDateTime('descending'));
searchInput.addEventListener('input', searchTodo);

renderTodos();