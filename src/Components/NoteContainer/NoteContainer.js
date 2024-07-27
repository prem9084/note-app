import React from "react";
import Note from "../Note/Note";
import "./NoteContainer.css";

function NoteContainer(props) {
  const reverseArray = (arr) => {
    const array = [];
    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }
    return array;
  };

  const notes = reverseArray(props.notes);

  return (
    <div className="note-container">
      <input
        type="search"
        placeholder="Search by title"
        className="search_item"
        value={props.searchQuery}
        onChange={(e) => props.setSearchQuery(e.target.value)} // Update search query
      />
      <div className="note-container_notes custom-scroll">
        {notes?.length > 0 ? (
          notes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
              updateTitle={props.updateTitle}
            />
          ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
