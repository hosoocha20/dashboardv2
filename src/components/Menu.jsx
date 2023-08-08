import React from "react";
import { SidebarData } from "../Data/Data";

const Menu = ({ handleTabChange, selected }) => {
  return (
    <div className="menu">
      {SidebarData.map((item, index) => {
        return (
          <div
            className={selected === index ? "menuItem active" : "menuItem"}
            key={index}
            onClick={() => handleTabChange(index)}
          >
            <item.icon color={"#4169a2"} />
            <span className="tabHeading">{item.heading}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
