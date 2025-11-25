import { Link, NavLink, useLocation } from "react-router";
import VehicleDropdown from "./VehicleDropdown";
import { useState } from "react";
import { ChevronDown, House } from "lucide-react";

function Header() {
  const location = useLocation();
  return (
    <header className="shadow bg-white top-0 sticky z-50">
      <nav className="border-gray-200 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7-xl">
          <Link to="/">
            <h2 className="font-semibold text-2xl leading-10">
              <span className="text-orange-700">Vehicle </span>
              Management System
            </h2>
          </Link>
          <div className="flex gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } text-xl flex flex-row gap-1.5 items-center hover:text-orange-700 rounded-lg`
              }
            >
              <House />
              Home
            </NavLink>
            <div className="relative group">
              <button
                className={`py-3 px-4 duration-200 group-hover:text-white group-hover:bg-orange-700 text-xl flex-row flex items-center gap-1 justify-center rounded-t-lg ${
                  location.pathname.startsWith("/vehiclecreate")
                    ? "text-orange-700"
                    : "text-gray-700"
                }`}
              >
                Add Vehicle{" "}
                <ChevronDown className="group-hover:rotate-180 duration-200" />
                {/* {dropdownVisible && ( */}
                {/* // )} */}
              </button>
              <div className="absolute w-full pb-2 top-full left-1/2 -translate-x-1/2 bg-orange-700 opacity-0 -translate-y-5 pointer-events-none group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 rounded-b-lg transition-all ease-in-out duration-200">
                <VehicleDropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
