import React from "react";
import NoteItem from "./NoteItem";

const NoteItemList = ({
  notes,
  togglePinned,
  deleteNote,
  openNote,
  noteToOpen,
  searchInput,
}) => {
  return (
    <div className="noteItemList-container">
      <ul className="noteItemList">
        {searchInput.query === ""
          ? notes
              .sort((a, b) => b.pinned - a.pinned || b.id - a.id)
              .map((n) => (
                <NoteItem
                  key={n.id}
                  note={n}
                  noteToOpen={noteToOpen}
                  togglePinned={togglePinned}
                  deleteNote={deleteNote}
                  openNote={openNote}
                />
              ))
          : !searchInput.list
          ? "There are no results with "
          : notes
              .filter((i) =>
                i.title.toLowerCase().includes(searchInput.query.toLowerCase())
              )
              .sort((a, b) => b.pinned - a.pinned || b.id - a.id)
              .map((n) => (
                <NoteItem
                  key={n.id}
                  note={n}
                  noteToOpen={noteToOpen}
                  togglePinned={togglePinned}
                  deleteNote={deleteNote}
                  openNote={openNote}
                />
              ))}
      </ul>
    </div>
  );
};

export default NoteItemList;
