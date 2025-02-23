import { useState } from "react";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your feedback has been submitted: \n\n${message}`);
    setMessage(""); // Formu temizle
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">We Value Your Feedback</h2>
        <p className="text-gray-600 mb-4">
          Let us know about your experience or any suggestions you have. Your feedback helps us improve our service.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
