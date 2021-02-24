const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id=todos.length;

class TODO{
  constructor(){
    this.id = id++;
    this.text = this.getText();
    this.check = false;
  }
  getText(){
    return prompt("Type main goal of your todo thing: ");
  }
}

function newTodo() {
  const todo = new TODO();
  todos.push(todo);
  render();
}

function deleteTODO(id){
  todos = todos.filter(elem => elem.id !== id);
  render();
}

function render(){
  list.innerHTML = "";
  todos.map(renderTODO).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent =  todos.filter(elem => !elem.check).length;
  saveTODO();
}

function renderTODO(todo){
  const doLi = document.createElement("li");
  doLi.innerHTML = `
    <input type="checkbox" onchange="refleshCount(${todo.id})" ${todo.check == true ? "checked" : ""}>
    <span>${todo.text}</span>
    <button class="butDel" onclick="deleteTODO(${todo.id})">X</button>`;
  id=todos.length;
  return doLi;
}

function refleshCount(id){
  todos = todos.map(todo => todo.id == id ? {...todo, check: !todo.check} : todo);
  uncheckedCountSpan.textContent =  todos.filter(elem => !elem.check).length;
  saveTODO();
}