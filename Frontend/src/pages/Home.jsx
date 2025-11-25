import React, { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/Car";
  const [vehicleData, setVehicleData] = useState([{}]);
  useEffect(() => {
    async function fetchFields() {
      var info = (await axios.get(BASE_URL)).data;
      console.log(info);
      setVehicleData(info);
    }
    fetchFields();
  }, []);
  return (
    <>
      <div>
        {vehicleData.map((vehicle, index) => (
          <div key={index}> {JSON.stringify({ vehicle })} </div>
        ))}
      </div>
    </>
  );
}

export default Home;
