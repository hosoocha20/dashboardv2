import React, { useState } from 'react'
import { BsFillPinAngleFill } from 'react-icons/bs';
import { RxTrash } from 'react-icons/rx';
import { SlArrowLeft } from 'react-icons/sl';

const NotePage = ({note, updateTitle, updateBody, deleteNote, togglePinned, goBackToList}) => {
    const [notePage, setNotePage] = useState(note.body);
    const [newTitle, setNewTitle] = useState(note.title);
    const [isHoveringIcon, setIsHoveringIcon] = useState(false);

    const handleMouseOverIcon = () => {
        setIsHoveringIcon(true);
      };
    
      const handleMouseOutIcon = () => {
        setIsHoveringIcon(false);
      };

    const handleTitleChange = (e)=>{
        setNewTitle(e);
        updateTitle(note.id, e);
    }
    const handleBodyChange = (e)=>{
        setNotePage(e);
        updateBody(note.id, e);
    }

    const handlePinEvent = (e)=>{
        togglePinned(note);
    }

  return (
    <div className="notePage">
        <div className="notePage-icons">
          <SlArrowLeft className="notePage-back-icon" ize="20px" color="dimGray" onClick={()=> goBackToList()}/>
          <div className="notePage-icons-group-right">
            {isHoveringIcon ? <RxTrash  onClick={()=> deleteNote(note.id)} size="20px" color="dimGray"  onMouseOut={handleMouseOutIcon}/>
                      :
                      <RxTrash  onClick={()=> deleteNote(note.id)} size="20px" color="darkGray" onMouseOver={handleMouseOverIcon}  onMouseOut={handleMouseOutIcon} />
                      
              }
              {note.pinned ? <BsFillPinAngleFill size="20px" onClick={handlePinEvent} color="dimGray" /> 
              :
              <BsFillPinAngleFill size="20px" onClick={handlePinEvent} color="darkGray" onMouseOver={({target})=>target.style.color="dimGray"}  onMouseOut={({target})=>target.style.color="darkGray"} />
              }           
          </div>

            
        </div>
        <input className="notePage-title" id="newTitle" type="text" value={newTitle} onInput={(e)=>handleTitleChange(e.target.value)} placeholder='Untitled' />

        <div className='notePage-date'>{note.date}</div>
        <textarea className="notePage-body" id="note-body" name="body" placeholder="Write your note here..." value={notePage} onInput={(e)=>handleBodyChange(e.target.value)}/>

    </div>
  )
}

export default NotePage