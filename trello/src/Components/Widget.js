import React from 'react';

function Widget(props) {
  return (
    <div className="widget">
      <img src={`http://openweathermap.org/img/w/${props.icon}.png`}></img>
      <p>{props.temp}&#8451;</p>
    </div>
  )
}

export default Widget;