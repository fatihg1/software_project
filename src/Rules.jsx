import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ScrollText, Luggage, UserCheck, TrainFront } from 'lucide-react';

const RuleSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <ul className="space-y-2 text-gray-700">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

const TrainRules = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center space-x-3">
          <TrainFront size={36} />
          <span>Passenger Guidelines</span>
        </h1>
        <p className="mt-2 text-blue-100">Ensuring a safe and comfortable journey for all</p>
      </div>

      <div>
        <RuleSection title="General Information" icon={ScrollText}>
          <li>All passengers must have a valid ticket before boarding.</li>
          <li>Tickets are non-refundable unless specified otherwise.</li>
          <li>Food and beverages may be consumed onboard, but please dispose of waste properly.</li>
          <li>Passengers should be seated in their assigned carriages.</li>
        </RuleSection>

        <RuleSection title="Luggage Policy" icon={Luggage}>
          <li>Each passenger is allowed up to 2 pieces of luggage.</li>
          <li>Larger luggage must be stored in designated compartments.</li>
          <li>Sharp objects and hazardous materials are prohibited.</li>
        </RuleSection>

        <RuleSection title="Behavior and Safety" icon={UserCheck}>
          <li>Passengers should remain seated during the journey.</li>
          <li>Smoking is strictly prohibited on the train.</li>
          <li>Alcohol may only be consumed in moderation and in designated areas.</li>
          <li>In case of an emergency, follow the instructions of the train staff.</li>
        </RuleSection>

        <RuleSection title="Arrival & Departure" icon={TrainFront}>
          <li>Be sure to arrive at least 15 minutes before departure.</li>
          <li>Once the train has arrived at the station, passengers are to disembark in an orderly fashion.</li>
          <li>If you miss your train, contact the ticket counter for possible rescheduling options.</li>
        </RuleSection>
      </div>
    </div>
  );
};

export default TrainRules;