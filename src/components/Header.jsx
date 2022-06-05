import React from 'react';
import './Header.css';

const Header = ({todoLength}) => {

    return (
        <div className='Header'>
            <div className='title'>Todo List({todoLength})</div>
        </div>
    );
};

export default Header;