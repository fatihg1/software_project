import { useState } from "react";
import { MapPin, Train, Info, X } from "lucide-react";

const stations = [
  "Adana", "Ankara", "Bursa", "Eskişehir", "İstanbul", "İzmir", "Konya"
];

const lines = [
  { name: "İstanbul - Ankara", stops: ["İstanbul", "Eskişehir", "Ankara"], direction: "From İstanbul To Ankara" },
  { name: "Ankara - İzmir", stops: ["Ankara", "Eskişehir", "İzmir"], direction: "From Ankara To İzmir" },
  { name: "Eskişehir - Adana", stops: ["Eskişehir", "Konya", "Adana"], direction: "From Eskişehir To Adana" },
  { name: "İstanbul - Konya", stops: ["İstanbul", "Eskişehir", "Konya"], direction: "From İstanbul To Konya" }
];

export default function TrainSearch() {
  const [selectedStation, setSelectedStation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStationSelect = (station) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedStation(station);
      setSearchText(station);
      setLoading(false);
    }, 500);
  };

  const filteredLines = lines.filter(line => line.stops.includes(selectedStation));

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-200 min-h-screen text-black rounded-lg flex flex-col shadow-lg relative">
      <h1 className="text-4xl font-semibold mb-8 text-blue-800 flex items-center gap-2">
        <Train size={32} /> Station Center
      </h1>
      <div className="flex justify-between items-center max-w-lg mx-auto w-full">
        <div className="relative w-full">
          <input
            type="text"
            className="p-4 border-4 border-blue-800 rounded-xl w-full text-black bg-white font-normal shadow-lg focus:ring-4 focus:ring-blue-600 text-lg"
            placeholder="Find a Station..."
            value={searchText}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {isOpen && (
            <ul className="absolute w-full bg-white border-4 border-blue-800 rounded-xl shadow-lg mt-1 max-h-60 overflow-auto">
              {stations.filter(station => station.toLowerCase().includes(searchText.toLowerCase())).map((station, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-blue-100 cursor-pointer text-lg font-normal"
                  onMouseDown={() => handleStationSelect(station)}
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedStation && (
          <button 
            className="p-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all flex items-center gap-2 ml-4"
            onClick={() => window.location.href = `/map/${selectedStation.toLowerCase()}`}
          >
            <MapPin size={20} /> Station Location
          </button>
        )}
      </div>
      
      {loading && (
        <div className="mt-32 text-center text-blue-800 text-lg font-semibold">Loading...</div>
      )}

      {selectedStation && !loading && (
        <div className="mt-40 bg-white p-6 rounded-xl shadow-xl w-full border-[3px] border-gray-300 transition-all duration-500 text-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-800"> Lines passing through {selectedStation}</h2>
          <div className="grid grid-cols-4 gap-1 text-center font-semibold text-blue-800 border-b-2 pb-2">
            <span>Start</span>
            <span>End</span>
            <span>Direction</span>
            <span></span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {filteredLines.length > 0 ? (
              filteredLines.map((line, index) => (
                <div 
                  key={index} 
                  className={`p-4 border-[2.25px] border-blue-800 rounded-xl ${index % 2 === 0 ? 'bg-white' : 'bg-gray-300'} text-blue-900 font-normal shadow-md flex grid grid-cols-4 text-center items-center cursor-pointer`}
                >
                  <span className="text-lg">{line.stops[0]}</span>
                  <span className="text-lg">{line.stops[line.stops.length - 1]}</span>
                  <span className="text-lg">{line.direction}</span>
                  <button 
                    className="p-2 w-10 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/route-info/${line.name.replace(/ /g, "-").toLowerCase()}`;
                    }}
                  >
                    <Info size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg font-normal">There is no line passing through this stop.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}