import { useState } from "react";
import { Ticket, X, MapPin, Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function TicketDetails() {
  const [isOpen, setIsOpen] = useState(false);

  // 🎟️ Ticket Data
  const ticket = {
    id: "123456",
    lastName: "Yılmaz",
    from: "İstanbul",
    to: "Ankara",
    date: "2025-03-10",
    time: "08:30",
    seat: "12A",
    price: "750₺",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-4">
      {/* Show Ticket Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 flex items-center gap-3"
      >
        <Ticket size={24} />
        Show Ticket Details
      </button>

      {/* Modal (Pop-up) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Ticket size={32} /> Ticket Details
              </h1>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 rounded-full p-2 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Ticket Information */}
            <div className="p-6 space-y-4">
              {/* Ticket ID */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <User size={20} className="text-blue-600" />
                  <span className="font-semibold">Ticket ID</span>
                </div>
                <span className="font-bold text-blue-800">{ticket.id}</span>
              </div>

              {/* Passenger Name */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <User size={20} className="text-blue-600" />
                  <span className="font-semibold">Last Name</span>
                </div>
                <span className="font-bold text-blue-800">{ticket.lastName}</span>
              </div>

              {/* Route */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} className="text-blue-600" />
                  <span className="font-semibold">Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-800">{ticket.from}</span>
                  <ArrowRight size={16} className="text-gray-500" />
                  <span className="font-bold text-blue-800">{ticket.to}</span>
                </div>
              </div>

              {/* Date */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar size={20} className="text-blue-600" />
                  <span className="font-semibold">Date</span>
                </div>
                <span className="font-bold text-blue-800">{ticket.date}</span>
              </div>

              {/* Time */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} className="text-blue-600" />
                  <span className="font-semibold">Time</span>
                </div>
                <span className="font-bold text-blue-800">{ticket.time}</span>
              </div>

              {/* Seat */}
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Ticket size={20} className="text-blue-600" />
                  <span className="font-semibold">Seat</span>
                </div>
                <span className="font-bold text-blue-800">{ticket.seat}</span>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-700">
                  <Ticket size={20} className="text-blue-600" />
                  <span className="font-semibold">Price</span>
                </div>
                <span className="font-bold text-green-700 text-xl">{ticket.price}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}