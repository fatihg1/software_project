import React, { useState, useEffect } from 'react';
import trainIcon from '/train.svg';
import ticketIcon from '/ticket.png';

export default function HomePage() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
  const [selectedSection, setSelectedSection] = useState('selectTicket');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDepartureDate(today);
  }, []);

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
    if (e.target.value) {
      setIsRoundTrip(true);
    }
  };

  const handleRoundTripChange = (e) => {
    setIsRoundTrip(e.target.checked);
    if (e.target.checked) {
      setReturnDate(departureDate);
    } else {
      setReturnDate('');
    }
  };

  const handleOneWayChange = () => {
    setIsRoundTrip(false);
    setReturnDate('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">

        {selectedSection === 'selectTicket' && (
          <div className="w-3/4 p-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-around space-x-8 mx-7 mb-8">
            <div className={`flex flex-col items-center justify-center cursor-pointer p-4 rounded-md ${selectedSection === 'selectTicket' ? 'bg-blue-600' : 'bg-gray-200'}`}
              onClick={() => setSelectedSection('selectTicket')}>
              <img src={trainIcon} alt="Select Ticket" className="h-8 w-8" />
              <span className={`mt-2 text-sm ${selectedSection === 'selectTicket' ? 'text-white' : 'text-gray-800'}`}>Select Ticket</span>
            </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedSection('myTickets')}>
            <img src={ticketIcon} alt="My Tickets" className="h-8 w-8" />
            <span className={`mt-2 text-sm ${selectedSection === 'myTickets' ? 'text-white' : 'text-gray-800'}`}>My Tickets</span>
          </div>
        </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-blue-600">From</label>
                <input 
                  type="text" 
                  placeholder="From" 
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <div>
                <label className="text-sm text-blue-600">To</label>
                <input 
                  type="text" 
                  placeholder="To" 
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <div>
                <label className="text-sm text-blue-600">Departure Date</label>
                <input 
                  type="date" 
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <div>
                <label className="text-sm text-blue-600">Return Date</label>
                <input 
                  type="date" 
                  value={returnDate}
                  onChange={handleReturnDateChange}
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={isRoundTrip} 
                  onChange={handleRoundTripChange} 
                  className="mr-2"
                />
                <label className="text-blue-600">Round Trip</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={!isRoundTrip} 
                  onChange={handleOneWayChange} 
                  className="mr-2"
                />
                <label className="text-blue-600">One Way</label>
              </div>
              <div>
                <label className="text-sm text-blue-600">Number of Passengers</label>
                <input 
                  type="number" 
                  placeholder="Number of Passengers" 
                  min="1"
                  value={numPassengers}
                  onChange={(e) => setNumPassengers(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <button 
                type="submit" 
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
                Search
              </button>
            </form>
          </div>
        )}

        {selectedSection === 'myTickets' && (
          <div className="w-3/4 p-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-around space-x-8 mx-7 mb-8">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedSection('selectTicket')}>
            <img src={trainIcon} alt="Select Ticket" className="h-8 w-8" />
            <span className={`mt-2 text-sm ${selectedSection === 'selectTicket' ? 'text-white' : 'text-gray-800'}`}>Select Ticket</span>
          </div>
          <div className={`flex flex-col items-center justify-center cursor-pointer p-4 rounded-md ${selectedSection === 'myTickets' ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => setSelectedSection('myTickets')}>
            <img src={ticketIcon} alt="My Tickets" className="h-8 w-8" />
            <span className={`mt-2 text-sm ${selectedSection === 'myTickets' ? 'text-white' : 'text-gray-800'}`}>My Tickets</span>
          </div>
        </div>
            <form className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-blue-600">Ticket ID</label>
                <input 
                  type="text" 
                  placeholder="Ticket ID" 
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <div>
                <label className="text-sm text-blue-600">Lastname</label>
                <input 
                  type="text" 
                  placeholder="Lastname" 
                  className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}