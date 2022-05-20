import React from 'react';
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'
import {MdEdit} from 'react-icons/md'
import {MdDeleteForever} from 'react-icons/md'
import './TodoItem.css';

const TodoItem = ({todo}) => {
    const {id, text, checked} = todo;
    return (
        <div className='TodoItem'>
            <div className={`content ${checked ? 'checked' : ''}`}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'>{text}</div>
            </div>
            <div className={`edit ${checked ? 'checked' : ''}`}>
                {checked ? '' : <MdEdit />}
            </div>
            <div className='delete'>
                <MdDeleteForever />
            </div>
        </div>
    );
};

export default TodoItem;