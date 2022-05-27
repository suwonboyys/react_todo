import React from "react";

const NavBar = (props) => (
  <nav className="Template">
    <h1 className="title">Todo List({props.totalCount})</h1>
  </nav>
);

export default NavBar;
