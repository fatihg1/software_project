import React, { useState,  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TermsAndConditionsPopup from './TermsConditions';
import ProgressSteps from "./ProgressSteps.jsx"
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';
import trainService from "./services/trainService";
import axios from 'axios';
const PaymentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  priceDetails,
  passengers
}) => {
  const { language } = useLanguage();
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
      formErrors.cardNumber = translations[language].cardNumberRequired;
      isValid = false;
    } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
      formErrors.cardNumber = translations[language].cardNumberInvalid;
      isValid = false;
    }
    
    if (!paymentForm.cardHolder.trim()) {
      formErrors.cardHolder = translations[language].cardHolderRequired;
      isValid = false;
    }
    
    if (!paymentForm.expiryDate.trim()) {
      formErrors.expiryDate = translations[language].expiryDateRequired;
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
      formErrors.expiryDate = translations[language].expiryDateInvalid;
      isValid = false;
    }
    
    if (!paymentForm.cvv.trim()) {
      formErrors.cvv = translations[language].cvvRequired;
      isValid = false;
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      formErrors.cvv = translations[language].cvvInvalid;
      isValid = false;
    }
    
    if (!paymentForm.email.trim()) {
      formErrors.email = translations[language].emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(paymentForm.email)) {
      formErrors.email = translations[language].emailInvalid;
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
        <h2 className="text-2xl font-bold mb-4">{translations[language].paymentDetails}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 mb-1">{translations[language].cardNumber}</label>
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
            <label htmlFor="cardHolder" className="block text-gray-700 mb-1">{translations[language].cardHolder}</label>
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
              <label htmlFor="expiryDate" className="block text-gray-700 mb-1">{translations[language].expiryDate}</label>
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
              <label htmlFor="cvv" className="block text-gray-700 mb-1">{translations[language].cvv}</label>
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
            <label htmlFor="email" className="block text-gray-700 mb-1">{translations[language].emailConfirmation}</label>
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
              {translations[language].cancel}
            </button>
            
            <button 
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {translations[language].payNow.replace('{amount}', priceDetails.grandTotal.toFixed(2))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PassengerInfoPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  const [userAgreement, setUserAgreement] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  
  //Block direct access to payment page
  useEffect(() => {
    if (!location.state || !location.state.bookingData) {
      navigate(translations[language].errorPagePath, { replace: true }); 
    }
  }, [location, navigate, language]);
  
  if (!location.state || !location.state.bookingData) {
    return null; 
  }
  
  const handlePayment = () => {
    if (!userAgreement) {
      setError(translations[language].termsAgreementError);
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
    selectedSeatPrices = {  // This will be used to display seat prices
      outbound: [],
      return: []
    },
    outboundTrain = {}, 
    returnTrain = {}, 
    tripType,
    totalPrice 
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
  
  // Use the passed total price if available, otherwise calculate it
  const calculateTotalPrice = () => {
    // Use the totalPrice from bookingData if available
    if (totalPrice !== undefined) {
      return {
        outboundTotal: tripType === 'round-trip' ? totalPrice / 2 : totalPrice,
        returnTotal: tripType === 'round-trip' ? totalPrice / 2 : 0,
        grandTotal: totalPrice
      };
    }
    
    // Fall back to the original calculation if totalPrice is not provided
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

  // Function to calculate individual passenger's price
  const calculatePassengerPrice = (passengerIndex) => {
    const outboundSeatIndex = passengerIndex % selectedSeats.outbound.length;
    const outboundPrice = selectedSeatPrices.outbound[outboundSeatIndex] || 0;
    
    let returnPrice = 0;
    if (tripType === 'round-trip' && selectedSeatPrices.return && selectedSeatPrices.return.length > 0) {
      const returnSeatIndex = passengerIndex % selectedSeats.return.length;
      returnPrice = selectedSeatPrices.return[returnSeatIndex] || 0;
    }
    
    return {
      outboundPrice,
      returnPrice,
      totalPrice: outboundPrice + returnPrice
    };
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
  const handleGoBack = () => {
    navigate(-1);
  };

  const formatBirthDate = (dateStr) => {
    // Remove non-digit characters
    const digits = dateStr.replace(/\D/g, '');
    if (digits.length === 8) {
      const day = digits.substring(0, 2);
      const month = digits.substring(2, 4);
      const year = digits.substring(4);
      return `${year}-${month}-${day}`;
    }
    return dateStr; // fallback in case format is unexpected
  };
  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (validatePassengers() && handlePayment()) {
      setIsPaymentModalOpen(true);
    }
  };
  
  // Handle final submission
  const handleFinalSubmit = async (paymentData) => {
    try {
  
      const seferId = outboundTrain?.seferId || bookingData?.seferId;
      if (!seferId) throw new Error('Sefer ID missing');
      const finalSeatUpdate = {
        outboundSeats: selectedSeats.outbound.map(seat => ({
          wagon: typeof seat.wagon === 'string' ? parseInt(seat.wagon) : seat.wagon,
          number: typeof seat.number === 'string' ? parseInt(seat.number) : seat.number
        })),
        returnSeats: tripType === 'round-trip' ? selectedSeats.return.map(seat => ({
          wagon: typeof seat.wagon === 'string' ? parseInt(seat.wagon) : seat.wagon,
          number: typeof seat.number === 'string' ? parseInt(seat.number) : seat.number
        })) : [],
        outboundTrainIds: outboundTrain.trainPrimaryIds,
        returnTrainIds: tripType === 'round-trip' ? returnTrain.trainPrimaryIds : [],
      };
  
      // 2. Generate a temp ticket ID to use for invoice
      const tempTicketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
      // 3. Create the invoice
      const invoicePayload = {
        cardNumber: paymentData.cardNumber,
        cardHolder: paymentData.cardHolder,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
        ticketId: tempTicketId,
      };
      // 5. Now create the ticket in DB
      const ticketPayload = {
        name: passengers[0].firstName,
        surname: passengers[0].surname,
        governmentId: passengers[0].governmentId,
        phone: passengers[0].phoneNumber,
        email: passengers[0].email,
        birthDate: formatBirthDate(passengers[0].birthDate),
        price: priceDetails.grandTotal,
        seat: selectedSeats.outbound[0].number.toString(),
        wagonId: Number(selectedSeats.outbound[0].wagon),
        seferId: seferId,  // ✅ pulled from actual data
        ticketId: tempTicketId,
        date: new Date().toISOString(),
      };
      await axios.post('http://localhost:8080/bookings', {
        seatUpdate: finalSeatUpdate,
        ticket: ticketPayload,
        invoice: invoicePayload
      });
  
      // 4. Download the invoice
      const pdfResponse = await axios.get(`http://localhost:8080/api/invoices/${tempTicketId}/pdf`, {
        responseType: 'blob'
      });
  
      const url = window.URL.createObjectURL(new Blob([pdfResponse.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${tempTicketId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
  
      // 6. Show confirmation and navigate
      alert(translations[language].paymentSuccess);
      navigate('/', {
        state: {
          bookingConfirmation: {
            ...bookingData,
            ...paymentData,
            confirmationNumber: tempTicketId
          }
        }
      });
  
    } catch (error) {
      if (!navigator.onLine) {
        alert(translations[language].networkError || 'Network connection lost. Please check your internet connection and try again.');
      } else {
        alert(error.message || translations[language].bookingError || 'An error occurred while booking your tickets. Please try again.');
      }
  
      setIsPaymentModalOpen(false);
      console.error('Booking error:', error);
    } 
  };
  
  
  return (
    <div className="flex flex-col md:flex-row gap-8 sm:p-6 sm:pt-15 max-w-6xl mx-auto">
    <div className={`relative w-7xl ${isPaymentModalOpen ? 'blur-md' : ''}`}>
      <div className="max-w-4xl mx-auto p-4 pt-25">
        {/* Trip summary - similar to previous implementation */}
        <div className=" p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800">
              {tripType === 'round-trip' 
                ? translations[language].roundTrip 
                : translations[language].oneWayTrip}
            </h2>
          {outboundTrain.departureStation && outboundTrain.arrivalStation && (
            <div>
              <p className="text-blue-600">
                {translations[language].outboundLabel}: {outboundTrain.departureStation} {translations[language].to} {outboundTrain.arrivalStation}
                {outboundTrain.departureDateTime && ` • ${outboundTrain.departureDateTime.slice(0,10)}`}
                {outboundTrain.departureDateTime && ` • ${outboundTrain.departureDateTime.slice(11,16)}`}
              </p>

              {tripType === 'round-trip' && returnTrain.departure && (
                <p className="text-blue-600">
                  {translations[language].returnLabel}: {returnTrain.departureStation} {translations[language].to} {returnTrain.arrivalStation}
                  {returnTrain.departureDateTime && ` • ${returnTrain.departureDateTime.slice(0,10)}`}
                  {returnTrain.departureDateTime && ` • ${returnTrain.departureDateTime.slice(11,16)}`}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="border rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-6">{translations[language].passengerInformation}</h3>
          
          <form>
            {passengers.map((passenger, index) => {
              // Calculate price for this passenger
              const passengerPrice = calculatePassengerPrice(index);
              
              return (
                <div key={index} className="border-b pb-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">
                    {translations[language].passenger.replace('{number}', index % selectedSeats.outbound.length + 1)}
                  </h4>

                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-md font-semibold">
                        {tripType === 'round-trip' ? translations[language].outboundTrain + ' ' : ''}
                        {translations[language].wagon} {selectedSeats.outbound[index % selectedSeats.outbound.length].wagon}, {" "}
                        {translations[language].seat} {selectedSeats.outbound[index % selectedSeats.outbound.length].number}
                      </h5>
                      <span className="font-medium text-green-700">
                        {translations[language].currencySymbol}{passengerPrice.outboundPrice.toFixed(2)}
                      </span>
                    </div>

                    {tripType === 'round-trip' && (
                      <div className="flex justify-between items-center">
                        <h6 className="text-md font-semibold">
                          {translations[language].returnTrain}: {translations[language].wagon} {selectedSeats.return[index % selectedSeats.return.length].wagon}, {" "}
                          {translations[language].seat} {selectedSeats.return[index % selectedSeats.return.length].number}
                        </h6>
                        <span className="font-medium text-green-700">
                          {translations[language].currencySymbol}{passengerPrice.returnPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    {/* Total for this passenger */}
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                      <span className="font-medium">{translations[language].totalForPassenger}:</span>
                      <span className="font-bold text-green-700">
                        {translations[language].currencySymbol}{passengerPrice.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {translations[language].firstName}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={passenger.firstName}
                        onChange={(e) => handlePassengerInputChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-firstName`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`${index}-firstName`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {translations[language].firstNameRequired}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{translations[language].surname}</label>
                      <input
                        type="text"
                        name="surname"
                        value={passenger.surname}
                        onChange={(e) => handlePassengerInputChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-surname`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`${index}-surname`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {translations[language].surnameRequired}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{translations[language].governmentId}</label>
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
                          {translations[language].governmentIdRequired}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{translations[language].phoneNumber}</label>
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
                          {translations[language].phoneNumberRequired}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{translations[language].email}</label>
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
                          {translations[language].emailRequired}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{translations[language].birthDate}</label>
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
                          {translations[language].birthDateRequired}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agreement"
                className="mr-2"
                checked={userAgreement}
                onChange={() => {
                  if (!termsRead) {
                    setShowTerms(true);
                  }
                  setTermsRead(true);
                  setUserAgreement(!userAgreement);
                  setError("");
                }}
              />
              <label htmlFor="agreement" className="block text-gray-800 font-medium text-sm cursor-pointer transition-colors duration-200">
                {translations[language].termsAgreement} 
              </label>
              <button
                onClick={() => {setShowTerms(true); setTermsRead(true);}}
                className="text-blue-600 hover:text-blue-800 text-sm underline pl-1"
                type="button"
              >
                {translations[language].termsAndConditions}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            
            {/* Booking Summary and Total */}
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-medium">{translations[language].totalPrice}:</span>
                <span className="text-xl font-bold">
                  {translations[language].currencySymbol}{priceDetails.grandTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between space-x-4">
                <button 
                  type="button"
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  {translations[language].backButton} 
                </button>
                
                <button 
                  type="button"
                  onClick={handleProceedToPayment}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={selectedSeats.outbound.length === 0}
                >
                  {translations[language].proceedToPayment}
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
    <div className="md:sticky md:top-6 md:h-fit pt-12">
      <ProgressSteps currentStep="payment" />
    </div>
  </div>
  );
};

export default PassengerInfoPage;