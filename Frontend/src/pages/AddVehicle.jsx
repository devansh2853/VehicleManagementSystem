import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function AddVehicle() {
  const { vehicle } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_API_URL + `/${vehicle}`;
  const [vehicleFields, setVehicleFields] = useState([{}]);
  const [formData, setFormData] = useState({ VehicleType: vehicle });

  useEffect(() => {
    async function fetchFields() {
      var info = (await axios.get(BASE_URL + "/fields")).data;
      info = info
        .map((field) => {
          if (field.type == "String") {
            field.type = "text";
          } else if (field.type == "Int32") {
            field.type = "number";
          }
          return field;
        })
        .filter((field) => field.name !== "VehicleType");
      console.log(info);
      setVehicleFields(info);
    }
    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(BASE_URL, formData);
      console.log(formData);
      setFormData({});
      alert("Success");
    } catch (err) {
      console.log(err);
      console.log(BASE_URL);
      alert("Failed");
      console.log(formData);
    }
  };
  return (
    <section className="w-full bg-gray-200 p-10 min-h-screen">
      <div className="w-full sm:max-w-[950.%] md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto flex flex-col mt-auto p-8 bg-white rounded-lg items-center">
        <h1 className="text-3xl font-semibold pb-4 mx-auto relative sm:text-center">
          Create a new{" "}
          <span className="text-orange-700 font-extrabold tracking-tight">
            {vehicle}
          </span>
          <div className="h-1 w-full absolute bg-orange-700 bottom-0 rounded-md left-1/2 -translate-x-1/2"></div>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-3 items-center w-full"
        >
          {/* <h2>{vehicle} Form</h2>  */}
          {vehicleFields.map((field, index) => (
            <div
              className="pl-4 text-lg font-semibold md:grid md:grid-cols-[100px_1fr] md:items-center w-full justify-around sm:flex sm:flex-col"
              key={index}
            >
              <label className="sm:w-36" htmlFor={field.name}>
                {field.name}
              </label>
              <input
                type={field.type}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                value={formData[field.name] || ""}
                onChange={handleChange}
                name={field.name}
                id={field.name}
                placeholder={`Enter ${field.name}`}
                required={field.required || false}
              />
            </div>
          ))}
          <button
            type="submit"
            className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddVehicle;
