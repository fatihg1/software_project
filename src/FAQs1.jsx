import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    category: "Booking & Tickets",
    questions: [
      {
        question: "How can I book a train ticket?",
        answer: "You can book your train ticket through our website or mobile app. Simply enter your departure and destination stations, select a travel date, choose your preferred train and seat, then proceed to payment.",
      },
      {
        question: "Can I modify my ticket after booking?",
        answer: "Yes, you can modify your ticket up to 24 hours before departure. Changes may include date, time, or seat selection. Modification fees may apply.",
      },
      {
        question: "Do I need to print my ticket?",
        answer: "No, a digital ticket (e-ticket) is sufficient. You can show the ticket from your email or mobile app. However, if you prefer, you can print your ticket for reference.",
      },
      {
        question: "Can I book tickets for multiple passengers?",
        answer: "Yes! You can book tickets for multiple passengers in a single transaction. Just add the names and details for each traveler during the booking process.",
      },
      {
        question: "Is there a mobile app for booking tickets?",
        answer: "Yes, we have a mobile app available on iOS and Android for booking, modifying, and managing your train tickets.",
      },
    ],
  },
  {
    category: "Cancellations & Refunds",
    questions: [
      {
        question: "What is the cancellation policy?",
        answer: "You can cancel your ticket up to 24 hours before departure for a full refund. Cancellations made within 24 hours will incur a 50% fee. No refund is provided for cancellations within 2 hours of departure.",
      },
      {
        question: "How do I request a refund?",
        answer: "Refunds can be requested through the 'My Tickets' section on our website or app. If you booked at a ticket counter, please visit the station for assistance.",
      },
      {
        question: "Can I transfer my ticket to someone else?",
        answer: "No, train tickets are non-transferable. The name on the ticket must match the passenger’s valid ID during travel.",
      },
      {
        question: "What happens if my train is canceled?",
        answer: "If your train is canceled due to unforeseen circumstances, you will be offered a full refund or the option to rebook on the next available train.",
      },
      {
        question: "Can I change my travel date after booking?",
        answer: "Yes, you can change your travel date, but it may be subject to availability and a modification fee.",
      },
    ],
  },
  {
    category: "Payments & Discounts",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. Payments at station counters can be made in cash.",
      },
      {
        question: "Are there any discounts available?",
        answer: "Yes! We offer student, senior citizen (65+), and military discounts. Additionally, group bookings of 10 or more passengers receive a discount.",
      },
      {
        question: "Can I get an invoice for my purchase?",
        answer: "Yes, after completing your booking, an invoice will be sent to your email. You can also download it from your account section.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely! We use encrypted payment gateways to ensure your transactions are safe and secure.",
      },
      {
        question: "Do you offer loyalty points or rewards?",
        answer: "Yes! Frequent travelers can earn points for each booking, which can be redeemed for discounts on future trips.",
      },
    ],
  },
  {
    category: "Luggage & Baggage Policies",
    questions: [
      {
        question: "How much luggage can I bring?",
        answer: "Each passenger is allowed up to 2 carry-on bags (max 15kg each) and 1 checked baggage (max 25kg). Oversized or extra luggage may require an additional fee.",
      },
      {
        question: "Can I bring my bicycle on board?",
        answer: "Yes, foldable bicycles are allowed as carry-on luggage. Standard bicycles require a separate bicycle ticket and must be stored in the designated compartments.",
      },
      {
        question: "Are pets allowed on the train?",
        answer: "Small pets (under 8kg) can travel in a pet carrier. Larger pets must have a separate pet ticket and remain on a leash and muzzle at all times. Guide dogs travel for free.",
      },
      {
        question: "Can I carry food and drinks on board?",
        answer: "Yes, passengers are allowed to bring their own food and drinks. However, alcohol consumption is prohibited unless served on board.",
      },
      {
        question: "Is there Wi-Fi on the train?",
        answer: "Most of our trains offer free Wi-Fi. However, service quality may vary depending on location and network coverage.",
      },
    ],
  },
  {
    category: "Safety & Onboard Services",
    questions: [
      {
        question: "What safety measures are in place on the train?",
        answer: "Our trains are equipped with CCTV, emergency exits, and trained staff to ensure passenger safety at all times.",
      },
      {
        question: "Is there a first-aid service on board?",
        answer: "Yes, all trains have basic first-aid kits and trained personnel to assist in case of medical emergencies.",
      },
      {
        question: "Are there special facilities for passengers with disabilities?",
        answer: "Yes, our trains offer wheelchair-accessible seating, priority boarding, and dedicated assistance services. Please inform us in advance for special arrangements.",
      },
      {
        question: "Can I charge my phone or laptop on the train?",
        answer: "Yes, our trains are equipped with power outlets and USB charging ports at most seats.",
      },
      {
        question: "Are there restrooms on board?",
        answer: "Yes, all trains are equipped with clean and accessible restrooms.",
      },
    ],
  },
];

export default function FAQs1() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 flex justify-center items-center gap-3">
          <FaQuestionCircle className="text-blue-500" /> Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Find answers to common questions about train bookings, payments, baggage policies, and more.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-md">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
              {category.category}
            </h2>

            {/* FAQ Questions */}
            {category.questions.map((faq, index) => (
              <div key={index} className="border-b last:border-0 py-3">
                <button
                  onClick={() => toggleFAQ(`${categoryIndex}-${index}`)}
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 focus:outline-none"
                >
                  {faq.question}
                  {openIndex === `${categoryIndex}-${index}` ? (
                    <FaChevronUp className="text-blue-600" />
                  ) : (
                    <FaChevronDown className="text-blue-600" />
                  )}
                </button>

                {/* FAQ Answer - Expandable */}
                {openIndex === `${categoryIndex}-${index}` && (
                  <p className="mt-2 text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
