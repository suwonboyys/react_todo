import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import "./App.css";

const App = () => {
  //todos = 할 일 목록, setTodos = 할 일 목록 조작 함수
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { text: text, checked: false }])
    );
    setTodos(JSON.parse(localStorage.getItem("todos")));
  };

  const handleDeleteTodo = (todo) => {
    const todoTemp = [...todos.filter((el) => el !== todo)];
    setTodos(todoTemp);
    localStorage.setItem("todos", JSON.stringify(todoTemp));
  };

  const handleCheckTodo = (idx) => {
    const todoTemp = [...todos];
    todoTemp[idx] = { ...todoTemp[idx], checked: !todoTemp[idx].checked };
    setTodos(todoTemp);
    localStorage.setItem("todos", JSON.stringify(todoTemp));
  };

  const handleTextTodo = (text, idx) => {
    const todoTemp = [...todos];
    todoTemp[idx] = { ...todoTemp[idx], text: text };
    setTodos(todoTemp);
    localStorage.setItem("todos", JSON.stringify(todoTemp));
  };

  useEffect(() => {
    if (localStorage.getItem("todos") === null)
      localStorage.setItem("todos", JSON.stringify(todos));
    const todoList = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoList);
  }, []);

  return (
    <>
      <Header todoLength={todos.length} />
      <TodoInput onSubmit={handleAddTodo} />
      {todos?.map((todo, idx) => {
        return (
          <TodoItem
            key={todo.text + idx}
            idx={idx}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onCheckToggle={handleCheckTodo}
            onTextTodo={handleTextTodo}
          />
        );
      })}
    </>
  );
};

export default App;
