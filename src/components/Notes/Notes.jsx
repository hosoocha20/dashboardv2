import React, { useState, useEffect } from 'react'
import './Notes.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlinePlus } from 'react-icons/hi'
import NoteItemList from './NoteItemList'
import NotePage from './NotePage'
import useLocalStorage from '../../hooks/useLocalStorage';
import AddNotePage from './AddNotePage'


const Notes = () => {
    const [notes, setNotes] = useLocalStorage('notes', []);
    const [noteToOpen, setNoteToOpen] = useState({});
    const [isNoteOpened, setIsNoteOpened] = useState(false);
    const [isNoteAdded, setIsNoteAdded] = useState(false);
    const [isNotePageClosed, setIsNotePageClosed] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [searchInput, setSearchInput] = useState({
        query: '',
        list: []
        })
    const [searchCount, setSearchCount] = useState(0);



    const handleSearchFormSubmit = (e) =>{
        e.preventDefault();
    }
    const handleSearchInputChange = (e) =>{
        const results = notes.filter(note => {
            if (e.target.value === "") return notes

            return note.title.toLowerCase().includes(e.target.value.toLowerCase())
            })
        setSearchInput({
            query: e.target.value,
            list: results
        })
            
    }

    const addNote = (note) =>{
        //pushes into end of array
        //setNotes(prevState => [...prevState, note] )
        //pushes into start of array
        setNotes(prevState => [ note,...prevState] )
        setIsNoteAdded(true);
        openNote(note);
       }
    const handleAddNote = (e)=>{
        addNote({
            title: 'Untitled',
            date: (new Date(Date.now())).toLocaleDateString(),
            body: '',
            id: Date.now(),
            modified: (new Date(Date.now())).toUTCString(),
            pinned: false
            
        })
    }
    const togglePinned = (note)=>{
        setIsPinned(!note.pinned);
        setNotes(prevState => prevState.map(n => (n.id === note.id ? { ...n, pinned: !n.pinned} : n
            )))
        if (isPinned)
            openNote(note);

        
    }
    const deleteNote = (id)=>{
        goBackToList();
        setNotes(prevState => prevState.filter(n=> n.id !== id))
        
    }
    const openNote = (note)=>{
        setIsNotePageClosed(false);
        setIsNoteOpened(true);
        setNoteToOpen(note);
    }
    const goBackToList = () =>{
        setIsNoteOpened(false);
        setIsNotePageClosed(true);
    }


    const updateTitle = (id, newTitle)=>{
        setIsEditingNote(true);
        setNotes(prevState => prevState.map(n => (n.id === id ? { ...n, title: newTitle} : n
            )))
    }
    const updateBody = (id, newBody)=>{
        setIsEditingNote(true);
        setNotes(prevState => prevState.map(n => (n.id === id ? { ...n, body: newBody} : n
            )))
    }

    const searchInputCount = (e) =>{
        let c = (notes.filter(i => i.title.toLowerCase().includes(searchInput.query.toLowerCase()))).length
        setSearchCount(c); 
    }

    useEffect(()=>{
        searchInputCount()
    },[searchInput, notes.length])

    useEffect(()=>{
        setNoteToOpen(notes[0])
    },[])



  return (

        <div className='notes-grid-container'>
            <div className={isNoteOpened? 'notes-sidebar noteList-slideOut' : isNotePageClosed ? 'notes-sidebar noteList-slideIn' : 'notes-sidebar'}>
                <form className='search-form'  onSubmit={handleSearchFormSubmit}>
                    <AiOutlineSearch />
                    <input className='search-input' id="search" type="search" value={searchInput.query} onInput={handleSearchInputChange} placeholder="Search"/>
                </form>
                <div className="notes-heading">
                    {!searchInput.query ? 
                    <div className='notes-heading-wrap'>
                        <h2>All notes</h2>
                        <div className="noteCount">{notes.length}</div>
                    </div>
                    : 
                    <div className='notes-heading-wrap'>
                        <h2>Search Results</h2>
                        <div className="noteCount">{searchCount}</div>
                    </div>
                    }
                    <HiOutlinePlus size="25px" onClick={handleAddNote}/>
                </div>
                <NoteItemList notes={notes} togglePinned={togglePinned} deleteNote={deleteNote} openNote={openNote} noteToOpen={noteToOpen} searchInput={searchInput}/>

            </div>
            <div className={isNoteOpened ? "note-page-container notePage-slideIn" : isNotePageClosed? 'note-page-container notePage-slideOut' : 'note-page-container'}>
                
                {notes.map(n=>((n.id === noteToOpen.id) ?              
                        <NotePage key={n.id} note={n} updateTitle={updateTitle} updateBody={updateBody} deleteNote={deleteNote} togglePinned={togglePinned} goBackToList={goBackToList}/>
                     : 
                    ''
                ))}

            </div>
            
        </div>
        
  )
}

export default Notes