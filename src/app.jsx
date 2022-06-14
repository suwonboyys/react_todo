import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TodoUnmarkedItem from './components/TodoUnmarkedItem';
import TodoMarkedItem from './components/TodoMarkedItem';
import TodoInput from './components/TodoInput';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [stars, setStars] = useState([]);

  // display the amount of current todos and stared todos on header
  const totalCount = todos.length;
  const starCount = stars.length;

  // create a new todo list
  const handleAddTodo = (todo) => {
    checkNullTodo(todo);
    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    setTodos(JSON.parse(localStorage.getItem('todos')));
  };

  // edit (or modified) the todo list
  const handleEditTodo = (todo, newValue) => {
    const modifiedTodos = [...todos].map((item) =>
      item.id === todo.id ? newValue : item
    );
    setTodos(modifiedTodos);
    localStorage.setItem('todos', JSON.stringify(modifiedTodos));
  };

  // remove selected todo list
  const handleRemoveTodo = (id) => {
    const removedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedTodos);
    localStorage.setItem('todos', JSON.stringify(removedTodos));

    const removedStars = [...todos].filter(
      (todo) => todo.id !== id && todo.isMarked === true
    );
    setStars(removedStars);
    localStorage.setItem('stars', JSON.stringify(removedStars));
  };

  // completed todo list has a line on text
  const handleCompleteTodo = (id) => {
    let finishedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    // for the localStorage, is named todos
    setTodos(finishedTodos);
    localStorage.setItem('todos', JSON.stringify(finishedTodos));
    // for the localStorage, is named stars
    setStars(finishedTodos);
    localStorage.setItem('stars', JSON.stringify(finishedTodos));
  };

  //
  const handleMarkTodo = (id) => {
    let markedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isMarked = !todo.isMarked;
      }
      return todo;
    });

    setTodos(markedTodos);
    localStorage.setItem('todos', JSON.stringify(markedTodos));

    let stars = [...todos].filter((todo) => todo.isMarked === true);
    setStars(stars);
    localStorage.setItem('stars', JSON.stringify(stars));
  };

  useEffect(() => {
    if (localStorage.getItem('todos') === null)
      localStorage.setItem('todos', JSON.stringify(todos));
    const loadTodos = JSON.parse(localStorage.getItem('todos'));
    setTodos(loadTodos);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('stars') === null)
      localStorage.setItem('stars', JSON.stringify(stars));
    const loadStars = JSON.parse(localStorage.getItem('stars'));
    setStars(loadStars);
  }, []);

  // check the input todo.text has some value, or not
  const checkNullTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) return;
  };

  return (
    <>
      <header>
        <Navbar onTotalCount={totalCount} onStarCount={starCount} />
        <TodoInput onSubmit={handleAddTodo} />
      </header>
      <section>
        <ul className="itemRows">
          <TodoMarkedItem
            todos={todos}
            onMarkTodo={handleMarkTodo}
            onCompleteTodo={handleCompleteTodo}
            onRemoveTodo={handleRemoveTodo}
            onEditTodo={handleEditTodo}
          />
          <TodoUnmarkedItem
            todos={todos}
            onMarkTodo={handleMarkTodo}
            onCompleteTodo={handleCompleteTodo}
            onRemoveTodo={handleRemoveTodo}
            onEditTodo={handleEditTodo}
          />
        </ul>
      </section>
    </>
  );
};

export default App;
