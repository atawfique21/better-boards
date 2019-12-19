import React from 'react'
import DeleteTask from './DeleteTask'
import AddDetails from './AddDetails'

/*
TODO: 

1. Finish AddDetails
  1.1. Task gets passed through prop which needs to be unpacked for AddDetails and then conditionally show the buttons. You'll need many different conditional
  statements to figure out what buttons to push and which ones to not depending on what's already there. 
  1.2. On button submit, in here, we need to handle the click.
    1.2.1. In here, we'll have a state called "addNote: false". 
      - If false, it will be normal and just render the button through AddDetails. 
      - If true, we hide the button and instead have a input field that shows underneath all the task components where they can enter their notes. 
  1.3. On field change, we update state noteInput!!
  1.3 On formSubmit={props.handleSubmit} which will also send e + inputData + sentTask
  1.4 Code already exists in App.JS that should edit the notes to what it is. 
*/

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noteInput: "",
      addNote: false
    }
  }

  handleAddNotes = (e, sentTask) => {
    e.preventDefault();
    console.log(sentTask)
    this.setState({
      addNote: !this.state.addNote
    })
  }

  render() {
    return (
      <div>
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
          noteState={this.state.addNote}
          handleAddChecklist={this.handleAddChecklist}
          task={this.props.task}
        />
      </div>
    )
  }
}

export default Task;