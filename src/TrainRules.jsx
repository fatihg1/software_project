import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const rules = {
  "Sales Rules": `• Tickets must be purchased at least 30 minutes before departure. Purchased tickets are non-transferable and subject to cancellation/refund policies.

• All passengers are required to carry valid identification that matches the name on their ticket. 
  - Children under 12 years of age must be accompanied by an adult with a valid ticket.
  - International travelers must present passport or equivalent identification.

• Discount options:
  - Advance purchase: 10-25% discount for tickets bought at least 14 days before departure.
  - Group discounts: Apply to groups of 10 or more passengers traveling together.
  - Special rates: Senior citizens (65+) and students with valid ID cards are eligible for a 15% discount.

• Ticket verification:
  - E-tickets must be either printed or available on a mobile device.
  - The company reserves the right to refuse service to passengers without proper ticket verification.
  - Season tickets are available for regular travelers and offer significant savings.`,

  "Ticket Transactions": `• Ticket changes and cancellations should be made at station counters or online at least 2 hours before departure.

• Refund policy:
  - More than 24 hours before departure: 90% refund
  - Between 24 and 2 hours before departure: 50% refund
  - Less than 2 hours before departure: No refund
  - No-shows: No refund

• Modification fees:
  - Route changes: 10% of the original ticket price
  - Date changes (same route): 5% fee if made more than 24 hours in advance
  - Class upgrades: Difference between fares plus administrative fee

• Lost or damaged tickets:
  - Lost tickets: Can be reissued at station counters for a fee with proof of purchase
  - Damaged tickets: Replaced free of charge when the original ticket is surrendered
  - Digital tickets: Can be transferred to a new device through the official mobile application`,

  "Hand Luggage Rules": `• Each passenger can carry up to 15 kg of hand luggage with dimensions of 55x40x20 cm.

• Storage requirements:
  - All luggage must be properly secured in designated areas or overhead racks
  - Oversized items must be checked in as registered luggage (additional fee applies)
  - Special items like musical instruments require advance arrangements

• Passenger responsibility:
  - Travelers are solely responsible for their hand luggage and personal belongings
  - The railway company assumes no liability for loss or damage unless caused by staff
  - Valuable items should remain with passengers at all times

• Prohibited items:
  - Flammable substances and compressed gases
  - Corrosive materials and explosive devices
  - Firearms, ammunition, and weapons
  - Toxic substances and hazardous chemicals
  - Items that may endanger passenger safety

• Electronic devices:
  - Laptops, tablets, and mobile phones are permitted
  - Must be used according to on-board regulations
  - Some trains provide dedicated storage for larger electronics`,

  "Pet Rules": `• Small pets (under 8 kg) must be carried in a pet carrier.

• Small pet requirements:
  - Well-ventilated carrier not exceeding 45x30x25 cm
  - Must be placed under seat or in non-obstructive area
  - Pet ticket required (50% of standard adult fare)
  - Maximum two small pets per passenger

• Medium-sized dogs (8-20 kg):
  - Must be on leash and wearing a muzzle
  - Full-price pet ticket required
  - Owner must maintain control at all times
  - Not permitted to occupy passenger seats

• Large animals (over 20 kg):
  - Transport only in designated pet wagons on select trains
  - Advance booking essential (minimum 48 hours)
  - Special transport documents required
  - Additional handling fee applies

• Exceptions and special cases:
  - Guide dogs: Travel free of charge and exempt from muzzle requirements
  - Service animals: Must have proper certification and identification
  - Exotic, farm, and wild animals: Not permitted regardless of size

• Health requirements:
  - Up-to-date vaccination certificates mandatory
  - May be requested by train personnel at any time
  - Animals causing disturbance may be removed from train`,

  "Bicycle Rules": `• Foldable bicycles are considered hand luggage and do not require additional tickets.

• Foldable bicycle requirements:
  - Must be properly folded in protective carrying case
  - Maximum dimensions: 80x60x40 cm
  - Stored in regular luggage areas
  - No additional fee or reservation required

• Standard bicycles:
  - Require special bicycle ticket
  - Must be transported in designated bicycle compartments
  - Limited availability on high-speed services
  - Advance reservation strongly recommended

• Reservation process:
  - Book up to 2 months in advance
  - Available through station offices, phone, or website
  - Required during peak season (April-September)
  - Subject to availability on specific trains

• Electric bicycles:
  - Permitted with removable batteries
  - Battery must be carried separately as hand luggage
  - Must comply with safety standards
  - Battery capacity should not exceed 300Wh

• Special cases:
  - Tandem bicycles: Limited acceptance, subject to space
  - Cargo bikes: Generally not permitted
  - Bicycles with trailers: Accepted only on specific trains
  - Racing bicycles: Standard rules apply`,

  "Baby Stroller Rules": `• Baby strollers can be transported free of charge but must be foldable.

• Boarding and movement:
  - Strollers should be folded during embarkation and disembarkation
  - Fold when moving through train corridors
  - May be unfolded if space permits and no obstruction is caused
  - Priority boarding available upon request

• Storage options:
  - Crowded trains: Must be stored in luggage areas or under seats
  - Less crowded services: May use wheelchair spaces if not needed by wheelchair users
  - Wheelchair users always have priority for designated spaces
  - Must never block emergency exits or corridors

• Security considerations:
  - Remove valuable accessories when possible
  - Railway not liable for damage or theft
  - Secure stroller properly when stored
  - Take personal items with you when leaving your seat

• Special stroller types:
  - Twin/tandem strollers: Permitted but may be difficult to accommodate
  - Off-peak travel recommended for multiple strollers
  - Motorized strollers: May require special arrangements
  - Oversized strollers (exceeding 100x70x40 cm when folded): May be refused`
};

export default function TicketRules() {
  const [openRule, setOpenRule] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-center space-x-4">
          <Info className="text-white w-10 h-10" />
          <h1 className="text-2xl font-bold text-white">Train Ticketing Rules</h1>
        </div>
        
        <div className="p-6 space-y-4">
          {Object.entries(rules).map(([title, content]) => (
            <div 
              key={title} 
              className="border border-blue-100 rounded-xl overflow-hidden transition-all duration-300 ease-in-out"
            >
              <button 
                onClick={() => setOpenRule(openRule === title ? null : title)}
                className={`
                  w-full text-left p-4 flex justify-between items-center 
                  ${openRule === title 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gradient-to-r from-white to-blue-100 text-blue-800 hover:bg-blue-100'}
                  focus:outline-none transition-colors duration-200
                `}
              >
                <span className="font-semibold">{title}</span>
                {openRule === title ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              
              {openRule === title && (
                <div className="p-4 bg-white text-gray-700 leading-relaxed text-sm">
                  {content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}