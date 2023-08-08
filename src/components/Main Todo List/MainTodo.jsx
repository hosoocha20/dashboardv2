import React, { useState, useEffect } from 'react'
import MainTodoForm from './MainTodoForm'
import MainTodoList from './MainTodoList'
import './MainTodo.css';
import CompletedTodoList from './CompletedTodoList';
import useLocalStorage from '../../hooks/useLocalStorage';

const MainTodo = () => {
  const [mainTasks, setMainTasks] = useLocalStorage('tasks.mainTasks', []);
  const [starredTasks, setStarredTasks] = useLocalStorage('tasks.starredTasks', []);
  //const [starredTasks, setStarredTasks] = useState([]);
  const [isEditingMainTask, setIsEditingMainTask] = useState(false);
  const [ editedMainTask, setEditedMainTask] = useState(null);
  const [ previousFocusTaskEl, setPreviousFocusTaskEl] = useState(null);

  const [completedTasks, setCompletedTasks] = useLocalStorage('tasks.completedTasks', []);

  const [mainTodoHeight, setMainTodoHeight] = useState(window.innerHeight-172);




  useEffect(()=>{
    const getContainerSize = () =>{
      
      setMainTodoHeight(window.innerHeight-172);
      
    }
    window.addEventListener("resize", getContainerSize);
    return () => {
      window.removeEventListener('resize', getContainerSize);
    };
  },[])

  const mainTodoContainerStyle = {
    maxHeight: mainTodoHeight,
  };

   const addMainTask = (task) =>{
    if(!task.name || /^\s*$/.test(task.name)) {
      return
    }
    setMainTasks(prevState => [...prevState, task] )
   }

   const deleteMainTask = (taskID) =>{
    setMainTasks(prevState => prevState.filter(t=> t.id !== taskID))
   }
   const updateMainTask = (task) =>{
    ///If backspace update and enter then it just deletes the goal
    if(!task.name || /^\s*$/.test(task.name)) {
      deleteMainTask(task.id);
      return
    }
    setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name} : t
      )))
      ///close the edit mode
      closeMainTaskEditMode();
  }
  const toggleTask = (task) =>{
    addMainTask(task);
    setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, checked: !t.checked} : t
      )))
    deleteCompletedTask(task.id);
  }

  const closeMainTaskEditMode = () =>{
    setIsEditingMainTask(false);
    previousFocusTaskEl.focus();
  }
  const enterMainTaskEditMode = (task) => {
    setEditedMainTask(task);
    setIsEditingMainTask(true);
    setPreviousFocusTaskEl(document.activeElement);
  }
  const toggleTaskStarred = (task) =>{
    setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, starred: !t.starred} : t
      )))
   
  }

    //COMPLETED TASKS FUNCTIONS
  const addCompletedTask = (task) =>{
    const timeout = setTimeout(function(){
      delayCompleteTask(task)}, 150);
    
    
   }

   const delayCompleteTask = (task) =>{
    setCompletedTasks(prevState => [...prevState, task] )
    deleteMainTask(task.id)
    toggleCompletedTask(task.id);
   }

   const deleteCompletedTask = (taskID) =>{
    setCompletedTasks(prevState => prevState.filter(t=> t.id !== taskID))
    removeStarredTask(taskID)
   } 
   const toggleCompletedTask = (id) =>{
    setCompletedTasks(prevState => prevState.map(t => (t.id === id ? { ...t, checked: !t.checked} : t
      )))
  }

  const toggleCompletedTaskStarred = (id) =>{
    setCompletedTasks(prevState => prevState.map(t => (t.id === id ? { ...t, starred: !t.starred} : t
      )))
  }

  //Starred/Important Tasks
  const addStarredTask = (task)=>{
    setStarredTasks(prevState => [...prevState, task] )
    setStarredTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, starred: !t.starred} : t
      )))
  }
  const removeStarredTask = (task)=>{
    setStarredTasks(prevState => prevState.filter(t=> t.id !== task.id))
  }

  const toggleCompletedStarredTask = (id) =>{
    setStarredTasks(prevState => prevState.map(t => (t.id === id ? { ...t, checked: !t.checked} : t
      )))
  }

  return (
    <div className="mainTodo" >
      <div>
        <div className="List-Container" style={mainTodoContainerStyle}>
        {mainTasks && (
        <MainTodoList mainTasks={mainTasks} deleteMainTask={deleteMainTask} enterMainTaskEditMode={enterMainTaskEditMode} toggleTaskStarred={toggleTaskStarred} addStarredTask={addStarredTask} removeStarredTask={removeStarredTask}
        isEditingMainTask={isEditingMainTask} editedMainTask={editedMainTask} updateMainTask={updateMainTask} closeMainTaskEditMode={closeMainTaskEditMode} addCompletedTask={addCompletedTask} toggleCompletedStarredTask={toggleCompletedStarredTask} mainTodoHeight={mainTodoHeight}/>
        )}
        {completedTasks && <CompletedTodoList completedTasks = {completedTasks} deleteCompletedTask={deleteCompletedTask} toggleTask={toggleTask} toggleCompletedTaskStarred={toggleCompletedTaskStarred}
        addStarredTask={addStarredTask} removeStarredTask={removeStarredTask} toggleCompletedStarredTask={toggleCompletedStarredTask}/>}
      </div>
      </div>


      <div className="form-container">
        <MainTodoForm addMainTask={addMainTask}/>
      </div>
      
    </div>
  )
}

export default MainTodo