import { h6 } from 'framer-motion/client';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import TermsAndConditionsPopup from './TermsConditions';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  priceDetails,
  passengers
}) => {
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validatePaymentForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate card number
    if (!paymentForm.cardNumber.trim()) {
      formErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
      formErrors.cardNumber = 'Card number should be 16 digits';
      isValid = false;
    }
    
    if (!paymentForm.cardHolder.trim()) {
      formErrors.cardHolder = 'Card holder name is required';
      isValid = false;
    }
    
    if (!paymentForm.expiryDate.trim()) {
      formErrors.expiryDate = 'Expiry date is required';
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
      formErrors.expiryDate = 'Use format MM/YY';
      isValid = false;
    }
    
    if (!paymentForm.cvv.trim()) {
      formErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      formErrors.cvv = 'CVV should be 3 or 4 digits';
      isValid = false;
    }
    
    if (!paymentForm.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(paymentForm.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      onSubmit({
        ...paymentForm,
        passengers
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentForm.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-3 py-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="cardHolder" className="block text-gray-700 mb-1">Card Holder</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={paymentForm.cardHolder}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 border rounded-md ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="expiryDate" className="block text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentForm.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className={`w-full px-3 py-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentForm.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className={`w-full px-3 py-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">Email for Confirmation</label>
            <input
              type="email"
              id="email"
              name="email"
              value={paymentForm.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Pay Now ${priceDetails.grandTotal.toFixed(2)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PassengerInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  const [userAgreement, setUserAgreement] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  
  const handlePayment = () => {
    if (!userAgreement) {
      setError("You must agree to the terms before proceeding.");
      return false;
    }
    return true;
  };

  // Extract booking information
  const { 
    selectedSeats = {
      outbound: [],
      return: []
    }, 
    outboundTrain = {}, 
    returnTrain = {}, 
    tripType 
  } = bookingData;
  
  // Passenger information state
  const [passengers, setPassengers] = useState(
    selectedSeats.outbound.map(() => ({
      firstName: '',
      surname: '',
      governmentId: '',
      phoneNumber: '',
      email: '',
      birthDate: ''
    }))
  );
  
  // Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Validation state for passenger info
  const [errors, setErrors] = useState({});
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (tripType === 'round-trip') {
      const outboundPrice = outboundTrain.price || 0;
      const returnPrice = returnTrain.price || 0;
      
      return {
        outboundTotal: selectedSeats.outbound.length * outboundPrice,
        returnTotal: selectedSeats.return.length * returnPrice,
        grandTotal: (selectedSeats.outbound.length * outboundPrice) + 
                    (selectedSeats.return.length * returnPrice)
      };
    } else {
      // One-way trip
      const outboundPrice = outboundTrain.price || 0;
      return {
        outboundTotal: selectedSeats.outbound.length * outboundPrice,
        returnTotal: 0,
        grandTotal: selectedSeats.outbound.length * outboundPrice
      };
    }
  };

  const priceDetails = calculateTotalPrice();
  
  // Handle passenger info input changes
  const handlePassengerInputChange = (index, e) => {
    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [name]: value
    };
    setPassengers(newPassengers);

    // Clear specific error when typing
    if (errors[`${index}-${name}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${name}`];
      setErrors(newErrors);
    }
  };
  
  // Validate passenger information
  const validatePassengers = () => {
    const newErrors = {};
    passengers.forEach((passenger, index) => {
      // Name validation
      if (!passenger.firstName || passenger.firstName.trim() === '') {
        newErrors[`${index}-firstName`] = 'First name is required';
      }
      
      // Surname validation
      if (!passenger.surname || passenger.surname.trim() === '') {
        newErrors[`${index}-surname`] = 'Surname is required';
      }
      
      // Government ID validation (assuming it's a 11-digit number)
      if (!passenger.governmentId || !/^\d{11}$/.test(passenger.governmentId)) {
        newErrors[`${index}-governmentId`] = 'Valid 11-digit government ID is required';
      }
      
      // Phone number validation
      if (!passenger.phoneNumber || !/^\+?[1-9]\d{9,14}$/.test(passenger.phoneNumber)) {
        newErrors[`${index}-phoneNumber`] = 'Valid phone number is required';
      }
      
      // Email validation
      if (!passenger.email || !/\S+@\S+\.\S+/.test(passenger.email)) {
        newErrors[`${index}-email`] = 'Valid email is required';
      }
      
      // Birth date validation
const cleanedBirthDate = passenger.birthDate.replace(/\D/g, '');
if (cleanedBirthDate.length !== 8) {
  newErrors[`${index}-birthDate`] = 'Birth date must be 8 digits';
} else {
  const day = parseInt(cleanedBirthDate.slice(0, 2), 10);
  const month = parseInt(cleanedBirthDate.slice(2, 4), 10);
  const year = parseInt(cleanedBirthDate.slice(4), 10);

  // Check month is between 1 and 12
  if (month < 1 || month > 12) {
    newErrors[`${index}-birthDate`] = 'Invalid month';
  }

  // Check day is valid for the month
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    newErrors[`${index}-birthDate`] = 'Invalid day for the month';
  }

  // Check date is not in the future
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  if (inputDate > today) {
    newErrors[`${index}-birthDate`] = 'Invalid year';
  }
}
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (validatePassengers() && handlePayment()) {
      setIsPaymentModalOpen(true);
    }
  };
  
  // Handle final submission
  const handleFinalSubmit = (paymentData) => {
    // In a real application, you would process the payment here
    // For this demo, we'll just show success and navigate
    alert('Payment successful! Your tickets have been booked.');
    navigate('/', { 
      state: { 
        bookingConfirmation: {
          ...bookingData,
          ...paymentData,
          confirmationNumber: 'TKT' + Math.floor(100000 + Math.random() * 900000)
        }
      }
    });
  };
  
  // Go back to seat selection
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div>
    <div className={`relative ${isPaymentModalOpen ? 'blur-md' : ''}`}>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 pt-25">
        {/* Trip summary - similar to previous implementation */}
        <div className=" p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-blue-800">
            {tripType === 'round-trip' ? 'Round Trip' : 'One Way Trip'}
          </h2>
          {outboundTrain.departure && outboundTrain.arrival && (
            <div>
              <p className="text-blue-600">
                Outbound: {outboundTrain.departure} to {outboundTrain.arrival}
                {outboundTrain.date && ` • ${outboundTrain.date}`}
                {outboundTrain.time && ` • ${outboundTrain.time}`}
              </p>
              {tripType === 'round-trip' && returnTrain.departure && (
                <p className="text-blue-600">
                  Return: {returnTrain.departure} to {returnTrain.arrival}
                  {returnTrain.date && ` • ${returnTrain.date}`}
                  {returnTrain.time && ` • ${returnTrain.time}`}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6">Passenger Information</h3>
          
          <form>
            {passengers.map((passenger, index) => (
              <div key={index} className="border-b pb-6 mb-6">
                <h4 className="text-lg font-semibold mb-4">
                  Passenger {index % selectedSeats.outbound.length + 1}
                </h4>
                <h5 className="text-lg font-semibold mb-4">
                  {tripType==='round-trip' ? "Outbound Train: " : "" }
                  Wagon {selectedSeats.outbound[index % selectedSeats.outbound.length].wagon}, Seat {selectedSeats.outbound[index % selectedSeats.outbound.length].number}
                </h5>
                {tripType==='round-trip' && 
                <h6 className='text-lg font-semibold mb-4'>
                  Return Train: Wagon {selectedSeats.return[index % selectedSeats.return.length].wagon}, Seat {selectedSeats.return[index % selectedSeats.return.length].number}
                </h6>}
                
                
                <div className="grid grid-cols-2 gap-4">
                  
                
                  <div>
                    <label className="block text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerInputChange(index, e)}
                      className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-firstName`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`${index}-firstName`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`${index}-firstName`]}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={passenger.surname}
                      onChange={(e) => handlePassengerInputChange(index, e)}
                      className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-surname`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`${index}-surname`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`${index}-surname`]}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Government ID</label>
                    <input
                      type="text"
                      name="governmentId"
                      value={passenger.governmentId}
                      onChange={(e) => handlePassengerInputChange(index, e)}
                      placeholder="11-digit ID number"
                      className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-governmentId`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`${index}-governmentId`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`${index}-governmentId`]}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={passenger.phoneNumber}
                      onChange={(e) => handlePassengerInputChange(index, e)}
                      placeholder="+1234567890"
                      className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-phoneNumber`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`${index}-phoneNumber`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`${index}-phoneNumber`]}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={passenger.email}
                      onChange={(e) => handlePassengerInputChange(index, e)}
                      placeholder="your@email.com"
                      className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-email`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`${index}-email`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`${index}-email`]}
                      </p>
                    )}
                  </div>
                  
                  <div>
                      <label className="block text-gray-700 mb-1">Birth Date</label>
                      <input
                          type="text"
                          name="birthDate"
                          value={passenger.birthDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')}
                          onChange={(e) => {
                          // Remove any non-digit characters
                          const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                          handlePassengerInputChange(index, { 
                              target: { 
                              name: 'birthDate', 
                              value: value 
                              } 
                          });
                          }}
                          placeholder="DD/MM/YYYY"
                          maxLength="10"
                          className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-birthDate`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`${index}-birthDate`] && (
                          <p className="text-red-500 text-sm mt-1">
                          {errors[`${index}-birthDate`]}
                          </p>
                      )}
                      </div>
                </div>
              </div>
            ))}
            <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreement"
              className="mr-2"
              checked={userAgreement}
              onChange={() => {
                setUserAgreement(!userAgreement);
                setError("");
              }}
            />
            <label htmlFor="agreement" className="block text-gray-800 font-medium text-sm cursor-pointer transition-colors duration-200">
              I agree to the 
              
            </label>
            <button
            onClick={() => setShowTerms(true)}
            className="text-blue-600 hover:text-blue-800 text-sm underline pl-1"
            type="button"
            >
             terms and conditions.
            </button>

          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {/* Booking Summary and Total */}
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-medium">Total Ticket Price:</span>
                <span className="text-xl font-bold">
                  ${priceDetails.grandTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between space-x-4">
                <button 
                  type="button"
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Back 
                </button>
                
                <button 
                  type="button"
                  onClick={handleProceedToPayment}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={selectedSeats.outbound.length === 0}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handleFinalSubmit}
        priceDetails={priceDetails}
        passengers={passengers}
      />
       <TermsAndConditionsPopup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </div>
  );
};

export default PassengerInfoPage;