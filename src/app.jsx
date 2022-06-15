import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Clock from './components/Clock';
import TodoUnmarkedItem from './components/TodoUnmarkedItem';
import TodoMarkedItem from './components/TodoMarkedItem';
import TodoInput from './components/TodoInput';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [stars, setStars] = useState([]);

  const todoRef = useRef([]);

  const handleScrollTodo = () => {
    todoRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
      inline: 'start',
    });
  };

  useEffect(() => {
    if (todos.length > 0) {
      if (todos.length === todoRef.current.length) {
        handleScrollTodo();
      }
    }
  }, [todoRef]);

  //console.log(todoRef);

  // display the amount of current todos and stared todos on header
  const totalCount = todos.length;
  const starCount = stars.length;

  // create a new todo list
  const handleAddTodo = (todo) => {
    checkNullTodo(todo);
    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    setTodos(JSON.parse(localStorage.getItem('todos')));
    handleScrollTodo();
  };

  // edit (or modified) the todo list
  const handleEditTodo = (todoId, newValue) => {
    const modifiedTodos = [...todos].map((item) =>
      item.id === todoId ? newValue : item
    );
    setTodos(modifiedTodos);
    localStorage.setItem('todos', JSON.stringify(modifiedTodos));
    //handleScrollTodo();
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
        <Clock />
        <TodoInput onSubmit={handleAddTodo} /* onScroll={handleScrollTodo} */ />
      </header>
      <section>
        <ul className="itemRows">
          <TodoMarkedItem
            todos={todos}
            ref={todoRef}
            onMarkTodo={handleMarkTodo}
            onCompleteTodo={handleCompleteTodo}
            onRemoveTodo={handleRemoveTodo}
            onEditTodo={handleEditTodo}
            onScrollTodo={handleScrollTodo}
          />
          <TodoUnmarkedItem
            todos={todos}
            ref={todoRef}
            onMarkTodo={handleMarkTodo}
            onCompleteTodo={handleCompleteTodo}
            onRemoveTodo={handleRemoveTodo}
            onEditTodo={handleEditTodo}
            onScrollTodo={handleScrollTodo}
          />
        </ul>
      </section>
    </>
  );
};

export default App;
