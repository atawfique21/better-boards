import React from 'react';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask'

function Board(props) {
  return (
    <div className="outer-board">
      <div className="board">
        <h3>{props.name}</h3>
        {props.name === "Not started" ? (props.addTask && <div className="task"><AddTask onSubmit={props.onSubmit} onChange={props.handleChange} /></div>) : null}
        {props.tasks && props.tasks.map((task, key) =>
          <div key={key} className="task">
            <div className="title-and-delete">
              <div>{task.name}</div>
              <DeleteTask handleClick={props.handleClick} />
            </div>
            {task.checkList && <div className="checklist-wrapper">
              {task.checkList && <h5 className="section-title">Checklist</h5>}
              {task.checkList && task.checkList.map((listItem, key) =>
                <div className="checklist" key={key}>
                  <label><input type="checkbox" className="checkbox" />{listItem}</label>
                </div>
              )}
            </div>}
            {task.note &&
              <div className="note">
                <h5 className="section-title">Notes</h5>
                <p>{task.note}</p>
              </div>
            }
          </div>)
        }
      </div >
    </div >
  )
}

export default Board;