import React from 'react';

function Header() {
  let leftArrow = `<`
  let trello = `Trello`

  return (
    <header>
      <h2 className="back-button"><span className="lessthan">&lt;</span> Trello</h2>
      <h2 className="board-name">My home todolist</h2>
      <h2 className="add-button"><span className="center">+</span> Add Task</h2>
    </header>
  )
}

export default Header;