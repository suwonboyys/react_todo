import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import "./app.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  // display the amount of current todos on header
  const totalCount = todos.length;

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    setTodos(JSON.parse(localStorage.getItem("todos")));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const updatedArr = [...todos].map((item) =>
      item.id === todoId ? newValue : item
    );

    setTodos(updatedArr);
    localStorage.setItem("todos", JSON.stringify(updatedArr));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);

    localStorage.setItem("todos", JSON.stringify(removedArr));
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    if (localStorage.getItem("todos") === null)
      localStorage.setItem("todos", JSON.stringify(todos));
    const todoList = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoList);
  }, []);

  return (
    <>
      <Navbar totalCount={totalCount} />
      <TodoInput onSubmit={addTodo} />
      <ul className="items">
        <TodoItem
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </ul>
    </>
  );
};

export default App;
