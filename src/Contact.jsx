import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import FeedbackForm from "./Feedback";

export default function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
        <FeedbackForm/>
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-600">Contact Us</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Feel free to reach out to us for any questions or support.
        </p>
      </div>
      
      <div className="mt-12 max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <FaPhone className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Phone</h2>
          <p className="text-gray-600 mt-2">+90 555 123 4567</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <FaEnvelope className="text-5xl text-orange-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Email</h2>
          <p className="text-gray-600 mt-2">info@trainticket.com</p>
        </div>
      </div>
      
      <div className="mt-8 max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <FaMapMarkerAlt className="text-5xl text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Address</h2>
          <p className="text-gray-600 mt-2">Maslak District, Büyükdere Avenue, No:237 Sarıyer, 34485 Istanbul, Turkey</p>
        </div>
      </div>
    </div>
  );
}
