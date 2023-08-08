import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Menu from "./Menu";
import MenuDropdown from "./MenuDropdown";

const Sidebar = ({ handleActiveTabChange }) => {
  const [selected, setSelected] = useState(0);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  const handleTabChange = (index, color) => {
    setSelected(index);

    handleActiveTabChange(index);
    setOpenDropdownMenu(false);
  };

  const handleHamburgerOnClick = () => {
    setOpenDropdownMenu(!openDropdownMenu);
  };

  return (
    <div className="Sidebar">
      <div className="hamburger" onClick={() => handleHamburgerOnClick()}>
        <div className="hamburger-line line1"></div>
        <div className="hamburger-line line2"></div>
        <div className="hamburger-line line3"></div>
      </div>
      {/* menu */}
      <Menu
        className="Menu"
        handleTabChange={handleTabChange}
        selected={selected}
      />
      <MenuDropdown
        className="Menu-dropdown"
        handleTabChange={handleTabChange}
        handleHamburgerOnClick={handleHamburgerOnClick}
        selected={selected}
        openDropdownMenu={openDropdownMenu}
      />
    </div>
  );
};

export default Sidebar;
