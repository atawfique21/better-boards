import React from 'react'

function DeleteTask(props) {
  return (
    <div className="delete-button-container">
      <button onClick={(e) => props.handleClick(e, props.task)}>X</button>
    </div>
  )
}

export default DeleteTask;
