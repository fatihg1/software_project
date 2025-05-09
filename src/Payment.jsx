import React, { useState,  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TermsAndConditionsPopup from './TermsConditions';
import ProgressSteps from "./ProgressSteps.jsx"
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';
import trainService from "./services/trainService";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import InvoiceSelector from './InvoiceSelector.jsx';
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
    email: 'a@a.com'
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
    
    // Validate expiry date
    if (!paymentForm.expiryDate.trim()) {
      formErrors.expiryDate = translations[language].expiryDateRequired;
      isValid = false;
    } else if (!/^\d{2}\d{2}$/.test(paymentForm.expiryDate)) {
      formErrors.expiryDate = translations[language].expiryDateInvalid;
      isValid = false;
    } else {
      // Check if expiry date is not in the past
      const [month, year] = paymentForm.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      // Set to the last day of the month
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      expiryDate.setDate(0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiryDate < today) {
        formErrors.expiryDate = translations[language].expiryDatePast || "Expiry date cannot be in the past";
        isValid = false;
      }
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
            value={(() => {
              // Format as **** **** **** **** with spaces every 4 digits
              const digits = paymentForm.cardNumber.replace(/\D/g, '');
              const groups = [];
              for (let i = 0; i < digits.length; i += 4) {
                groups.push(digits.slice(i, i + 4));
              }
              return groups.join(' ');
            })()}
            onChange={(e) => {
              // Extract only digits and store them
              const value = e.target.value.replace(/\D/g, '').slice(0, 16);
              handleInputChange({
                target: {
                  name: 'cardNumber',
                  value
                }
              });
            }}
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
              value={(() => {
                // Format as MM/YY with a fixed slash
                const digits = paymentForm.expiryDate.replace(/\D/g, '');
                if (digits.length === 0) return "";
                if (digits.length <= 2) return digits;
                return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
              })()}
              onChange={(e) => {
                // Extract only digits and store them
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                handleInputChange({
                  target: {
                    name: 'expiryDate',
                    value
                  }
                });
              }}
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

// 1. Add a new function to handle sending emails for all tickets
const sendTicketEmails = async (ticketIds) => {
  try {
    // Create promises for all ticket email requests
    const emailPromises = ticketIds.map(ticketId => 
      axios.get(`http://localhost:8080/api/invoices/${ticketId}/pdf`, {
        responseType: 'blob'
      })
    );
    
    // Execute all email requests (same endpoint as download, but we'll discard the response data)
    await Promise.all(emailPromises);
    
    console.log('Emails sent for all tickets');
  } catch (error) {
    console.error('Error sending ticket emails:', error);
  }
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
  const { user, isSignedIn } = useUser();
  const emailAddress = isSignedIn ? user.primaryEmailAddress?.emailAddress : "";

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
  
  // Calculate total price with discounts properly applied
const calculateTotalPrice = () => {
  // Initialize totals
  let outboundTotal = 0;
  let returnTotal = 0;
  
  // Calculate for each passenger
  passengers.forEach((passenger, index) => {
    // Get passenger's price with applicable discounts
    const passengerPrice = calculatePassengerPrice(index);
    
    // Add to totals
    outboundTotal += passengerPrice.outboundPrice;
    returnTotal += passengerPrice.returnPrice;
  });
  
  return {
    outboundTotal,
    returnTotal,
    grandTotal: outboundTotal + returnTotal
  };
};

// Function to calculate individual passenger's price with age discount
const calculatePassengerPrice = (passengerIndex) => {
  const passenger = passengers[passengerIndex];
  
  // Get seat index for this passenger (in case there are fewer seats than passengers)
  const outboundSeatIndex = passengerIndex % selectedSeats.outbound.length;
  const outboundSeat = selectedSeats.outbound[outboundSeatIndex];
  
  // Get base price for the seat
  let outboundPrice = selectedSeatPrices.outbound[outboundSeatIndex] || 0;
  
  // Initialize return price
  let returnPrice = 0;
  let returnSeat = null;
  
  // Add return price if this is a round trip
  if (tripType === 'round-trip' && selectedSeatPrices.return && selectedSeatPrices.return.length > 0) {
    const returnSeatIndex = passengerIndex % selectedSeats.return.length;
    returnPrice = selectedSeatPrices.return[returnSeatIndex] || 0;
    returnSeat = selectedSeats.return[returnSeatIndex];
  }
  
  // Calculate age
  const age = calculateAge(passenger.birthDate);
  
  // Check wagon type for discount eligibility
  const outboundEligibleWagonType = ['economy', 'sleeper', 'lodge'].includes(outboundSeat?.wagonType?.toLowerCase());
  const returnEligibleWagonType = returnSeat ? ['economy', 'sleeper', 'lodge'].includes(returnSeat.wagonType?.toLowerCase()) : false;
  
  // Initialize discount information
  let discountApplied = false;
  let discountReason = null;
  let discountRate = 1;
  
  // Determine discount based on age
  if (age !== null) {
    if (age <= 12) {
      discountRate = 0.5; // 50% discount for ages 0-12
      discountReason = 'child';
      discountApplied = true;
    } else if ((age >= 13 && age <= 26) || age >= 65) {
      discountRate = 0.8; // 20% discount for ages 13-26 and 65+
      discountReason = age <= 26 ? 'youth' : 'senior';
      discountApplied = true;
    }
  }
  
  // Apply discount only if eligible wagon type
  if (discountApplied) {
    if (outboundEligibleWagonType) {
      outboundPrice = outboundPrice * discountRate;
    } else {
      // No discount for premium wagons on outbound
      outboundPrice = selectedSeatPrices.outbound[outboundSeatIndex] || 0;
    }
    
    if (returnEligibleWagonType) {
      returnPrice = returnPrice * discountRate;
    } else if (returnSeat) {
      // No discount for premium wagons on return
      returnPrice = selectedSeatPrices.return[passengerIndex % selectedSeats.return.length] || 0;
    }
  }
  
  // If different discount rates were applied (one leg eligible, one not), check if any discount was applied
  const outboundDiscountApplied = discountApplied && outboundEligibleWagonType;
  const returnDiscountApplied = discountApplied && returnEligibleWagonType;
  
  // Overall discount is applied if at least one leg got a discount
  discountApplied = outboundDiscountApplied || returnDiscountApplied;
  
  return {
    outboundPrice,
    returnPrice,
    totalPrice: outboundPrice + returnPrice,
    discountApplied,
    discountReason,
    discountRate,
    outboundDiscountApplied,
    returnDiscountApplied,
    outboundEligibleWagonType,
    returnEligibleWagonType
  };
};

  // Add this function inside PassengerInfoPage component before the return statement
  const calculateAge = (birthDateStr) => {
  if (birthDateStr.length !== 8) return null;
  
  const day = parseInt(birthDateStr.substring(0, 2));
  const month = parseInt(birthDateStr.substring(2, 4)) - 1; // JS months are 0-indexed
  const year = parseInt(birthDateStr.substring(4, 8));
  
  const birthDate = new Date(year, month, day);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
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

  const [isInvoiceSelectorOpen, setIsInvoiceSelectorOpen] = useState(false);
  const [generatedTicketIds, setGeneratedTicketIds] = useState([]);

  const handleFinalSubmit = async (paymentData) => {
    try {
      
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
  
      // Create a base invoice payload
      const baseInvoicePayload = {
        cardNumber: paymentData.cardNumber,
        cardHolder: paymentData.cardHolder,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
      };
  
      // Store all ticket IDs for later use
      const ticketIds = [];
      const bookingPromises = [];
  
      
     // Process outbound tickets for all passengers
for (let i = 0; i < passengers.length; i++) {
  const passenger = passengers[i];
  const outboundSeatIndex = i % selectedSeats.outbound.length;
  const outboundSeat = selectedSeats.outbound[outboundSeatIndex];
  const outboundSeferId = finalSeatUpdate.outboundTrainIds[0];

  if (!outboundSeferId) throw new Error('Outbound Sefer ID missing');

  // Generate ticket ID for this passenger's outbound journey
  const outboundTicketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  ticketIds.push(outboundTicketId);

  // Create invoice for this ticket
  const outboundInvoicePayload = {
    ...baseInvoicePayload,
    ticketId: outboundTicketId,
  };
  
  const outboundArrivalDate = new Date(outboundTrain.arrivalDateTime);
  const outboundDepartureDate = new Date(outboundTrain.departureDateTime);
  
  // Calculate passenger price with new discount rules
  const age = calculateAge(passenger.birthDate);
  let discountApplied = false;
  let discountReason = null;
  let discountRate = 1;
  
  // Apply discount based on age and wagon type
  const outboundWagonType = outboundSeat.wagonType?.toLowerCase();
  const isEligibleWagonType = ['economy', 'sleeper', 'lodge'].includes(outboundWagonType);
  
  if (age !== null && isEligibleWagonType) {
    if (age <= 12) {
      discountRate = 0.5; // 50% discount for children
      discountReason = 'child';
      discountApplied = true;
    } else if ((age >= 13 && age <= 26) || age >= 65) {
      discountRate = 0.8; // 20% discount for youth and seniors
      discountReason = age <= 26 ? 'youth' : 'senior';
      discountApplied = true;
    }
  }
  
  // Calculate price
  const originalOutboundPrice = selectedSeatPrices.outbound[outboundSeatIndex] || 0;
  const discountedOutboundPrice = discountApplied ? originalOutboundPrice * discountRate : originalOutboundPrice;
  
  // Create ticket payload for outbound journey
  const outboundTicketPayload = {
    name: passenger.firstName,
    surname: passenger.surname,
    governmentId: passenger.governmentId,
    phone: passenger.phoneNumber,
    clerkEmail: emailAddress,
    email: passenger.email,
    birthDate: formatBirthDate(passenger.birthDate),
    age: age, // Add age field
    originalPrice: originalOutboundPrice, // Add original price before discount
    price: discountedOutboundPrice, // Use discounted price
    discountApplied: discountApplied, // Flag if discount was applied
    discountReason: discountReason, // Reason for discount (child, youth, senior)
    discountRate: discountRate, // Store the discount rate that was applied
    seat: outboundSeat.number.toString(),
    wagonType: outboundSeat.wagonType,
    wagonNumber: outboundSeat.wagon,
    seferId: outboundSeferId,
    ticketId: outboundTicketId,
    date: outboundArrivalDate.toISOString(),
    departureStation: outboundTrain.departureStation,
    arrivalStation: outboundTrain.arrivalStation,
    trainId: outboundTrain.trainPrimaryIds[0],
    departureDateTime: outboundDepartureDate.toISOString(),
    wagonId: outboundSeat.wagon,
  };
  console.log('Outbound Ticket Payload:', outboundTicketPayload);
  console.log('Outbound Invoice Payload:', outboundInvoicePayload);
  console.log('Final Seat Update:', finalSeatUpdate);
  // Add booking promise for outbound journey
  bookingPromises.push(
    axios.post('http://localhost:8080/bookings', {
      seatUpdate: finalSeatUpdate,
      ticket: outboundTicketPayload,
      invoice: outboundInvoicePayload,
      isReturn: false,
    })
  );

  // Process return tickets if this is a round-trip
  if (tripType === 'round-trip' && finalSeatUpdate.returnTrainIds.length > 0) {
    const returnSeatIndex = i % selectedSeats.return.length;
    const returnSeat = selectedSeats.return[returnSeatIndex];
    const returnSeferId = finalSeatUpdate.returnTrainIds[0];

    if (!returnSeferId) throw new Error('Return Sefer ID missing');

    // Generate ticket ID for this passenger's return journey
    const returnTicketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    ticketIds.push(returnTicketId);

    // Create invoice for this ticket
    const returnInvoicePayload = {
      ...baseInvoicePayload,
      ticketId: returnTicketId,
    };

    const returnArrivalDate = new Date(returnTrain.arrivalDateTime);
    const returnDepartureDate = new Date(returnTrain.departureDateTime);
    
    // Apply discount based on age and wagon type for return journey
    const returnWagonType = returnSeat.wagonType?.toLowerCase();
    const isReturnEligibleWagonType = ['economy', 'sleeper', 'lodge'].includes(returnWagonType);
    
    let returnDiscountApplied = false;
    let returnDiscountReason = null;
    let returnDiscountRate = 1;
    
    if (age !== null && isReturnEligibleWagonType) {
      if (age <= 12) {
        returnDiscountRate = 0.5; // 50% discount for children
        returnDiscountReason = 'child';
        returnDiscountApplied = true;
      } else if ((age >= 13 && age <= 26) || age >= 65) {
        returnDiscountRate = 0.8; // 20% discount for youth and seniors
        returnDiscountReason = age <= 26 ? 'youth' : 'senior';
        returnDiscountApplied = true;
      }
    }
    
    // Calculate return price with discount
    const originalReturnPrice = selectedSeatPrices.return[returnSeatIndex] || 0;
    const discountedReturnPrice = returnDiscountApplied ? originalReturnPrice * returnDiscountRate : originalReturnPrice;
    
    // Create ticket payload for return journey
    const returnTicketPayload = {
      name: passenger.firstName,
      surname: passenger.surname,
      governmentId: passenger.governmentId,
      phone: passenger.phoneNumber,
      clerkEmail: emailAddress,
      email: passenger.email,
      birthDate: formatBirthDate(passenger.birthDate),
      age: age, // Add age field
      originalPrice: originalReturnPrice, // Add original price before discount
      price: discountedReturnPrice, // Use discounted price
      discountApplied: returnDiscountApplied, // Flag if discount was applied
      discountReason: returnDiscountReason, // Reason for discount (child, youth, senior)
      discountRate: returnDiscountRate, // Store the discount rate that was applied
      seat: returnSeat.number.toString(),
      wagonType: returnSeat.wagonType,
      wagonNumber: returnSeat.wagon,
      seferId: returnSeferId,
      ticketId: returnTicketId,
      date: returnArrivalDate.toISOString(),
      departureStation: returnTrain.departureStation,
      arrivalStation: returnTrain.arrivalStation,
      trainId: returnTrain.trainPrimaryIds[0],
      departureDateTime: returnDepartureDate.toISOString(),
      wagonId: returnSeat.wagon,
    };
    
    // Add booking promise for return journey
    bookingPromises.push(
      axios.post('http://localhost:8080/bookings', {
        seatUpdate: finalSeatUpdate,
        ticket: returnTicketPayload,
        invoice: returnInvoicePayload,
        isReturn: true,
      })
    );
  }
}
  
      // Wait for all booking requests to complete
      await Promise.all(bookingPromises);
  
      // Store the generated ticket IDs and open the invoice selector
    setGeneratedTicketIds(ticketIds);
    setIsInvoiceSelectorOpen(true);
    
    // Keep the payment modal closed
    setIsPaymentModalOpen(false);
  
      // Show confirmation and navigate
      alert(translations[language].paymentSuccess);
      
      /* Commented for waiting to download tickets 
        navigate('/', {
        state: {
          bookingConfirmation: {
            ...bookingData,
            ...paymentData,
            confirmationNumber: ticketIds.join(', ')
          }
        }
      }); */
  
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
  
  // Add a new function to handle invoice downloads
const handleDownloadInvoices = async (selectedTicketIds) => {
  for (const ticketId of selectedTicketIds) {
    const pdfResponse = await axios.get(`http://localhost:8080/api/invoices/${ticketId}/pdf`, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([pdfResponse.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${ticketId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
  
  // Show confirmation and navigate after downloads
  navigate('/', {
    state: {
      bookingConfirmation: {
        ...bookingData,
        confirmationNumber: generatedTicketIds.join(', ')
      }
    }
  });
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

                  {/* Price display section inside the passenger map function - replace existing price display */}
<div className="mb-4 p-3 bg-gray-50 rounded-md">
  <div className="flex justify-between items-center mb-2">
    <h5 className="text-md font-semibold">
      {tripType === 'round-trip' ? translations[language].outboundTrain + ' ' : ''}
      {translations[language].wagon} {selectedSeats.outbound[index % selectedSeats.outbound.length].wagon}, {" "}
      {translations[language].seat} {selectedSeats.outbound[index % selectedSeats.outbound.length].number}
      {" "}({selectedSeats.outbound[index % selectedSeats.outbound.length].wagonType})
    </h5>
    <div className="text-right">
      {passengerPrice.outboundDiscountApplied && (
        <div className="flex flex-col">
          <span className="text-sm line-through text-gray-500">
            {translations[language].currencySymbol}
            {(selectedSeatPrices.outbound[index % selectedSeats.outbound.length] || 0).toFixed(2)}
          </span>
          <span className="font-medium text-green-700 flex items-center">
            {translations[language].currencySymbol}{passengerPrice.outboundPrice.toFixed(2)}
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              {passengerPrice.discountRate === 0.5 ? '50%' : '20%'} {translations[language].ageDiscount || "Age Discount"}
            </span>
          </span>
        </div>
      )}
      {!passengerPrice.outboundDiscountApplied && (
        <span className="font-medium text-green-700">
          {translations[language].currencySymbol}{passengerPrice.outboundPrice.toFixed(2)}
          {passengerPrice.discountApplied && !passengerPrice.outboundEligibleWagonType && (
            <span className="ml-2 text-xs text-gray-500">{translations[language].noDiscountForWagonType || "No discount available for this wagon"}</span>
          )}
        </span>
      )}
    </div>
  </div>

  {tripType === 'round-trip' && (
    <div className="flex justify-between items-center">
      <h6 className="text-md font-semibold">
        {translations[language].returnTrain}: {translations[language].wagon} {selectedSeats.return[index % selectedSeats.return.length].wagon}, {" "}
        {translations[language].seat} {selectedSeats.return[index % selectedSeats.return.length].number}
        {" "}({selectedSeats.return[index % selectedSeats.return.length].wagonType})
      </h6>
      <div className="text-right">
        {passengerPrice.returnDiscountApplied && (
          <div className="flex flex-col">
            <span className="text-sm line-through text-gray-500">
              {translations[language].currencySymbol}
              {(selectedSeatPrices.return[index % selectedSeats.return.length] || 0).toFixed(2)}
            </span>
            <span className="font-medium text-green-700">
              {translations[language].currencySymbol}{passengerPrice.returnPrice.toFixed(2)}
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                {passengerPrice.discountRate === 0.5 ? '50%' : '20%'} {translations[language].ageDiscount || "Age Discount"}
              </span>
            </span>
          </div>
        )}
        {!passengerPrice.returnDiscountApplied && (
          <span className="font-medium text-green-700">
            {translations[language].currencySymbol}{passengerPrice.returnPrice.toFixed(2)}
            {passengerPrice.discountApplied && !passengerPrice.returnEligibleWagonType && (
              <span className="ml-2 text-xs text-gray-500">{translations[language].noDiscountForWagonType || "No discount available for this wagon"}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )}
  
  {/* Total for this passenger */}
  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
    <span className="font-medium">{translations[language].totalForPassenger}:</span>
    <span className="font-bold text-green-700">
      {translations[language].currencySymbol}{passengerPrice.totalPrice.toFixed(2)}
      {passengerPrice.discountApplied && (
        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          {passengerPrice.discountReason === 'child' 
            ? (translations[language].childDiscount || "Child Discount") 
            : passengerPrice.discountReason === 'youth' 
              ? (translations[language].youthDiscount || "Youth Discount")
              : (translations[language].seniorDiscount || "Senior Discount")}
        </span>
      )}
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
                        value={(() => {
                          // Format the value as DD/MM/YYYY with fixed slashes
                          const digits = passenger.birthDate.replace(/\D/g, '');
                          if (digits.length === 0) return "";
                          if (digits.length <= 2) return digits;
                          if (digits.length <= 4) return `${digits.substring(0, 2)}/${digits.substring(2)}`;
                          return `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4, 8)}`;
                        })()}
                        onChange={(e) => {
                          // Extract only digits from input
                          const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                          handlePassengerInputChange(index, { 
                            target: { 
                              name: 'birthDate', 
                              value: value 
                            } 
                          });
                        }}
                        placeholder="DD/MM/YYYY"
                        className={`w-full px-3 py-2 border rounded-md ${errors[`${index}-birthDate`] ? 'border-red-500' : 'border-gray-300'}`}
                        onBlur={() => {
                          if (passenger.birthDate.length === 8) {
                            const day = parseInt(passenger.birthDate.substring(0, 2));
                            const month = parseInt(passenger.birthDate.substring(2, 4));
                            const year = parseInt(passenger.birthDate.substring(4, 8));
                            
                            // Check if year is before 1900
                            if (year < 1900) {
                              const currentErrors = { ...errors };
                              currentErrors[`${index}-birthDate`] = translations[language].birthDateTooOld || "Birth year cannot be before 1900";
                              setErrors(currentErrors);
                            }
                          }
                        }}
                      />
                      {errors[`${index}-birthDate`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`${index}-birthDate`]}
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
            
            {/* Booking Summary and Total - replace existing summary */}
<div className="mt-6 border-t pt-6">
  {/* Calculate total passengers with discounts */}
  {(() => {
    let childDiscountCount = 0;
    let youthDiscountCount = 0;
    let seniorDiscountCount = 0;
    let totalSavings = 0;
    
    for (let i = 0; i < passengers.length; i++) {
      const passengerPrice = calculatePassengerPrice(i);
      if (passengerPrice.discountApplied) {
        // Count by discount type
        if (passengerPrice.discountReason === 'child') childDiscountCount++;
        else if (passengerPrice.discountReason === 'youth') youthDiscountCount++;
        else if (passengerPrice.discountReason === 'senior') seniorDiscountCount++;
        
        // Calculate savings for eligible wagon types
        const outboundSeatIndex = i % selectedSeats.outbound.length;
        const returnSeatIndex = tripType === 'round-trip' ? (i % selectedSeats.return.length) : -1;
        
        const originalOutboundPrice = selectedSeatPrices.outbound[outboundSeatIndex] || 0;
        const originalReturnPrice = tripType === 'round-trip' ? 
          (selectedSeatPrices.return[returnSeatIndex] || 0) : 0;
        
        // Only count savings for eligible wagon types
        let outboundSavings = passengerPrice.outboundDiscountApplied ? 
          (originalOutboundPrice - passengerPrice.outboundPrice) : 0;
        
        let returnSavings = passengerPrice.returnDiscountApplied ? 
          (originalReturnPrice - passengerPrice.returnPrice) : 0;
        
        totalSavings += (outboundSavings + returnSavings);
      }
    }
    
    const totalDiscountCount = childDiscountCount + youthDiscountCount + seniorDiscountCount;
    
    return (
      <>
        {totalDiscountCount > 0 && (
          <div className="mb-4 bg-green-50 p-3 rounded-md border border-green-200">
            <p className="font-semibold text-green-800">
              {translations[language].discountSummary || 'Discount Summary'}:
            </p>
            <ul className="list-disc pl-5 text-green-700">
              {childDiscountCount > 0 && (
                <li>
                  {childDiscountCount} {childDiscountCount === 1 ? 
                    (translations[language].childSingular || 'child') : 
                    (translations[language].childPlural || 'children')} 
                  {translations[language].withChildDiscount || ' with 50% child discount'}
                </li>
              )}
              {youthDiscountCount > 0 && (
                <li>
                  {youthDiscountCount} {youthDiscountCount === 1 ? 
                    (translations[language].youthSingular || 'youth') : 
                    (translations[language].youthPlural || 'youths')} 
                  {translations[language].withYouthDiscount || ' with 20% youth discount'}
                </li>
              )}
              {seniorDiscountCount > 0 && (
                <li>
                  {seniorDiscountCount} {seniorDiscountCount === 1 ? 
                    (translations[language].seniorSingular || 'senior') : 
                    (translations[language].seniorPlural || 'seniors')} 
                  {translations[language].withSeniorDiscount || ' with 20% senior discount'}
                </li>
              )}
            </ul>
            <p className="text-green-700 mt-2 font-bold">
              {translations[language].totalSavings || 'Total savings'}: 
              <span className="font-bold"> {translations[language].currencySymbol}{totalSavings.toFixed(2)}</span>
              <span className="text-xs ml-2 text-green-600">
                ({translations[language].onlyEligibleWagons || 'only on economy, sleeper, and lodge class'})
              </span>
            </p>
          </div>
        )}
      </>
    );
  })()}

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
<InvoiceSelector
  isOpen={isInvoiceSelectorOpen}
  onClose={() => {
    setIsInvoiceSelectorOpen(false);
    // Send emails for all tickets even if user cancels without downloading
    if (generatedTicketIds.length > 0) {
      sendTicketEmails(generatedTicketIds);
      navigate('/', {
        state: {
          bookingConfirmation: {
            ...bookingData,
            confirmationNumber: generatedTicketIds.join(', ')
          }
        }
      });
    }
  }}
  ticketIds={generatedTicketIds}
  tripType={tripType}
  passengers={passengers}
  translations={translations[language]}
  onDownload={handleDownloadInvoices}
  sendEmails={sendTicketEmails}
/>
  </div>
  );
};

export default PassengerInfoPage;
