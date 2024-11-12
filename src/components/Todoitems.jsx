import React, { useState } from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
import edit_icon from '../assets/edit.png'

const Todoitems = ({ text, id, isComplete, isEditing, deleteTodo, toggle, editTodo, toggleEditing }) => {
  const [editText, setEditText] = useState(text)

  const handleEditChange = (e) => {
    setEditText(e.target.value)
  }

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editTodo(id, editText.trim()) // Met à jour l'élément avec le nouveau texte
    }
  }

  return (
    <div className='flex items-center my-3 gap-2'>
      {isEditing ? (
        <div className='flex flex-1 items-center'>
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            className="flex-1 border border-gray-300 rounded px-2"
          />
          <button onClick={handleSaveEdit} className="ml-2 text-blue-500">Save</button>
        </div>
      ) : (
        <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'>
          <img src={isComplete ? tick : not_tick} alt="" />
          <p className={`text-slate-800 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>{text}</p>
        </div>
      )}

      <img onClick={() => toggleEditing(id)} className='w-3.5 cursor-pointer' src={edit_icon} alt="Edit" />
      <img onClick={() => deleteTodo(id)} className='w-3.5 cursor-pointer' src={delete_icon} alt="Delete" />
    </div>
  )
}

export default Todoitems
