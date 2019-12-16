import React from 'react';

const AddTask = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" className="nameTask" placeholder="Name task..." onChange={props.onChange} />
    </form>
  )
}

export default AddTask;