import {useState} from 'react'
import './App.css'
// 
const App=()=>{ 
const [todo,setTodo]= useState('')
const[todos,setTodos]= useState([{id:1,item:'go to market',status:'incomplete'}])
console.log(todos)
const addTodo=(e)=>{
  e.preventDefault()
  setTodos([...todos,{id:todos.length+1,item:todo,status:'incomplete'}])
  setTodo('')
}

const completeTodo=(checked,id)=>{
  if(checked===true){
    let newTodos=todos.map((singleTodo)=>{
       if(singleTodo.id === id){
          return {id:singleTodo.id,item:singleTodo.item,status:'complete'}
        } else {
          return singleTodo
        }
    })
    setTodos(newTodos)
  } else {
    let newTodos=todos.map((singleTodo)=>{
      if (singleTodo.id === id){
        return {id:singleTodo.id, item:singleTodo.item,status:'incomplete'}
      } else {
        return singleTodo
      } 
    })
    setTodos(newTodos)
  }
}
  return (
    <>
      <h1>To do App</h1>
      
      <form onSubmit={addTodo}>
          <input 
          placeholder="Add to do" 
          style={styles.input} 
           value={todo}
          onChange={(e)=>setTodo(e.target.value)}
         />
         <button style={styles.btn}>Submit</button>
         </form>

      {
      todos.map((todo)=>{
        return (
          <div style={styles.todoContainer}>
      <p>{todo.id}.{todo.item}</p>
       <p>{todo.status}</p>

       <input type='checkbox'
        onChange={(e)=>completeTodo(e.target.checked,todo.id)}
        />
           </div>
        )
      })
      
    }
  </>  
  )
}
const styles={
  input: {
  padding:'10px',
  borderRadius:'10px',
  border:'1px solid #000000'
  },
  btn:{
     backgroundColor:'black',color:'white',
     margin:'10px',
    
    
  },
  todoContainer:  {
    display:'flex',
    justifyContent:'space-between'
  }


}
export default App
