import React from 'react';

function Header() {
  return (
    <header>
      <h2 className="back-button"><span className="lessthan">&lt;</span> Trello</h2>
      <h2 className="board-name">Team Tasks</h2>
      <h2 className="add-button"><span className="center">+</span> Add Task</h2>
    </header>
  )
}

export default Header;