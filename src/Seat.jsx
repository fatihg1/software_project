import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TrainSeatSelection = () => {
  // Initial state
  const [currentWagon, setCurrentWagon] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPageInfo = location.state?.train;
  
  // Mock train data with top/bottom layout
  const train = {
    name: "train name",
    wagons: [
      {
        id: 1,
        name: "Wagon 1",
        seats: [
          // Top side seats (window)
          ...Array(16).fill().map((_, columnIndex) => [
            // Top window (first row of each column)
            {
              id: `1-${columnIndex * 4 + 1}`,
              number: columnIndex * 4 + 1,
              position: 'top-window',
              taken: [3, 7].includes(columnIndex * 4 + 1)
            },
            // Top aisle (second row of each column)
            {
              id: `1-${columnIndex * 4 + 2}`,
              number: columnIndex * 4 + 2,
              position: 'top-aisle',
              taken: [18, 24].includes(columnIndex * 4 + 2)
            },
            // Bottom aisle (third row of each column)
            {
              id: `1-${columnIndex * 4 + 3}`,
              number: columnIndex * 4 + 3,
              position: 'bottom-aisle',
              taken: [35, 39].includes(columnIndex * 4 + 3)
            },
            // Bottom window (fourth row of each column)
            {
              id: `1-${columnIndex * 4 + 4}`,
              number: columnIndex * 4 + 4,
              position: 'bottom-window',
              taken: [52, 56].includes(columnIndex * 4 + 4)
            }
          ]).flat() // Flatten the array of arrays
        ]
      },
      {
        id: 2,
        name: "Wagon 2",
        seats: [
          ...Array(16).fill().map((_, columnIndex) => [
            // Top window (first row of each column)
            {
              id: `2-${columnIndex * 4 + 1}`,
              number: columnIndex * 4 + 1,
              position: 'top-window',
              taken: [2, 8].includes(columnIndex * 4 + 1)
            },
            // Top aisle (second row of each column)
            {
              id: `2-${columnIndex * 4 + 2}`,
              number: columnIndex * 4 + 2,
              position: 'top-aisle',
              taken: [18, 24].includes(columnIndex * 4 + 2)
            },
            // Bottom aisle (third row of each column)
            {
              id: `2-${columnIndex * 4 + 3}`,
              number: columnIndex * 4 + 3,
              position: 'bottom-aisle',
              taken: [35, 39].includes(columnIndex * 4 + 3)
            },
            // Bottom window (fourth row of each column)
            {
              id: `2-${columnIndex * 4 + 4}`,
              number: columnIndex * 4 + 4,
              position: 'bottom-window',
              taken: [52, 56].includes(columnIndex * 4 + 4)
            }
          ]).flat() // Flatten the array of arrays
        ]
      }
    ]
  };


  // Handle seat selection
  const toggleSeatSelection = (wagonId, seatNumber, isTaken) => {
    if (isTaken) return;
    
    const seatId = `${wagonId}-${seatNumber}`;
    if (selectedSeats.some(seat => seat.id === seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, {
        id: seatId,
        wagon: wagonId,
        number: seatNumber
      }]);
    }
  };

  // Check if seat is selected
  const isSeatSelected = (wagonId, seatNumber) => {
    return selectedSeats.some(seat => seat.id === `${wagonId}-${seatNumber}`);
  };

  // Navigation functions
  const goToNextWagon = () => {
    if (currentWagon < train.wagons.length - 1) {
      setCurrentWagon(currentWagon + 1);
    }
  };

  const goToPreviousWagon = () => {
    if (currentWagon > 0) {
      setCurrentWagon(currentWagon - 1);
    }
  };

  // Group seats by their position
  const getSeatsGroupedByPosition = () => {
    const currentWagonSeats = train.wagons[currentWagon].seats;
    return {
      topWindow: currentWagonSeats.filter(seat => seat.position === 'top-window'),
      topAisle: currentWagonSeats.filter(seat => seat.position === 'top-aisle'),
      bottomAisle: currentWagonSeats.filter(seat => seat.position === 'bottom-aisle'),
      bottomWindow: currentWagonSeats.filter(seat => seat.position === 'bottom-window')
    };
  };

  const groupedSeats = getSeatsGroupedByPosition();

  const proceedToPrevPage = () => {
    navigate("/select-train");
  };

  // NEW FUNCTION: Proceed to payment page with selected seats and previous page info
  const proceedToPayment = () => {
    // Create an object containing all the information to send to the payment page
    const paymentData = {
      selectedSeats: selectedSeats,
      trainInfo: prevPageInfo,
      trainName: train.name
    };
    
    // Navigate to the payment page with the collected data
    navigate("/payment", { 
      state: { 
        bookingData: paymentData 
      }
    });
  };

  return (
    <div className="max-w-4xl pt-15 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Select Your Seats</h1>
      
      {/* Train info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-800">{train.name}</h2>
        <p className="text-blue-600">Please select your seats</p>
      </div>
      
      {/* Wagon selection and navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={goToPreviousWagon} 
          disabled={currentWagon === 0}
          className={`px-4 py-2 rounded-md ${currentWagon === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Previous Wagon
        </button>

        <div className="font-medium text-lg">
          {train.wagons[currentWagon].name}
        </div>
        
        <button 
          onClick={goToNextWagon} 
          disabled={currentWagon === train.wagons.length - 1}
          className={`px-4 py-2 rounded-md ${currentWagon === train.wagons.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Next Wagon
        </button>
      </div>
      
      {/* Seat map */}
      <div className="mb-8">
        <div className="mb-2 text-center py-2 bg-gray-200 rounded-t-lg font-semibold">
            {prevPageInfo?.departure} - {prevPageInfo?.arrival}
        </div>
        
        <div className="border-2 border-gray-300 rounded-b-lg p-4">
          {/* Train layout with top and bottom sides */}
          <div className="border-2 border-gray-400 rounded-lg bg-gray-100 p-2 pl-5">
            {/* Top side seats (window row) */}
            <div className="grid grid-cols-16 gap-1">
              {groupedSeats.topWindow.map((seat) => (
                <div 
                  key={seat.id}
                  onClick={() => toggleSeatSelection(train.wagons[currentWagon].id, seat.number, seat.taken)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                      isSeatSelected(train.wagons[currentWagon].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                  `}
                >
                  {seat.number}
                </div>
              ))}
            </div>
            
            {/* Top side seats (aisle row) */}
            <div className="grid grid-cols-16 gap-1 mt-1">
              {groupedSeats.topAisle.map((seat) => (
                <div 
                  key={seat.id}
                  onClick={() => toggleSeatSelection(train.wagons[currentWagon].id, seat.number, seat.taken)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                      isSeatSelected(train.wagons[currentWagon].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                  `}
                >
                  {seat.number}
                </div>
              ))}
            </div>
            
            {/* Aisle space */}
            <div className="w-full h-6 flex items-center justify-center my-2">
              <div className="h-full w-full bg-gray-100 flex items-center justify-center text-sm font-medium rounded">
                
              </div>
            </div>
            
            {/* Bottom side seats (aisle row) */}
            <div className="grid grid-cols-16 gap-1">
              {groupedSeats.bottomAisle.map((seat) => (
                <div 
                  key={seat.id}
                  onClick={() => toggleSeatSelection(train.wagons[currentWagon].id, seat.number, seat.taken)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                      isSeatSelected(train.wagons[currentWagon].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                  `}
                >
                  {seat.number}
                </div>
              ))}
            </div>
            
            {/* Bottom side seats (window row) */}
            <div className="grid grid-cols-16 gap-1 mt-1">
              {groupedSeats.bottomWindow.map((seat) => (
                <div 
                  key={seat.id}
                  onClick={() => toggleSeatSelection(train.wagons[currentWagon].id, seat.number, seat.taken)}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs
                    ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                      isSeatSelected(train.wagons[currentWagon].id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                  `}
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white border border-gray-300 mr-1"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-1"></div>
              <span>Taken</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-1"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected seats summary */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Selected Seats</h3>
        {selectedSeats.length === 0 ? (
          <p className="text-gray-500">No seats selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                Wagon {seat.wagon}, Seat {seat.number}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={proceedToPrevPage}>
          Back
        </button>
        <button 
          disabled={selectedSeats.length === 0}
          className={`px-6 py-3 rounded-md ${selectedSeats.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          onClick={proceedToPayment}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default TrainSeatSelection;