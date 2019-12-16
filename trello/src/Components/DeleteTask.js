import React from 'react'

function DeleteTask(props) {
  return (
    <div className="delete-button-container">
      <button onClick={props.handleClick}>X</button>
    </div>
  )
}

export default DeleteTask;