import React, { useState } from 'react'

const Todo = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, description }]);
    setTitle('');
    setDescription('');
    console.log(mainTask);
  }
  const deletehandler = (indexToDelete) => {
    let copyMainTask = [...mainTask];
    copyMainTask.splice(indexToDelete, 1);
    setMainTask(copyMainTask);
  }


  let renderedTasks = <h2 className='text-center text-gray-700 font-bold'>NO Tasks Available</h2>
  if (mainTask.length > 0) {
    renderedTasks = mainTask.map((task, index) => {
      return (
        <li key={index} className='flex items-center justify-between'>
          <div key={index} className='flex justify-between w-2/3 p-2 my-2 rounded-md mb-2'>
            <h3 className='font-semibold text-lg'><span className='p-2 rounded-lg bg-gray-700 text-white mr-5'>Task.{index + 1}</span> {task.title}</h3>
            <h2 className='text-gray-900 text-xl'>{task.description}</h2>
          </div>
          <button
            onClick={() => {
              deletehandler(index)
            }}
            className='p-2 rounded-full bg-red-600 text-white mr-5'>Delete</button>
        </li>
      )
    })
  }

  return (
    <div className='flex flex-col p-4'>
      <div className='p-4 bg-gray-400 shadow-md mb-4 rounded-md'>
        <h1 className="text-2xl font-extrabold bg-[url('https://as1.ftcdn.net/jpg/03/22/93/98/1000_F_322939865_BR3OhGmbADfzu6xss3iDGUfQ2s0TT8ZV.jpg')] 
                   bg-cover bg-center text-transparent bg-clip-text">Todo List</h1>
      </div>

      <form onSubmit={submitHandler} className='h-full  flex flex-col items-center justify-center bg-gray-400 shadow-md p-6 rounded-lg'>
        <h1 className='text-2xl font-bold mb-2 bg-[url("https://img.freepik.com/free-vector/colorful-background-with-multicolored-hair-dye_125964-1622.jpg?semt=ais_hybrid&w=740&q=80")] 
                   bg-cover bg-center text-transparent bg-clip-text'>Todo Component</h1>
        <input type="text" placeholder="Add Title" className='border p-2 rounded-lg text-amber-50'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }} />
        <input type="text" placeholder="Description" className='border p-2 rounded-lg mt-2 text-amber-50'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }} />
        <button className='mt-2 bg-blue-500 text-white p-2 rounded-lg'>Add Task</button>

      </form>
      <div className='mt-4 p-4 bg-gray-400 shadow-md rounded-md'>
        <h2 className='text-xl font-bold mt-4 bg-[url("https://img.freepik.com/free-vector/colorful-background-with-multicolored-hair-dye_125964-1622.jpg?semt=ais_hybrid&w=740&q=80")] 
                   bg-cover bg-center text-transparent bg-clip-text'>Tasks:</h2>
        <ul>{renderedTasks}</ul>
      </div>

    </div>
  )
}

export default Todo
