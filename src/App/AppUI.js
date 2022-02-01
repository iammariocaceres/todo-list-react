import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";



function AppUI({totalTodos, completedTodos, searchValue, setSearchValue, todos, completeTodo, deleteTodo, loading, error}) {
  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />      
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      
      <TodoList>
        {error && <p>Hubo un error</p>}
        { loading &&<p>Estamos cargando...</p> }
        {(!loading && !todos.length) && <p>¡Crea tu primer TODO!</p>}
        {todos.filter(todo => todo.text.toLowerCase().includes(searchValue)).map(todo => (
          <TodoItem 
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export { AppUI };
