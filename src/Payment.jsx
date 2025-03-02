import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  
  // Extract booking information
  const { selectedSeats = [], trainInfo = {}, trainName = "Train" } = bookingData;
  
  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Payment method - removed PayPal, only credit card remains
  const paymentMethod = 'creditCard';
  
  // Calculate total price (example calculation)
  const pricePerSeat = bookingData.trainInfo.price // Example price

  const totalPrice = selectedSeats.length * pricePerSeat;
  
  // Handle input changes
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
  
  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate card number (simple validation for demo)
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
    
    // Always validate email
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would process the payment here
      // For this demo, we'll just show success and navigate
      alert('Payment successful! Your tickets have been booked.');
      // Changed navigation path to '/' instead of '/confirmation'
      navigate('/', { 
        state: { 
          bookingConfirmation: {
            ...bookingData,
            confirmationNumber: 'TKT' + Math.floor(100000 + Math.random() * 900000),
            paymentAmount: totalPrice.toFixed(2),
            paymentMethod: paymentMethod,
            email: paymentForm.email
          }
        }
      });
    }
  };
  
  // Go back to seat selection
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 pt-25">
      
      {/* Trip summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-800">{trainName}</h2>
        {trainInfo?.departure && trainInfo?.arrival && (
          <p className="text-blue-600">
            {trainInfo.departure} to {trainInfo.arrival}
            {trainInfo.date && ` • ${trainInfo.date}`}
            {trainInfo.time && ` • ${trainInfo.time}`}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Left Column: Booking summary */}
        <div className="md:col-span-1">
          <div className="border border-gray-300 rounded-lg p-4 h-full">
            <h3 className="text-lg font-medium mb-3">Booking Summary</h3>
            
            {/* Seats summary */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Selected Seats</h4>
              {selectedSeats.length === 0 ? (
                <p className="text-red-500">No seats selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seat => (
                    <div key={seat.id} className="bg-green-100 text-green-800 px-2 py-1 text-sm rounded">
                      Wagon {seat.wagon}, Seat {seat.number}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Price calculation */}
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per seat:</span>
                <span>₺{pricePerSeat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Seats:</span>
                <span>{selectedSeats.length} x ₺{pricePerSeat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-3 pt-3 border-t border-gray-200">
                <span>Total:</span>
                <span>₺{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Payment form */}
        <div className="md:col-span-2">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Payment Details</h3>
            
            {/* Payment method section - removed selection, only showing Credit Card */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Payment Method</h4>
              <div className="border rounded-lg p-3 flex items-center gap-2 border-blue-500 bg-blue-50">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                </div>
                <span>Credit Card</span>
              </div>
            </div>
            
            {/* Payment form */}
            <form onSubmit={handleSubmit}>
              {/* Credit card form */}
              <div className="mb-4 space-y-4">
                <div>
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
                
                <div>
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
                
                <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              {/* Email for confirmation - required for all payment methods */}
              <div className="mb-6">
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
              
              {/* Submit buttons */}
              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={handleGoBack}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Back to Seats
                </button>
                
                <button 
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={selectedSeats.length === 0}
                >
                  Pay Now ₺{totalPrice.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;