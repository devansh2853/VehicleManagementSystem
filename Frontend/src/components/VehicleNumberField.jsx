import React from "react";

function VehicleNumberField(props) {
  <div>
    <label for={props.name}>{props.name}</label>
    <input
      type="number"
      className=""
      onChange={props.changeMethod}
      name={props.name}
      id={props.name}
    ></input>
  </div>;
}

export default VehicleNumberField;
