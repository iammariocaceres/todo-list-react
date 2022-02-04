import React from "react";
import './TodoList.css'

function TodoList(props) {
   const renderFunc = props.children || props.render
   return (
      <section className="TodoList-container">
         {props.error && props.onError()}
         {props.loading && props.onLoading()}
         {(!props.loading && !props.todos.length) && props.onEmptyTodos()}
         {(!!props.todos.length && !props.todos.filter(todo => todo.text.toLowerCase().includes(props.searchValue)).length) && props.onEmptySearchResult()}

         {props.todos.filter(todo => todo.text.toLowerCase().includes(props.searchValue)).map(renderFunc)}
    
      </section>
   )
}

export { TodoList }