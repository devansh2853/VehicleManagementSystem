import React from "react";

function VehicleTextField(props) {
  return (
    <div>
      <label for={props.name}>{props.name}</label>
      <input
        type="text"
        className=""
        onChange={props.changeMethod}
        name={props.name}
        id={props.name}
      ></input>
    </div>
  );
}

export default VehicleTextField;
