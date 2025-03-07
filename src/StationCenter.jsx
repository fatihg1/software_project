import React, { useState, useEffect } from 'react';
import { Search, Train, MapPin } from 'lucide-react';

// Sample data - replace with your actual API call
const trainRoutes = [
  {
    id: 'TR001',
    name: 'Express Line',
    stations: ['Istanbul', 'Ankara', 'Konya', 'Izmir'],
    departureTime: '08:30',
    arrivalTime: '16:45',
    duration: '8h 15m',
    price: 240
  },
  {
    id: 'TR002',
    name: 'Coastal Route',
    stations: ['Istanbul', 'Bursa', 'Balikesir', 'Izmir'],
    departureTime: '09:15',
    arrivalTime: '18:00',
    duration: '8h 45m',
    price: 220
  },
  {
    id: 'TR003',
    name: 'Eastern Express',
    stations: ['Ankara', 'Kayseri', 'Sivas', 'Erzurum', 'Kars'],
    departureTime: '10:00',
    arrivalTime: '08:30',
    duration: '22h 30m',
    price: 320
  },
  {
    id: 'TR004',
    name: 'Southern Line',
    stations: ['Ankara', 'Konya', 'Antalya', 'Mersin', 'Adana'],
    departureTime: '07:45',
    arrivalTime: '16:30',
    duration: '8h 45m',
    price: 270
  }
];

const StationCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get all unique stations for suggestions
  const getAllStations = () => {
    const stationSet = new Set();
    trainRoutes.forEach(route => {
      route.stations.forEach(station => {
        stationSet.add(station);
      });
    });
    return Array.from(stationSet);
  };

  // Filter suggestions based on input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const allStations = getAllStations();
    const filteredStations = allStations.filter(station => 
      station.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSuggestions(filteredStations);
  }, [searchQuery]);

  // Search for routes
  const searchRoutes = (query) => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const matchingRoutes = trainRoutes.filter(route => 
      route.stations.some(station => 
        station.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setResults(matchingRoutes);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchRoutes(searchQuery);
    setShowSuggestions(false);
  };

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    searchRoutes(suggestion);
  };

  // Simple map component that shows the route stations as points
  const RouteMap = ({ stations }) => {
    // 
    return (
      <div>

      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-30">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Station Center</h1>
        <p className="text-gray-600">Search for train routes by station name</p>
      </div>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Enter station name"
              className="w-full p-3 focus:outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 px-6 hover:bg-blue-600"
            >
              <Search size={20} />
            </button>
          </div>
          
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      
      
      <div>
        {searchQuery && results.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            No train routes found for "{searchQuery}"
          </div>
        ) : (
          <div>
            {results.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Train Routes via {searchQuery}</h2>
                <p className="text-gray-600">{results.length} routes found</p>
              </div>
            )}
            
            {results.map((train) => (
              <div key={train.id} className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center">
                      <Train size={20} className="text-blue-500 mr-2" />
                      
                    </div>
                    
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Duration: {train.duration}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      
                      <p className="font-medium">{train.stations[0]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Arrival</p>
                      
                      <p className="font-medium">{train.stations[train.stations.length - 1]}</p>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <p className="text-sm font-medium mb-1">Route:</p>
                    <div className="flex flex-wrap gap-2">
                      {train.stations.map((station, index) => (
                        <div key={index} className="flex items-center">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              station.toLowerCase() === searchQuery.toLowerCase() 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-gray-100"
                            }`}
                          >
                            {station}
                          </span>
                          {index < train.stations.length - 1 && (
                            <span className="mx-1">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <RouteMap stations={train.stations} />
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StationCenter;