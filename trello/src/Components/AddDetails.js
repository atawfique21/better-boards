import React from 'react';

function AddDetails(props) {
  return (
    <div>
      {props.noteState ?
        <div className="addDetails">
          <form>
            <textarea
              rows="4"
              cols="50"
              id="addNote"
              className="nameNotes"
              placeholder="Enter note..."
              autoFocus
              autoComplete="off"
              onChange={props.onChange}
              defaultValue={props.noteValue}
            />
            <div id="submit-button-div">
              <button
                onClick={(e) => props.handleNoteSubmit(e, props.input, props.task)}
                className="generic-button"
                id="submitNote"
              >Submit</button>
            </div>
          </form>
        </div>
        :
        null
      }
      {!props.task.note && !props.noteState ?
        <div className="addDetails">
          <button className="generic-button" onClick={(e) => props.handleAddNotes(e, props.task)}>Add Note</button>
          <button className="generic-button" onClick={props.handleAddChecklist}>Add Checklist</button>
        </div>
        :
        <div className="addDetails">
          <button className="generic-button" onClick={(e) => props.handleAddNotes(e, props.task)}>Edit Note</button>
          <button className="generic-button" onClick={props.handleAddChecklist}>Add Checklist</button>
        </div>
      }
    </div>
  )
}

export default AddDetails;
