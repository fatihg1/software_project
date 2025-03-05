import { useState } from "react";
import { Calendar, Search, MapPin, Clock, ArrowRight, RefreshCw, Filter, Info, ChevronDown, Sun, Sunrise, Sunset, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app this would come from an API
const trains = [
  { id: 1, departure: "Istanbul", arrival: "Ankara", date: "2025-03-15", time: "10:00", duration: "4h 30m", price: 250, seats: 42 },
  { id: 2, departure: "Ankara", arrival: "Izmir", date: "2025-03-25", time: "12:00", duration: "6h 15m", price: 250, seats: 18 },
  { id: 3, departure: "Istanbul", arrival: "Izmir", date: "2025-03-26", time: "14:00", duration: "8h 45m", price: 250, seats: 25 },
  { id: 4, departure: "Ankara", arrival: "Istanbul", date: "2025-03-17", time: "16:00", duration: "4h 30m", price: 300, seats: 32 },
  { id: 5, departure: "Ankara", arrival: "Istanbul", date: "2025-03-27", time: "18:30", duration: "4h 15m", price: 350, seats: 8 },
  { id: 6, departure: "Izmir", arrival: "Istanbul", date: "2025-03-28", time: "09:00", duration: "8h 30m", price: 280, seats: 56 },
  { id: 7, departure: "Istanbul", arrival: "Ankara", date: "2025-03-28", time: "07:30", duration: "4h 45m", price: 220, seats: 15 },
  { id: 8, departure: "Izmir", arrival: "Ankara", date: "2025-03-29", time: "11:15", duration: "6h 00m", price: 270, seats: 22 }
];

const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Konya", "Eskişehir"];

export default function TrainTicketSearch() {
  const navigate = useNavigate();
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

  // Search functionality
  const search = () => {
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
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

  // Train result item rendering
  const renderTrainResultItem = (train, isSelected, onSelect, isReturn = false) => (
    <div
      key={train.id}
      className={`bg-white p-4 sm:p-5 rounded-xl shadow-lg border-2 transition cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-blue-300"
      }`}
      onClick={() => onSelect(train.id)}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        {/* Train info */}
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
              <div className="text-sm font-medium text-gray-500">{train.duration}</div>
              <div className="border-t border-gray-300 w-16 my-1"></div>
              <div className="text-xs text-gray-500">Direct</div>
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
        
        {/* Price and details */}
        <div className="md:w-48 flex flex-row md:flex-col justify-between items-center md:items-end md:text-right">
          <div className="md:mb-3">
            <p className="text-2xl font-bold text-blue-700">{train.price} ₺</p>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">{train.duration}</span>
            </div>
          </div>
          
          <div>
            {isLowSeats(train.seats) ? (
              <div className="text-sm text-red-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Only {train.seats} seats left!
              </div>
            ) : (
              <div className="text-sm text-green-600">
                {train.seats} seats available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 pt-8 sm:p-6 sm:pt-30 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl relative">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Find Your Train</h1>
        <p className="text-gray-600">Search and book train tickets across Turkey</p>
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
          <span className="mr-2">One Way</span>
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
          Round Trip
        </button>
      </div>
      
      {/* Search Form */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-6 sm:space-y-8">
        <div className="space-y-6">
          {/* Main search inputs */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1 relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                <MapPin className="inline-block mr-2 h-5 w-5 text-blue-500" />
                From
              </label>
              <select
                className="w-full h-8.5 p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDeparture(e.target.value)}
                value={departure}
              >
                <option value="">Select departure</option>
                {cities.map(city => (
                  <option key={`from-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                <MapPin className="inline-block mr-2 h-5 w-5 text-blue-500" />
                To
              </label>
              <select
                className="w-full h-8.5 p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setArrival(e.target.value)}
                value={arrival}
              >
                <option value="">Select destination</option>
                {cities.map(city => (
                  <option key={`to-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                <Calendar className="inline-block mr-2 h-5 w-5 text-blue-500" />
                Outbound Date
              </label>
              <input
                type="date"
                className="w-full h-8.5 p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Return Date for Round Trip */}
            {tripType === "round-trip" && (
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <Calendar className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  Return Date
                </label>
                <input
                  type="date"
                  className="w-full h-8.5 p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setReturnDate(e.target.value)}
                  value={returnDate}
                  min={date || new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </div>

          {/* Existing filters code remains the same */}
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition"
            onClick={search}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search Trains
              </>
            )}
          </button>
        </div>
      </div>

      {/* Outbound Trains Results Section */}
      <div className="mt-8 space-y-4">
        {results.length > 0 && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {results.length} outbound trains found
              {departure && arrival && ` from ${departure} to ${arrival}`}
              {date && ` on ${formatDate(date)}`}
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
                <p className="text-xl text-gray-600">Searching for trains...</p>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <p className="text-xl text-gray-700 font-medium">No outbound trains found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
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
              {returnResults.length} return trains found
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
      <div className="fixed bottom-6 right-6">
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
          Continue to Booking
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}