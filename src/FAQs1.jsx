import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "./LanguageContext.jsx";
import translations from "./translations";

export default function FAQs1() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 flex justify-center items-center gap-3">
          <FaQuestionCircle className="text-blue-500" /> {t.faqTitle}
        </h1>
        <p className="text-gray-600 mt-3 text-lg" dangerouslySetInnerHTML={{ __html: t.faqSubtitle }} />
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {t.faq1.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-white">
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
                  <div className="mt-2 text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200" 
                       dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}