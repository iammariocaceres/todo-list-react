import React from "react";
import { AppUI } from "./AppUI";


function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [item, setItem] = React.useState(initialValue)
  React.useEffect(() => {
    setTimeout(() => {
      try{
        const localStorageItem = localStorage.getItem(itemName)
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue))
          parsedItem = []
        } else {
          parsedItem = JSON.parse(localStorageItem)
        }
        setItem(parsedItem)
        setLoading(false)
      }catch(error){
        setError(error)
      }
      
    }, 1000);
  });


  const saveItem = (newItem) => {
    try{
      const stringifiedItem = JSON.stringify(newItem)
      localStorage.setItem(itemName, stringifiedItem)
      setItem(newItem)
    }catch(error){
      setError(error)
    }
  }
  return {item, saveItem,loading,error}
}


function App() {

  const {item:todos, saveItem:saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('')

  const completedTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()) && !!todo.completed).length
  const totalTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue)).length

  const completeTodo = (text) => {
    console.log(text)
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
    newTodos[todoIndex].completed = true
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
    console.log(text)
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
    newTodos.splice([todoIndex], 1)
    saveTodos(newTodos)
  }


  return (
    <AppUI
      loading={loading}
      error={error}
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
