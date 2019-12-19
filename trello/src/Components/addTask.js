import React from 'react';

const AddTask = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        id="addtask"
        className="nameTask"
        placeholder="Name task..."
        onChange={props.onChange}
        autoFocus
        autoComplete="off"
      />
    </form>
  )
}

export default AddTask;