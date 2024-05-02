import React from 'react'
import { useRef, useEffect } from 'react';

const Note = ({ activeNote, updateContent }) => {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleForward = (e) => {
    const { selectionStart, selectionEnd } = textareaRef.current;
    const textLength = textareaRef.current.value.length;

    if ((e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown') && textareaRef.current && (selectionStart === textLength || selectionStart === selectionEnd)) {
      textareaRef.current.focus();
      e.preventDefault();
    }
  };


  const handleBackward = (e) => {
    const { selectionStart } = textareaRef.current;

    if ((e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') && textareaRef.current && selectionStart === 0) {
      inputRef.current.focus();
    }
  };



  const onUpdate = (key, value) => {
    updateContent({
      ...activeNote,
      [key]: value,
    })
  };

  if (!activeNote) return <div className='bg-gray-75 w-full sm:w-3/4 h-screen flex justify-center items-center 
  float-right text-xl text-gray-600'>No note selected</div>

  return (
    <>
      <div className='w-full sm:w-3/4 h-screen float-right'>
        <input
          autoFocus
          ref={inputRef}
          type='text'
          value={activeNote.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          onKeyDown={handleForward}
          className='container outline-none m-0 px-5 pt-5 bg-gray-75 text-xl font-bold'
          placeholder='Title'
        />
        <textarea
          ref={textareaRef}
          value={activeNote.content}
          onChange={(e) => onUpdate('content', e.target.value)}
          onKeyDown={handleBackward}
          className='container min-h-screen outline-none m-0 p-5 bg-gray-75'
          placeholder='Write your note here...'
        />
      </div>
    </>
  )
}

export default Note
