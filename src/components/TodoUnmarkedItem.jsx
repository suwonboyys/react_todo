import React, { useState, useEffect, forwardRef } from 'react';
import TodoInput from './TodoInput';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

const TodoUnmarkedItem = forwardRef((props, ref) => {
  const {
    todos,
    onMarkTodo,
    onCompleteTodo,
    onRemoveTodo,
    onEditTodo,
    onScrollTodo,
  } = props;

  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    onEditTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
    onScrollTodo();
  };

  if (edit.id) {
    return <TodoInput edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => {
    if (!todo.isMarked) {
      return (
        <li
          key={todo.id}
          ref={ref}
          className={`content ${
            todo.isComplete ? 'nostar itemRow complete' : 'nostar itemRow'
          }`}
        >
          <div key={todo.id} className="text">
            {todo.isComplete ? (
              <MdCheckBox onClick={() => onCompleteTodo(todo.id)} />
            ) : (
              <MdCheckBoxOutlineBlank onClick={() => onCompleteTodo(todo.id)} />
            )}
            {todo.isMarked ? (
              <AiFillStar onClick={() => onMarkTodo(todo.id)} />
            ) : (
              <AiOutlineStar onClick={() => onMarkTodo(todo.id)} />
            )}
            {todo.text}
          </div>
          <span className="icons">
            <MdEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit"
            />
            <MdDeleteForever
              onClick={() => onRemoveTodo(todo.id)}
              className="delete"
            />
          </span>
        </li>
      );
    }
  });
});

export default TodoUnmarkedItem;
