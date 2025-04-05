import React from 'react';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const WagonSelector = ({ 
  trains, 
  trainType, 
  currentWagonIndex, 
  onWagonSelect 
}) => {
  const { language } = useLanguage();
  const train = trains.find(t => t.type === trainType);

  return (
    <div className="w-full overflow-x-auto mb-4">
      <div className="flex space-x-4 pb-2">
        {train.wagons.map((wagon, index) => {
          const availableSeats = wagon.type === 'lodge' 
            ? wagon.seats.length * 4 - wagon.seats.filter(seat => seat.taken).length
            : wagon.seats.filter(seat => !seat.taken).length;

          return (
            <button
              key={wagon.id}
              onClick={() => onWagonSelect(trainType, index)}
              className={`
                flex-shrink-0 p-4 rounded-lg shadow-md transition-all duration-300
                ${currentWagonIndex === index 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                w-48 flex flex-col items-start space-y-2
              `}
            >
              <div className="font-bold text-lg">
                {translations[language].wagonTypes[wagon.type]}
              </div>
              <div className="text-sm">
                {translations[language].wagon} {index + 1}
              </div>
              <div className="text-sm">
                {translations[language].seatsLeft.replace('{count}', availableSeats)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WagonSelector;