import React, { useState } from 'react';
import Icon from './Icon.jsx';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    // const monthNames = [
    //     "January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    // ];

    const fetchWeather = async () => {
        if (city.trim() === '') return;

        const apiKey = import.meta.env.VITE_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url2);
            const weatherData = await response.json();

            if (weatherData.cod === 200) {
                setWeather(weatherData);
            } else {
                setWeather(null);
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "200") {
                setForecast(data.list);
            } else {
                setForecast(null);
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching the forecast data:', error);
        }
    };

    const formatForecastDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const getTime = (timestamp, timezone) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <div className='bg-blue-200 grid'>
            <h1 className='h-12 text-center content-center font-bold'>Weather</h1>
            <div className="grid columns-12 p-2 gap-2">
                <input
                    className='col-start-0 col-span-9 h-8 rounded-md focus:outline-none px-2 py-1'
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className='col-start-10 col-span-3 h-8 p-1 rounded-md bg-sky-600 text-white font-semibold'
                    onClick={fetchWeather}
                >
                    Search
                </button>
            </div>

            {weather && (
                <div className='flex flex-col justify-center items-center p-4'>
                    <div className='grid columns-12 w-full'>
                        <div className='col-start-1 col-span-6 flex flex-col justify-end'>
                            <p>{getTime(weather.dt, weather.timezone)}</p>
                            <p>{formatForecastDate(weather.dt)}</p>
                            <p className='text-5xl font-bold'>{Math.round(weather.main.temp)}&deg;C</p>
                            <p className='text-lg font-semibold'>{weather.name}</p>
                        </div>
                        <div className='col-start-7 col-span-6 flex flex-col items-end justify-end'>
                            <Icon iconId={weather.weather[0].icon} width={125} />
                            <p className='text-lg font-semibold'>{weather.weather[0].main}</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-4 gap-2 w-full p-2'>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Humidity</p>
                            <p className='font-bold text-lg'>{weather.main.humidity}%</p>
                        </div>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Pressure</p>
                            <p className='font-bold text-lg'>{weather.main.pressure} mb</p>
                        </div>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Wind</p>
                            <p className='font-bold text-lg'>{Math.round(weather.wind.speed * 3.6)} km/hr</p>
                        </div>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Clouds</p>
                            <p className='font-bold text-lg'>{weather.clouds.all}%</p>
                        </div>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Sunrise</p>
                            <p className='font-bold text-lg'>{getTime(weather.sys.sunrise)}</p>
                        </div>
                        <div className='col-span-2 bg-blue-300 rounded-md p-2'>
                            <p className='text-sm'>Sunset</p>
                            <p className='font-bold text-lg'>{getTime(weather.sys.sunset)}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex justify-center items-center'>
                <p className='font-bold text-opacity-25 text-black'>Forecast</p>
            </div>

            <div className='flex flex-col gap-2 p-2'>
                {forecast &&
                    forecast.map((ele, i) => (
                        <div key={i} className='grid columns-12 h-16 bg-blue-100 rounded-md p-2 justify-between'>
                            <div className='col-span-8 col-start-1'>
                                <div className='text-sm'>{formatForecastDate(ele.dt)}</div>
                                <div className='text-lg font-semibold'>{getTime(ele.dt)}</div>
                            </div>
                            <div className='col-span-2 col-start-9 flex justify-center items-center'>
                                <Icon iconId={ele.weather[0].icon} width={50} />
                            </div>
                            <div className='col-span-2 col-start-11 h-full flex items-center text-2xl font-bold'>
                                {Math.round(ele.main.temp)}&deg;C
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Weather;
