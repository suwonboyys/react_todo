import React, { useState, useRef, useEffect } from 'react';
import TodoInput from './TodoInput';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';

const TodoUnmarkedItem = ({
  todos,
  onMarkTodo,
  onCompleteTodo,
  onRemoveTodo,
  onEditTodo,
}) => {
  /* const todoRef = useRef([]); */

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
  };

  /*   useEffect(() => {
    if (todos.length > 0) {
      if (todos.length === todoRef.current.length)
        todoRef.current[0].scrollIntoViewOptions({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
    }
  }, [todoRef]); */

  if (edit.id) {
    return <TodoInput edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => {
    if (!todo.isMarked) {
      return (
        <li
          key={todo.id}
          /* ref={(el) => (todoRef.current[index] = el)} */
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
};

export default TodoUnmarkedItem;
