import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import {motion} from 'framer-motion';
import {useLanguage} from './LanguageContext.jsx';
import translations from './translations.jsx';
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      delay: 0.2
    }
  }
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = [
    { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
    { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
    { name: 'İzmir', lat: 38.4192, lon: 27.1287 },
    { name: 'Antalya', lat: 36.8969, lon: 30.7133 }
  ];

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      '01': <Sun className="w-12 h-12 text-yellow-500" />, 
      '02': <Cloud className="w-12 h-12 text-gray-400" />, 
      '03': <Cloud className="w-12 h-12 text-gray-500" />, 
      '04': <Cloud className="w-12 h-12 text-gray-600" />, 
      '09': <CloudRain className="w-12 h-12 text-blue-400" />, 
      '10': <CloudRain className="w-12 h-12 text-blue-500" />, 
      '11': <CloudRain className="w-12 h-12 text-gray-700" />, 
      '13': <CloudSnow className="w-12 h-12 text-white" />, 
      '50': <Wind className="w-12 h-12 text-gray-300" />, 
    };

    return iconMap[weatherCode] || <Cloud className="w-12 h-12 text-gray-400" />;
  };
  const {language} = useLanguage();
  useEffect(() => {
    
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = cities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=tr`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          return {
            name: city.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon.slice(0, 2),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
          };
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Unable to receive weather data!:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-1/2 right-10 transform -translate-y-1/2 w-64 bg-white shadow-lg rounded-l-lg p-4 animate-pulse">
        {translations[language].loading}
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-1/2 right-10 transform -translate-y-1/2 w-64 bg-white shadow-lg rounded-l-lg p-4 text-red-500">
        {translations[language].weatherError}: {error}
      </div>
    );
  }

  return (
    <motion.div 
    className="flex justify-center items-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={slideUp}>
    <div className="sm:right-40 sm:top-50 p-5 bg-white shadow-lg max-w-3/4 rounded-lg sm:block hidden">
    <h2 className="text-xl font-bold mb-3 text-center">{translations[language].weather}</h2>
    <div className="flex flex-row gap-3 2-full overflow-x-auto pb-2">
      {weatherData.map((city) => (
        <div
          key={city.name}
          className="bg-gray-100 rounded-lg p-3 flex-shrink-0 w-[200px]"
        >
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold truncate">{city.name}</h3>
              {getWeatherIcon(city.icon)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{city.temperature}°C</span>
              <div className="text-xs text-gray-500 text-right">
                <p>{translations[language].humidity}: {city.humidity}%</p>
                <p>{translations[language].windSpeed}: {city.windSpeed.toFixed(1)} m/s</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </motion.div>
  );
};

export default WeatherDashboard;
