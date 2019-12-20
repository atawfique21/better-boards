import React from 'react'
import DeleteTask from './DeleteTask'
import AddDetails from './AddDetails'

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noteInput: "",
      checklistInput: "",
      addNote: this.props.addNoteBoolean,
      addCheckList: this.props.addChecklistBoolean
    }
  }

  handleAddNotes = (e) => {
    e.preventDefault();
    this.setState({
      addNote: !this.state.addNote
    })
  }

  handleNoteChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleAddChecklist = (e) => {
    // this is the one that's working
    e.preventDefault();
    this.setState({
      addCheckList: !this.state.addCheckList
    })
  }

  handleChecklistChange = (e) => {
    this.setState({
      checklistInput: e.target.value
    })
    console.log(this.state.checklistInput)
  }

  render() {
    return (
      <div className="taskContainer">
        <div className="title-and-delete">
          <div>{this.props.name}</div>
          <DeleteTask
            handleClick={this.props.handleClick}
            task={this.props.task}
          />
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
        {this.props.note &&
          <div className="note">
            <h5 className="section-title">Notes</h5>
            <p>{this.props.note}</p>
          </div>
        }
        <AddDetails
          handleAddNotes={this.handleAddNotes}
          handleAddChecklist={this.handleAddChecklist}
          task={this.props.task}
          onChange={this.handleNoteChange}
          handleNoteSubmit={this.props.handleNoteSubmit}
          input={this.state.input}
          noteValue={this.props.noteValue}
          noteState={this.state.addNote}
          onChecklistChange={this.handleChecklistChange}
          handleChecklistSubmit={this.props.handleChecklistSubmit}
          checklistInput={this.state.checklistInput}
        />
      </div>
    )
  }
}

export default Task;