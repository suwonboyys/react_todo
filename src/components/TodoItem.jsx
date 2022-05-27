import React, { useState } from "react";
import TodoInput from "./TodoInput";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const TodoItem = (props) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoInput edit={edit} onSubmit={submitUpdate} />;
  }

  return props.todos.map((todo, index) => (
    <li
      className={`content ${todo.isComplete ? "itemRow complete" : "itemRow"}`}
      key={index}
    >
      <div
        key={todo.id}
        onClick={() => props.completeTodo(todo.id)}
        className="text"
      >
        {todo.text}
      </div>
      <span className="icons">
        <MdEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit"
        />
        <MdDeleteForever
          onClick={() => props.removeTodo(todo.id)}
          className="delete"
        />
      </span>
    </li>
  ));
};

export default TodoItem;
