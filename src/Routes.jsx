import React from 'react';
import img1 from '/img1.png';
import img2 from '/img2.png';
import img3 from '/img3.png';
import img4 from '/img4.png';
import img5 from '/img5.png';
import img6 from '/img6.png';
import { Link, useNavigate } from 'react-router-dom';

const routes = [
  { img: img1, info: 'Ankara to Istanbul' },
  { img: img2, info: 'Istanbul to Izmir' },
  { img: img3, info: 'Izmir to Bursa' },
  { img: img4, info: 'Antalya to Konya' },
  { img: img5, info: 'Konya to Antalya' },
  { img: img6, info: 'Sivas to Ankara' },
];

function Routes() {
  const navigate = useNavigate();
  
  const handleRouteClick = (routeInfo) => {
    // Extract departure and arrival from route info
    const parts = routeInfo.split(' to ');
    const departure = parts[0];
    const arrival = parts[1];
    
    // Navigate to ticket search with parameters
    navigate('/select-train', {
      state: {
        departure,
        arrival,
        date: new Date().toISOString().split('T')[0], // Today's date as default
        isRoundTrip: false
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Routes</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition group"
            onClick={() => handleRouteClick(route.info)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={route.img} 
                alt={route.info} 
                className="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold">{route.info}</h3>
                  <p className="mt-1 text-sm">Find available trains</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Routes;