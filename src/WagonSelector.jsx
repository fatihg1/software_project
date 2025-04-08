import React from 'react';

const WagonSelector = ({
  trains,
  trainType,
  currentWagonIndex,
  onWagonSelect,
  showPrices  // Add this prop to the component
}) => {
  const train = trains.find(t => t.type === trainType);
  
  return (
    <div className="w-full overflow-x-auto mb-4">
      <div className="flex space-x-4 pb-2">
        {train.wagons.map((wagon, index) => (
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
            <div className="font-bold text-lg">{wagon.name}</div>
            <div className="text-sm">
              Wagon {index+1}
            </div>
            <div className="text-sm">
              {wagon.type === 'lodge'
                ? `${wagon.seats.length*4 - wagon.seats.filter(seat => seat.taken).length} ${wagon.seats.filter(seat => !seat.taken).length === 1 ? "seat" : "seats"} left`
                : `${wagon.seats.filter(seat => !seat.taken).length} ${wagon.seats.filter(seat => !seat.taken).length === 1 ? "seat" : "seats"} left`
              }
            </div>
            {/* Add price display when showPrices is true */}
            {showPrices && (
              <div className="text-sm mt-1 font-medium">
                {wagon.price.toFixed(2)}$ per seat
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;