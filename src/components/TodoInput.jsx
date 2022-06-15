import React, { useState, useEffect, useRef } from 'react';
import { MdAddBox } from 'react-icons/md';

const TodoInput = ({ todos, edit, onSubmit, onScroll }) => {
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isComplete: false,
      isMarked: false,
    });

    // Clear in the input area after submit
    setInput('');
  };

  const handelScroll = () => {
    onScroll([...todos]);
  };

  return (
    <form className="TodoInput" onSubmit={handleSubmit} onScroll={handelScroll}>
      {edit ? (
        <>
          <input
            placeholder=""
            value={input}
            onChange={handleChange}
            name="text"
            className="TodoInput edit"
            ref={inputRef}
          />
          <MdAddBox
            className="TodoAddButton edit"
            onClick={handleSubmit}
            // onScroll={handleScroll}
          />
        </>
      ) : (
        <>
          <input
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={handleChange}
            name="text"
            className="TodoInput"
            ref={inputRef}
          />
          <MdAddBox
            className="TodoAddButton edit"
            onClick={handleSubmit}
            // onScroll={handleScroll}
          />
        </>
      )}
    </form>
  );
};

export default TodoInput;
