import { useState, useRef, useEffect } from "react";
import { Train, Search, MapPin, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from "./Navbar";
import Footer from "./Footer";

// Station coordinates (not complete just random in city borders)
const stationCoordinates = {
  "Adana": [37.3287, 35.0000],
  "Ankara": [39.8597, 32.9334],
  "Bursa": [40.0729, 29.1855],
  "Eskişehir": [39.5287, 30.7667],
  "İstanbul": [41.9784, 28.0082],
  "İzmir": [38.1428, 27.4237],
  "Konya": [37.6871, 32.8700]
};

const stations = ["Adana", "Ankara", "Bursa", "Eskişehir", "İstanbul", "İzmir", "Konya"];

const lines = [
  { start: "İstanbul", end: "Ankara", stops: ["İstanbul", "Eskişehir", "Ankara"], direction: "From İstanbul To Ankara" },
  { start: "Ankara", end: "İzmir", stops: ["Ankara", "Eskişehir", "İzmir"], direction: "From Ankara To İzmir" },
  { start: "Eskişehir", end: "Adana", stops: ["Eskişehir", "Konya", "Adana"], direction: "From Eskişehir To Adana" },
  { start: "İstanbul", end: "Konya", stops: ["İstanbul", "Eskişehir", "Konya"], direction: "From İstanbul To Konya" },
];

// Fix for Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function StationCenter() {
  const [selectedStation, setSelectedStation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [showMap, setShowMap] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIsOpen(true);
  };

  const handleLocationClick = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const filteredLines = lines.filter((line) => line.stops.includes(selectedStation));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Train size={36} className="text-white"/>
            <h1 className="text-3xl font-bold tracking-tight">Station Center</h1>
          </div>
          {selectedStation && (
            <button 
              className="bg-gradient-to-br from-gray-100 to-gray-400 text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300"
              onClick={handleLocationClick}
            >
              Location
            </button>
          )}
        </div>
        {/* Content Area */}
        <div className="p-8">
          {/* Search Bar */}
          <div className="relative mb-6" ref={inputRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 ease-in-out"
              placeholder="Find a Station..."
              value={selectedStation}
              readOnly
              onFocus={handleFocus}
            />

            {isOpen && (
              <ul
                className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  width: `${dropdownPosition.width}px`,
                }}
              >
                {stations.map((station, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center"
                    onMouseDown={() => handleStationSelect(station)}
                  >
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {station}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Routes Display */}
          {selectedStation && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
                <h2 className="text-xl font-semibold">
                  Train Lines Passing Through <span className="uppercase font-bold">{selectedStation}</span>
                </h2>
              </div>

              {filteredLines.length > 0 ? (
                <div>
                  <div className="grid grid-cols-3 px-6 py-3 bg-gray-200 font-semibold text-gray-700 border-b border-gray-300">
                    <div>Start</div>
                    <div>Finish</div>
                    <div>Direction</div>
                  </div>

                  {filteredLines.map((line, index) => (
                    <div 
                      key={index} 
                      className={`grid grid-cols-3 px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <div className="flex items-center space-x-2">
                        <Train size={18} className="text-blue-500" />
                        <span>{line.start}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Train size={18} className="text-indigo-500" />
                        <span>{line.end}</span>
                      </div>
                      <span className="text-gray-600">{line.direction}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No train lines available for <span className="font-semibold">{selectedStation}</span>.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Location Map Modal */}
      {showMap && selectedStation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] relative shadow-2xl overflow-hidden">
            <button 
              onClick={handleCloseMap} 
              className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            >
              <X size={24} className="text-gray-700" />
            </button>
            <MapContainer 
              center={stationCoordinates[selectedStation]} 
              zoom={10} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={stationCoordinates[selectedStation]}>
                <Popup>{selectedStation} Train Station</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}