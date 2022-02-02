import React from "react";
import { useTodos } from "./useTodos";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoHeader } from "../TodoHeader";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal"
import { TodoForm } from "../Modal/TodoForm";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";



function App() {
  const {
    error,
    loading,
    todos,
    completeTodo,
    deleteTodo,
    searchValue,
    setSearchValue,
    openModal,
    setOpenModal,
    addTodo,
    completedTodos,
    totalTodos,
  } = useTodos()

  return (
    <React.Fragment>

      <TodoHeader>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList 
        error={error}
        loading={loading}
        todos={todos}
        searchValue={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        render={todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      />

      {/* <TodoList >
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {(!loading && !todos.length) && <EmptyTodos />}
        {todos.filter(todo => todo.text.toLowerCase().includes(searchValue)).map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList> */}
      {openModal && (
        <Modal>
          <TodoForm 
            setOpenModal={setOpenModal}
            addTodo={addTodo} 
          />
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  )
}
export default App;
