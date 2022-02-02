import React from "react";
import './TodoList.css'

function TodoList(props) {
   return (
      <section className="TodoList-container">
         {props.error && props.onError()}
         {props.loading && props.onLoading()}
         {(!props.loading && !props.todos.length) && props.onEmptyTodos}

         {props.todos.filter(todo => todo.text.toLowerCase().includes(props.searchValue)).map(props.render)}
         <ul>
            {props.children}
         </ul>
      </section>
   )
}

export { TodoList }