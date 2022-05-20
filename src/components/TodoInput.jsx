import React from 'react';
import './TodoInput.css';
import {MdAddBox} from 'react-icons/md'

const TodoInput = () => {
    return (
        <div className='TodoInput'>
            <input 
                required
                placeholder='할 일을 입력하세요'
                className='TodoInputBox'
            />
            <div className='TodoAddButton'><MdAddBox/></div> 
        </div>
    );
};

export default TodoInput;