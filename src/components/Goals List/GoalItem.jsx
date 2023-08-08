import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BiPencil } from 'react-icons/bi';
import { RxTrash } from 'react-icons/rx';

const GoalItem = ( {goal, deleteGoal, enterGoalEditMode, toggleGoal}) => {
    const [isChecked, setIsChecked] = useState(goal.checked)

    const handleCheckboxChange = (e)=>{
        setIsChecked(!isChecked);
        toggleGoal(goal.id);
        
    }
  return (
    <li className="goalsItem">
        <div className="goal-group">
            <input type="checkbox" className="goal-checkbox" checked={isChecked} name={goal.name} id={goal.id} onChange={handleCheckboxChange}/>
            <label className="goalLabel" htmlFor={goal.id}>
                {goal.name}
            </label>
        </div>
        <div className="icon-btn">
            <button className='btn edit' onClick={() => enterGoalEditMode(goal)}>
                <BiPencil  className='edit-icon' />
            </button>
            <button className='btn delete' onClick={() => deleteGoal(goal.id)}>
                <RxTrash className='delete-icon'/>
            </button>
        </div>

    </li>
  )
}

export default GoalItem