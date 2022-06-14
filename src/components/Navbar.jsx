import React from 'react';

const NavBar = ({ onTotalCount, onStarCount }) => (
  <nav>
    <h1 className="title">
      Todo List({onTotalCount}) - # Primary : {onStarCount}
    </h1>
  </nav>
);

export default NavBar;
