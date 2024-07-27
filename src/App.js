import { useEffect, useState } from "react";
import "./App.css";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  const addNote = (color) => {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      title: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  const updateTitle = (title, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNotes[index].title = title;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter(
    (note) =>
      note && note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <>
        <Sidebar addNote={addNote} />
        <NoteContainer
          notes={filteredNotes} // Pass filtered notes
          deleteNote={deleteNote}
          updateText={updateText}
          updateTitle={updateTitle}
          searchQuery={searchQuery} // Pass search query
          setSearchQuery={setSearchQuery} // Pass function to update search query
        />
      </>
    </div>
  );
}

export default App;
