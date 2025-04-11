  import React, { useState, useEffect, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import {useLanguage} from './LanguageContext.jsx';
  import translations from './translations.jsx';
  import trainService from './services/trainService.js';
  export default function HomePage() {
    const {language} = useLanguage();
    const navigate = useNavigate();
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [numPassengers, setNumPassengers] = useState(1);
    const [selectedSection, setSelectedSection] = useState('selectTicket');
    
    // Add station selection state
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
    const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
    const [filteredDepartureStations, setFilteredDepartureStations] = useState([]);
    const [filteredArrivalStations, setFilteredArrivalStations] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const departureInputRef = useRef(null);
    const arrivalInputRef = useRef(null);
    const departureDropdownRef = useRef(null);
    const arrivalDropdownRef = useRef(null);

    // Get today and tomorrow dates
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getTomorrowDate = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    };

    useEffect(() => {
      const fetchStations = async () => {
        try {
          const stations = await trainService.getAllStations();
          setAllStations(stations);
        } catch (error) {
          console.error("Error fetching stations:", error);
          setAllStations(["İstanbul","Ankara"]); // Set to empty array on error
        }
      };
      fetchStations();
    }, []);

    useEffect(() => {
      const today = getTodayDate();
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

    const handleTripTypeChange = (type) => {
      setIsRoundTrip(type === 'roundTrip');
      if (type === 'roundTrip') {
        // When switching to round trip, set return date to departure date if it's not already set
        if (!returnDate || returnDate < departureDate) {
          setReturnDate(departureDate);
        }
      }
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

    // New function to swap departure and arrival stations
    const swapStations = () => {
      if (departureStation && arrivalStation) {
        const tempStation = departureStation;
        setDepartureStation(arrivalStation);
        setArrivalStation(tempStation);
        // Update filtered lists
        updateFilteredDepartureStations(arrivalStation);
        updateFilteredArrivalStations(departureStation);
      }
    };

    // Date shortcut functions
    const setDepartureDateToday = () => {
      const today = getTodayDate();
      setDepartureDate(today);
      if (isRoundTrip && returnDate < today) {
        setReturnDate(today);
      }
    };

    const setDepartureDateTomorrow = () => {
      const tomorrow = getTomorrowDate();
      setDepartureDate(tomorrow);
      if (isRoundTrip && returnDate < tomorrow) {
        setReturnDate(tomorrow);
      }
    };

    const setReturnDateSameDay = () => {
      setReturnDate(departureDate);
    };

    const setReturnDateNextDay = () => {
      const nextDay = new Date(departureDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setReturnDate(nextDay.toISOString().split('T')[0]);
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      
      // Validate stations against current station list
      if (!allStations.includes(departureStation) || !allStations.includes(arrivalStation)) {
        alert(translations[language].invalidStationsError);
        return;
      }

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
      
      localStorage.removeItem('ticketId');
      localStorage.removeItem('lastName');
      localStorage.removeItem('isLookup');
      
      // Navigate to the my-tickets page with ticket ID and last name
      navigate('/my-tickets', { 
        state: { 
          isLookup: true,
          ticketId: ticketId,
          lastName: lastName
        } 
      });
    };

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-lg lg:mt-10 lg:ml-10">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-sm">{translations[language].bookTickets}</span>
          </div>
          <div 
            className={`flex items-center justify-center space-x-2 w-1/2 px-4 py-3 cursor-pointer transition-colors duration-200 ${
              selectedSection === 'myTickets' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-blue-50 text-blue-800'
            }`}
            onClick={() => setSelectedSection('myTickets')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="font-medium text-sm">{translations[language].myTickets}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-5">
          {selectedSection === 'selectTicket' && (
            <form className="space-y-4" onSubmit={handleSearchSubmit}>
              {/* Modern toggle buttons instead of radio buttons */}
              <div className="flex justify-between bg-gray-100 rounded-lg p-1">
                <button 
                  type="button"
                  onClick={() => handleTripTypeChange('oneWay')}
                  className={`flex-1 py-2 px-3 rounded-md transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 ${
                    !isRoundTrip 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span>{translations[language].oneWay}</span>
                </button>
                <div className="mx-1"></div>
                <button 
                  type="button"
                  onClick={() => handleTripTypeChange('roundTrip')}
                  className={`flex-1 py-2 px-3 rounded-md transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 ${
                    isRoundTrip 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>{translations[language].roundTrip}</span>
                </button>
              </div>

              {/* Station selection with swap button - Modern style */}
              <div className="flex items-center space-x-2">
                {/* From station */}
                <div className="relative flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {translations[language].departure}
                    </span>
                  </label>
                  <input 
                    ref={departureInputRef}
                    type="text" 
                    placeholder={translations[language].departureStation} 
                    className="p-2 text-sm rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none"
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
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
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
                        <div className="p-2 text-gray-500 text-sm">{translations[language].stationResult}</div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Swap button - In the middle */}
                <div className="flex items-center justify-center mt-6">
                  <button 
                    type="button"
                    onClick={swapStations}
                    className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                    title={translations[language].swapStations}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
                
                {/* To station */}
                <div className="relative flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {translations[language].arrival}
                    </span>
                  </label>
                  <input 
                    ref={arrivalInputRef}
                    type="text" 
                    placeholder={translations[language].arrivalStation}
                    className="p-2 text-sm rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none"
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
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
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
                        <div className="p-2 text-gray-500 text-sm">{translations[language].stationResult}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Date selection - Modern style */}
              <div className="flex space-x-4">
                {/* Departure date with quick shortcuts */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {translations[language].departureDate}
                    </span>
                  </label>
                  <div className="relative">
                    <input 
                      min={new Date().toISOString().split('T')[0]}
                      type="date" 
                      value={departureDate}
                      onChange={handleDepartureDateChange}
                      className="p-2 text-sm rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none"
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      style={{paddingRight: "100px"}} 
                    />
                    <div className="absolute right-0 top-0 h-full flex">
                      <div className="flex h-full border-l border-gray-300 bg-gray-50 rounded-r-md overflow-hidden">
                        <button 
                          type="button"
                          onClick={setDepartureDateToday}
                          className="px-2 h-full hover:bg-blue-50 text-blue-600 text-xs font-medium transition-colors duration-200"
                          title="Today"
                        >
                          {translations[language].today}
                        </button>
                        <div className="w-px h-full bg-gray-300"></div>
                        <button 
                          type="button"
                          onClick={setDepartureDateTomorrow}
                          className="px-2 h-full hover:bg-blue-50 text-blue-600 text-xs font-medium transition-colors duration-200"
                          title="Tomorrow"
                        >
                          {translations[language].tomorrow}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Return date with quick shortcuts */}
                <div className="flex-1">
                  <label className={`block text-xs font-medium mb-1 ${isRoundTrip ? 'text-gray-700' : 'text-gray-400'}`}>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {translations[language].returnDate}
                    </span>
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={returnDate}
                      onChange={handleReturnDateChange}
                      min={departureDate}
                      className={`p-2 text-sm rounded-md border w-full focus:outline-none transition-all duration-200 ${
                        isRoundTrip 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white' 
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isRoundTrip}
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      style={{paddingRight: "100px"}} 
                    />
                    {isRoundTrip && (
                      <div className="absolute right-0 top-0 h-full flex">
                        <div className="flex h-full border-l border-gray-300 bg-gray-50 rounded-r-md overflow-hidden">
                          <button 
                            type="button"
                            onClick={setReturnDateSameDay}
                            className="px-2 h-full hover:bg-blue-50 text-blue-600 text-xs font-medium transition-colors duration-200"
                            title="Same Day"
                          >
                            {translations[language].same}
                          </button>
                          <div className="w-px h-full bg-gray-300"></div>
                          <button 
                            type="button"
                            onClick={setReturnDateNextDay}
                            className="px-2 h-full hover:bg-blue-50 text-blue-600 text-xs font-medium transition-colors duration-200"
                            title="Next Day"
                          >
                            {translations[language].next}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-3">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {translations[language].homeSearch}
                </button>
              </div>
            </form>
          )}

          {selectedSection === 'myTickets' && (
            <form className="space-y-4 w-full mx-auto" onSubmit={handleTicketLookup}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    {translations[language].ticketId}
                  </span>
                </label>
                <input 
                  name="ticketId"
                  type="text" 
                  placeholder={translations[language].enterTicketId} 
                  className="p-2 text-sm rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {translations[language].lastname}
                  </span>
                </label>
                <input 
                  name="lastName"
                  type="text" 
                  placeholder={translations[language].enterLastName}
                  className="p-2 text-sm rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none"
                  required
                />
              </div>
              <div className="pt-3">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {translations[language].findMyTickets}
                </button>
              </div>
            </form>
          )}
        </div>
      </div> 
    );
  }