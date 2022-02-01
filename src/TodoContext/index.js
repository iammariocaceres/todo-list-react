import React from "react";
import { useLocalStorage } from './useLocalStorage'

const TodoContext = React.createContext()

function TodoProvider(props) {
   const {
      item: todos,
      saveItem: saveTodos,
      loading,
      error
   } = useLocalStorage('TODOS_V1', []);

   const [searchValue, setSearchValue] = React.useState('')
   const [openModal, setOpenModal] = React.useState(false)

   const completedTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()) && !!todo.completed).length
   const totalTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue)).length

   const addTodo = (text) => {
      
      const newTodos = [...todos]
      newTodos.push({
         completed:false,
         text
      })
      saveTodos(newTodos)
   }

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
      <TodoContext.Provider value={{
         loading,
         error,
         searchValue,
         setSearchValue,
         todos,
         completedTodos,
         totalTodos,
         addTodo,
         completeTodo,
         deleteTodo,
         openModal,
         setOpenModal,
      }}>
         {props.children}
      </TodoContext.Provider>
   )
}
export { TodoContext, TodoProvider }