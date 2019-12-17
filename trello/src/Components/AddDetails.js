import React from 'react';

function AddDetails(props) {
  return (
    <div className="addDetails">
      console.log(props.task)
      <button onClick={props.handleAddNotes}>Add Notes</button>
      <button onClick={props.handleAddChecklist}>Add Checklist</button>
    </div>
  )
}

export default AddDetails;
