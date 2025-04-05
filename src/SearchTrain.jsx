import { useState, useEffect } from "react";
import { Calendar, Search, MapPin, Clock, ArrowRight, RefreshCw, Filter, Info, ChevronDown, Sun, Sunrise, Sunset, Repeat } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressSteps from "./ProgressSteps.jsx"
import { motion } from "framer-motion";
import {useLanguage} from "./LanguageContext.jsx";
import translations from "./translations.jsx";
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
// Sample data - in a real app this would come from an API
const trains = [
  { id: 1, departure: "Istanbul", arrival: "Ankara", date: "2025-04-30", time: "10:00", duration: "4h 30m", price: 250, seats: 42 },
  { id: 2, departure: "Ankara", arrival: "Izmir", date: "2025-04-25", time: "12:00", duration: "6h 15m", price: 250, seats: 18 },
  { id: 3, departure: "Istanbul", arrival: "Izmir", date: "2025-04-26", time: "14:00", duration: "8h 45m", price: 250, seats: 25 },
  { id: 4, departure: "Ankara", arrival: "Istanbul", date: "2025-04-17", time: "16:00", duration: "4h 30m", price: 300, seats: 32 },
  { id: 5, departure: "Ankara", arrival: "Istanbul", date: "2025-04-27", time: "18:30", duration: "4h 15m", price: 350, seats: 8 },
  { id: 6, departure: "Izmir", arrival: "Istanbul", date: "2025-04-28", time: "09:00", duration: "8h 30m", price: 280, seats: 56 },
  { id: 7, departure: "Istanbul", arrival: "Ankara", date: "2025-04-28", time: "07:30", duration: "4h 45m", price: 220, seats: 15 },
  { id: 8, departure: "Izmir", arrival: "Ankara", date: "2025-04-29", time: "11:15", duration: "6h 00m", price: 270, seats: 22 }
];

const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Konya", "Eskişehir"];

