import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-xl-2 p-0">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink exact="true" to="/all-prefix">
              All Prefix
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/tables">
              Tables
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/all-api">
              All Api
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
