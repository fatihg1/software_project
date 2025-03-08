import React, { useState } from 'react';

const TermsAndConditionsPopup = ({ isOpen, onClose }) => {
  const [accepted, setAccepted] = useState(false);
  
  if (!isOpen) return null;
  
  const handleAccept = () => {
    if (accepted) {
      // You can add any logic here when terms are accepted
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 backdrop-blur-xs shadow-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Terms and Conditions</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-gray-600 text-sm flex-grow">
          <h3 className="font-bold text-gray-800 mb-2">1. Ticket Purchase and Booking</h3>
          <p className="mb-4">
            By completing your booking through our service, you enter into a binding agreement with the railway operator. All tickets are subject to the specific terms of the selected fare and the general conditions of carriage established by the relevant railway company.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">2. Ticket Validity</h3>
          <p className="mb-4">
            All tickets are valid only for the specified journey, date, and train service indicated at the time of purchase. Tickets are non-transferable and must be used by the passenger named on the booking unless explicitly stated otherwise. Digital tickets must be presented on a functioning device or as a printed copy with a clearly legible QR code or barcode.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">3. Pricing and Payment</h3>
          <p className="mb-4">
            All prices displayed include applicable taxes and fees unless otherwise stated. Payment must be made in full at the time of booking using one of our accepted payment methods. We reserve the right to change prices at any time before booking confirmation.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">4. Cancellations and Refunds</h3>
          <p className="mb-4">
            Refund eligibility depends on the ticket type purchased. Non-refundable tickets cannot be exchanged for cash. Refundable tickets may be subject to an administrative fee. All refund requests must be submitted at least 24 hours before the scheduled departure time through our customer service channels.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">5. Changes to Bookings</h3>
          <p className="mb-4">
            Changes to flexible tickets may be made subject to availability and any applicable fare difference. Changes to restricted tickets may not be permitted or may incur additional charges as specified at the time of purchase. All booking changes must be made before the scheduled departure.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">6. Passenger Responsibilities</h3>
          <p className="mb-4">
            Passengers are responsible for arriving at the station with sufficient time before departure. All passengers must comply with railway regulations and staff instructions. Failure to present a valid ticket may result in penalty fares or removal from the train.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">7. Privacy and Data Protection</h3>
          <p className="mb-4">
            Personal information collected during the booking process is used solely for processing your transaction and providing the requested service. We adhere to applicable data protection laws and our Privacy Policy, which can be accessed on our website.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">8. Liability</h3>
          <p className="mb-4">
            Our liability is limited to the value of the tickets purchased. We are not liable for consequential losses or delays beyond our reasonable control including but not limited to strikes, technical failures, severe weather conditions, or actions by third parties.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">9. Customer Service</h3>
          <p className="mb-4">
            For assistance with bookings, refunds, or general inquiries, please contact our customer service team using the contact information provided on our website. Response times may vary depending on inquiry volume.
          </p>
          
          <h3 className="font-bold text-gray-800 mb-2">10. Governing Law</h3>
          <p className="mb-2">
            These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes shall be subject to the exclusive jurisdiction of the relevant courts.
          </p>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <label className="flex items-center mb-4 cursor-pointer">
            
            
          </label>
          
          <div className="flex justify-end space-x-4">
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPopup;