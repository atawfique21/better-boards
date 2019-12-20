import React from 'react';

class AddDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addNote: false
    }
  }

  handleAddNote = (e) => {
    e.persist();
    this.setState({ addNote: !this.state.addNote }, () => {
      this.props.handleAddNotes(e, this.props.task)
    })
  }

  handleSubmit = (e) => {
    e.persist();
    this.setState({ addNote: !this.state.addNote }, () => {
      this.props.handleNoteSubmit(e, this.props.input, this.props.task, this.state.addNote)
    })
  }

  render() {
    return (
      <div className="addDetailsContainer">
        {this.state.addNote ?
          <div className="addNotesForm">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <textarea
                rows="4"
                cols="50"
                id="addNote"
                className="nameNotes"
                placeholder="Enter note..."
                autoFocus
                autoComplete="off"
                onChange={this.props.onChange}
                defaultValue={this.props.noteValue}
              />
              <div id="submit-button-div">
                <button
                  onClick={this.handleSubmit}
                  className="generic-button"
                  type="submit"
                  id="submitNote"
                >Submit</button>
              </div>
            </form>
          </div>
          :
          null
        }
        {
          !this.props.task.note && !this.props.noteState ?
            <div className="addDetails">
              <button className="generic-button" onClick={this.handleAddNote}>+ Add Note</button>
              <button className="generic-button" onClick={this.props.handleAddChecklist}>+ Add Checklist</button>
            </div>
            :
            <div className="addDetails">
              <button className="generic-button" onClick={this.handleAddNote}>Edit Note</button>
              <button className="generic-button" onClick={this.props.handleAddChecklist}>+ Add Checklist</button>
            </div>
        }
      </div >
    )
  }
}

export default AddDetails;
