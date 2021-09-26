const todoForm = document.getElementById('todo-form')
const addInput = document.getElementById('add-input')
const todoList = document.getElementById('todo-list')
const todoItems = document.querySelectorAll('.todo-item')

main()

function main() {
    todoForm.addEventListener('submit', addTodoItem)
    todoItems.forEach(item => bindEvent(item))
}

function addTodoItem(event) {
    event.preventDefault()

    if (addInput.value === '') return alert('You need to input the name of the task.')

    const todoItem = createTodoItem(addInput.value)
    todoList.appendChild(todoItem)
    addInput.value = ''
}

function toggleTodoItem({target}) {
    const listItem = this.parentNode
    listItem.classList.toggle('completed')
}

function editTodoItem() {
    const listItem = this.parentNode
    const title = listItem.querySelector('.title')
    const editInput = listItem.querySelector('.textfield')
    const isEditing = listItem.classList.contains('editing')

    if (isEditing) {
        title.innerText = editInput.value
        this.innerText = 'Change'
    } else {
        editInput.value = title.innerText
        this.innerText = 'Save'
    }

    listItem.classList.toggle('editing')
}

function deleteTodoItem() {
    const listItem = this.parentNode
    todoList.removeChild(listItem)
}

function bindEvent(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox')
    const editButton = todoItem.querySelector('button.edit')
    const deleteButton = todoItem.querySelector('button.delete')

    checkbox.addEventListener('change', toggleTodoItem)
    editButton.addEventListener('click', editTodoItem)
    deleteButton.addEventListener('click', deleteTodoItem)
}

function createTodoItem(title) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox'

    const label = document.createElement('label')
    label.innerText = title
    label.className = 'title'

    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.className = 'textfield'

    const editButton = document.createElement('button')
    editButton.innerText = 'change'
    editButton.className = 'edit'

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'remove'
    deleteButton.className = 'delete'

    const listItem = document.createElement('li')
    listItem.className = 'todo-item'

    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    listItem.appendChild(editInput)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    bindEvent(listItem)

    return listItem
}