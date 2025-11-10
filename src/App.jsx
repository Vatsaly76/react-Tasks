import React from 'react'
import Todo from './tasks/Todo.jsx'
import WeatherApp from './tasks/WeatherApp.jsx'
import JokeGenerator from './tasks/JokeGenerator.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-500'>
      {/* <Todo />       */}
      {/* <WeatherApp /> */}
      <JokeGenerator />
    </div>
  )
}

export default App
