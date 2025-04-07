import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import WagonSelector from './WagonSelector';
import ProgressSteps from "./ProgressSteps.jsx";
import SeatIcon from './SeatIcon.jsx';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const TrainSeatSelection = () => {
  const { language } = useLanguage();
  const [selectedSeats, setSelectedSeats] = useState({
    outbound: [],
    return: []
  });
  // Add state for tracking selected seat prices
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({
    outbound: [],
    return: []
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.train) {
      navigate(translations[language].errorPagePath, { replace: true });
    }
  }, [location, navigate, language]);

  if (!location.state || !location.state.train) {
    return null;
  }

  // Extract train information from previous page
  const { train, returnTrain, tripType } = location.state || {};

  const parseWagonSeats = (wagonSeatsStr) => {
    try {
      // Handle binary string of 0s and 1s where 0 = available, 1 = taken
      if (typeof wagonSeatsStr === 'string' && /^[01]+$/.test(wagonSeatsStr)) {
        // Convert binary string to array of seat objects
        return wagonSeatsStr.split('').map((status, index) => ({
          number: index + 1,  // Seat numbers typically start at 1
          taken: status === '1'
        }));
      } 
      // Fallback to JSON parsing if it's not a binary string
      else if (typeof wagonSeatsStr === 'string') {
        return JSON.parse(wagonSeatsStr);
      }
      // If it's already an array, return it
      else if (Array.isArray(wagonSeatsStr)) {
        return wagonSeatsStr;
      }
      
      return [];
    } catch (error) {
      console.error("Error parsing wagon seats:", error);
      return [];
    }
  };

  const createWagons = (isReturn = false) => {
    const baseTrain = isReturn ? returnTrain : train;
    const wagons = [];
    
    // Loop through the wagon count and create wagon objects based on backend data
    for (let i = 0; i < baseTrain.wagonsCount; i++) {
      const wagonType = baseTrain.mergedWagonTypes[i];
      const wagonSeatsData = parseWagonSeats(baseTrain.mergedWagonSeats[i]);
      const basePrice = baseTrain.mergedWagonPrices[i];
      
      let seats = [];
      
      // Generate seats based on wagon type
      switch (wagonType.toLowerCase()) {
        case 'business':
          seats = wagonSeatsData.map(seat => ({
            id: `${i}-${seat.number}`,
            number: seat.number,
            position: seat.position || 'business-' + (seat.number % 2 === 0 ? 'aisle' : 'window'),
            taken: seat.taken || false,
            price: basePrice
          }));
          break;
          
        case 'economy':
          seats = wagonSeatsData.map(seat => ({
            id: `${i}-${seat.number}`,
            number: seat.number,
            position: seat.position || getEconomyPosition(seat.number),
            taken: seat.taken || false,
            price: basePrice
          }));
          break;
          
        case 'sleeper':
          seats = wagonSeatsData.map(seat => ({
            id: `${i}-${seat.number}`,
            number: seat.number,
            position: seat.position || (seat.number % 2 === 0 ? 'bottom-berth' : 'top-berth'),
            taken: seat.taken || false,
            price: basePrice * (seat.number % 2 === 0 ? 1.1 : 1) // Bottom berths slightly more expensive
          }));
          break;
          
        case 'lodge':
          // For lodge type, we need to handle compartments differently
          // Let's assume we have a fixed number of compartments and seats per compartment
          const numberOfCompartments = Math.ceil(wagonSeatsData.length / 4);
          seats = Array.from({ length: numberOfCompartments }, (_, compartmentIndex) => {
            const lodgeLetter = String.fromCharCode(65 + compartmentIndex);
            const compartmentSeats = wagonSeatsData.slice(compartmentIndex * 4, (compartmentIndex + 1) * 4);
            
            return {
              id: lodgeLetter,
              number: lodgeLetter,
              position: 'compartment',
              capacity: 4,
              takenSeats: compartmentSeats
                .map((seat, idx) => seat.taken ? idx + 1 : null)
                .filter(seat => seat !== null),
              taken: false, // The whole compartment is never fully taken
              price: basePrice,
              seatNumbers: [1, 2, 3, 4].map(seatIndex => (compartmentIndex * 4) + seatIndex)
            };
          });
          break;
          
        default:
          // Default to economy if type is not recognized
          seats = wagonSeatsData.map(seat => ({
            id: `${i}-${seat.number}`,
            number: seat.number,
            position: seat.position || getEconomyPosition(seat.number),
            taken: seat.taken || false,
            price: basePrice
          }));
      }
      
      wagons.push({
        id: i + 1, // Wagon IDs start from 1
        name: capitalizeFirstLetter(wagonType),
        type: wagonType.toLowerCase(),
        seats: seats,
        price: basePrice // Add base price to wagon object for display in WagonSelector
      });
    }
    
    return wagons;
  };
  
  // Helper function to determine economy seat position based on seat number
  const getEconomyPosition = (seatNumber) => {
    const modulo = seatNumber % 4;
    if (modulo === 1) return 'top-window';
    if (modulo === 2) return 'top-aisle';
    if (modulo === 3) return 'bottom-aisle';
    return 'bottom-window';
  };
  
  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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

  // Calculate total price based on selected seats
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    
    // Calculate outbound price
    trains.forEach(train => {
      const trainType = train.type;
      selectedSeats[trainType].forEach(selectedSeat => {
        const wagonIndex = selectedSeat.wagon - 1;
        const seatNumber = selectedSeat.number;
        
        const wagon = train.wagons[wagonIndex];
        let seatPrice = 0;
        
        if (wagon.type === 'lodge') {
          // For lodge, use the base price
          seatPrice = wagon.price;
        } else {
          // For other wagon types, find the specific seat
          const seat = wagon.seats.find(s => s.number === seatNumber);
          if (seat) {
            seatPrice = seat.price;
          }
        }
        
        totalPrice += seatPrice;
      });
    });
    
    return totalPrice;
  };

  // Handle seat selection
  const toggleSeatSelection = (trainType, wagonId, compartmentNumber, isTaken, seatNum) => {
    // Return early if the seat is already taken
    if (isTaken) return;
    
    // Create a unique ID for the specific seat within the compartment
    const seatId = `${wagonId}-${compartmentNumber}-${seatNum}`;
    
    // Create a copy of the current selected seats
    const updatedSelectedSeats = {...selectedSeats};
    const updatedSelectedSeatPrices = {...selectedSeatPrices};
    
    // Check if seat is already selected
    const existingSeatIndex = updatedSelectedSeats[trainType].findIndex(
      seat => seat.id === seatId
    );
    
    if (existingSeatIndex !== -1) {
      // Remove seat if already selected
      updatedSelectedSeats[trainType].splice(existingSeatIndex, 1);
      updatedSelectedSeatPrices[trainType].splice(existingSeatIndex, 1);
    } else {
      // Add seat if not selected
      const wagonIndex = wagonId - 1;
      const wagon = trains.find(t => t.type === trainType).wagons[wagonIndex];
      
      let seatPrice = 0;
      if (wagon.type === 'lodge') {
        seatPrice = wagon.price;
      } else {
        const seat = wagon.seats.find(s => s.number === (seatNum || compartmentNumber));
        seatPrice = seat ? seat.price : wagon.price;
      }
      
      updatedSelectedSeats[trainType].push({
        id: seatId,
        wagon: wagonId,
        compartment: compartmentNumber,
        number: seatNum || compartmentNumber
      });
      
      updatedSelectedSeatPrices[trainType].push(seatPrice);
    }
    
    setSelectedSeats(updatedSelectedSeats);
    setSelectedSeatPrices(updatedSelectedSeatPrices);
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
    if (tripType === 'round-trip' && selectedSeats.outbound.length !== selectedSeats.return.length) {
      alert(translations[language].seatSelectionError);
      return;
    }

    // Create payment data
    const paymentData = {
      selectedSeats: selectedSeats,
      selectedSeatPrices: selectedSeatPrices,
      outboundTrain: train,
      returnTrain: returnTrain,
      tripType: tripType,
      totalPrice: calculateTotalPrice() // Include total price in payment data
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
          {trainType === 'outbound' 
            ? translations[language].outboundTrain 
            : translations[language].returnTrain}
        </h2>
        <WagonSelector 
          trains={trains}
          trainType={trainType}
          currentWagonIndex={currentWagonIndex}
          onWagonSelect={selectWagon}
          showPrices={true} // Add this prop to indicate we want to show prices
        />
        
        {/* Apply fixed dimensions to the train display container */}
        <div className="border-2 border-gray-400 rounded-lg bg-gray-100 p-2 pl-5">
          {/* Fixed height and width container for all wagon types */}
          <div className="h-64 w-full overflow-auto relative">
            {/* Business Class Wagon */}
            {currentWagon.type === 'business' && (
              <div className="min-w-full">
                {/* First Row */}
                <div className="grid grid-cols-8 gap-1 mb-2 pl-8">
                  {groupedSeats.business.slice(0, 16).map((seat) => (
                    <div key={seat.id} className="flex items-center justify-center">
                    <SeatIcon 
                      number={seat.number}
                      taken={seat.taken}
                      selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                      onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                      type="business"
                      price={seat.price} // Pass the seat price to SeatIcon
                    />
                  </div>
                  ))}
                </div>
    
                {/* Aisle space */}
                <div className="w-full h-8 flex items-center justify-center my-2">
                  <div className="h-full w-full flex items-center justify-center text-sm font-medium rounded">
                  </div>
                </div>
    
                {/* Second Row */}
                <div className="grid grid-cols-8 gap-1 pl-8">
                {groupedSeats.business.slice(16).map((seat) => (
                  <div key={seat.id} className="flex items-center justify-center">
                    <SeatIcon
                      number={seat.number}
                      taken={seat.taken}
                      selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                      onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                      type="business"
                      price={seat.price} // Pass the seat price to SeatIcon
                    />
                  </div>
                ))}
              </div>
              </div>
            )}
    
            {/* Economy Wagon */}
            {(!currentWagon.type || currentWagon.type === 'economy') && (
              <div className="space-y-2 min-w-full">
                <div className="w-full pb-4">
                  <div className="min-w-full space-y-2">
                    <div className="flex mb-2 justify-between">
                      {groupedSeats.topWindow.map((seat) => (
                        <div key={seat.id} className="mx-0.5">
                          <SeatIcon
                            number={seat.number}
                            taken={seat.taken}
                            selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                            onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                            type="economy"
                            price={seat.price} // Pass the seat price to SeatIcon
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex mb-2 justify-between">
                      {groupedSeats.topAisle.map((seat) => (
                        <div key={seat.id} className="mx-0.5">
                          <SeatIcon
                            number={seat.number}
                            taken={seat.taken}
                            selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                            onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                            type="economy"
                            price={seat.price} // Pass the seat price to SeatIcon
                          />
                        </div>
                      ))}
                    </div>

                    <div className="w-full h-6" />

                    <div className="flex mb-2 justify-between">
                      {groupedSeats.bottomAisle.map((seat) => (
                        <div key={seat.id} className="mx-0.5">
                          <SeatIcon
                            number={seat.number}
                            taken={seat.taken}
                            selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                            onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                            type="economy"
                            price={seat.price} // Pass the seat price to SeatIcon
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      {groupedSeats.bottomWindow.map((seat) => (
                        <div key={seat.id} className="mx-0.5">
                          <SeatIcon
                            number={seat.number}
                            taken={seat.taken}
                            selected={isSeatSelected(trainType, currentWagon.id, seat.number)}
                            onClick={() => toggleSeatSelection(trainType, currentWagon.id, seat.number, seat.taken)}
                            type="economy"
                            price={seat.price} // Pass the seat price to SeatIcon
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sleeper Wagon */}
            {currentWagon.type === 'sleeper' && (
              <div className="flex flex-col w-full">
                <div className="flex w-full overflow-x-auto">
                  <div className="flex gap-2 min-w-full">
                    {Array.from({ length: Math.ceil(currentWagon.seats.length / 2) }, (_, roomIndex) => {
                      const topBed = currentWagon.seats.find(
                        seat => seat.position === 'top-berth' && Math.floor((seat.number - 1) / 2) === roomIndex
                      );
                      const bottomBed = currentWagon.seats.find(
                        seat => seat.position === 'bottom-berth' && Math.floor((seat.number - 1) / 2) === roomIndex
                      );

                      return (
                        <div key={roomIndex} className="border border-gray-400 rounded p-2 w-28">
                          <div className="text-xs text-center font-medium mb-1">{roomIndex + 1}</div>
                          <div className="flex h-24">
                            <div className="w-1/3 flex flex-col space-y-2 border-r border-gray-300 pr-1">
                              {topBed && (
                                <SeatIcon
                                  number={topBed.number}
                                  taken={topBed.taken}
                                  selected={isSeatSelected(trainType, currentWagon.id, topBed.number)}
                                  onClick={() => toggleSeatSelection(trainType, currentWagon.id, topBed.number, topBed.taken)}
                                  type="sleeper"
                                  price={topBed.price} // Pass the seat price to SeatIcon
                                />
                              )}
                              {bottomBed && (
                                <SeatIcon
                                  number={bottomBed.number}
                                  taken={bottomBed.taken}
                                  selected={isSeatSelected(trainType, currentWagon.id, bottomBed.number)}
                                  onClick={() => toggleSeatSelection(trainType, currentWagon.id, bottomBed.number, bottomBed.taken)}
                                  type="sleeper"
                                  price={bottomBed.price} // Pass the seat price to SeatIcon
                                />
                              )}
                            </div>
                            <div className="w-2/3 pl-1 flex items-center justify-center" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Lodge Wagon */}
            {currentWagon.type === 'lodge' && (
              <div className="flex flex-col w-full">
                <div className="pl-3 relative">
                  <div className="flex overflow-x-auto w-full">
                    <div className="flex gap-4 min-w-full">
                      {currentWagon.seats.map((compartment) => (
                        <div
                          key={compartment.id}
                          className="flex flex-col min-w-24 items-center m-2 p-2 rounded-md border-2 border-gray-300 bg-gray-50"
                        >
                          <span className="text-sm font-bold mb-1">
                            {compartment.number.charCodeAt(0) - 64}
                          </span>
                          <div className="grid grid-cols-2 gap-2 w-full">
                            {[0, 1, 2, 3].map((index) => {
                              const seatNumber = compartment.seatNumbers[index];
                              const originalSeatIndex = index + 1;
                              const isTaken = compartment.takenSeats?.includes(originalSeatIndex);

                              return (
                                <div key={`${compartment.number}-${seatNumber}`} className="w-full">
                                  <SeatIcon
                                    number={seatNumber}
                                    taken={isTaken}
                                    selected={isSeatSelected(trainType, currentWagon.id, compartment.number, seatNumber)}
                                    onClick={() => !isTaken && toggleSeatSelection(
                                      trainType,
                                      currentWagon.id,
                                      compartment.number,
                                      isTaken,
                                      seatNumber
                                    )}
                                    type="lodge"
                                    price={compartment.price} // Pass the seat price to SeatIcon
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Calculate the total price
  const totalPrice = calculateTotalPrice();

  return (
    <div className="flex flex-col md:flex-row gap-8 sm:p-6 sm:pt-15 max-w-6xl ml-30">
    <div className="w-full pt-30 mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          {tripType === 'round-trip' 
            ? translations[language].selectSeatsRoundTrip 
            : translations[language].selectSeatsSingle}
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
        <h3 className="text-lg font-medium mb-3">{translations[language].selectedSeats}</h3>
        {tripType === 'round-trip' ? (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">{translations[language].outboundSeats}</h4>
              {selectedSeats.outbound.length === 0 ? (
                <p className="text-gray-500">{translations[language].noSeatsSelected}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.outbound.map((seat, index) => (
                    <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                      {translations[language].wagonSeat
                          .replace('{wagon}', seat.wagon)
                          .replace('{seat}', seat.number)}
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium mb-2">{translations[language].returnSeats}</h4>
              {selectedSeats.return.length === 0 ? (
                <p className="text-gray-500">{translations[language].noSeatsSelected}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.return.map((seat, index) => (
                    <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                      {translations[language].wagonSeat
                          .replace('{wagon}', seat.wagon)
                          .replace('{seat}', seat.number)}
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          selectedSeats.outbound.length === 0 ? (
            <p className="text-gray-500">{translations[language].noSeatsSelected}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.outbound.map((seat, index) => (
                <div key={seat.id} className="bg-green-100 text-green-800 px-3 py-2 rounded-md">
                  {translations[language].wagonSeat
                      .replace('{wagon}', seat.wagon)
                      .replace('{seat}', seat.number)}
                  
                </div>
              ))}
            </div>
          )
        )}

        {/* Display total price */}
        {(selectedSeats.outbound.length > 0 || selectedSeats.return.length > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h4 className="font-bold text-lg flex justify-between">
              <span>{translations[language]?.totalPrice || 'Total Price'}:</span>
              <span>{totalPrice.toFixed(2)}</span>
            </h4>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={proceedToPrevPage}>
          {translations[language].backButton}
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
          {translations[language].continueToPayment}
        </button>
      </div>
    </div>
      <div className="md:sticky md:top-6 md:h-fit pt-12">
        
          <ProgressSteps currentStep="seat-selection" />
        
      </div>
    </div>
  );
};

export default TrainSeatSelection;