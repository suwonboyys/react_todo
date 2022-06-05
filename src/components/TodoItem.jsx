import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import "./TodoItem.css";

const TodoItem = ({ todo, onDeleteTodo, onCheckToggle, onTextTodo, idx }) => {
  const [text, setText] = useState(todo.text);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) onTextTodo(text, idx);
  };

  return (
    <div className="TodoItem">
      <div className={`content ${todo.checked ? "checked" : ""}`}>
        {todo.checked ? (
          <MdCheckBox onClick={() => onCheckToggle(idx)} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={() => onCheckToggle(idx)} />
        )}
        <input
          type="text"
          value={text}
          className="text"
          onChange={(e) => setText(e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div
        className={`edit ${todo.checked ? "checked" : ""}`}
        onClick={handleEditMode}
      >
        {todo.checked ? "" : editMode ? <MdCheckCircleOutline /> : <MdEdit />}
      </div>
      <div className="delete">
        <MdDeleteForever onClick={() => onDeleteTodo(todo)} />
      </div>
    </div>
  );
};

export default TodoItem;
