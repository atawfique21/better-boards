import React from 'react';

function Header(props) {
  return (
    <header>
      <h2 className="back-button"><span className="lessthan">&lt;</span> Trello</h2>
      <h2 className="board-name">Yard Work</h2>
      <h2 className="add-button" onClick={props.onButtonClick}><span className="center">+</span> Add Task</h2>
    </header>
  )
}

export default Header;