import axios from 'axios'
import {useState,useEffect} from 'react'
import './App.css'
// 
const App=() => { 

  const [todo,setTodo]= useState(null)
  const[todos,setTodos]= useState([])
  console.log(todos)

  const addTodo= async (e)=>{
    e.preventDefault()
    let response = await axios.post('http://localhost:5000/todos',{item:todo,status:'incomplete'})
    console.log(response)
    if (response.data.message="created.todo"){
      setTodos([...todos,response.data.data])
      setTodo('')
    }
    // setTodos([...todos,{id:todos.length+1,item:todo,status:'incomplete'}])
    // setTodo('')
  }

  const completeTodo= async (checked,id) =>{
    if(checked===true){
      let updatedTodo = await  axios.post(`http://localhost:5000/todos/complete/${id}`)
      console.log(updatedTodo)
      
      if(updatedTodo.data.message === 'Todo completed'){
        let newTodos=todos.map((singleTodo)=>{
          if(singleTodo._id === id){
              return  updatedTodo.data.data
          } else {
              return singleTodo
          }
        })
        setTodos(newTodos)
      }
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

  const getAllTodos= async()=>{
    let response=await  axios.get('http://localhost:5000/todos')
    console.log(response)
    setTodos(response.data)
  }
  
  const getCompletedTodos =() => {
    let completedTodos=todos.filter((todo)=>todo.status ==='complete')
    return completedTodos
  }
  
  const getIncompletedTodos =() => {
    let incompletedTodos=todos.filter((todo)=>todo.status ==='incomplete')
    return incompletedTodos
  }

  useEffect(()=>{
    getAllTodos()
    console.log('this runs when the page has loaded for the first time!')
  },[todo])

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
         <button 
          style={todo ? styles.btn : styles.greyBtn}
          disabled={todo ? false : true}
          >Submit</button>
      </form>
        
      <h3>Incompleted todos</h3>
      {
        getIncompletedTodos().map((todo,idx)=>{
          return (
            <div style={styles.todoContainer}>
              <p>{idx + 1}.{todo.item}</p> 
              <input type='checkbox'
              onChange={(e)=>completeTodo(e.target.checked,todo._id)}/>
            </div>
          )
        })
      }

      <h3>CompletedTodos</h3>
      {
         getCompletedTodos().map((todo,idx)=>{
          return (
            <div style={styles.todoContainer}>
            <p>{idx + 1}.{todo.item}</p>
            </div>
          
          // todo.filter((todo)=>todo.status ==='complete' )
          // todos.map((todo,idx)=>{
          //   return (
          //     <div style={styles.todoContainer}>
          // <p>{idx + 1}.{todo.item}</p>
          //  <p>{todo.status}</p>

          //  <input type='checkbox'
          //   onChange={(e)=>completeTodo(e.target.checked,todo._id)}
          //   />
          //  </div>
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
  todoContainer: {
    display:'flex',
    justifyContent:'space-between'
  },
  greyBtn: {
    backgroundColor:'grey',
    cursor: 'not-allowed',
    margin:'10px'
  }
}

export default App
