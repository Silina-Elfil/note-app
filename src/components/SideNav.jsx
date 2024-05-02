import React from 'react'
import { FaPlusCircle, FaTrash } from 'react-icons/fa';

const SideNav = ({ notes, setNotes, addNote, deleteNote, activeNote, setActiveNote }) => {

  const onClickDeleteNote = (noteId) => {
    const confirm = window.confirm('Are you sure you want to delete this note?')
    if (!confirm) return;
    deleteNote(noteId);
  }

  return (
    <>
      <div className='bg-gray-100 w-full min-h-full sm:w-1/4 sm:min-h-screen overflow-y-auto float-left'>

        <div className='container font-mono w-full text-2xl border-b-2 border-grey flex items-center justify-between px-4 py-3'>
          <h1 className='font-bold'>NOTES</h1>
          <button onClick={addNote}>
            <FaPlusCircle className='text-blue-700' />
          </button>
        </div>

        {notes.map((note, index) => (
          <div className={`container border-b-2 border-grey flex px-4 py-3 hover:bg-gray-300
          ${note.id === activeNote && "bg-blue-200"}`}
            onClick={() => setActiveNote(note.id)}
            key={index}>
            <div className='w-3/4'>
              <div className='font-semibold'>{note.title ? note.title.substring(0, 20) + (note.title.length > 20 ? '...' : '') : "Untitled"}</div>
              <div className='text-xs text-gray-800'>{note.content ? note.content.substring(0, 40) + (note.content.length > 20 ? '...' : '') : "No Content"}</div>
            </div>
            <div className='w-1/4 flex justify-end items-center'>
              <button onClick={() => onClickDeleteNote(note.id)}>
                <FaTrash className='text-red-600 mr-1' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SideNav
