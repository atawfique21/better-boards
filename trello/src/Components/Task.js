import React from 'react'
import DeleteTask from './DeleteTask'

function Task(props) {
  return (
    <div key={props.divKey} className="task">
      <div className="title-and-delete">
        <div>{props.name}</div>
        <DeleteTask handleClick={props.handleClick} task={props.task} />
      </div>
      {props.checkList &&
        <div className="checklist-wrapper">
          <h5 className="section-title">Checklist</h5>
          {props.checkList.map((listItem, key) =>
            <div className="checklist" key={key}>
              <label><input type="checkbox" className="checkbox" />{listItem}</label>
            </div>
          )}
        </div>
      }
      {props.note &&
        <div className="note">
          <h5 className="section-title">Notes</h5>
          <p>{props.note}</p>
        </div>
      }
    </div>
  )
}

export default Task;