import React from 'react'


function Task(props) {
  console.log(props.id)
  return (
    <div
      key={props.index}
      className="task"
    >
      <p>{props.task.name}</p>
      <p>{props.task.id}</p>
    </div>
  )
}

export default Task;