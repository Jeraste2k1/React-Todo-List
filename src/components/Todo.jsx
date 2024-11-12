import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'

const Todo = () => {
  
  const inputRef = useRef()
  const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : [])

  const ajout = () => {
    const inputText = inputRef.current.value.trim()
    if (inputText === "") return

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      isEditing: false, // Ajout de l'état d'édition
    }
    setTodoList((prev) => [...prev, newTodo])
    inputRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
  }

  const toggle = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    )
  }

  const editTodo = (id, newText) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    )
  }

  const toggleEditing = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )
  }
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>Todo List</h1>
      </div>
      
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 placeholder:text-slate-600' type="text" placeholder='Ajouter votre Tâche' />
        <button onClick={ajout} className='border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Ajouter</button>
      </div>

      <div>
        {todoList.map((item) => (
          <Todoitems
            key={item.id}
            {...item}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo} // Passer la fonction editTodo
            toggleEditing={toggleEditing} // Passer la fonction toggleEditing
          />
        ))}
      </div>
    </div>
  )
}

export default Todo
