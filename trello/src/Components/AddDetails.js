import React from 'react';

function AddDetails(props) {
  return (
    <div>
      {!props.task.note ?
        <div className="addDetails">
          <button onClick={(e) => props.handleAddNotes(e, props.task)}>Add Notes</button>
          <button onClick={props.handleAddChecklist}>Add Checklist</button>
        </div>
        :
        <div className="addDetails">
          <button onClick={props.handleAddChecklist}>Add Checklist</button>
        </div>
      }
      {props.noteState ?
        <div className="addDetails">
          <button onClick={props.handleAddChecklist}>Add Checklist</button>
        </div>
        :
        null
      }
    </div>
  )
}

export default AddDetails;
