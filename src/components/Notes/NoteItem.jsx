import React, { useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { RxTrash } from 'react-icons/rx';

const NoteItem = ({note, togglePinned, deleteNote, openNote, noteToOpen}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringIcon, setIsHoveringIcon] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };

      const handleMouseOverIcon = () => {
        setIsHoveringIcon(true);
      };
    
      const handleMouseOutIcon = () => {
        setIsHoveringIcon(false);
      };

    const handleTrashClick = (e)=>{
        deleteNote(note.id);

    }
    const handlePinEvent = (e)=>{
        togglePinned(note);
    }
    const handleOpenNote = (e)=>{
        openNote(note);
    }


  return (
    <div className={note.id === noteToOpen.id ? 'noteItem opened' : 'noteItem'} onClick={()=>handleOpenNote()}          
        onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="noteItem-title">
            <GoPrimitiveDot className="dotNote-icon" size="20px"/>
            <h3>{note.title && note.title.substring(0, 16)}</h3>
            <div className='noteItem-icons'>
                {isHovering && (
                    (isHoveringIcon ? <RxTrash  onClick={handleTrashClick} color="dimGray"  onMouseOut={handleMouseOutIcon}/>
                    :
                    <RxTrash  onClick={handleTrashClick} color="darkGray" onMouseOver={handleMouseOverIcon}  onMouseOut={handleMouseOutIcon} className="noteItem-trash-icon"/>
                    )
                )}
                {note.pinned ? <BsFillPinAngleFill onClick={handlePinEvent} color="dimGray" />
                : isHovering && (
                    <BsFillPinAngleFill onClick={handlePinEvent} color="darkGray" onMouseOver={({target})=>target.style.color="dimGray"}  onMouseOut={({target})=>target.style.color="darkGray"} />
                )}
            </div>
           
        </div>
        <div className="noteItem-sidebar">
            <div className="noteItem-date">{note.date}</div>
            <div className='noteItem-sneakpeek'>{note.body && note.body.substring(0, 35)}</div>
        </div>
        
    </div>
  )
}

export default NoteItem