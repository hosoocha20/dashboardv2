import React from 'react'
import { useState } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';

const MainEditForm = ({updateMainTask, editedMainTask, closeMainTaskEditMode}) => {
    const [updatedMainTaskName, setUpdatedMainTaskName] = useState(editedMainTask.name)

    const handleFormSubmit = (e)=>{
        e.preventDefault(); //prevent page refreshing
        updateMainTask({...editedMainTask, name: updatedMainTaskName});
    }
  return (
    <form className="mainEditForm" onSubmit={handleFormSubmit} onClick={(e)=> {e.target === e.currentTarget && closeMainTaskEditMode()}}>
        <input type="text" id="editMainTask" className="mainEditInput" placeholder='Update Task'
        value={updatedMainTaskName} onInput={(e)=>setUpdatedMainTaskName(e.target.value)}
        autoFocus
        maxLength={60}
        />
        <button className='update-btn' aria-label={`Confirm edited task to now read ${updatedMainTaskName}`} type='submit'>
          <AiOutlineEnter size="17px" color="dimGray"/>
        </button>

    </form>
  )
}

export default MainEditForm