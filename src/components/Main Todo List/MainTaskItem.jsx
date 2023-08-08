import React, { useState } from "react";
import { IconContext } from "react-icons";
import { RxStar, RxStarFilled } from "react-icons/rx";
import { BiPencil } from "react-icons/bi";
import { RxTrash } from "react-icons/rx";

const MainTaskItem = ({
  mainTask,
  deleteMainTask,
  enterMainTaskEditMode,
  addCompletedTask,
  toggleTaskStarred,
  addStarredTask,
  removeStarredTask,
  toggleCompletedStarredTask,
}) => {
  const [isChecked, setIsChecked] = useState(mainTask.checked);
  const [isActive, setIsActive] = useState(mainTask.starred);
  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    //toggleCompletedTask(mainTask.id);
    addCompletedTask(mainTask);
    toggleCompletedStarredTask(mainTask.id);
  };
  const handleStarredChange2 = (e) => {
    setIsActive(!isActive);
    toggleTaskStarred(mainTask);
    addStarredTask(mainTask);
  };
  const handleStarredChange = (e) => {
    setIsActive(!isActive);
    toggleTaskStarred(mainTask);
    removeStarredTask(mainTask);
  };
  return (
    <li className="mainTaskItem">
      <div className="mainItem-group">
        <input
          type="checkbox"
          className="mainCheckbox"
          checked={isChecked}
          name={mainTask.name}
          id={mainTask.id}
          onChange={handleCheckboxChange}
        />
        <label className="mainTaskLabel" htmlFor={mainTask.id}>
          {mainTask.name}
        </label>
      </div>
      <div className="mainIcon-btns">
        <div
          className="btn mainEdit"
          aria-label={`Update ${mainTask.name} Task`}
        >
          <BiPencil
            className="mainEdit-icon"
            size="17px"
            onClick={() => enterMainTaskEditMode(mainTask)}
            onMouseOver={({ target }) => (target.style.color = "dimGray")}
            onMouseOut={({ target }) => (target.style.color = "darkGray")}
          />
        </div>
        <div
          className="btn mainDelete"
          aria-label={`Delete ${mainTask.name} Task`}
        >
          <RxTrash
            className="mainDelete-icon"
            size="17px"
            onClick={() => deleteMainTask(mainTask.id)}
            onMouseOver={({ target }) => (target.style.color = "dimGray")}
            onMouseOut={({ target }) => (target.style.color = "darkGray")}
          />
        </div>
        <div className="btn mainStar">
          {isActive ? (
            <RxStarFilled
              color="gold"
              size="21px"
              onClick={() => {
                handleStarredChange();
              }}
            />
          ) : (
            <RxStar
              color="gold"
              size="21px"
              onClick={() => {
                handleStarredChange2();
              }}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default MainTaskItem;
