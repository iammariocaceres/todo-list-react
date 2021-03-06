import React from "react";
import './TodoForm.css'

function TodoForm({
   addTodo,
   setOpenModal,
}) {
   const [newTodo, setNewTodo] = React.useState('')

   const onChange = (event) => {
      setNewTodo(event.target.value)
   }
   const onCancel = () => {
      setOpenModal(false)
   }
   const onSubmit = (event) => {
      event.preventDefault()
      addTodo(newTodo)
      setOpenModal(false)
   }
   return (
      <form onSubmit={onSubmit} >
         <label>Escribe tu nuevo To Do</label>
         <textarea
            value={newTodo}
            onChange={onChange}
            placeholder="Cortar la cebolla" />

         <div>
            <button type="button"
               onClick={onCancel}>
               Cancelar
            </button>
            <button type="submit">
               Añadir
            </button>
         </div>
      </form>
   )
}
export { TodoForm };