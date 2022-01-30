import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton() {

   const onClickButton = (msg) => {
      alert(msg);
   }

   return (
      <button 
         className="CreateTodoButton"
         onClick={() => onClickButton("Aqui se debería mostrar el modal")}>
         +
      </button>
   )
}

export { CreateTodoButton }