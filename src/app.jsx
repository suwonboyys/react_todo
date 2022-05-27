import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import "./app.css";

const App = () => {
  // Delete all array items in useState after test over!
  const [todos, setTodos] = useState([]);

  const totalCount = todos.length;

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

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
