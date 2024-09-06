import { useState,useEffect } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"

function App() {

const[todos, setTodos] = useState([])
const[todoValue, setTodoValue] = useState('')


    function persistData(newList){
      localStorage.setItem('todos',JSON.stringify({todos : newList}))
    }

    function handleAddTodos(newTodo){
      const  newtTodoList = [...todos,newTodo]
      persistData(newtTodoList)
      setTodos(newtTodoList)
    }

    function handleDeleteTodos(index){
      const newtTodoList =todos.filter((todo,todoIndex) =>{
        return todoIndex !== index
      })
      persistData(newtTodoList)
      setTodos(newtTodoList)
    }

    function handleEditTodos(index){
      const valueToBeEdited =todos[index]
      setTodoValue(valueToBeEdited)

      handleDeleteTodos(index)
    }

    useEffect(() =>{
      if(!localStorage){
        return
      }

      let localTodos = localStorage.getItem('todos')
      if(!localTodos){
        return
      } 
      localTodos=JSON.parse(localTodos).todos

      setTodos(localTodos)


    }, [])
  return (
    <>
      <TodoInput  todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList  handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos}/>
    </>
  )
}

export default App
