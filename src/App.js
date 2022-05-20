import React, { useState } from 'react';
import Template from './components/Template';
import TodoList from './components/TodoList';
import './App.css';
import TodoInput from "./components/TodoInput";

const App = () => {
  //todos = 할 일 목록, setTodos = 할 일 목록 조작 함수
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할 일1",
      checked: true
    },
    {
      id: 2,
      text: "할 일2",
      checked: true
    },
    {
      id: 3,
      text: "할 일3",
      checked: false
    }
  ]);

  return (
    <Template todoLength={todos.length}>
      <TodoInput />
      <TodoList todos={todos} />
    </Template>
  );
};

export default App;
