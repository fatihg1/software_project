import { useState } from "react";
import { Calendar, Search, MapPin, Clock, ArrowRight, RefreshCw, Filter, Info, ChevronDown, Sun, Sunrise, Sunset } from "lucide-react";

// Sample data - in a real app this would come from an API
const trains = [
  { id: 1, departure: "Istanbul", arrival: "Ankara", date: "2025-02-25", time: "10:00", duration: "4h 30m", price: 250, seats: 42 },
  { id: 2, departure: "Ankara", arrival: "Izmir", date: "2025-02-25", time: "12:00", duration: "6h 15m", price: 250, seats: 18 },
  { id: 3, departure: "Istanbul", arrival: "Izmir", date: "2025-02-26", time: "14:00", duration: "8h 45m", price: 250, seats: 25 },
  { id: 4, departure: "Ankara", arrival: "Istanbul", date: "2025-02-27", time: "16:00", duration: "4h 30m", price: 250, seats: 32 },
  { id: 5, departure: "Ankara", arrival: "Istanbul", date: "2025-02-27", time: "18:30", duration: "4h 15m", price: 350, seats: 8 },
  { id: 6, departure: "Izmir", arrival: "Istanbul", date: "2025-02-28", time: "09:00", duration: "8h 30m", price: 280, seats: 56 },
  { id: 7, departure: "Istanbul", arrival: "Ankara", date: "2025-02-28", time: "07:30", duration: "4h 45m", price: 220, seats: 15 },
  { id: 8, departure: "Izmir", arrival: "Ankara", date: "2025-02-29", time: "11:15", duration: "6h 00m", price: 270, seats: 22 }
];

const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Konya", "Eskişehir"];

export default function TrainTicketSearch() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [timeOfDay, setTimeOfDay] = useState("all");
  const [minPrice, maxPrice] = [0, 500]; // Range limits

  // Swap departure and arrival
  const swapLocations = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  // Search functionality
  const search = () => {
    setIsSearching(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      if (!departure && !arrival && !date) {
        setResults([]);
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
    alert(`Selected Train: ${selectedTrainDetails.departure} to ${selectedTrainDetails.arrival} at ${selectedTrainDetails.time} on ${formatDate(selectedTrainDetails.date)}`);
    // Here you would navigate to the next page with the selected train details
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl relative">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Find Your Train</h1>
        <p className="text-gray-600">Search and book train tickets across Turkey</p>
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
                Travel Date
              </label>
              <input
                type="date"
                className="w-full h-8.5 p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Improved Filter Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Options
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            
          </div>
          
          {/* Improved Filters Section */}
          {showFilters && (
            <div className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl border border-blue-100 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Refine Your Search</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="bg-blue-100 p-1 rounded-md text-blue-600 mr-2">
                      <Filter className="h-4 w-4" />
                    </span>
                    Price Range
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{priceRange[0]}₺</span>
                      <span>{priceRange[1]}₺</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min={minPrice} 
                      max={maxPrice} 
                      step="10"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="bg-blue-50 rounded-lg px-3 py-1 text-blue-700 text-sm font-medium">
                        Min: {priceRange[0]}₺
                      </div>
                      <div className="bg-blue-50 rounded-lg px-3 py-1 text-blue-700 text-sm font-medium">
                        Max: {priceRange[1]}₺
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Time of Day Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="bg-blue-100 p-1 rounded-md text-blue-600 mr-2">
                      <Clock className="h-4 w-4" />
                    </span>
                    Time of Day
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button 
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition ${
                        timeOfDay === 'all' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTimeOfDay('all')}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      <span>All Times</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition ${
                        timeOfDay === 'morning' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTimeOfDay('morning')}
                    >
                      <Sunrise className="h-4 w-4 mr-2" />
                      <span>Morning</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition ${
                        timeOfDay === 'afternoon' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTimeOfDay('afternoon')}
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      <span>Afternoon</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition ${
                        timeOfDay === 'evening' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTimeOfDay('evening')}
                    >
                      <Sunset className="h-4 w-4 mr-2" />
                      <span>Evening</span>
                    </button>
                  </div>
                </div>
              </div>
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

      {/* Results Section */}
      <div className="mt-8 space-y-4">
        {/* Results header */}
        {results.length > 0 && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {results.length} trains found
              {departure && arrival && ` from ${departure} to ${arrival}`}
              {date && ` on ${formatDate(date)}`}
            </h2>
          </div>
        )}
        
        {/* Results list */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((train) => (
              <div
                key={train.id}
                className={`bg-white p-4 sm:p-5 rounded-xl shadow-lg border-2 transition cursor-pointer ${
                  selectedTrain === train.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-blue-300"
                }`}
                onClick={() => setSelectedTrain(train.id)}
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  {/* Train info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-1">
                      <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                      <div className="h-px w-16 bg-gray-300"></div>
                      <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                    </div>
                    
                    <div className="flex justify-between mb-3">
                      <div>
                        <p className="text-xl font-semibold">{train.time}</p>
                        <p className="text-sm text-gray-600">{train.departure}</p>
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
            ))}
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
                <p className="text-xl text-gray-700 font-medium">No trains found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="fixed bottom-6 right-6">
        <button
          className={`bg-green-500 text-white px-4 sm:px-6 py-3 rounded-xl shadow-md transition flex items-center ${
            selectedTrain ? "hover:bg-green-600" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!selectedTrain}
          onClick={proceedToNextPage}
        >
          Continue to Booking
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}