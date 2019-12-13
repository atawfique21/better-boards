import React from 'react';

function Header() {
  let trello = "< Trello"

  return (
    <header>
      <h2 className="back-button">{trello}</h2>
      <h2 className="board-name">My home todolist</h2>
      <h2 className="add-button">+ Add Task</h2>
    </header>
  )
}

export default Header;