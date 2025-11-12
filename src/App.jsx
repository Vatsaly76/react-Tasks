import React from 'react'
import Todo from './tasks/Todo.jsx'
import WeatherApp from './tasks/WeatherApp.jsx'
import JokeGenerator from './tasks/JokeGenerator.jsx'
import GalleryProject from './tasks/GalleryProject.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-500'>
      {/* <Todo />       */}
      {/* <WeatherApp /> */}
      {/* <JokeGenerator /> */}
      <GalleryProject />
    </div>
  )
}

export default App
