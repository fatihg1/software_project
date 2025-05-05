import React, { useState, useEffect } from "react";
import { FaTrain, FaClipboardList, FaBullhorn, FaSearch, FaBars, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaSave, FaTimes, FaFilter, FaArrowLeft, FaArrowRight, FaInbox, FaRoute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import trainService from "../services/trainService";

const TrainManagement = () => {
  const navigate = useNavigate();
  
  // State for trainlines (Seferler) and trains
  const [trainlines, setTrainlines] = useState([]);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [section, setSection] = useState("trainlines"); // "trainlines" or "trains"
  const itemsPerPage = 5;

  // Search train parameters
  const [fromStation, setFromStation] = useState('İstanbul');
  const [toStation, setToStation] = useState('Ankara');
  const [travelDate, setTravelDate] = useState('2025-01-01');

  // Add trainline form state
  const [newTrainline, setNewTrainline] = useState("");
  
  // Add train form state
  const [newTrain, setNewTrain] = useState({
    seferId: "",
    departureDateTime: "",
    departureTime:"",
    wagonsCount: 3,
    wagonTypes: Array(3).fill("economy"),
    durations: [], // Array to store duration for each segment
    prices: [], // 2D array to store prices: [segment][wagon]
  });

  // Show add forms state
  const [showAddTrainline, setShowAddTrainline] = useState(false);
  const [showAddTrain, setShowAddTrain] = useState(false);

  // Selected trainline segments state
  const [segments, setSegments] = useState([]);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Fetch trainlines and trains data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all trainlines (Seferler)
        const allTrainlines = await trainService.getAllSeferler();
        setTrainlines(allTrainlines);
        
        // Fetch trains with initial search values
        const allTrains = await trainService.searchTrains(fromStation, toStation, travelDate);
        setTrains(allTrains);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Detect mobile screen and handle sidebar accordingly
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update wagon types when count changes
  useEffect(() => {
    const wagonsCount = parseInt(newTrain.wagonsCount, 10);
    if (wagonsCount > 0) {
      setNewTrain(prev => {
        // Create a new array of wagon types with the new size
        // If increasing size, fill new slots with "economy"
        // If decreasing size, truncate the array
        const updatedWagonTypes = Array(wagonsCount)
          .fill("economy")
          .map((defaultType, index) => 
            // Preserve existing wagon types when possible
            index < prev.wagonTypes.length ? prev.wagonTypes[index] : defaultType
          );
        
        // Update prices array if segments exist
        let updatedPrices = prev.prices;
        if (segments.length > 0) {
          updatedPrices = segments.map((_, segmentIndex) => {
            const existingSegmentPrices = prev.prices[segmentIndex] || [];
            return Array(wagonsCount)
              .fill("")
              .map((defaultPrice, wagonIndex) => 
                // Preserve existing prices when possible
                wagonIndex < existingSegmentPrices.length ? existingSegmentPrices[wagonIndex] : defaultPrice
              );
          });
        }
        
        return {
          ...prev,
          wagonsCount: wagonsCount,
          wagonTypes: updatedWagonTypes,
          prices: updatedPrices
        };
      });
    }
  }, [newTrain.wagonsCount, segments.length]);

  

  // Update segments and initialize durations and prices when trainline selection changes
  useEffect(() => {
    if (newTrain.seferId) {
      const selectedTrainline = trainlines.find(t => t.id === parseInt(newTrain.seferId));
      if (selectedTrainline && selectedTrainline.stations) {
        const stationsArray = selectedTrainline.stations.split('-');
        
        // Create segments array
        const newSegments = [];
        for (let i = 0; i < stationsArray.length - 1; i++) {
          newSegments.push({
            departureStation: stationsArray[i],
            arrivalStation: stationsArray[i + 1]
          });
        }
        setSegments(newSegments);
        
        // Initialize durations array with empty values for each segment
        const newDurations = Array(newSegments.length).fill("");
        
        // Initialize prices 2D array: [segment][wagon]
        const newPrices = [];
        for (let i = 0; i < newSegments.length; i++) {
          newPrices.push(Array(parseInt(newTrain.wagonsCount)).fill(""));
        }
        
        setNewTrain({
          ...newTrain,
          durations: newDurations,
          prices: newPrices
        });
      }
    } else {
      setSegments([]);
      setNewTrain({
        ...newTrain,
        durations: [],
        prices: []
      });
    }
  }, [newTrain.seferId, trainlines]);

  // Handle search trains action
  const handleSearchTrains = async () => {
    try {
      setLoading(true);
      const searchedTrains = await trainService.searchTrains(fromStation, toStation, travelDate);
      setTrains(searchedTrains);
      setLoading(false);
    } catch (err) {
      console.error("Error searching trains:", err);
      setError("Failed to search trains. Please try again later.");
      setLoading(false);
    }
  };

  // Filter trainlines by search query
  const filteredTrainlines = trainlines.filter((trainline) =>
    trainline.stations.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current page items
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    if (section === "trainlines") {
      return filteredTrainlines.slice(indexOfFirstItem, indexOfLastItem);
    } else {
      return trains.slice(indexOfFirstItem, indexOfLastItem);
    }
  };

  // Get total pages
  const totalPages = Math.ceil(
    (section === "trainlines" ? filteredTrainlines.length : trains.length) / itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Delete trainline or train
  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${section === "trainlines" ? "trainline" : "train"}?`);
    if (confirmDelete) {
      try {
        if (section === "trainlines") {
          // Delete a trainline (Sefer)
          await trainService.deleteSefer(id);
          setTrainlines(trainlines.filter(tl => tl.id !== id));
          // Also remove trains associated with this trainline
          setTrains(trains.filter(t => t.seferId !== id));
        } else {
          // Delete a train
          await trainService.deleteTrain(id);
          setTrains(trains.filter(train => train.id !== id));
        }
      } catch (err) {
        console.error(`Error deleting ${section === "trainlines" ? "trainline" : "train"}:`, err);
        alert(`Failed to delete ${section === "trainlines" ? "trainline" : "train"}. Please try again.`);
      }
    }
  };

  // Add new trainline (Sefer)
  const handleAddTrainline = async () => {
    if (newTrainline.trim() === "") return;
    
    // Validate format (at least one "-")
    if (!newTrainline.includes("-")) {
      alert("Trainline route must contain at least two stations separated by '-'");
      return;
    }
    
    try {
      // Create a new trainline (Sefer)
      const trainlineData = {
        stations: newTrainline,
      };
      
      const newTrainlineObj = await trainService.createSefer(trainlineData);
      setTrainlines([...trainlines, newTrainlineObj]);
      setNewTrainline("");
      setShowAddTrainline(false);
    } catch (err) {
      console.error("Error creating trainline:", err);
      alert("Failed to create trainline. Please try again.");
    }

    try {
      // Create a new trainline (Sefer) in the reverse direction
      const trainlineData = {
        stations: newTrainline,
      };
      const reversedString = trainlineData.stations.split("-").reverse().join("-");
      const reversedTrainLineData = {
        stations: reversedString,
      }
      const newTrainlineObj = await trainService.createSefer(reversedTrainLineData);
      setTrainlines([...trainlines, newTrainlineObj]);

      const allTrainlines = await trainService.getAllSeferler();
      setTrainlines(allTrainlines);
      setNewTrainline("");
      setShowAddTrainline(false);
    } catch (err) {
      console.error("Error creating reverse trainline:", err);
      alert("Failed to create reverse trainline. Please try again.");
    }
  };

  // Handle duration change for a specific segment
  const handleDurationChange = (segmentIndex, value) => {
    const updatedDurations = [...newTrain.durations];
    updatedDurations[segmentIndex] = value;
    setNewTrain({...newTrain, durations: updatedDurations});
  };

  // Handle price change for a specific segment and wagon
  const handlePriceChange = (segmentIndex, wagonIndex, value) => {
    const updatedPrices = [...newTrain.prices];
    if (!updatedPrices[segmentIndex]) {
      updatedPrices[segmentIndex] = Array(newTrain.wagonsCount).fill("");
    }
    updatedPrices[segmentIndex][wagonIndex] = value;
    setNewTrain({...newTrain, prices: updatedPrices});
  };

  // Update wagon type
  const handleWagonTypeChange = (index, value) => {
    const updatedWagonTypes = [...newTrain.wagonTypes];
    updatedWagonTypes[index] = value;
    setNewTrain({...newTrain, wagonTypes: updatedWagonTypes});
  };

  // Get seat count based on wagon type
  const getSeatsForWagonType = (type) => {
    switch (type.toLowerCase()) {
      case "economy": return 60;
      case "business": return 24;
      case "lodge": return 28;
      case "sleeper": return 14;
      default: return 60;
    }
  };

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  const checkTrainExists = async (seferId, departureDateTime, departureTime) => {
    try {
      // Convert input date and time to a comparable format
      const [year, month, day] = departureDateTime.split('-');
      const [hours, minutes] = departureTime.split(':');
      const selectedDateTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      
      // Get all trains for this route
      const existingTrains = await trainService.getAllTrainsBySeferId(seferId);
      
      // Check for conflicts (within a 30-minute window)
      const conflictingTrain = existingTrains.find(train => {
        const trainDateTime = new Date(train.departureDateTime);
        
        // Calculate time difference in minutes
        const timeDiff = Math.abs(trainDateTime - selectedDateTime) / (1000 * 60);
        
        // If the time difference is less than 30 minutes, consider it a conflict
        return timeDiff < 30;
      });
      
      return conflictingTrain;
    } catch (err) {
      console.error("Error checking for train conflicts:", err);
      throw new Error("Failed to check for scheduling conflicts");
    }
  };

  // Add new train
  const handleAddTrain = async () => {
    try {
      // Form validation
      if (!newTrain.seferId) {
        alert("Please select a trainline");
        return;
      }
      
      if (!newTrain.departureDateTime) {
        alert("Please edit the departure date");
        return;
      }
      
      // Validate all durations are provided
      if (newTrain.durations.some(d => !d)) {
        alert("Please provide duration for all segments");
        return;
      }
      
      if(newTrain.departureTime.length!=5){
        alert("Please fully edit the departure time");
        return;
      }

      // Check for scheduling conflicts
    const conflictingTrain = await checkTrainExists(
      newTrain.seferId, 
      newTrain.departureDateTime, 
      newTrain.departureTime
    );
    
    if (conflictingTrain) {
      const conflictTime = new Date(conflictingTrain.departureDateTime).toLocaleString();
      alert(`Scheduling conflict detected! Another train is already scheduled on this route at ${conflictTime}. Please select a different time.`);
      return;
    }
      
      // Validate all prices are provided
      for (let s = 0; s < segments.length; s++) {
        for (let w = 0; w < newTrain.wagonsCount; w++) {
          if (!newTrain.prices[s] || !newTrain.prices[s][w]) {
            alert(`Please provide price for segment ${s+1}, wagon ${w+1}`);
            return;
          }
        }
      }
      
      // Get max train ID from backend
      const maxTrainId = await trainService.getMaxTrainId();
      const trainId = maxTrainId + 1;
      
      // Create a train for each segment

      const [year, month, day] = newTrain.departureDateTime.split('-');
      const [hours, minutes] = newTrain.departureTime.split(':');
      let currentDepartureDateTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours) + 3,
        parseInt(minutes)
      );
      if (!isValidDate(currentDepartureDateTime)) {
        alert("Please enter valid departure date and time");
        return;
      }
      
      for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
        const segment = segments[segmentIndex];
        const durationMinutes = parseInt(newTrain.durations[segmentIndex]);
        
        // Calculate arrival time for this segment
        const arrivalDateTime = new Date(currentDepartureDateTime.getTime() + durationMinutes * 60000);
        
        // Create train data for this segment
        const trainData = {
          seferId: parseInt(newTrain.seferId),
          departureStation: segment.departureStation,
          arrivalStation: segment.arrivalStation,
          duration: durationMinutes,
          departureDateTime: currentDepartureDateTime.toISOString(),
          arrivalDateTime: arrivalDateTime.toISOString(),
          wagonsCount: parseInt(newTrain.wagonsCount),
          trainId: trainId
        };
        
        // Create train for this segment
        const createdTrain = await trainService.createTrain(trainData);
        
        // Create wagons for this train segment
        for (let wagonIndex = 0; wagonIndex < newTrain.wagonsCount; wagonIndex++) {
          const wagonType = newTrain.wagonTypes[wagonIndex];
          const seatCount = getSeatsForWagonType(wagonType);
          
          const wagonData = {
            trainId: createdTrain.id,
            type: wagonType,
            seats: '0'.repeat(seatCount), // Fill with zeros based on seat count
            price: parseFloat(newTrain.prices[segmentIndex][wagonIndex]),
            wagonNumber: wagonIndex + 1
          };
          
          await trainService.createWagons(wagonData);
        }
        
        // Update departure time for next segment
        currentDepartureDateTime = new Date(arrivalDateTime.getTime() + 10 * 60000);
      }
      
      // Reset form and hide add train form
      setNewTrain({
        seferId: "",
        departureDateTime: "",
        departureTime:"",
        wagonsCount: 3,
        wagonTypes: Array(3).fill("economy"),
        durations: [],
        prices: []
      });
      setSegments([]);
      setShowAddTrain(false);
      
      // Refresh train list using current search parameters
      const refreshedTrains = await trainService.searchTrains(fromStation, toStation, travelDate);
      setTrains(refreshedTrains);
      
      alert("Train created successfully!");
      
    } catch (err) {
      console.error("Error creating train:", err);
      alert("Failed to create train. Please try again.");
    }
  };

  // Get trainline name (stations) by ID
  const getTrainlineName = (id) => {
    const trainline = trainlines.find(tl => tl.id === id);
    return trainline ? trainline.stations : "Unknown Route";
  };

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
          <p className="mb-4 text-gray-700">{error}</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`md:hidden fixed top-4 ${sidebarOpen ? 'left-52' : 'left-4'} z-30 bg-blue-900 text-white p-3 rounded-md shadow-lg transition-all duration-300 ease-in-out`}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay (mobile only) */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`w-64 bg-blue-900 text-white p-6 flex flex-col fixed h-screen z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition">
            <FaTrain /> <span>Train Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/bookings");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaClipboardList /> <span>Booking Management</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/announcements");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaBullhorn /> <span>Announcements</span>
          </button>
          <button 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" 
            onClick={() => {
              navigate("/admin/appeals");
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <FaInbox /> <span>Appeal Management</span>
          </button>
        </nav>
      </div>

      <div 
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-around items-center flex-col mb-6 pt-12 md:pt-0">
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">🚆 Train Management</h1>
          <button className="bg-red-600 text-white mt-5 px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2" onClick={() => navigate("/")}>
            <FaSignOutAlt />
            <span>Back</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-2 mb-6">
          <button 
            className={`px-4 py-2 rounded-t-md flex items-center space-x-2 ${
              section === "trainlines" ? "bg-white text-blue-900 font-semibold" : "bg-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => {
              setSection("trainlines");
              setCurrentPage(1);
            }}
          >
            <FaRoute /> <span>Trainlines</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-t-md flex items-center space-x-2 ${
              section === "trains" ? "bg-white text-blue-900 font-semibold" : "bg-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => {
              setSection("trains");
              setCurrentPage(1);
            }}
          >
            <FaTrain /> <span>Trains</span>
          </button>
        </div>

        {/* Section Content */}
        {section === "trainlines" ? (
          <>
            {/* Add Trainline Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              {showAddTrainline ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Add a New Trainline</h2>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="text" 
                      placeholder="Route (e.g., Istanbul-Ankara-Konya)" 
                      className="p-2 border rounded-md flex-1" 
                      value={newTrainline}
                      onChange={(e) => setNewTrainline(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center space-x-2"
                        onClick={handleAddTrainline}
                      >
                        <FaSave /> <span>Save</span>
                      </button>
                      <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition flex items-center justify-center space-x-2"
                        onClick={() => {
                          setShowAddTrainline(false);
                          setNewTrainline("");
                        }}
                      >
                        <FaTimes /> <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2"
                  onClick={() => setShowAddTrainline(true)}
                >
                  <FaPlus /> <span>Add New Trainline</span>
                </button>
              )}
            </div>

            {/* Trainlines List Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Trainlines List</h2>

              {/* Search */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center mb-4">
                <FaSearch className="text-gray-500 mx-2" />
                <input 
                  type="text" 
                  placeholder="Search by route..." 
                  className="p-2 border rounded-md w-full" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>

              {/* Trainlines Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Route</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentItems().map((trainline) => (
                      <tr key={trainline.id} className="border-t">
                        <td className="p-3">{trainline.id}</td>
                        <td className="p-3">{trainline.stations}</td>
                        
                      </tr>
                    ))}
                    {getCurrentItems().length === 0 && (
                      <tr>
                        <td colSpan="3" className="p-3 text-center text-gray-500">No trainlines found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button 
                    disabled={currentPage === 1} 
                    onClick={prevPage}
                    className={`flex items-center space-x-1 p-2 rounded-md ${
                      currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <FaArrowLeft /> <span>Prev</span>
                  </button>
                  <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                  <button 
                    disabled={currentPage === totalPages} 
                    onClick={nextPage}
                    className={`flex items-center space-x-1 p-2 rounded-md ${
                      currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <span>Next</span> <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Add Train Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              {showAddTrain ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Add a New Train</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Basic Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trainline *</label>
                      <select 
                        className="p-2 border rounded-md w-full" 
                        value={newTrain.seferId}
                        onChange={(e) => setNewTrain({...newTrain, seferId: e.target.value})}
                        required
                      >
                        <option value="">Select a trainline</option>
                        {trainlines.map(tl => (
                          <option key={tl.id} value={tl.id}>
                            {tl.id} - {tl.stations}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date *</label>
                      <input 
                        type="date" 
                        className="p-2 border rounded-md w-full" 
                        value={newTrain.departureDateTime}
                        onChange={(e) => setNewTrain({...newTrain, departureDateTime: e.target.value})}
                        
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wagon Count *</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="15"
                        className="p-2 border rounded-md w-full" 
                        value={newTrain.wagonsCount}
                        onKeyDown={(e) => {
                          // Block: e, +, -, ., etc.
                          if (!["1", "2", "3", "4", "5","6","7","8","9","0","Delete","Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value)) {
                            const clamped = Math.max(1, Math.min(15, value));
                            setNewTrain(prev => ({
                              ...prev,
                              wagonsCount: clamped
                            }));
                          } else {
                            setNewTrain(prev => ({
                              ...prev,
                              wagonsCount: ''
                            }));
                          }
                        }}
                        onBlur={() => {
                          // input'tan çıkarken boşsa otomatik 1 yap
                          if (newTrain.wagonsCount === '' || newTrain.wagonsCount === null) {
                            setNewTrain(prev => ({ ...prev, wagonsCount: 1 }));
                          }
                        }}
                      />
                      
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time *</label>
                      <input 
                        type="time" 
                        className="p-2 border rounded-md w-full" 
                        value={newTrain.departureTime}
                        onChange={(e) => setNewTrain({...newTrain, departureTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Segment Durations (if trainline is selected) */}
                  {segments.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Segment Durations (in minutes)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {segments.map((segment, index) => (
                          <div key={`duration-${index}`} className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm font-medium mb-2">
                              {segment.departureStation} → {segment.arrivalStation}
                            </p>
                            <input 
                              type="number" 
                              min="5"
                              max="1440"
                              placeholder="Duration in minutes"
                              className="p-2 border rounded-md w-full" 
                              value={newTrain.durations[index] || ""}
                              onChange={(e) => handleDurationChange(index, e.target.value)}        
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Wagon Types */}
                  {newTrain.wagonsCount > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Wagon Types</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {Array.from({ length: newTrain.wagonsCount }, (_, i) => (
                          <div key={`wagon-${i}`}>
                            <label className="block text-sm text-gray-700 mb-1">Wagon {i+1}</label>
                            <select 
                              className="p-2 border rounded-md w-full"
                              value={newTrain.wagonTypes[i]}
                              onChange={(e) => handleWagonTypeChange(i, e.target.value)}
                            >
                              <option value="economy">Economy (60 seats)</option>
                              <option value="business">Business (24 seats)</option>
                              <option value="lodge">Lodge (28 seats)</option>
                              <option value="sleeper">Sleeper (14 seats)</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Price Configuration (if segments and wagons are defined) */}
                  {segments.length > 0 && newTrain.wagonsCount > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Ticket Prices</h3>
                      {segments.map((segment, segmentIndex) => (
                        <div key={`segment-price-${segmentIndex}`} className="mb-4 p-4 bg-gray-50 rounded-md">
                          <h4 className="font-medium mb-2">
                            {segment.departureStation} → {segment.arrivalStation}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Array.from({ length: newTrain.wagonsCount }, (_, wagonIndex) => (
                              <div key={`price-${segmentIndex}-${wagonIndex}`}>
                                <label className="block text-sm text-gray-700 mb-1">
                                  {newTrain.wagonTypes[wagonIndex] ? 
                                    (newTrain.wagonTypes[wagonIndex].charAt(0).toUpperCase() + 
                                    newTrain.wagonTypes[wagonIndex].slice(1)) : "Economy"} Wagon {wagonIndex + 1}
                                </label>
                                <div className="flex">
                                  <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">₺</span>
                                  <input 
                                    type="number" 
                                    min="1"
                                    step="0.01"
                                    placeholder="Price"
                                    className="p-2 border border-gray-300 rounded-r-md w-full" 
                                    value={newTrain.prices[segmentIndex] && newTrain.prices[segmentIndex][wagonIndex] || ""}
                                    onChange={(e) => handlePriceChange(segmentIndex, wagonIndex, e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition flex items-center space-x-2"
                      onClick={() => {
                        setShowAddTrain(false);
                        setNewTrain({
                          seferId: "",
                          departureDateTime: "",
                          wagonsCount: 3,
                          wagonTypes: Array(3).fill("economy"),
                          durations: [],
                          prices: []
                        });
                        setSegments([]);
                      }}
                    >
                      <FaTimes /> <span>Cancel</span>
                    </button>
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center space-x-2"
                      onClick={handleAddTrain}
                    >
                      <FaSave /> <span>Save Train</span>
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2"
                  onClick={() => setShowAddTrain(true)}
                >
                  <FaPlus /> <span>Add New Train</span>
                </button>
              )}
            </div>

            {/* Train List Section */}
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-3">Trains List</h2>

  {/* Search & Filter */}
  <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1">From Station</label>
        <input 
          type="text" 
          placeholder="Departure Station" 
          className="p-2 border rounded-md w-full" 
          value={fromStation} 
          onChange={(e) => setFromStation(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1">To Station</label>
        <input 
          type="text" 
          placeholder="Arrival Station" 
          className="p-2 border rounded-md w-full" 
          value={toStation} 
          onChange={(e) => setToStation(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
        <input 
          type="date" 
          className="p-2 border rounded-md w-full" 
          value={travelDate} 
          onChange={(e) => setTravelDate(e.target.value)}
          required
        />
      </div>
      <div className="flex items-end">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2 w-full justify-center"
          onClick={handleSearchTrains}
        >
          <FaSearch /> <span>Search Trains</span>
        </button>
      </div>
    </div>
  </div>

  {/* Trains Table */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3 text-left">Train ID</th>
          <th className="p-3 text-left">Route</th>
          <th className="p-3 text-left">Departure</th>
          <th className="p-3 text-left">Duration</th>
          <th className="p-3 text-left">Wagons</th>
          
        </tr>
      </thead>
      <tbody>
        {getCurrentItems().map((train) => (
          <tr key={train.id} className="border-t">
            <td className="p-3">{train.id}</td>
            <td className="p-3">{getTrainlineName(train.seferId)}</td>
            <td className="p-3">
              {new Date(train.departureDateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </td>
            <td className="p-3">{formatDuration(train.duration)}</td>
            <td className="p-3">{train.wagonsCount}</td>
            
          </tr>
        ))}
        {getCurrentItems().length === 0 && (
          <tr>
            <td colSpan="6" className="p-3 text-center text-gray-500">No trains found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-between items-center mt-4">
      <button 
        disabled={currentPage === 1} 
        onClick={prevPage}
        className={`flex items-center space-x-1 p-2 rounded-md ${
          currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <FaArrowLeft /> <span>Prev</span>
      </button>
      <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
      <button 
        disabled={currentPage === totalPages} 
        onClick={nextPage}
        className={`flex items-center space-x-1 p-2 rounded-md ${
          currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <span>Next</span> <FaArrowRight />
      </button>
    </div>
  )}
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainManagement;