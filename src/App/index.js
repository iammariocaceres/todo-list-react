import React from "react";
import { AppUI } from "./AppUI";


function App() {

  const localStorageTodos = localStorage.getItem('TODOS_V1')
  let parsedTodos = []
  if (!localStorageTodos){
    localStorage.setItem('TODOS_V1', JSON.stringify([]))
    parsedTodos = []
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [searchValue, setSearchValue] = React.useState('')
  const [todos, setTodos] = React.useState(parsedTodos)
  
  const completedTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()) && !!todo.completed).length
  const totalTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue)).length


  const completeTodo = (text) => {
    console.log(text)
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
    newTodos[todoIndex].completed = true
    setTodos(newTodos)
  }
  
  const deleteTodo = (text) => {
    console.log(text)
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
    newTodos.splice([todoIndex], 1)
    setTodos(newTodos)
  }
  

  return (
    <AppUI 
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      todos={todos}
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
