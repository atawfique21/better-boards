import React from 'react';

function Widget(props) {
  return (
    <div className="widget">
      <div className="widget-name">
        <p>YARD WORK WIDGET</p>
      </div>
      <div className="widget-components">
        <img alt="Current weather" src={`http://openweathermap.org/img/w/${props.icon}.png`}></img>
        <p>{props.temp}&#8451;</p>
      </div>
    </div>
  )
}

export default Widget;