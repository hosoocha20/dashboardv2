import React from "react";
import { IconContext } from "react-icons";
import { RxStar, RxStarFilled } from "react-icons/rx";
import { useState } from "react";

const ImportantItem = ({ important, removeImportant, handleCheckedTask }) => {
  const [starred, setStarred] = useState(important.checked);

  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const handleCheckboxChange = (e) => {
    setStarred(!starred);
    handleCheckedTask(important);
  };

  const handleStarChange = (e) => {
    removeImportant(important.id);
    setIsActive(!isActive);
  };

  return (
    <li className="importantTaskItem">
      <div className="important-group">
        <input
          type="checkbox"
          className="checkbox"
          checked={starred}
          name={important.name}
          id={important.id}
          onChange={handleCheckboxChange}
        />
        <label className="importantLabel" htmlFor={important.id}>
          {important.name}
        </label>
      </div>
      <div className="cursor-pointer select-none">
        {isActive ? (
          <IconContext.Provider value={{ color: "#8DB8FC" }}>
            <RxStar
              size="20px"
              onClick={() => {
                setIsActive(!isActive);
              }}
            />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: "#8DB8FC" }}>
            <RxStarFilled
              size="20px"
              onClick={() => {
                handleStarChange();
              }}
            />
          </IconContext.Provider>
        )}
      </div>
    </li>
  );
};

export default ImportantItem;
