import React, { useState,useEffect } from 'react'

const JokeGenerator = () => {
  const [joke, setJoke] = useState('')
  const [error, setError] = useState(null)

  const generateJokes = async () => {
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
        const data = await response.json();
        setError(null);
        setJoke(data);
      }
      catch (error) {
        console.error("Error fetching joke:", error);
        setError(error.message);
      }
  }
  useEffect(() =>{
    document.title = "Joke Generator | React Tasks";
  }, [])

return (
    <div
        className='flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden'
        style={{ 
            backgroundImage: "url(./joke.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
    >
        {error && <div className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800' role='alert'>
            <span className='font-medium'>Error:</span> {error}
        </div>}

        {joke && (
            <div className='p-8 max-w-2xl w-full mx-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 transform transition-all duration-300 hover:scale-105'>
                <div className='mb-6'>
                    <p className='text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-4'>
                        {joke.setup}
                    </p>
                </div>
                <div className='pt-4 border-t-2 border-dashed border-gray-400'>
                    <p className='text-lg md:text-xl font-semibold text-indigo-600 leading-relaxed flex items-center justify-center gap-2'>
                        <span className='text-2xl'>😂</span>
                        {joke.punchline}
                    </p>
                </div>
                {joke.id && (
                    <div className='mt-4 text-xs text-gray-600 text-center'>
                        Joke #{joke.id}
                    </div>
                )}
            </div>
        )}
        <button
            onClick={generateJokes}
            className='mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-white cursor-pointer
                                 bg-linear-to-r from-pink-500 via-indigo-500 to-blue-400
                                 shadow-lg shadow-indigo-500/20
                                 transition-all duration-200
                                 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 hover:shadow-xl hover:-translate-y-0.5
                                 active:translate-y-0 active:shadow-lg
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2'
        >
            Generate Joke
        </button>
    </div>
)
}

export default JokeGenerator
