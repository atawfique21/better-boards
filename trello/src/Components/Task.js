import React from 'react'
import DeleteTask from './DeleteTask'
import { Draggable } from 'react-beautiful-dnd'
import AddDetails from './AddDetails'

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noteInput: ""
    }
  }

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div key={this.props.divKey}
            className="task"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="title-and-delete">
              <div>{this.props.name}</div>
              <DeleteTask handleClick={this.props.handleClick} task={this.props.task} />
            </div>
            {this.props.checkList &&
              <div className="checklist-wrapper">
                <h5 className="section-title">Checklist</h5>
                {this.props.checkList.map((listItem, key) =>
                  <div className="checklist" key={key}>
                    <label><input type="checkbox" className="checkbox" />{listItem}</label>
                  </div>
                )}
              </div>
            }
            {/* <AddDetails handleAddNotes={this.props.handleAddNotes} handleAddChecklist={this.props.handleAddChecklist} task={this.this.props.task} /> */}
            {this.props.note &&
              <div className="note">
                <h5 className="section-title">Notes</h5>
                <p>{this.props.note}</p>
              </div>
            }
          </div>
        )}
      </Draggable>
    )
  }
}

export default Task;