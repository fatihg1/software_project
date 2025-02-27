import { useState } from "react";
import { motion } from "framer-motion";

const seatsPerRow = 6;
const rows = 10;
const reservedSeats = [5, 12, 18, 23, 30, 42]; // Önceden rezerve edilmiş koltuklar
const totalWagons = 3;

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentWagon, setCurrentWagon] = useState(1);

  const toggleSeat = (seat) => {
    if (reservedSeats.includes(seat)) return; // Rezerve koltuklar değiştirilemez
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Vagon {currentWagon} - Koltuk Seçimi</h2>
      <div className="relative bg-gray-300 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-8 p-4 bg-white rounded-lg">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between w-full">
              {[...Array(seatsPerRow / 2)].map((_, seatIndex) => {
                const seat = rowIndex * seatsPerRow + seatIndex + 1 + (currentWagon - 1) * rows * seatsPerRow;

                const isSelected = selectedSeats.includes(seat);
                const isReserved = reservedSeats.includes(seat);
                return (
                  <motion.button
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    whileTap={{ scale: 0.9 }}
                    disabled={isReserved}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all text-sm font-semibold border 
                      ${isReserved ? "bg-red-500 text-white cursor-not-allowed" : 
                        isSelected ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    {seat}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50" 
          disabled={currentWagon === 1} 
          onClick={() => setCurrentWagon(currentWagon - 1)}>
          Önceki Vagon
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
          Devam Et ({selectedSeats.length} seçili)
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50" 
          disabled={currentWagon === totalWagons} 
          onClick={() => setCurrentWagon(currentWagon + 1)}>
          Sonraki Vagon
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
