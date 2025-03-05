import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import WagonSelector from './WagonSelector';


const TrainSeatSelection = () => {
  // Initial state
  const [selectedSeats, setSelectedSeats] = useState({
    outbound: [],
    return: []
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract train information from previous page
  const { train, returnTrain, tripType } = location.state || {};

  const createWagons = (isReturn = false) => {
    const baseTrain = isReturn ? returnTrain : train;
    const checkNumber = (num) => {
        return num > 3 ? 1 : 0;
      };
    return [
      // Business Class Wagon
      {
        id: 1,
        name: "Business Class",
        type: 'business',
        seats: [
          ...Array(8).fill().map((_, columnIndex) => [
            {
              id: `0-${columnIndex * 6 + 1 +checkNumber(columnIndex)}`,
              number: columnIndex%4 * 6 +1 +checkNumber(columnIndex) ,
              position: 'business-window',
              taken: [3, 5].includes(columnIndex * 6 + 1 +checkNumber(columnIndex)),
              price: 250 // Higher price for business class
            },
            {
              id: `0-${columnIndex * 6 + 4 +checkNumber(columnIndex)}`,
              number: columnIndex%4 * 6 + 4 + checkNumber(columnIndex),
              position: 'business-aisle',
              taken: [2, 6].includes(columnIndex * 6 + 4 +checkNumber(columnIndex)),
              price: 250
            }
          ]).flat(),
          ...Array(4).fill().map((_, columnIndex) => [
            {
              id: `0-${columnIndex * 6 + 3}`,
              number: columnIndex * 6 + 3,
              position: 'bottom-window',
              taken: [17,18 ].includes(columnIndex * 6 + 3),
              price: 250
            },
            {
              id: `0-${columnIndex * 6 + 6}`,
              number: columnIndex * 6 + 6,
              position: 'bottom-aisle',
              taken: [18, 72].includes(columnIndex * 6 + 6),
              price: 250
            }
          ]).flat()
        ]
      },
      // Existing Economy Wagons
      {
        id: 2,
        name: "Economy",
        seats: [
          // Top side seats (window)
          ...Array(16).fill().map((_, columnIndex) => [
            {
              id: `1-${columnIndex * 4 + 1}`,
              number: columnIndex * 4 + 1,
              position: 'top-window',
              taken: [3, 7].includes(columnIndex * 4 + 1),
              price: 100
            },
            {
              id: `1-${columnIndex * 4 + 2}`,
              number: columnIndex * 4 + 2,
              position: 'top-aisle',
              taken: [18, 24].includes(columnIndex * 4 + 2),
              price: 100
            },
            {
              id: `1-${columnIndex * 4 + 3}`,
              number: columnIndex * 4 + 3,
              position: 'bottom-aisle',
              taken: [35, 39].includes(columnIndex * 4 + 3),
              price: 100
            },
            {
              id: `1-${columnIndex * 4 + 4}`,
              number: columnIndex * 4 + 4,
              position: 'bottom-window',
              taken: [52, 56].includes(columnIndex * 4 + 4),
              price: 100
            }
          ]).flat()
        ]
      },
      {
        id: 3,
        name: "Economy",
        seats: [
          ...Array(16).fill().map((_, columnIndex) => [
            {
              id: `2-${columnIndex * 4 + 1}`,
              number: columnIndex * 4 + 1,
              position: 'top-window',
              taken: [1,5].includes(columnIndex * 4 + 1),
              price: 100
            },
            {
              id: `2-${columnIndex * 4 + 2}`,
              number: columnIndex * 4 + 2,
              position: 'top-aisle',
              taken: [18, 24].includes(columnIndex * 4 + 2),
              price: 100
            },
            {
              id: `2-${columnIndex * 4 + 3}`,
              number: columnIndex * 4 + 3,
              position: 'bottom-aisle',
              taken: [31].includes(columnIndex * 4 + 3),
              price: 100
            },
            {
              id: `2-${columnIndex * 4 + 4}`,
              number: columnIndex * 4 + 4,
              position: 'bottom-window',
              taken: [60,64 ].includes(columnIndex * 4 + 4),
              price: 100
            }
          ]).flat()
        ]
      }
    ];
  };
  
  // Mock train data with top/bottom layout (you would replace this with actual train data)
  const trains = tripType === 'round-trip' 
    ? [
        {
          ...train,
          type: 'outbound',
          wagons: createWagons(false)
        },
        {
          ...returnTrain,
          type: 'return',
          wagons: createWagons(true)
        }
      ]
    : [
        {
          ...train,
          type: 'outbound',
          wagons: createWagons(false)
        }
      ];

  // State to track current wagon for each train
  const [currentWagons, setCurrentWagons] = useState(
    tripType === 'round-trip' 
      ? { outbound: 0, return: 0 } 
      : { outbound: 0 }
  );

  // Handle seat selection
  const toggleSeatSelection = (trainType, wagonId, seatNumber, isTaken) => {
    if (isTaken) return;
    
    const seatId = `${wagonId}-${seatNumber}`;
    
    // Create a copy of the current selected seats
    const updatedSelectedSeats = {...selectedSeats};
    
    // Check if seat is already selected
    const existingSeatIndex = updatedSelectedSeats[trainType].findIndex(
      seat => seat.id === seatId
    );
    
    if (existingSeatIndex !== -1) {
      // Remove seat if already selected
      updatedSelectedSeats[trainType].splice(existingSeatIndex, 1);
    } else {
      // Add seat if not selected
      updatedSelectedSeats[trainType].push({
        id: seatId,
        wagon: wagonId,
        number: seatNumber
      });
    }
    
    setSelectedSeats(updatedSelectedSeats);
  };

  // Check if seat is selected
  const isSeatSelected = (trainType, wagonId, seatNumber) => {
    return selectedSeats[trainType].some(
      seat => seat.id === `${wagonId}-${seatNumber}`
    );
  };

  // Navigation functions for wagons
  const selectWagon = (trainType, wagonIndex) => {
    setCurrentWagons(prev => ({
      ...prev,
      [trainType]: wagonIndex
    }));
  };

  const goToPreviousWagon = (trainType) => {
    setCurrentWagons(prev => ({
      ...prev,
      [trainType]: Math.max(prev[trainType] - 1, 0)
    }));
  };

  // Group seats by their position for a specific train and wagon
  const getSeatsGroupedByPosition = (trainType, wagonIndex) => {
    const currentWagon = trains.find(t => t.type === trainType).wagons[wagonIndex];
    
    // If it's a business class wagon, return all seats
    if (currentWagon.type === 'business') {
      return {
        business: currentWagon.seats
      };
    }
    
    // Existing logic for economy wagons
    const currentWagonSeats = currentWagon.seats;
    return {
      topWindow: currentWagonSeats.filter(seat => seat.position === 'top-window'),
      topAisle: currentWagonSeats.filter(seat => seat.position === 'top-aisle'),
      bottomAisle: currentWagonSeats.filter(seat => seat.position === 'bottom-aisle'),
      bottomWindow: currentWagonSeats.filter(seat => seat.position === 'bottom-window')
    };
  };

  const proceedToPrevPage = () => {
    navigate("/select-train");
  };

  // Proceed to payment page
  const proceedToPayment = () => {
    // Ensure equal number of seats selected for round trip
    if (tripType === 'round-trip' && 
        selectedSeats.outbound.length !== selectedSeats.return.length) {
      alert('Please select the same number of seats for both outbound and return trains');
      return;
    }

    // Create payment data
    const paymentData = {
      selectedSeats: selectedSeats,
      outboundTrain: train,
      returnTrain: returnTrain,
      tripType: tripType
    };
    
    // Navigate to payment page
    navigate("/payment", { 
      state: { 
        bookingData: paymentData 
      }
    });
  };

  // Render train seat selection
  const renderTrainSeatSelection = (trainType) => {
    const train = trains.find(t => t.type === trainType);
    const currentWagonIndex = currentWagons[trainType];
    const currentWagon = train.wagons[currentWagonIndex];
    const groupedSeats = getSeatsGroupedByPosition(trainType, currentWagonIndex);

    return (
        
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {trainType === 'outbound' ? 'Outbound Train' : 'Return Train'}
        </h2>
        <WagonSelector 
          trains={trains}
          trainType={trainType}
          currentWagonIndex={currentWagonIndex}
          onWagonSelect={selectWagon}
        />

        <div className="border-2 border-gray-400 rounded-lg bg-gray-100 p-2 pl-5">
        {currentWagon.type === 'business' ? (
          <div>
          {/* First Row */}
          <div className="grid grid-cols-8 gap-1 mb-2 pl-8">
            {groupedSeats.business.slice(0, 16).map((seat) => (
              <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                  ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                  isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
              >
                {seat.number}
              </div>
            ))}
          </div>

          {/* Aisle space */}
          <div className="w-full h-17 flex items-center justify-center my-2">
            <div className="h-full w-full flex items-center justify-center text-sm font-medium rounded">
              
            </div>
          </div>
          

          {/* Second Row */}
          <div className="grid grid-cols-8 gap-1 pl-8">
            {groupedSeats.business.slice(16).map((seat) => (
              <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                  ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                  isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
              >
                {seat.number}
              </div>
            ))}
          </div>
        </div>
      ) : (
          <div className="space-y-2">
            {/* Top Window Seats */}
            {/* Top side seats (window row) */}
            <div className="grid grid-cols-16 gap-1">
            {groupedSeats.topWindow.map((seat) => (
                <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType,train.wagons[currentWagonIndex].id, seat.number, seat.taken)}
                className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                    isSeatSelected(trainType,train.wagons[currentWagonIndex].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
                >
                {seat.number}
                </div>
            ))}
            </div>
            
            {/* Top side seats (aisle row) */}
            <div className="grid grid-cols-16 gap-1">
            {groupedSeats.topAisle.map((seat) => (
                <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType,train.wagons[currentWagonIndex].id, seat.number, seat.taken)}
                className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                    isSeatSelected(trainType,train.wagons[currentWagonIndex].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
                >
                {seat.number}
                </div>
            ))}
            </div>
            
            {/* Aisle space */}
            <div className="w-full h-6 flex items-center justify-center my-2">
            <div className="h-full w-full flex items-center justify-center text-sm font-medium rounded">
                
            </div>
            </div>
            
            {/* Bottom side seats (aisle row) */}
            <div className="grid grid-cols-16 gap-1">
            {groupedSeats.bottomAisle.map((seat) => (
                <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType,train.wagons[currentWagonIndex].id, seat.number, seat.taken)}
                className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                    isSeatSelected(trainType,train.wagons[currentWagonIndex].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
                >
                {seat.number}
                </div>
            ))}
            </div>
            
            {/* Bottom side seats (window row) */}
            <div className="grid grid-cols-16 gap-1">
            {groupedSeats.bottomWindow.map((seat) => (
                <div 
                key={seat.id}
                onClick={() => toggleSeatSelection(trainType,train.wagons[currentWagonIndex].id, seat.number, seat.taken)}
                className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                    isSeatSelected(trainType,train.wagons[currentWagonIndex].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                `}
                >
                {seat.number}
                </div>
            ))}
            </div>
        
          </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl pt-30 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {tripType === 'round-trip' ? 'Select Seats for Round Trip' : 'Select Your Seats'}
      </h1>
      
      {/* Render train seat selections */}
      {tripType === 'round-trip' ? (
        <>
          {renderTrainSeatSelection('outbound')}
          {renderTrainSeatSelection('return')}
        </>
      ) : (
        renderTrainSeatSelection('outbound')
      )}
      
      {/* Selected seats summary */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Selected Seats</h3>
        {tripType === 'round-trip' ? (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Outbound Train Seats</h4>
              {selectedSeats.outbound.length === 0 ? (
                <p className="text-gray-500">No seats selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.outbound.map(seat => (
                    <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                      Wagon {seat.wagon}, Seat {seat.number}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium mb-2">Return Train Seats</h4>
              {selectedSeats.return.length === 0 ? (
                <p className="text-gray-500">No seats selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.return.map(seat => (
                    <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                      Wagon {seat.wagon}, Seat {seat.number}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          selectedSeats.outbound.length === 0 ? (
            <p className="text-gray-500">No seats selected</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.outbound.map(seat => (
                <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                  Wagon {seat.wagon}, Seat {seat.number}
                </div>
              ))}
            </div>
          )
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={proceedToPrevPage}>
          Back
        </button>
        <button 
          disabled={
            tripType === 'one-way' 
              ? selectedSeats.outbound.length === 0 
              : selectedSeats.outbound.length === 0 || selectedSeats.return.length === 0 || 
                selectedSeats.outbound.length !== selectedSeats.return.length
          }
          className={`px-6 py-3 rounded-md ${
            (tripType === 'one-way' && selectedSeats.outbound.length === 0) || 
            (tripType === 'round-trip' && (
              selectedSeats.outbound.length === 0 || 
              selectedSeats.return.length === 0 ||selectedSeats.outbound.length !== selectedSeats.return.length
            ))
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
          onClick={proceedToPayment}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default TrainSeatSelection;