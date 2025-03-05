import React, { useState } from 'react';
import Navbar from './Navbar';

const HelpCenter = () => {
  // State for Look Up an Appeal section
  const [lastName, setLastName] = useState('');
  const [appealNumber, setAppealNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // State for Add an Appeal section
  const [appealType, setAppealType] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    email: ''
  });
  const [travelInfo, setTravelInfo] = useState({
    ticketId: '',
    departureStation: '',
    arrivalStation: ''
  });
  const [appealContext, setAppealContext] = useState('');

  // Active tab state
  const [activeTab, setActiveTab] = useState('lookUp');
  const [submissionConfirmation, setSubmissionConfirmation] = useState(null);

  // Generate a random 12-digit appeal number
  const generateAppealNumber = () => {
    return Array.from(
      { length: 12 }, 
      () => Math.floor(Math.random() * 10)
    ).join('');
  };

  // Look Up Appeal Handler
  const handleLookUpAppeal = () => {
    // Simulated search logic
    if (lastName === 'Doe' && appealNumber === '12345') {
      setSearchResult({
        status: 'In Progress',
        type: 'Complaint',
        submittedDate: '2024-03-05'
      });
    } else {
      setSearchResult(null);
    }
  };

  // Add Appeal Handler
  const handleSubmitAppeal = (e) => {
    e.preventDefault();
    // Generate a random appeal number
    const newAppealNumber = generateAppealNumber();

    // Simulated submission logic
    console.log({
      appealType,
      contactInfo,
      travelInfo,
      appealContext
    });

    // Set submission confirmation with the generated appeal number
    setSubmissionConfirmation(newAppealNumber);

    // Reset form fields after submission (optional)
    setAppealType('');
    setContactInfo({
      name: '',
      surname: '',
      phoneNumber: '',
      email: ''
    });
    setTravelInfo({
      ticketId: '',
      departureStation: '',
      arrivalStation: ''
    });
    setAppealContext('');
  };

  return (
    <div>
      <Navbar/>
      <div className="h-20"></div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-blue-800 text-white p-6">
            <h1 className="text-3xl font-bold text-center">Appeal Help Center</h1>
          </div>
          
          <div className="flex border-b">
            <button
              className={`w-1/2 p-4 transition-colors duration-300 ${
                activeTab === 'lookUp' 
                  ? 'bg-blue-800 text-white font-semibold' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('lookUp')}
            >
              Look Up an Appeal
            </button>
            <button
              className={`w-1/2 p-4 transition-colors duration-300 ${
                activeTab === 'addAppeal' 
                  ? 'bg-blue-800 text-white font-semibold' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('addAppeal')}
            >
              Add an Appeal
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'lookUp' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Appeal Number</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Appeal Number"
                    value={appealNumber}
                    onChange={(e) => setAppealNumber(e.target.value)}
                  />
                </div>
                <button 
                  className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition-colors duration-300"
                  onClick={handleLookUpAppeal}
                >
                  Search Appeal
                </button>

                {searchResult ? (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="font-bold text-green-800 mb-2">Appeal Found</h3>
                    <p className="text-green-700">Status: {searchResult.status}</p>
                    <p className="text-green-700">Type: {searchResult.type}</p>
                    <p className="text-green-700">Submitted Date: {searchResult.submittedDate}</p>
                  </div>
                ) : lastName || appealNumber ? (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">No appeal found with the provided details.</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmitAppeal} className="space-y-6">
                  {/* Appeal Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Appeal Type</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={appealType}
                      onChange={(e) => setAppealType(e.target.value)}
                      required
                    >
                      <option value="">Select Appeal Type</option>
                      <option value="Refund">Refund</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Appreciation">Appreciation</option>
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-2">Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Name"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Surname</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Surname"
                          value={contactInfo.surname}
                          onChange={(e) => setContactInfo({...contactInfo, surname: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Phone Number"
                          value={contactInfo.phoneNumber}
                          onChange={(e) => setContactInfo({...contactInfo, phoneNumber: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Email Address"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Travel Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-2">Ticket ID</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Ticket ID"
                          value={travelInfo.ticketId}
                          onChange={(e) => setTravelInfo({...travelInfo, ticketId: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Departure Station</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Departure Station"
                          value={travelInfo.departureStation}
                          onChange={(e) => setTravelInfo({...travelInfo, departureStation: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">Arrival Station</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Arrival Station"
                          value={travelInfo.arrivalStation}
                          onChange={(e) => setTravelInfo({...travelInfo, arrivalStation: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appeal Context */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Content of the Appeal</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your appeal in detail"
                      rows={4}
                      value={appealContext}
                      onChange={(e) => setAppealContext(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Submit Appeal
                  </button>
                </form>

                {/* Submission Confirmation Section */}
                {submissionConfirmation && (
                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-md text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      Appeal Submitted Successfully!
                    </h3>
                    <div className="bg-green-100 p-4 rounded-md inline-block">
                      <p className="text-green-900 text-lg">
                        Your Appeal Number: 
                        <span className="font-bold ml-2 tracking-wider">
                          {submissionConfirmation}
                        </span>
                      </p>
                    </div>
                    <p className="mt-4 text-green-700">
                      Please save this number for future reference.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;