export default function TrainTicketSearch() {
  const {language} = useLanguage();
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
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [timeOfDay, setTimeOfDay] = useState("all");
  const [minPrice, maxPrice] = [0, 500]; // Range limits
  const [validationError, setValidationError] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  // Duration localization
  const translateDuration = (duration) => {
    return duration
      .replace('h', translations[language].hoursAbbr)
      .replace('m', translations[language].minutesAbbr);
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
      
      // We'll trigger search with the provided parameters after state updates
      // This will be handled by a separate useEffect
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
        }, 300);
      }
    }
  }, [departure, arrival, date, returnDate, location.state, initialSearchDone]);

  // Search functionality
  const search = () => {
    // Validate station selection - check current state values not the initial ones
    if (!departure && !arrival) {
      setValidationError("Please select at least a departure or arrival station");
      return;
    }
    
    setValidationError(null);
    setIsSearching(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      if (!departure && !arrival && !date) {
        setResults([]);
        if (tripType === "round-trip") setReturnResults([]);
      } else {
        let filteredResults = trains.filter(
          (train) =>
            (!departure || train.departure === departure) &&
            (!arrival || train.arrival === arrival) &&
            (!date || train.date === date)
        );
        
        // Apply price filter
        filteredResults = filteredResults.filter(
          train => train.price >= priceRange[0] && train.price <= priceRange[1]
        );
        
        // Apply time of day filter
        if (timeOfDay !== "all") {
          filteredResults = filteredResults.filter(train => {
            const hour = parseInt(train.time.split(":")[0]);
            if (timeOfDay === "morning") return hour >= 5 && hour < 12;
            if (timeOfDay === "afternoon") return hour >= 12 && hour < 18;
            if (timeOfDay === "evening") return hour >= 18 || hour < 5;
            return true;
          });
        }
        
        setResults(filteredResults);

        // If round trip, search for return trains
        if (tripType === "round-trip" && departure && arrival) {
          let returnTrips = trains.filter(
            (train) =>
              train.departure === arrival &&
              train.arrival === departure &&
              (!returnDate || train.date === returnDate)
          );

          // Apply same filters for return trips
          returnTrips = returnTrips.filter(
            train => train.price >= priceRange[0] && train.price <= priceRange[1]
          );

          if (timeOfDay !== "all") {
            returnTrips = returnTrips.filter(train => {
              const hour = parseInt(train.time.split(":")[0]);
              if (timeOfDay === "morning") return hour >= 5 && hour < 12;
              if (timeOfDay === "afternoon") return hour >= 12 && hour < 18;
              if (timeOfDay === "evening") return hour >= 18 || hour < 5;
              return true;
            });
          }

          setReturnResults(returnTrips);
        }
      }
      setIsSearching(false);
    }, 800);
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
  const isLowSeats = (seats) => seats <= 10;

  // Proceed to next page
  const proceedToNextPage = () => {
    const selectedTrainDetails = trains.find(train => train.id === selectedTrain);
    const selectedReturnTrainDetails = tripType === "round-trip" 
      ? trains.find(train => train.id === selectedReturnTrain)
      : null;

    navigate("/select-seats", { 
      state: { 
        train: selectedTrainDetails, 
        returnTrain: selectedReturnTrainDetails,
        tripType: tripType 
      } 
    });
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
              <p className="text-xl font-semibold">{train.time}</p>
              <p className="text-sm text-gray-600">{train.departure}</p>
              <p className="text-xs text-gray-500">{formatDate(train.date)}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-gray-500">
                {translateDuration(train.duration)}
              </div>
              <div className="border-t border-gray-300 w-16 my-1"></div>
              <div className="text-xs text-gray-500">{translations[language].direct}</div>
            </div>
            
            <div className="text-right">
              <p className="text-xl font-semibold">
                {train.time.split(':')
                  .map((part, i) => parseInt(part) + (i === 0 ? parseInt(train.duration) : 0))
                  .join(':')}
              </p>
              <p className="text-sm text-gray-600">{train.arrival}</p>
              <p className="text-xs text-gray-500">{formatDate(train.date)}</p>
            </div>
          </div>
        </div>
        
        <div className="md:w-48 flex flex-row md:flex-col justify-between items-center md:items-end md:text-right">
          <div className="md:mb-3">
            <p className="text-2xl font-bold text-blue-700">
              {train.price} {translations[language].currencySymbol}
            </p>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">{translateDuration(train.duration)}</span>
            </div>
          </div>
          
          <div>
            {isLowSeats(train.seats) ? (
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

  return (
    <motion.div 
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, amount:0.3 }}
      variants={slideUp}
      className="flex flex-col md:flex-row gap-8 sm:p-6 sm:pt-15 max-w-6xl mx-auto"
    >
      <div className="sm:p-6 sm:pt-30 max-w-6xl w-7xl mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl relative">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {translations[language].findTrain}
          </h1>
          <p className="text-gray-600">{translations[language].findTrainText}</p>
        </div>
        
        {/* Trip Type Selection */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`px-6 py-2 rounded-lg flex items-center transition ${
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
            <span className="mr-2">{translations[language].oneWay}</span>
          </button>
          <button
            className={`px-6 py-2 rounded-lg flex items-center transition ${
              tripType === "round-trip" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setTripType("round-trip")}
          >
            <Repeat className="h-5 w-5 mr-2" />
            {translations[language].roundTrip}
          </button>
        </div>
        
        {/* Search Form */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1 relative">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <MapPin className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  {translations[language].departure}
                </label>
                <select
                  className="w-full p-3 h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
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
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <MapPin className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  {translations[language].arrival}
                </label>
                <select
                  className="w-full p-3 h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  onChange={(e) => setArrival(e.target.value)}
                  value={arrival}
                >
                  <option value="">{translations[language].selectReturn}</option>
                  {cities.map(city => (
                    <option key={`to-${city}`} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <Calendar className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  {translations[language].outboundDate}
                </label>
                <input
                  type="date"
                  className="w-full p-3 h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  onChange={(e) => { setDate(e.target.value); setReturnDate(e.target.value); }}
                  value={date}
                  min={today}
                />
              </div>

              {tripType === "round-trip" && (
                <div className="flex-1">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    <Calendar className="inline-block mr-2 h-5 w-5 text-blue-500" />
                    {translations[language].returnDate}
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 h-12 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    onChange={(e) => setReturnDate(e.target.value)}
                    value={returnDate}
                    min={date || today}
                  />
                </div>
              )}
            </div>
            
            {validationError && (
              <div className="text-red-600 text-center p-2 bg-red-50 rounded-lg">
                {validationError}
              </div>
            )}
            
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition"
              onClick={search}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                  {translations[language].searching}
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  {translations[language].searchTrains}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Sections */}
        <div className="mt-8 space-y-4">
          {results.length > 0 && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {results.length} {translations[language].outboundFound}
                {departure && arrival && ` ${translations[language].from} ${departure} ${translations[language].to} ${arrival}`}
                {date && ` ${translations[language].on} ${formatDate(date)}`}
              </h2>
            </div>
          )}
          
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((train) => 
                renderTrainResultItem(train, selectedTrain === train.id, setSelectedTrain)
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              {isSearching ? (
                <div className="flex flex-col items-center">
                  <RefreshCw className="animate-spin h-10 w-10 text-blue-500 mb-4" />
                  <p className="text-xl text-gray-600">{translations[language].searchForTrains}</p>
                </div>
              ) : (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                  <p className="text-xl text-gray-700 font-medium">{translations[language].noOutboundFound}</p>
                  <p className="text-gray-500 mt-2">{translations[language].tryAdjusting}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Return Trains Results Section (for Round Trip) */}
        {tripType === "round-trip" && returnResults.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {returnResults.length} {translations[language].returnFound}
                {arrival && departure && ` from ${arrival} to ${departure}`}
                {returnDate && ` on ${formatDate(returnDate)}`}
              </h2>
            </div>
            
            <div className="space-y-4">
              {returnResults.map((train) => 
                renderTrainResultItem(train, selectedReturnTrain === train.id, setSelectedReturnTrain, true)
              )}
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="bottom-6 right-6 mt-5">
          <button
            className={`bg-green-500 text-white px-4 sm:px-6 py-3 rounded-xl shadow-md transition flex items-center ${
              (tripType === "one-way" && selectedTrain) || 
              (tripType === "round-trip" && selectedTrain && selectedReturnTrain) 
                ? "hover:bg-green-600" 
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={
              tripType === "one-way" 
                ? !selectedTrain 
                : !(selectedTrain && selectedReturnTrain)
            }
            onClick={proceedToNextPage}
          >
            {translations[language].continueBooking}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      <motion.div 
      variants={slideFromRight}
      className="md:sticky md:top-6 md:h-fit pt-12">  {/* Adds sticky positioning */}
        <ProgressSteps currentStep="train-selection" />
      </motion.div>
  </motion.div>
  );
}