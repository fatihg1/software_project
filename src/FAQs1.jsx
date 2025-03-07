import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    category: "Booking & Tickets",
    questions: [
      {
        question: "How can I purchase a train ticket?",
        answer: "Train tickets can be purchased via our <strong>official website or mobile application</strong>. Simply enter the departure and destination stations, select the travel date, choose a preferred train and seat, and proceed with payment.",
      },
      {
        question: "Can I modify my ticket after booking?",
        answer: "<strong>Ticket modifications are not allowed</strong> after booking.",
      },
      {
        question: "Do I need a printed ticket for travel?",
        answer: "A <strong>digital ticket (e-ticket)</strong> is sufficient for travel. It can be presented via <strong>email</strong> or through our <strong>mobile application. Printed ticket is optional</strong>.",
      },
      {
        question: "Is it possible to book tickets for multiple passengers?",
        answer: "Yes, <strong>multiple passengers</strong> can be included in a <strong>single booking</strong>. The required details for each traveler must be provided during the <strong>reservation process</strong>.",
      },
      {
        question: "Is a mobile application available for ticket bookings?",
        answer: "Yes, our <strong>mobile application</strong> is available for both <strong>iOS and Android</strong>, enabling users to <strong>book, manage, and access their tickets</strong> with ease.",
      },
    ],
  },
  {
    category: "Cancellations & Refunds",
    questions: [
      {
        question: "What is the ticket cancellation policy?",
        answer: "Tickets may be <strong>canceled up to 24 hours prior</strong> to departure for a <strong>full refund</strong>. Cancellations made <strong>within 24 hours</strong> will incur a 50% cancellation fee.<strong> No refunds will be issued for cancellations within two hours of departure</strong>.",
      },
      {
        question: "How can I request a refund?",
        answer: "<strong>Refund requests</strong> can be made via the <strong>'My Tickets' section</strong> on our <strong>website</strong> or <strong>mobile application</strong>. For tickets purchased at a <strong>ticket counter</strong>, refunds must be requested at the <strong>station</strong>.",
      },
      {
        question: "Can a ticket be transferred to another person?",
        answer: "No, <strong>train tickets are non-transferable</strong>. The <strong>name on the ticket</strong> must match the traveler's <strong>identification</strong> at the time of travel.",
      },
      {
        question: "What happens if my train is cancelled?",
        answer: "In the event of a <strong>train cancellation</strong> due to <strong>unforeseen circumstances</strong>, passengers will be eligible for a <strong>full refund</strong> or may <strong>rebook on the next available service</strong>.",
      }
    ],
  }
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
          Find answers to common inquiries regarding <strong>ticket reservations</strong>, <strong>cancellations</strong>, and <strong>refunds</strong>.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-md">
            {/* Category Title */}
            <h2 className="text-3xl font-semibold text-gray-800 border-b pb-6">
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
                  <div className="mt-2 text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
