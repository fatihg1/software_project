import React from 'react';
import img1 from '/img1.png';
import img2 from '/img2.png';
import img3 from '/img3.png';
import img4 from '/img4.png';
import img5 from '/img5.png';
import img6 from '/img6.png';
import { Link } from 'react-router-dom';
 
const routes = [
  { img: img1, info: 'Ankara to Istanbul' },
  { img: img2, info: 'Istanbul to Izmir' },
  { img: img3, info: 'Izmir to Bursa' },
  { img: img4, info: 'Antalya to Konya' },
  { img: img5, info: 'Konya to Antalya' },
  { img: img6, info: 'Sivas to Ankara' },
];

function Routes() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold text-4xl mt-15">Popular Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-auto my-15">
        {routes.map((route, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
            <div className="overflow-hidden rounded-sm hover:cursor-pointer">
              <Link to="/select-train">
                <img 
                  src={route.img} 
                  alt={route.info} 
                  className="h-80 w-80 mb-4 rounded-sm transition duration-500 ease-in-out transform hover:scale-110 hover:brightness-110"
                />
              </Link>
            </div>
            <span className="text-lg font-semibold text-gray-800 transition duration-300 ease-in-out group-hover:text-blue-600">{route.info}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Routes;