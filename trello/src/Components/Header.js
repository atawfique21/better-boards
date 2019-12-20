import React from 'react';

function Header(props) {
  return (
    <div className="header">
      <header>
        <h2 className="back-button"><span className="lessthan">&lt;</span> Trello</h2>
        <h2 className="board-name">Yard Work</h2>
        <h2 className="add-button" onClick={props.onButtonClick}><span className="center">+</span> Add Task</h2>
      </header>
      <div className="collapse-container">
        <button className="collapse-expand-buttons" onClick={(e) => props.handleExpand(e)}>Expand Tasks</button>
        <button className="collapse-expand-buttons" onClick={(e) => props.handleCollapse(e)}>Collapse Tasks</button>
      </div>
    </div>
  )
}

export default Header;