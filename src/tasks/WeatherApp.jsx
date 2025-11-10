import React, { useState, useEffect } from 'react'

const WeatherApp = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState("")
    
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    
    useEffect(() => {
        document.title = 'Weather App | React Tasks';
    }, []);
    
    const searchWeather = async(e) => {
        e.preventDefault(); 
        if (!city) {
            setError("Please enter a city name");
            return;
        }
        
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            if (!response.ok) {
                throw new Error('City not found')
            }
            const data = await response.json();
            setWeatherData(data)
            setError(null)
        } catch (error) {
            setError(error.message)
            setWeatherData(null)
        }
    };
    return (
        <div
            className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://i.pinimg.com/1200x/4f/a5/64/4fa564a0e1d6ec4597d06b8be0dd2387.jpg')",
            }}
        >
            <nav className="bg-black/20 p-3 shadow-md flex justify-between items-center rounded-2xl m-3 backdrop-blur-md shrink-0">
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                    <span className="relative inline-block">
                        <span
                            className="absolute -inset-1 rounded-xl bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600 opacity-70 blur-md"
                            aria-hidden="true"
                        />
                        <span className="relative bg-linear-to-r from-sky-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)]">
                            Weather <span className="font-light">App</span>
                        </span>
                    </span>
                </h1>
                <form onSubmit={searchWeather} className="space-x-2 mr-2 text-black flex">
                    <input
                        type="text"
                        placeholder="Search city weather..."
                        className="p-2 bg-black/20 backdrop-blur-md text-gray-100 placeholder-gray-300 rounded-l border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/60 outline-none transition"
                        spellCheck="false"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-2 px-4 bg-linear-to-r border-none from-blue-500 via-indigo-500 to-purple-600 text-white font-medium rounded-r shadow hover:from-blue-400 hover:to-purple-500 focus:ring-2 focus:ring-offset-1 focus:ring-blue-400/60 transition active:scale-[.97]"
                    >
                        Get Weather
                    </button>
                </form>
            </nav>
            
            {error && ( 
                <div className="flex items-center justify-center px-4">
                    <div className="bg-red-500/20 backdrop-blur-md border border-red-400/50 text-red-100 px-6 py-3 rounded-xl text-center shadow-lg">
                        <span className="text-xl mr-2">⚠️</span>
                        <span className="text-base font-medium">{error}</span>
                    </div>
                </div>
            )}

            {weatherData && (
                <main className="flex items-center justify-center flex-1 p-3 overflow-y-auto">
                    <div className="bg-linear-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-xl p-5 rounded-3xl shadow-2xl text-white max-w-4xl w-full mx-4 border border-white/10">
                        
                        {/* Top Section: Location, Date & Main Weather */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            {/* Left: Location and Date */}
                            <div className="text-left">
                                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                                    <span>📍</span>
                                    {weatherData.name}, {weatherData.sys.country}
                                </h2>
                                <p className="text-gray-300 text-xs">
                                    {new Date().toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>

                            {/* Right: Main Weather */}
                            <div className="flex items-center justify-end gap-3">
                                <img 
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt={weatherData.weather[0].description}
                                    className="w-20 h-20 drop-shadow-lg"
                                />
                                <div className="text-right">
                                    <p className="text-5xl font-bold">
                                        {Math.round(weatherData.main.temp)}°C
                                    </p>
                                    <p className="text-sm capitalize text-gray-200">
                                        {weatherData.weather[0].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feels Like Section */}
                        <div className="flex justify-center gap-3 text-xs text-gray-300 mb-4 pb-4 border-b border-white/10">
                            <span>Feels like: {Math.round(weatherData.main.feels_like)}°C</span>
                            <span>•</span>
                            <span>Min: {Math.round(weatherData.main.temp_min)}°C</span>
                            <span>•</span>
                            <span>Max: {Math.round(weatherData.main.temp_max)}°C</span>
                        </div>

                        {/* Weather Details Grid - Compact */}
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                            {/* Humidity */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">💧</div>
                                <div className="text-lg font-semibold">{weatherData.main.humidity}%</div>
                                <div className="text-[10px] text-gray-300">Humidity</div>
                            </div>

                            {/* Wind Speed */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">💨</div>
                                <div className="text-lg font-semibold">{weatherData.wind.speed} m/s</div>
                                <div className="text-[10px] text-gray-300">Wind</div>
                            </div>

                            {/* Pressure */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">🌡️</div>
                                <div className="text-lg font-semibold">{weatherData.main.pressure}</div>
                                <div className="text-[10px] text-gray-300">Pressure</div>
                            </div>

                            {/* Visibility */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">👁️</div>
                                <div className="text-lg font-semibold">{(weatherData.visibility / 1000).toFixed(1)}</div>
                                <div className="text-[10px] text-gray-300">Visibility</div>
                            </div>

                            {/* Sunrise */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">🌅</div>
                                <div className="text-sm font-semibold">
                                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
                                        hour: '2-digit', 
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </div>
                                <div className="text-[10px] text-gray-300">Sunrise</div>
                            </div>

                            {/* Sunset */}
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center border border-white/5 hover:bg-white/15 transition">
                                <div className="text-2xl mb-1">🌇</div>
                                <div className="text-sm font-semibold">
                                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { 
                                        hour: '2-digit', 
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </div>
                                <div className="text-[10px] text-gray-300">Sunset</div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    )
}

export default WeatherApp
