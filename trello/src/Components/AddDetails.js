import React from 'react';

function AddDetails(props) {
  return (
    <div className="addDetails">
      <button onClick={props.handleAddNotes}>Add Notes</button>
      <button onClick={props.handleAddChecklist}>Add Checklist</button>
    </div>
  )
}

export default AddDetails;
