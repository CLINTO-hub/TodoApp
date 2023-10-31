import React, { useEffect } from 'react'
import './Todo.css'
import { useState,useRef } from 'react'
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


function Todo() {
  const [input,setInput]=useState('')
  const [todo,setTodo]= useState([])
  const [editId,setEditID] = useState(0)


   const handleSubmit = (e)=>{
    e.preventDefault();
   }

   const addTodo = () => {
    if (input !== '') {
      if (editId) {
        
        const updateTodo = todo.map((to) => (to.id === editId ? { id: to.id, list: input, status: to.status } : to));
        setTodo(updateTodo);
        setEditID(0);
      } else {
        
        setTodo([...todo, { list: input, id: Date.now(), status: false }]);
      }
      setInput('');
    }
  }

  

   const onComplete = (id)=>{
    let complete = todo.map((list)=>{
      if(list.id===id){
        return({...list , status: !list.status})
      }
      return list
    })

    setTodo(complete)
   }


   const onDelete = (id)=>{
    setTodo(todo.filter((val)=>val.id !==id))


   }

   const onEdit = (id) => {
    const editTodo = todo.find((to) => to.id === id);
    setInput(editTodo.list); 
    setEditID(editTodo.id);
  }
  

   const inputRef = useRef('null')

   useEffect(()=>{
    inputRef.current.focus();
   })


  

  return (
    <div className='container'>
    
    <h2>TODO APP</h2>
    <form  className='form-group' onSubmit={handleSubmit}>
        <input type ="text" value={input} ref={inputRef} placeholder='Enter your todo' className='form-control' onChange={(event)=>setInput(event.target.value)} />
        <button onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
       
        

    </form>
    <div className='list'>
        <ul>
            {todo.map((to)=>(
                <li className='list-items'>
                <div className='list-item-list' id = {to.status? 'list-item':''}>{to.list}</div>
                <span>
                  <IoMdDoneAll className='list-icon' id='complete' title='complete' onClick={()=>onComplete(to.id)}/>
                  <FiEdit className='list-icon' id='edit' title='Edit' onClick={()=> onEdit(to.id)}/>
                  <MdDelete className='list-icon' id='delete' title='Delete' onClick={()=>onDelete(to.id)}/>
                </span>
                </li>
              ))
            }
        </ul>
    </div>

    </div>
  )
}

export default Todo
