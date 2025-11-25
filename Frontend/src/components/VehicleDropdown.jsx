import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

function VehicleDropdown() {
  const [vehicles, setVehicles] = useState(["Car", "Bus", "Traveler"]);
  //   useEffect(()=>{

  //   }, [])
  return (
    <ul className="flex flex-col items-center text-white pb-4">
      {vehicles.map((vehicle, index) => (
        <li
          className="text-xl hover:text-black cursor-pointer duration-200 ease-in-out"
          key={index}
        >
          <NavLink to={`vehiclecreate/${vehicle}`}>{vehicle}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default VehicleDropdown;
