import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowRight, RefreshCcw, CheckCircle, Clock } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useLocation, useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import translations from './translations';
const TicketDisplayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const { isLoaded, user } = useUser();
  const [refundingTickets, setRefundingTickets] = useState({});
  const [confirmModal, setConfirmModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].ticketPage;
  // Use a ref to track whether we have done the location.state check already
  const hasCheckedLocationRef = useRef(false);

  // Determine if we're in lookup mode (for UI conditionals)
  const isLookupMode = () => {
    // Check from URL params first
    const lookupFromURL = location.state?.isLookup === true || localStorage.getItem('isLookup') === 'true';

    // If we reached this page from the "My Tickets" button in the sidebar, override to view all tickets
    const fromMyTicketsButton = location.state?.fromMyTickets === true;
    
    // If specifically coming from My Tickets button, prioritize that and show all tickets
    if (fromMyTicketsButton) {
      return false;
    }
    
    // Otherwise use the lookup parameters
    return lookupFromURL;
  };
  const returnText = () => {
    if(isLoaded && user) {
      return t.returnTextLoggedIn;
    }
    return t.noTicketsLoggedOut;
  }
  // Merged useEffect - handles both parameter extraction and data fetching
  useEffect(() => {
    // Run this condition only on the first iteration of the component's lifecycle
    if (!hasCheckedLocationRef.current) {
      if (location.state === null) {
        // If no state on initial navigation, update localStorage accordingly
        localStorage.setItem('isLookup', 'false');
      }
      hasCheckedLocationRef.current = true;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const inLookupMode = isLookupMode();
        if(!isLoaded && !isLookupMode) return;
        // If coming from My Tickets button or not in lookup mode, and user is logged in, show all tickets
        if (!inLookupMode && isLoaded && user) {
          const response = await fetch('http://localhost:8080/api/tickets/me/enhanced/fixed', {
            headers: {
              'X-User-Email': user ? user.primaryEmailAddress.emailAddress : '',
            }
          });
          
          if (!response.ok) throw new Error('Failed to display tickets');
          const data = await response.json();
          
          
          // Transform backend data to match frontend structure
          const formattedTickets = data.map(ticket => ({
            id: ticket.id,
            ticketId: ticket.ticketId,
            name: ticket.name,
            surname: ticket.surname,
            seat: ticket.seat,
            refundRequested: ticket.refundRequested || false,
            route: {
              from: ticket.departureStation || "Unknown",
              to: ticket.arrivalStation || "Unknown"
            },
            date: ticket.date,
            departureDateTime: ticket.departureDateTime,
            wagonNumber: ticket.wagonNumber,
            wagonType: ticket.wagonType
          }));
          
          setTickets(formattedTickets);
          return; // Exit early after fetching all tickets
        }
        
        // Handle the lookup mode
        if (inLookupMode) {
          // First try to get parameters from the URL (searchParams)
          let ticketId = searchParams.get('ticketId');
          let lastName = searchParams.get('lastName');
          
          // If any parameters are missing from the URL, try retrieving them from localStorage
          if (!ticketId || !lastName) {
            const storedTicketId = localStorage.getItem('ticketId');
            const storedLastName = localStorage.getItem('lastName');
            
            if (storedTicketId && storedLastName) {
              ticketId = storedTicketId;
              lastName = storedLastName;
              // Update the URL so that refreshes will pick it up next time
              setSearchParams({ ticketId, lastName, isLookup: 'true' });
            }
          } else {
            // If found in the URL, persist them to local storage for the next refresh
            localStorage.setItem('ticketId', ticketId);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('isLookup', 'true');
          }
          
          // If still not found in the URL, look into location.state (only available on initial navigation)
          if ((!ticketId || !lastName) && location.state) {
            // Check all possible parameter names in location.state
            ticketId = location.state.ticketId;
            lastName = location.state.lastName || location.state.surname; // Check both variants
            
            console.log("Found params in location.state:", { ticketId, lastName });
            
            if (ticketId && lastName) {
              // Update both URL and local storage so that they are available on refresh
              setSearchParams({ ticketId, lastName, isLookup: 'true' });
              localStorage.setItem('ticketId', ticketId);
              localStorage.setItem('lastName', lastName);
              localStorage.setItem('isLookup', 'true');
            }
          }
          
          console.log("Final parameters for lookup:", { ticketId, lastName });
          
          // Now fetch the ticket data based on the parameters
          if (ticketId && lastName) {
            // Handle ticket lookup flow
            console.log("Fetching single ticket with params:", { ticketId, lastName });
            const response = await fetch(`http://localhost:8080/api/tickets/by-ticket-and-surname?ticketId=${ticketId}&surname=${lastName}`);
            
            if (!response.ok) {
              setNotFound(true);
              throw new Error('Ticket not found');
            }
            
            const data = await response.json();
            console.log("Single ticket data:", data);
            const formattedTicket = {
              id: data.id,
              ticketId: data.ticketId,
              name: data.name,
              surname: data.surname,
              seat: data.seat,
              refundRequested: data.refundRequested || false,
              route: {
                from: data.departureStation || "Unknown",
                to: data.arrivalStation || "Unknown"
              },
              date: data.date,
              departureDateTime: data.departureDateTime,
              wagonNumber: data.wagonNumber,
              wagonType: data.wagonType
            };
            
            setTickets([formattedTicket]);
            return;
          }
        }
        
        // If we reach here, we're neither in lookup mode with valid parameters nor have a logged-in user
        console.log("No conditions met for fetching tickets");
        setTickets([]);
        
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setAlertMessage(error.message || "Failed to load tickets.");
        setShowAlert(true);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    // Add a slight delay before starting the fetch to allow state transitions
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [location, searchParams, setSearchParams, isLoaded, user]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return t.na;
    const date = new Date(timeString);
    if (isNaN(date)) return t.invalidTime;
    return date.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  // Handle refund button click - opens confirmation modal
  const handleRefund = (ticketId) => {
    setConfirmModal(ticketId);
  };

  const confirmRefund = async (ticketId) => {
    setRefundingTickets({ ...refundingTickets, [ticketId]: true });
    setConfirmModal(null);
  
    try {
      // 1. Grab the full ticket from your state
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (!ticket) throw new Error(t.ticketNotFound);
      
      // 2. (Optional) Re-fetch the ticket if you need server-filled fields
      const detailsResp = await fetch(`http://localhost:8080/api/tickets/${ticket.id}`, {
        headers: { 'X-User-Email': user ? user.primaryEmailAddress.emailAddress : '' } 
      });
      if (!detailsResp.ok) throw new Error("Couldn't fetch ticket details");
      const details = await detailsResp.json();
      const refundTicket = await fetch(`http://localhost:8080/api/tickets/refund/${ticket.ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': user ? user.primaryEmailAddress.emailAddress : ''
        }
      });
      // 3. Compute all segment IDs for the outbound journey
      const outboundTrainIds = await getTrainIdsForRoute(
        details.departureStation,
        details.arrivalStation,
        details.seferId
      );
      console.log("Outbound train IDs:", outboundTrainIds);
      // 4. Build minimal refund payload
      const refundData = {
        outboundSeats: [{
          wagon: details.wagonNumber,
          number: parseInt(details.seat, 10)
        }],
        returnSeats: [],
        outboundTrainIds,
        returnTrainIds: []
      };
      console.log("Refund data:", refundData);
      // 5. Call refund endpoint
      const refundResp = await fetch('http://localhost:8080/api/trains/seatRefund', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': user ? user.primaryEmailAddress.emailAddress : '',
        },
        body: JSON.stringify(refundData)
      });
  
      if (!refundResp.ok) throw new Error("Failed to process seat refund");
      
      // 6. Update UI
      setTickets(tickets.map(t =>
        t.ticketId === ticketId ? { ...t, refundRequested: true } : t
      ));
      setAlertMessage(`Refund request for ticket ${ticketId} has been received.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
    catch (err) {
      console.error(err);
      setAlertMessage(err.message || "Failed to request refund.");
      setShowAlert(true);
    }
    finally {
      setRefundingTickets({ ...refundingTickets, [ticketId]: false });
    }
  };
  
  
  // Helper function to get all train IDs for a route
  const getTrainIdsForRoute = async (departureStation, arrivalStation, seferId) => {
    try {
      // Fetch all train segments between departure and arrival stations
      const response = await fetch(
        `http://localhost:8080/api/trains/route?seferId=${seferId}&departure=${departureStation}&arrival=${arrivalStation}`
      );
      
      if (!response.ok) throw new Error("Failed to get train segments for route");
      
      // Extract unique train IDs from the segments
      // In this case, we need all segments with the same train_id
      const trainIds = await response.json();
      
      return trainIds;
    } catch (error) {
      console.error("Error fetching train IDs for route:", error);
      return [];
    }
  };

  const cancelRefund = () => {
    setConfirmModal(null);
  };

  // Determine if a ticket is in the past (non-refundable)
  const isTicketPast = (dateString, timeString) => {
    if (!dateString || !timeString) return true;
    
    let hours = 0;
    let minutes = 0;
    
    if (timeString.includes(':')) {
      const [h, m] = timeString.split(':').map(Number);
      hours = h;
      minutes = m;
    }
    
    const ticketDate = new Date(dateString);
    ticketDate.setHours(hours, minutes);
    return ticketDate < new Date();
  };

  // Check if ticket departure is within next 24 hours (invalid for refund)
  const isRefundInvalidDate = (dateString, timeString) => {
    if (!dateString || !timeString) return true;
    
    // Instead of splitting the time, use the full datetime string
    const ticketDateTime = new Date(timeString);
    
    // If timeString isn't a valid date, fallback to using dateString
    if (isNaN(ticketDateTime.getTime())) {
      const [h, m] = timeString.split(':').map(Number);
      const fallbackDateTime = new Date(dateString);
      fallbackDateTime.setHours(h, m);
      return (fallbackDateTime - new Date()) < 24 * 60 * 60 * 1000;
    }
    
    const now = new Date();
    const msDiff = ticketDateTime - now;
    return msDiff < 24 * 60 * 60 * 1000;
  };

  // Navigate to search train
  const handleBrowseRoutes = () => {
    navigate('/select-train');
  };

  // Render page content with consistent height
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-6xl p-6 pt-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 mt-20">
          {isLookupMode() ? t.ticketDetails : t.myTickets}
        </h1>
        
        {/* Alert message */}
        {showAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center">
            <div className="h-5 w-5 mr-2" />
            <span>{alertMessage}</span>
            
          </div>
        )}
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[400px]">
            <RefreshCcw className="h-8 w-8 mb-4 animate-spin text-blue-600" />
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : tickets.length === 0 || notFound ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 mb-4 text-amber-500" />
            <p className="text-gray-600 mb-8 text-lg">
              {isLookupMode() 
                ? t.noTicketFound
                : returnText()}
            </p>
            <button 
              onClick={handleBrowseRoutes}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {t.browseRoutes}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map(ticket => {
              const isPast = isTicketPast(ticket.date, ticket.departureDateTime);
              const isProcessing = refundingTickets[ticket.ticketId];
              const processing = refundingTickets[ticket.ticketId];
              const tooLate   = isRefundInvalidDate(ticket.date, ticket.departureDateTime);

              return (
                <div 
                  key={ticket.ticketId} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-5xl mx-auto"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                          {ticket.ticketId}
                        </span>
                        <h3 className="mt-2 text-lg font-medium">
                          {ticket.route.from} <ArrowRight className="inline h-4 w-4" /> {ticket.route.to}
                        </h3>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <p className="text-gray-600">{formatDate(ticket.date)}</p>
                        <div className="flex items-center justify-end text-gray-700 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <p className="font-semibold">{formatTime(ticket.departureDateTime)} - {formatTime(ticket.date)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-sm text-gray-600">{t.passengerLabel}</p>
                        <p className="font-medium">{ticket.name} {ticket.surname}</p>
                        <div className="mt-2 flex space-x-4">
                          <div>
                            <p className="text-sm text-gray-600">{t.seatLabel}</p>
                            <p className="font-medium">{ticket.seat}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t.wagonLabel}</p>
                            <p className="font-medium">{ticket.wagonNumber || t.na} ({ticket.wagonType || t.na})</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0">
                        {isPast ? (
                          <div className="mt-2 flex items-center text-amber-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{t.pastTrip}</span>
                          </div>
                        ) : ticket.refundRequested ? (
                          <div className="mt-2 flex items-center text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>{t.refundSubmitted}</span>
                          </div>
                        ) : (
                          <button
                        className={`mt-2 px-4 py-2 rounded-md text-sm font-medium ${processing || tooLate
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : 'bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
                        }`}
                        onClick={() => !processing && !tooLate && handleRefund(ticket.ticketId)}
                        disabled={processing || tooLate}
                      >
                        {processing
                          ? <><RefreshCcw className="inline-block h-4 w-4 mr-1 animate-spin" />{t.processing}</>
                          : tooLate
                            ? t.invalidTime
                            : t.requestRefund
                        }
                      </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Confirmation Modal with transparent background */}
      {confirmModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">{t.confirmRefundTitle}</h3>
            <p className="mb-6">
            {t.confirmMessage.replace('{ticketId}', confirmModal)}

            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={cancelRefund}
              >
                {t.cancel}
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => confirmRefund(confirmModal)}
              >
                {t.confirmRefund}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDisplayPage;