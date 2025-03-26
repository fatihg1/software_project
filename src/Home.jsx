import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import trainIcon from '/train.svg';
import ticketIcon from '/ticket.png';

export default function HomePage() {
  const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
  const [selectedSection, setSelectedSection] = useState('selectTicket');
  
  // Add station selection state
  const allStations = ["Istanbul", "Ankara", "Izmir", "Antalya", "Konya", "Eskişehir"];
  const [departureStation, setDepartureStation] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
  const [filteredDepartureStations, setFilteredDepartureStations] = useState([]);
  const [filteredArrivalStations, setFilteredArrivalStations] = useState([]);
  
  const departureInputRef = useRef(null);
  const arrivalInputRef = useRef(null);
  const departureDropdownRef = useRef(null);
  const arrivalDropdownRef = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDepartureDate(today);
    
    // Initialize filtered stations (excluding already selected stations)
    updateFilteredDepartureStations('');
    updateFilteredArrivalStations('');
    
    // Add click outside listener to close dropdowns
    const handleClickOutside = (event) => {
      if (departureDropdownRef.current && !departureDropdownRef.current.contains(event.target) &&
          departureInputRef.current && !departureInputRef.current.contains(event.target)) {
        setShowDepartureDropdown(false);
      }
      
      if (arrivalDropdownRef.current && !arrivalDropdownRef.current.contains(event.target) &&
          arrivalInputRef.current && !arrivalInputRef.current.contains(event.target)) {
        setShowArrivalDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to update filtered departure stations (excluding arrival station)
  const updateFilteredDepartureStations = (searchText) => {
    const filtered = allStations
      .filter(station => 
        station.toLowerCase().includes(searchText.toLowerCase()) && 
        station !== arrivalStation
      );
    setFilteredDepartureStations(filtered);
  };

  // Function to update filtered arrival stations (excluding departure station)
  const updateFilteredArrivalStations = (searchText) => {
    const filtered = allStations
      .filter(station => 
        station.toLowerCase().includes(searchText.toLowerCase()) && 
        station !== departureStation
      );
    setFilteredArrivalStations(filtered);
  };

  const handleDepartureDateChange = (e) => {
    const newDepartureDate = e.target.value;
    setDepartureDate(newDepartureDate);
    
    // If return date is earlier than the new departure date, update it
    if (isRoundTrip && returnDate < newDepartureDate) {
      setReturnDate(newDepartureDate);
    }
  };

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  const handleRoundTripChange = (e) => {
    setIsRoundTrip(e.target.checked);
    if (e.target.checked) {
      // When switching to round trip, set return date to departure date if it's not already set
      if (!returnDate || returnDate < departureDate) {
        setReturnDate(departureDate);
      }
    }
  };

  const handleOneWayChange = () => {
    setIsRoundTrip(false);
  };
  
  // Filter stations based on input
  const handleDepartureInputChange = (e) => {
    const value = e.target.value;
    setDepartureStation(value);
    updateFilteredDepartureStations(value);
    setShowDepartureDropdown(true);
  };
  
  const handleArrivalInputChange = (e) => {
    const value = e.target.value;
    setArrivalStation(value);
    updateFilteredArrivalStations(value);
    setShowArrivalDropdown(true);
  };
  
  // Select station from dropdown
  const selectDepartureStation = (station) => {
    setDepartureStation(station);
    setShowDepartureDropdown(false);
    // Update arrival stations to remove this selected departure station
    updateFilteredArrivalStations(arrivalStation);
  };
  
  const selectArrivalStation = (station) => {
    setArrivalStation(station);
    setShowArrivalDropdown(false);
    // Update departure stations to remove this selected arrival station
    updateFilteredDepartureStations(departureStation);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Validate essential inputs
    if (!departureStation || !arrivalStation || !departureDate) {
      alert("Please select departure, arrival stations and date");
      return;
    }
    console.log(departureStation, arrivalStation, departureDate, returnDate, numPassengers, isRoundTrip);
    // Navigate to the train selection page with search parameters
    navigate('/select-train', { 
      state: { 
        departure: departureStation,
        arrival: arrivalStation,
        date: departureDate,
        returnDate: isRoundTrip ? returnDate : null,
        numPassengers: numPassengers,
        isRoundTrip: isRoundTrip
      } 
    });
  };

  // Handle ticket lookup form submission
  const handleTicketLookup = (e) => {
    e.preventDefault();
    const ticketId = e.target.elements.ticketId.value;
    const lastName = e.target.elements.lastName.value;
    
    // Navigate to the my-tickets page with ticket ID and last name
    navigate('/my-tickets', { 
      state: { 
        ticketId: ticketId,
        lastName: lastName
      } 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md z-10 lg:w-1/2 md:w-3/4 w-screen overflow-hidden lg:mx-120 lg:mt-10 lg:ml-10">
      {/* Tab navigation - exactly 50/50 split */}
      <div className="flex w-full border-b border-gray-200">
        <div 
          className={`flex items-center justify-center space-x-2 w-1/2 px-4 py-3 cursor-pointer transition-colors duration-200 ${
            selectedSection === 'selectTicket' 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-blue-50 text-blue-800'
          }`}
          onClick={() => setSelectedSection('selectTicket')}
        >
          <img 
            src={trainIcon} 
            alt="Select Ticket" 
            className="h-5 w-5" 
          />
          <span className="font-medium text-sm">Book Tickets</span>
        </div>
        <div 
          className={`flex items-center justify-center space-x-2 w-1/2 px-4 py-3 cursor-pointer transition-colors duration-200 ${
            selectedSection === 'myTickets' 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-blue-50 text-blue-800'
          }`}
          onClick={() => setSelectedSection('myTickets')}
        >
          <img 
            src={ticketIcon} 
            alt="My Tickets" 
            className="h-5 w-5" 
          />
          <span className="font-medium text-sm">My Tickets</span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {selectedSection === 'selectTicket' && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSearchSubmit}>
            <div className="md:col-span-2 flex justify-between bg-blue-50 p-2 rounded">
              <div className="flex items-center space-x-1 cursor-pointer">
                <input 
                  type="radio" 
                  id="oneWay" 
                  name="tripType" 
                  checked={!isRoundTrip} 
                  onChange={handleOneWayChange} 
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="oneWay" className="text-blue-700 text-sm">One Way</label>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <input 
                  type="radio" 
                  id="roundTrip" 
                  name="tripType" 
                  checked={isRoundTrip} 
                  onChange={handleRoundTripChange} 
                  className="h-5 w-5 text-blue-600"
                />
                <label htmlFor="roundTrip" className="text-blue-700 text-sm">Round Trip</label>
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-blue-700 mb-1">From</label>
              <input 
                ref={departureInputRef}
                type="text" 
                placeholder="Departure station" 
                className="p-2 text-sm rounded border border-gray-300 w-full"
                value={departureStation}
                onChange={handleDepartureInputChange}
                onClick={() => {
                  updateFilteredDepartureStations(departureStation);
                  setShowDepartureDropdown(true);
                }}
                required
              />
              {showDepartureDropdown && (
                <div 
                  ref={departureDropdownRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto"
                >
                  {filteredDepartureStations.length > 0 ? (
                    filteredDepartureStations.map((station, index) => (
                      <div 
                        key={index} 
                        className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                        onClick={() => selectDepartureStation(station)}
                      >
                        {station}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500 text-sm">No stations found</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="relative">
              <label className="block text-xs font-medium text-blue-700 mb-1">To</label>
              <input 
                ref={arrivalInputRef}
                type="text" 
                placeholder="Arrival station" 
                className="p-2 text-sm rounded border border-gray-300 w-full"
                value={arrivalStation}
                onChange={handleArrivalInputChange}
                onClick={() => {
                  updateFilteredArrivalStations(arrivalStation);
                  setShowArrivalDropdown(true);
                }}
                required
              />
              {showArrivalDropdown && (
                <div 
                  ref={arrivalDropdownRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto"
                >
                  {filteredArrivalStations.length > 0 ? (
                    filteredArrivalStations.map((station, index) => (
                      <div 
                        key={index} 
                        className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                        onClick={() => selectArrivalStation(station)}
                      >
                        {station}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500 text-sm">No stations found</div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-1">Departure Date</label>
              <input 
                min={new Date().toISOString().split('T')[0]}
                type="date" 
                value={departureDate}
                onChange={handleDepartureDateChange}
                className="p-2 text-sm rounded border border-gray-300 w-full"
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
            
            
              <div>
                <label className="block text-xs font-medium text-blue-700 mb-1">Return Date</label>
                <input 
                  type="date" 
                  value={returnDate}
                  onChange={handleReturnDateChange}
                  min={departureDate} // This prevents selecting dates before departure date
                  className="p-2 text-sm rounded border border-gray-300 w-full"
                  disabled={!isRoundTrip}
                  onKeyDown={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                />
              </div>
            
            
            <div className={`md:col-span-2 pt-2`}>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-200"
              >
                Search for Trains
              </button>
            </div>
          </form>
        )}

        {selectedSection === 'myTickets' && (
          <form className="space-y-4 min-w-100.5 w-full mx-auto" onSubmit={handleTicketLookup}>
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-1">Ticket ID</label>
              <input 
                name="ticketId"
                type="text" 
                placeholder="Enter your ticket number" 
                className="p-2 text-sm rounded border border-gray-300 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-700 mb-1">Last Name</label>
              <input 
                name="lastName"
                type="text" 
                placeholder="Enter your last name" 
                className="p-2 text-sm rounded border border-gray-300 w-full"
                required
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-200"
              >
                Find My Tickets
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
