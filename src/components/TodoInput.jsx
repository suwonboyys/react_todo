import React, { useState } from "react";
import "./TodoInput.css";
import { MdAddBox } from "react-icons/md";

const TodoInput = (props) => {
  const [text, setText] = useState(props.edit ? props.edit.value : "");

  //이벤트 발생 시 변화를 감지
  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  const handleSummitInput = (e) => {
    e.preventDefault();
    if (!text) return;
    props.onSubmit(text);
    setText("");
  };

  return (
    <form className="TodoInput" onSubmit={handleSummitInput}>
      <input
        type="text"
        value={text}
        placeholder="할 일을 입력하세요"
        className="TodoInputBox"
        onChange={handleChangeInput}
      />
      <button
        type="submit"
        className="TodoAddButton"
        onClick={handleSummitInput}
      >
        <MdAddBox />
      </button>
    </form>
  );
};

export default TodoInput;
