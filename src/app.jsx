import React, { startTransition, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import './app.css';

const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [topTodos, setTopTodos] = useState([]);

  // display the amount of current todos and stared todos on header
  const totalCount = todos.length;
  const starCount = topTodos.length;

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    setTodos(JSON.parse(localStorage.getItem('todos')));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const updatedArr = [...todos].map((item) =>
      item.id === todoId ? newValue : item
    );

    setTodos(updatedArr);
    localStorage.setItem('todos', JSON.stringify(updatedArr));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);

    localStorage.setItem('todos', JSON.stringify(removedArr));

    const removedTopList = [...todos].filter(
      (todo) => todo.id !== id && todo.isMarked === true
    );

    setTopTodos(removedTopList);

    localStorage.setItem('stars', JSON.stringify(removedTopList));
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const starTodo = (id) => {
    let markedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isMarked = !todo.isMarked;
      }
      return todo;
    });

    setTodos(markedTodos);
    localStorage.setItem('todos', JSON.stringify(markedTodos));

    const topTodos = [...todos].filter((todo) => todo.isMarked === true);

    setTopTodos(topTodos);
    localStorage.setItem('stars', JSON.stringify(topTodos));
  };

  useEffect(() => {
    if (localStorage.getItem('todos') === null)
      localStorage.setItem('todos', JSON.stringify(todos));

    const todoList = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoList);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('stars') === null)
      localStorage.setItem('stars', JSON.stringify(topTodos));

    const topList = JSON.parse(localStorage.getItem('stars'));
    setTopTodos(topList);
  }, []);

  return (
    <>
      <Navbar totalCount={totalCount} starCount={starCount} />
      <TodoInput onSubmit={addTodo} />
      <ul className="items">
        {todos.map((todo, index) => {
          if (todo.isMarked) {
            const storedItems = JSON.parse(localStorage.getItem('stars'));
            return (
              <li
                key={index}
                className={`content ${
                  storedItems.length === 0
                    ? 'unprimary itemRow'
                    : 'primary itemRow'
                }`}
              >
                <div key={todo.id} className="text">
                  {todo.isComplete ? (
                    <MdCheckBox onClick={() => completeTodo(todo.id)} />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      onClick={() => completeTodo(todo.id)}
                    />
                  )}
                  {todo.isMarked ? (
                    <AiFillStar onClick={() => starTodo(todo.id)} />
                  ) : (
                    <AiOutlineStar onClick={() => starTodo(todo.id)} />
                  )}
                  {todo.text}
                </div>
                <span className="icons">
                  <MdEdit
                    onClick={() =>
                      props.setEdit({ id: todo.id, value: todo.text })
                    }
                    className="edit"
                  />
                  <MdDeleteForever
                    onClick={() => removeTodo(todo.id)}
                    className="delete"
                  />
                </span>
              </li>
            );
          }
        })}
        <hr size="30px" noshade></hr>
        <TodoItem
          todos={todos}
          starTodo={starTodo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </ul>
    </>
  );
};

export default App;
