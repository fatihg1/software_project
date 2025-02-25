import React from 'react';
import img1 from '/img1.png';
import img2 from '/img2.png';
import img3 from '/img3.png';
import img4 from '/img4.png';
import img5 from '/img5.png';
import img6 from '/img6.png';

const routes = [
  { img: img1, info: 'Ankara to Istanbul' },
  { img: img2, info: 'Izmir to Istanbul' },
  { img: img3, info: 'Izmir to Bursa' },
  { img: img4, info: 'Antalya to Konya' },
  { img: img5, info: 'Konya to Alanya' },
  { img: img6, info: 'Sivas to Ankara' },
];

function Routes() {
  return (
    <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-4xl mt-15">Popular Routes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-auto my-15">
      {routes.map((route, index) => (
        <div key={index} className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-md">
          <img src={route.img} alt={route.info} className="h-80 w-80 mb-4 rounded-sm" />
          <span className="text-lg font-semibold text-gray-800">{route.info}</span>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Routes