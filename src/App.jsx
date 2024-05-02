import React from 'react'
import SideNav from './components/SideNav';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [activeNote, setActiveNote] = useState(0);

  //localstorage
  useEffect(() => {
    console.log("Notes:", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //add note function
  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "",
      content: "",

    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  //delete note function
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  //active note function
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  //update the content function
  const updateContent = (updatedNote) => {
    const updatedNoteArr = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNoteArr);
  };

  return (
    <>
      <SideNav
        notes={notes}
        setNotes={setNotes}
        addNote={addNote}
        deleteNote={deleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Note
        activeNote={getActiveNote()}
        updateContent={updateContent}
      />
    </>
  )
}

export default App
