import React from "react";

const TrainRules = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Passenger Rules</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All passengers must have a valid ticket before boarding.</li>
          <li>Tickets are non-refundable unless specified otherwise.</li>
          <li>Food and beverages may be consumed onboard, but please dispose of waste properly.</li>
          <li>Passengers should be seated in their assigned carriages.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Luggage Policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Each passenger is allowed up to 2 pieces of luggage.</li>
          <li>Larger luggage must be stored in designated compartments.</li>
          <li>Sharp objects and hazardous materials are prohibited.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Behavior and Safety</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Passengers should remain seated during the journey.</li>
          <li>Smoking is strictly prohibited on the train.</li>
          <li>Alcohol may only be consumed in moderation and in designated areas.</li>
          <li>In case of an emergency, follow the instructions of the train staff.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Arrival & Departure</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be sure to arrive at least 15 minutes before departure.</li>
          <li>Once the train has arrived at the station, passengers are to disembark in an orderly fashion.</li>
          <li>If you miss your train, contact the ticket counter for possible rescheduling options.</li>
        </ul>
      </div>
    </div>
  );
};

export default TrainRules;
