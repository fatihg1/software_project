import React, { useState } from 'react';
import { FileText, User, Map } from 'lucide-react';

const HelpCenter = () => {
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
  const [submissionConfirmation, setSubmissionConfirmation] = useState(null);

  // Commented out Look Up Appeal state
  /*
  const [lastName, setLastName] = useState('');
  const [appealNumber, setAppealNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [activeTab, setActiveTab] = useState('lookUp');
  */

  // Generate a random 12-digit appeal number
  const generateAppealNumber = () => {
    return Array.from(
      { length: 12 }, 
      () => Math.floor(Math.random() * 10)
    ).join('');
  };

  // Commented out Look Up Appeal Handler
  /*
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
  */

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
    <div className="max-w-4xl mx-auto p-4 pt-30">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Appeal Help Center</h1>
        <p className="text-gray-600">Submit your appeal</p>
      </div>

      {/* Commented out Tab Navigation
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === 'lookUp'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('lookUp')}
        >
          Look Up an Appeal
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === 'addAppeal'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('addAppeal')}
        >
          Submit New Appeal
        </button>
      </div>
      */}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Commented out Look Up Appeal section
        {activeTab === 'lookUp' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
                <input
                  type="text"
                  className="w-full p-3 focus:outline-none"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <User size={20} className="text-gray-400 mr-3" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Appeal Number</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
                <input
                  type="text"
                  className="w-full p-3 focus:outline-none"
                  placeholder="Enter Appeal Number"
                  value={appealNumber}
                  onChange={(e) => setAppealNumber(e.target.value)}
                />
                <FileText size={20} className="text-gray-400 mr-3" />
              </div>
            </div>
            <button 
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
              onClick={handleLookUpAppeal}
            >
              <Search size={20} className="mr-2" />
              Search Appeal
            </button>

            {searchResult ? (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-3">Appeal Found</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Status</p>
                    <p className="font-medium">{searchResult.status}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Type</p>
                    <p className="font-medium">{searchResult.type}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Submitted Date</p>
                    <p className="font-medium">{searchResult.submittedDate}</p>
                  </div>
                </div>
              </div>
            ) : lastName || appealNumber ? (
              <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">No appeal found with the provided details.</p>
                <p className="text-red-600 mt-2">Please check your information and try again.</p>
              </div>
            ) : null}
          </div>
        ) : (
        */}
        <form onSubmit={handleSubmitAppeal} className="space-y-6">
          {/* Appeal Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Appeal Type</label>
            <select
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <User size={20} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter Email Address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Map size={20} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">Travel Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">Ticket ID</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Describe your appeal in detail"
              rows={4}
              value={appealContext}
              onChange={(e) => setAppealContext(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <FileText size={20} className="mr-2" />
            Submit Appeal
          </button>
        </form>

        {/* Submission Confirmation Section */}
        {submissionConfirmation && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
              Appeal Submitted Successfully!
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">Your Appeal Number</p>
              <p className="text-xl font-bold tracking-wider text-green-700">
                {submissionConfirmation}
              </p>
            </div>
            <p className="mt-4 text-green-700 text-center">
              Please save this number for future reference.
            </p>
          </div>
        )}
        {/* Closing commented out bracket for conditionally rendering based on activeTab
        )}
        */}
      </div>
    </div>
  );
};

export default HelpCenter;