import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '/img1.png';
import img2 from '/img2.png';
import img3 from '/img3.png';
import img4 from '/img4.png';
import img5 from '/img5.png';
import img6 from '/img6.png';
import {useLanguage} from './LanguageContext.jsx';
import translations from './translations.jsx';
// Animation variants

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

// Stagger children animation
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animation for each route card
const routeCard = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 9
    }
  }
};

const routes = [
  { img: img1, info: 'Ankara - Istanbul' },
  { img: img2, info: 'Istanbul - Izmir' },
  { img: img3, info: 'Izmir - Bursa' },
  { img: img4, info: 'Antalya - Konya' },
  { img: img5, info: 'Konya - Antalya' },
  { img: img6, info: 'Eskişehir - Ankara' },
];

function Routes() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const handleRouteClick = (routeInfo) => {
    // Extract departure and arrival from route info
    const parts = routeInfo.split(' - ');
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
    <motion.div 
      className="max-w-6xl mx-auto p-6"
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, amount: 0.3 }}
      variants={slideUp}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{translations[language].popularRoutes}</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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
                  <p className="mt-1 text-sm">{translations[language].findTrains}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Routes;