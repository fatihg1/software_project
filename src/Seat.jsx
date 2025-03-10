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
  
    // 🛑 Kullanıcının Doğrudan URL Girerek Gelmesini Engelle
    useEffect(() => {
      if (!location.state || !location.state.train) {
        navigate("/ErrorPage", { replace: true }); // Kullanıcıyı ana sayfaya yönlendir
      }
    }, [location, navigate]);
  
    // Eğer `location.state` yoksa, hiçbir şey render etme (önlem)
    if (!location.state || !location.state.train) {
      return null; // Kullanıcı yönlendirilirken boş bir sayfa göster
    }

    
  // Extract train information from previous page
  const { train, returnTrain, tripType } = location.state || {};

  const createWagons = (isReturn = false) => {
    const baseTrain = isReturn ? returnTrain : train;
    const checkNumber = (num) => {
        return num > 3 ? 1 : 0;
      };
    const numberforbeds = (num,num2) => {
      return num > num2 ? 0 : 0 ;
    };
    return [
      // Business Class Wagon
      {
        id: 1,
        name: "Business",
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
        type: "economy",
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
        type: "economy",
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
      },
      {
        id: 4,
        name: "Sleeper",
        type: 'sleeper',
        seats: [
          // Top berths - keep the same IDs and internal numbers, display numbers will be changed in the UI
          ...Array(7).fill().map((_, index) => ({
            id: `3-${index * 2 + 1 - numberforbeds(index*2+1,10)}`,
            number: index * 2 + 1 - numberforbeds(index*2+1,10),
            position: 'top-berth',
            taken: [3, 7].includes(index * 2 + 1 - numberforbeds(index*2+1,10)),
            price: 180
          })),
          // Bottom berths - keep the same IDs and internal numbers, display numbers will be changed in the UI
          ...Array(7).fill().map((_, index) => ({
            id: `3-${index * 2 + 1 - numberforbeds(index*2+1,10)+1}`,
            number: index * 2 + 1 - numberforbeds(index*2+1,10)+1,
            position: 'bottom-berth',
            taken: [2, 8].includes(index * 2 + 1 - numberforbeds(index*2+1,10)+1),
            price: 200 // Bottom berths usually cost more
          })),
          
        ]
      },
      // Lodge Wagon - using seats array instead of compartments
      {
        id: 5,
        name: "Lodge",
        type: 'lodge',
        seats: [
          ...Array(7).fill().map((_, index) => {
            const lodgeLetter = String.fromCharCode(65 + index); // A, B, C, D, E, F
            const lodgeNumber = index; // 0 for A, 1 for B, etc.
            
            return {
              id: lodgeLetter,
              number: lodgeLetter, // A, B, C, D, E, F
              position: 'compartment',
              capacity: 4,
              // Instead of marking the whole compartment as taken
              // takenSeats: which individual seats are taken (1, 2, 3, or 4)
              
              takenSeats: [2].includes(index + 1) ? [1, 3] : [], // Example: compartments B and E have seats 1 and 3 taken
              taken: [2, 5].includes(index + 1),
              price: 350, // Price per compartment
              seatNumbers: [1, 2, 3, 4].map(seatIndex => lodgeNumber * 4 + seatIndex)
            };
          })
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
  const toggleSeatSelection = (trainType, wagonId, compartmentNumber, isTaken, seatNum) => {
    // Return early if the seat is already taken
    if (isTaken) return;
    
    // Create a unique ID for the specific seat within the compartment
    const seatId = `${wagonId}-${compartmentNumber}-${seatNum}`;
    
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
        compartment: compartmentNumber,
        number: seatNum || compartmentNumber
      });
    }
    
    setSelectedSeats(updatedSelectedSeats);
  };

  // Check if seat is selected
  const isSeatSelected = (trainType, wagonId, compartmentNumber, seatNum) => {
    const seatId = `${wagonId}-${compartmentNumber}-${seatNum}`;
    return selectedSeats[trainType]?.some(seat => seat.id === seatId) || false;
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
    
    // If it's a sleeper wagon, group by berth position
    if (currentWagon.type === 'sleeper') {
      return {
        topBerth: currentWagon.seats.filter(seat => seat.position === 'top-berth'),
        bottomBerth: currentWagon.seats.filter(seat => seat.position === 'bottom-berth')
      };
    }
    
    // If it's a lodge wagon, no grouping needed
    if (currentWagon.type === 'lodge') {
      return {
        compartments: currentWagon.seats
      };
    }
    
    // Default economy wagon grouping
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
          {/* Business Class Wagon */}
          {currentWagon.type === 'business' && (
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
          )}
  
          {/* Economy Wagon */}
          {!currentWagon.type || currentWagon.type === 'economy' && (
  <div className="space-y-2">
    {/* Wrap all seat rows in a container with horizontal scroll */}
    <div className="overflow-x-auto pb-4">
      <div className="min-w-max">
        {/* Top Window Seats */}
        <div className="flex mb-2 justify-between">
          {groupedSeats.topWindow.map((seat) => (
            <div 
              key={seat.id}
              onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs mx-0.5
                ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
              `}
            >
              {seat.number}
            </div>
          ))}
        </div>
        
        {/* Top side seats (aisle row) */}
        <div className="flex mb-2 justify-between">
          {groupedSeats.topAisle.map((seat) => (
            <div 
              key={seat.id}
              onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs mx-0.5
                ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
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
        <div className="flex mb-2 justify-between">
          {groupedSeats.bottomAisle.map((seat) => (
            <div 
              key={seat.id}
              onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs mx-0.5
                ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
              `}
            >
              {seat.number}
            </div>
          ))}
        </div>
        
        {/* Bottom side seats (window row) */}
        <div className="flex justify-between">
          {groupedSeats.bottomWindow.map((seat) => (
            <div 
              key={seat.id}
              onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer text-xs mx-0.5
                ${seat.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                isSeatSelected(trainType, currentWagon.id, seat.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
              `}
            >
              {seat.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
  
{/* Sleeper Wagon */}
{currentWagon.type === 'sleeper' && (
  <div className="flex flex-col h-46">
    <div className="text-center mb-2 text-sm text-gray-500 font-semibold">
      
    </div>
    <div className="flex overflow-x-auto pb-4">
      {/* Create 10 rooms in a horizontal row */}
      <div className="flex gap-2 min-w-max">
        {Array.from({ length: 7 }, (_, roomIndex) => {
          // Get the two beds for this room (top and bottom)
          const topBed = currentWagon.seats.find(
            seat => seat.position === 'top-berth' && Math.floor((seat.number - 1) / 2) === roomIndex
          );
          const bottomBed = currentWagon.seats.find(
            seat => seat.position === 'bottom-berth' && Math.floor((seat.number - 1) / 2) === roomIndex
          );

          return (
            <div key={roomIndex} className="border border-gray-400 rounded p-2 w-28">
              <div className="text-xs text-center font-medium mb-1">{roomIndex + 1}</div>
              
              {/* Room layout with beds on the left side */}
              <div className="flex h-24">
                {/* Left side - beds */}
                <div className="w-1/3 flex flex-col space-y-2 border-r border-gray-300 pr-1">
                  {/* Top bed */}
                  {topBed && (
                    <div
                      onClick={() => toggleSeatSelection(trainType, currentWagon.id, topBed.number, topBed.taken)}
                      className={`
                        flex items-center justify-center h-10 rounded cursor-pointer text-xs
                        ${topBed.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                        isSeatSelected(trainType, currentWagon.id, topBed.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                      `}
                    >
                      {topBed.number}
                    </div>
                  )}
                  
                  {/* Bottom bed */}
                  {bottomBed && (
                    <div
                      onClick={() => toggleSeatSelection(trainType, currentWagon.id, bottomBed.number, bottomBed.taken)}
                      className={`
                        flex items-center justify-center h-10 rounded cursor-pointer text-xs
                        ${bottomBed.taken ? 'bg-red-500 text-white cursor-not-allowed' : 
                        isSeatSelected(trainType, currentWagon.id, bottomBed.number) ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200 border border-gray-300'}
                      `}
                    >
                      {bottomBed.number}
                    </div>
                  )}
                </div>
                
                {/* Right side - room space */}
                <div className="w-2/3 pl-1 flex items-center justify-center">
                  <div className="text-xs text-gray-400"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}
  
          {/* Lodge Wagon */}
{/* Lodge Wagon */}
{currentWagon.type === 'lodge' && (
  <div className='flex flex-col'>
    
    <div className="pl-3 relative flex overflow-x-auto ">
      {/* Lodge compartments row at the top */}
      <div className="flex justify-center mb-12 ">
        {currentWagon.seats.map((compartment) => {
          const lodgeNumber = compartment.number.charCodeAt(0) - 65; // Convert A->0, B->1, etc.
          
          return (
            <div
              key={compartment.id}
              className="flex flex-col min-w-24 items-center m-2 p-2 rounded-md border-2 border-gray-300 bg-gray-50"
            >
              <span className="text-sm font-bold mb-1"> {compartment.number.charCodeAt(0) - 64}</span>
              
              {/* 2x2 grid for the 4 seats inside each compartment */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {[0, 1, 2, 3].map((index) => {
                  // Get the calculated seat number from the seatNumbers array
                  const seatNumber = compartment.seatNumbers[index];
                  // Original seat index (1-4) for checking if taken
                  const originalSeatIndex = index + 1;
                  
                  // Check if this specific seat is taken
                  const isTaken = compartment.takenSeats && 
                                compartment.takenSeats.includes(originalSeatIndex);
                  
                  return (
                    <button
                      key={`${compartment.number}-${seatNumber}`}
                      onClick={() => toggleSeatSelection(
                        trainType, 
                        currentWagon.id, 
                        compartment.number, 
                        isTaken, 
                        seatNumber // Pass the calculated seat number
                      )}
                      disabled={isTaken}
                      className={`
                        flex items-center justify-center p-2 rounded cursor-pointer text-xs
                        ${isTaken ? 'bg-red-500 text-white cursor-not-allowed' :
                          isSeatSelected(trainType, currentWagon.id, compartment.number, seatNumber) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white hover:bg-gray-100 border border-gray-300'}
                      `}
                    >
                       {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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