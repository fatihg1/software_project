import React, { useState } from 'react';
import { useLanguage } from './LanguageContext.jsx';
import translation from './translations.jsx';
const InvoiceSelector = ({ 
  isOpen, 
  onClose, 
  ticketIds = [], 
  tripType, 
  passengers, 
  translations: pageTranslations,
  onDownload
}) => {
  const { language } = useLanguage();
  const translations = translation[language] || translation.en;
  
  // State for selected invoices (all selected by default)
  const [selectedInvoices, setSelectedInvoices] = useState([...ticketIds]);
  const [downloading, setDownloading] = useState(false);

  // Handle checkbox changes
  const handleInvoiceSelection = (ticketId) => {
    if (selectedInvoices.includes(ticketId)) {
      setSelectedInvoices(selectedInvoices.filter(id => id !== ticketId));
    } else {
      setSelectedInvoices([...selectedInvoices, ticketId]);
    }
  };

  // Handle select/deselect all
  const toggleSelectAll = () => {
    if (selectedInvoices.length === ticketIds.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices([...ticketIds]);
    }
  };

  // Download selected invoices
  const downloadSelectedInvoices = async () => {
    if (selectedInvoices.length === 0) {
      alert(translations.noInvoicesSelected);
      return;
    }

    setDownloading(true);
    
    try {
      await onDownload(selectedInvoices);
      setDownloading(false);
      onClose();
    } catch (error) {
      console.error('Error downloading invoices:', error);
      alert(error.message || 'An error occurred while downloading invoices');
      setDownloading(false);
    }
  };

  // Group tickets by journey type and passenger
  const organizeTickets = () => {
    const outboundTickets = [];
    const returnTickets = [];
    
    // Assuming even indexes are outbound tickets and odd indexes are return tickets in a round trip
    if (tripType === 'round-trip') {
      for (let i = 0; i < ticketIds.length; i++) {
        if (i % 2 === 0) {
          outboundTickets.push(ticketIds[i]);
        } else {
          returnTickets.push(ticketIds[i]);
        }
      }
    } else {
      // For one-way trips, all tickets are outbound
      outboundTickets.push(...ticketIds);
    }
    
    return { outboundTickets, returnTickets };
  };

  if (!isOpen) return null;
  
  const { outboundTickets, returnTickets } = organizeTickets();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">{translations.selectInvoices}</h2>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{translations.outboundJourney}</h3>
            <button 
              onClick={toggleSelectAll}
              className="text-blue-600 text-sm hover:underline"
            >
              {selectedInvoices.length === ticketIds.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {outboundTickets.map((ticketId, idx) => (
              <div key={ticketId} className="flex items-center border-b pb-2">
                <input
                  type="checkbox"
                  id={`outbound-${ticketId}`}
                  checked={selectedInvoices.includes(ticketId)}
                  onChange={() => handleInvoiceSelection(ticketId)}
                  className="mr-2"
                />
                <label htmlFor={`outbound-${ticketId}`} className="flex-grow">
                  {translations.passengerWithNumber.replace('{number}', idx + 1)} - {ticketId}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {tripType === 'round-trip' && returnTickets.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{translations.returnJourney}</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {returnTickets.map((ticketId, idx) => (
                <div key={ticketId} className="flex items-center border-b pb-2">
                  <input
                    type="checkbox"
                    id={`return-${ticketId}`}
                    checked={selectedInvoices.includes(ticketId)}
                    onChange={() => handleInvoiceSelection(ticketId)}
                    className="mr-2"
                  />
                  <label htmlFor={`return-${ticketId}`} className="flex-grow">
                    {translations.passengerWithNumber.replace('{number}', idx + 1)} - {ticketId}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between space-x-2 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            disabled={downloading}
          >
            {translations.cancel}
          </button>
          
          <button 
            onClick={downloadSelectedInvoices}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={downloading || selectedInvoices.length === 0}
          >
            {downloading ? translations.downloadingInvoices : 
              `${translations.downloadSelected} (${selectedInvoices.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSelector;