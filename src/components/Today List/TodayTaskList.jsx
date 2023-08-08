import React from 'react'
import EditForm from './EditForm'
import TaskItem from './TaskItem'



const TodayTaskList = ({ todayTasks, deleteTask, toggleTask, enterEditMode, isEditing, editedTask, updateTask, closeEditMode, listContainerStyle}) => {
  return (
    <ul className='todayList' style={listContainerStyle}>
        {todayTasks.sort((a,b) => b.id - a.id).map(t =>((isEditing === true) &&(editedTask.id === t.id) ?
        (
                <EditForm  key={t.id} editedTask={editedTask} updateTask={updateTask} closeEditMode = {closeEditMode}/>  
              )  
        : (
          <TaskItem 
            key={t.id}
            task={t}
            deleteTask={deleteTask}
            toggleTask = {toggleTask}
            enterEditMode = {enterEditMode}
            />
        )
        ))
        }

    </ul>
  )
}

export default TodayTaskList