import { useState, useEffect } from "react";
import { Calendar, Search, MapPin, Clock, ArrowRight, RefreshCw, Info, ChevronDown, Repeat } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressSteps from "./ProgressSteps.jsx"
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext.jsx";
import translations from "./translations.jsx";
import trainService from "./services/trainService"; // Import the trainService

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

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      delay: 0.4
    }
  }
};

export default function TrainTicketSearch() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [tripType, setTripType] = useState("one-way");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [results, setResults] = useState([]);
  const [returnResults, setReturnResults] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedReturnTrain, setSelectedReturnTrain] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  // Load available stations from API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationsData = await trainService.getAllStations();
        setCities(stationsData);
      } catch (error) {
        console.error("Failed to load stations:", error);
        // Fallback to sample cities if API fails
        setCities(["Istanbul", "Ankara", "Izmir", "Antalya", "Konya", "Eskişehir"]);
      }
    };
    
    fetchStations();
  }, []);
  
  // Duration localization
  const translateDuration = (duration) => {
    if (typeof duration !== "number" || isNaN(duration)) return "";
  
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
  
    const hourPart = hours > 0 ? `${hours}${translations[language].hoursAbbr}` : "";
    const minutePart = minutes > 0 ? `${minutes}${translations[language].minutesAbbr}` : "";
  
    return `${hourPart} ${minutePart}`.trim();
  };

  // Initialize dates and handle incoming navigation state
  useEffect(() => {
    // Check if we have state from navigation
    if (location.state) {
      const { departure, arrival, date, returnDate, isRoundTrip } = location.state;
      
      // Set values from the passed state
      if (departure) setDeparture(departure);
      if (arrival) setArrival(arrival);
      if (date) setDate(date);
      
      // Set trip type and return date if it's a round trip
      if (isRoundTrip) {
        setTripType("round-trip");
        if (returnDate) setReturnDate(returnDate);
      } else {
        setTripType("one-way");
      }
    } else {
      // Default initialization if no state is passed
      setDate(today);
      setReturnDate(today);
    }
  }, []);

  // Handle return date when trip type or outbound date changes
  useEffect(() => {
    if (tripType === "round-trip") {
      setReturnDate(prevReturn => prevReturn || date);
    }
  }, [tripType, date]);
  
  // Trigger initial search when coming from another page
  useEffect(() => {
    if (location.state && !initialSearchDone) {
      const { departure, arrival } = location.state;
      
      // Only proceed if we have the necessary data
      if ((departure || arrival) && !isSearching) {
        // Wait for state updates to complete
        setTimeout(() => {
          search();
          setInitialSearchDone(true);
          setSearchPerformed(true);
        }, 300);
      }
    }
  }, [departure, arrival, date, returnDate, location.state, initialSearchDone]);

  // Reset results when departure or arrival changes
  useEffect(() => {
    // Clear results when filters change
    setResults([]);
    setReturnResults([]);
    setSelectedTrain(null);
    setSelectedReturnTrain(null);
    setSearchPerformed(false);
  }, [departure, arrival, date, returnDate, tripType]);

  // Convert minutes to HH:MM format
  const formatTimeFromMinutes = (minutes) => {
    if (minutes === null || minutes === undefined) return "--:--";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Search functionality - now using the API service
  const search = async () => {
    // Validate station selection
    if (!departure || !arrival) {
      setValidationError(translations[language].selectStationsError || "Please select a departure and arrival station");
      setResults([]);
      setReturnResults([]);
      setSelectedTrain(null);
      setSelectedReturnTrain(null);
      return;
    }
    
    setValidationError(null);
    setIsSearching(true);
    setSearchPerformed(true);
    
    try {
      // Call API to search for outbound trains
      const trainsData = await trainService.searchTrains(departure, arrival, date);
      setResults(trainsData);

      // If round trip, search for return trains
      if (tripType === "round-trip" && departure && arrival) {
        const returnTrainsData = await trainService.searchTrains(arrival, departure, returnDate);
        setReturnResults(returnTrainsData);
      }
    } catch (error) {
      console.error("Error searching for trains:", error);
      setValidationError("Failed to load train data. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Date localization
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    };
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-GB', options);
  };

  // Check if a seat count is low (for showing warning)
  const isLowSeats = (seats) => {
    if (seats === null || seats === undefined) return false;
    return seats <= 10;
  };

  // Proceed to next page
  const proceedToNextPage = () => {
    const selectedTrainDetails = results.find(train => train.id === selectedTrain);
    const selectedReturnTrainDetails = tripType === "round-trip" 
      ? returnResults.find(train => train.id === selectedReturnTrain)
      : null;

    navigate("/select-seats", { 
      state: { 
        train: selectedTrainDetails, 
        returnTrain: selectedReturnTrainDetails,
        tripType: tripType 
      } 
    });
  };

  // Format time from datetime
  const formatTime = (dateTime) => {
    if (!dateTime) return "--:--";
    try {
      const date = new Date(dateTime);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "--:--";
    }
  };

  const renderTrainResultItem = (train, isSelected, onSelect, isReturn = false) => (
    <div
      key={train.id}
      className={`bg-white p-4 sm:p-5 rounded-xl shadow-lg border-2 transition cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-blue-300"
      }`}
      onClick={() => onSelect(train.id)}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center space-x-1 mb-1">
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            <div className="h-px w-full bg-gray-300"></div>
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
          </div>
          
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-xl font-semibold">{formatTime(train.departureDateTime)}</p>
              <p className="text-sm text-gray-600">{train.departureStation}</p>
              <p className="text-xs text-gray-500">{formatDate(train.departureDateTime)}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-gray-500">
                {translateDuration(train.duration)}
              </div>
              <div className="border-t border-gray-300 w-16 my-1"></div>
              <div className="text-xs text-gray-500">{translations[language].direct}</div>
            </div>
            
            <div className="text-right">
              <p className="text-xl font-semibold">{formatTime(train.arrivalDateTime)}</p>
              <p className="text-sm text-gray-600">{train.arrivalStation}</p>
              <p className="text-xs text-gray-500">{formatDate(train.arrivalDateTime)}</p>
            </div>
          </div>
        </div>
        
        <div className="md:w-48 flex flex-row md:flex-col justify-between items-center md:items-end md:text-right">
          <div className="md:mb-3">
            <p className="text-2xl font-bold text-blue-700">
            {train.minPrice !== null && train.maxPrice !== null ? (
              train.minPrice === train.maxPrice
                ? `${train.minPrice} ${translations[language].currencySymbol}`
                : `${train.minPrice} ${translations[language].currencySymbol} - ${train.maxPrice} ${translations[language].currencySymbol}`
            ) : "--"}
            </p>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">{translateDuration(train.duration)}</span>
            </div>
          </div>
          
          <div>
            {train.seats === null ? (
              <div className="text-sm text-gray-600">
                {translations[language].seatsUnknown}
              </div>
            ) : isLowSeats(train.seats) ? (
              <div className="text-sm text-red-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                {translations[language].seatsLeft.replace('{count}', train.seats)}
              </div>
            ) : (
              <div className="text-sm text-green-600">
                {translations[language].seatsAvailable.replace('{count}', train.seats)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Check if continue button should be enabled
  const isContinueEnabled = () => {
    if (tripType === "one-way") {
      return selectedTrain !== null;
    } else {
      return selectedTrain !== null && selectedReturnTrain !== null;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, amount:0.3 }}
      variants={slideUp}
      className="flex flex-col md:flex-row gap-4 md:gap-8 p-3 sm:p-6 sm:pt-15 max-w-8xl mx-auto -ml-0.5"
    >
      {/* Main content area */}
      <div className="flex-1 p-3 sm:p-6 pt-4 sm:pt-8 max-w-full w-full mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl relative">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            {translations[language].findTrain}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">{translations[language].findTrainText}</p>
        </div>
        
        {/* Trip Type Selection */}
        <div className="mb-4 sm:mb-6 flex justify-center space-x-2 sm:space-x-4">
          <button
            className={`px-3 sm:px-6 py-2 rounded-lg flex items-center transition text-sm sm:text-base ${
              tripType === "one-way" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setTripType("one-way");
              setReturnDate("");
              setSelectedReturnTrain(null);
              setReturnResults([]);
            }}
          >
            <span className="mr-1 sm:mr-2">{translations[language].oneWay}</span>
          </button>
          <button
            className={`px-3 sm:px-6 py-2 rounded-lg flex items-center transition text-sm sm:text-base ${
              tripType === "round-trip" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setTripType("round-trip")}
          >
            <Repeat className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            {translations[language].roundTrip}
          </button>
        </div>
        
        {/* Search Form */}
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-lg space-y-4 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-4">
              {/* Departure and Arrival fields - stacked on mobile, side by side on tablet+ */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1 relative">
                  <label className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                    <MapPin className="inline-block mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    {translations[language].departure}
                  </label>
                  <select
                    className="w-full p-2 sm:p-3 h-10 sm:h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    onChange={(e) => setDeparture(e.target.value)}
                    value={departure}
                  >
                    <option value="">{translations[language].selectDeparture}</option>
                    {cities.map(city => (
                      <option key={`from-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 relative">
                  <label className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                    <MapPin className="inline-block mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    {translations[language].arrival}
                  </label>
                  <select
                    className="w-full p-2 sm:p-3 h-10 sm:h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    onChange={(e) => setArrival(e.target.value)}
                    value={arrival}
                  >
                    <option value="">{translations[language].selectReturn}</option>
                    {cities.map(city => (
                      <option key={`to-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date fields - stacked on mobile, side by side on larger screens */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <label className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                    <Calendar className="inline-block mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    {translations[language].outboundDate}
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 sm:p-3 h-10 sm:h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    onChange={(e) => { setDate(e.target.value); setReturnDate(e.target.value); }}
                    value={date}
                    min={today}
                  />
                </div>

                {tripType === "round-trip" && (
                  <div className="flex-1">
                    <label className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                      <Calendar className="inline-block mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                      {translations[language].returnDate}
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 sm:p-3 h-10 sm:h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      onChange={(e) => setReturnDate(e.target.value)}
                      value={returnDate}
                      min={date || today}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {validationError && (
              <div className="text-red-600 text-center p-2 bg-red-50 rounded-lg text-sm sm:text-base">
                {validationError}
              </div>
            )}
            
            <button
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition text-sm sm:text-base"
              onClick={search}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  {translations[language].searching}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  {translations[language].searchTrains}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Sections */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          {searchPerformed && results.length > 0 && !validationError && (
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {results.length} {translations[language].outboundFound}
                <span className="hidden sm:inline">
                  {departure && arrival && ` ${translations[language].from} ${departure} ${translations[language].to} ${arrival}`}
                  {date && ` ${translations[language].on} ${formatDate(date)}`}
                </span>
              </h2>
            </div>
          )}
          
          {searchPerformed && !validationError ? (
            results.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {results.map((train) => 
                  renderTrainResultItem(train, selectedTrain === train.id, setSelectedTrain)
                )}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-10">
                {isSearching ? (
                  <div className="flex flex-col items-center">
                    <RefreshCw className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-blue-500 mb-3 sm:mb-4" />
                    <p className="text-lg sm:text-xl text-gray-600">{translations[language].searchForTrains}</p>
                  </div>
                ) : (
                  <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md">
                    <p className="text-lg sm:text-xl text-gray-700 font-medium">{translations[language].noOutboundFound}</p>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">{translations[language].tryAdjusting}</p>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="text-center py-6 sm:py-10">
              <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md">
                <p className="text-lg sm:text-xl text-gray-700 font-medium">{translations[language].searchTrainsPrompt}</p>
              </div>
            </div>
          )}
        </div>

        {/* Return Trains Results Section (for Round Trip) */}
        {searchPerformed && !validationError && tripType === "round-trip" && returnResults.length > 0 && (
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {returnResults.length} {translations[language].returnFound}
                <span className="hidden sm:inline">
                  {arrival && departure && ` from ${arrival} to ${departure}`}
                  {returnDate && ` on ${formatDate(returnDate)}`}
                </span>
              </h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {returnResults.map((train) => 
                renderTrainResultItem(train, selectedReturnTrain === train.id, setSelectedReturnTrain, true)
              )}
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="mt-4 sm:mt-5 flex justify-end">
          <button
            className={`bg-green-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md transition flex items-center text-sm sm:text-base ${
              isContinueEnabled() ? "hover:bg-green-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isContinueEnabled()}
            onClick={proceedToNextPage}
          >
            {translations[language].continueBooking}
            <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Progress steps - shown below on mobile, to the side on desktop */}
      <div className="md:w-64 lg:w-72">
        <motion.div variants={slideFromRight} className="md:sticky md:top-6 md:h-fit pt-4 md:pt-12">
          <ProgressSteps currentStep="train-selection" />
        </motion.div>
      </div>
    </motion.div>
  );
}