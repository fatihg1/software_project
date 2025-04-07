import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, ArrowRight, RefreshCcw, CheckCircle } from 'lucide-react';

const TicketDisplayPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refundingTickets, setRefundingTickets] = useState({});
  const [confirmModal, setConfirmModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch tickets from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/tickets')
      .then(response => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      });
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-us', options);
  };

  // Handle refund button click - opens confirmation modal
  const handleRefund = (ticketId) => {
    setConfirmModal(ticketId);
  };

  // Confirm refund: calls the backend API to update the ticket's refund status
  const confirmRefund = (ticketId) => {
    setRefundingTickets({ ...refundingTickets, [ticketId]: true });
    setConfirmModal(null);

    axios.put(`http://localhost:8080/api/tickets/${ticketId}/refund`, null, {
      params: { refundRequested: true }
    })
      .then(response => {
        // Update local ticket data with the response from backend
        setTickets(tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, refundRequested: true } : ticket
        ));
        setRefundingTickets({ ...refundingTickets, [ticketId]: false });
        setAlertMessage(`Refund request for ticket ${ticketId} has been received.`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      })
      .catch(error => {
        console.error("Error updating refund status:", error);
        setRefundingTickets({ ...refundingTickets, [ticketId]: false });
      });
  };

  const cancelRefund = () => {
    setConfirmModal(null);
  };

  // Determine if a ticket is in the past (non-refundable)
  const isTicketPast = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ticketDate = new Date(dateString);
    ticketDate.setHours(hours, minutes);
    return ticketDate < new Date();
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6 pt-30">Loading tickets...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-30">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      
      {/* Alert message */}
      {showAlert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{alertMessage}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowAlert(false)}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}
      
      {tickets.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">You don't have any tickets yet.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Browse Available Routes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {tickets.map(ticket => {
            const isPast = isTicketPast(ticket.date, ticket.time);
            const isProcessing = refundingTickets[ticket.id];
            
            return (
              <div 
                key={ticket.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                        {ticket.id}
                      </span>
                      <h3 className="mt-2 text-lg font-medium">
                        {ticket.route.from} <ArrowRight className="inline h-4 w-4" /> {ticket.route.to}
                      </h3>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="text-gray-600">{formatDate(ticket.date)}</p>
                      <p className="font-semibold">{ticket.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Passenger:</p>
                      <p className="font-medium">{ticket.lastName}</p>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Seat:</p>
                        <p className="font-medium">{ticket.seat}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      {isPast ? (
                        <div className="mt-2 flex items-center text-amber-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Past trip - not refundable</span>
                        </div>
                      ) : ticket.refundRequested ? (
                        <div className="mt-2 flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>Refund request submitted</span>
                        </div>
                      ) : (
                        <button
                          className={`mt-2 px-4 py-2 rounded-md text-sm font-medium ${isProcessing ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100 transition-colors'}`}
                          onClick={() => handleRefund(ticket.id)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCcw className="inline-block h-4 w-4 mr-1 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Request Refund'
                          )}
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
      
      {/* Confirmation Modal with transparent background */}
      {confirmModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Confirm Refund</h3>
            <p className="mb-6">
              Are you sure you want to refund ticket {confirmModal}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={cancelRefund}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => confirmRefund(confirmModal)}
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDisplayPage;
