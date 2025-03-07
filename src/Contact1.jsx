import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import FeedbackForm from "./Feedback";

export default function ContactUs() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={slideUp}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            We're here to help with your train ticket inquiries. Feel free to reach out through any of the channels below.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={staggerChildren}
        >
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 text-center h-full"
            variants={slideUp}
            initial="rest"
            whileHover="hover"
            animate="visible"
          >
            <motion.div 
              className="bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaPhone className="text-3xl text-blue-600" />
            </motion.div>
            <h2 className="text-xl font-semibold mb-2">Phone Support</h2>
            <p className="text-gray-600 mb-2">Available 24/7 for urgent matters</p>
            <a href="tel:+905551234567" className="text-blue-600 hover:text-blue-800 font-medium block">
              +90 555 123 4567
            </a>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 text-center h-full"
            variants={slideUp}
            initial="rest"
            whileHover="hover"
            animate="visible"
          >
            <motion.div 
              className="bg-orange-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEnvelope className="text-3xl text-orange-500" />
            </motion.div>
            <h2 className="text-xl font-semibold mb-2">Email Us</h2>
            <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
            <a href="mailto:info@trainticket.com" className="text-blue-600 hover:text-blue-800 font-medium block">
              info@trainticket.com
            </a>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 text-center h-full"
            variants={slideUp}
            initial="rest"
            whileHover="hover"
            animate="visible"
          >
            <motion.div 
              className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaMapMarkerAlt className="text-3xl text-red-500" />
            </motion.div>
            <h2 className="text-xl font-semibold mb-2">Visit Our Office</h2>
            <p className="text-gray-600 mb-2">Main Headquarters</p>
            <address className="not-italic text-gray-700">
              Maslak District, Büyükdere Avenue, No:237<br />
              Sarıyer, 34485 Istanbul<br />
              Turkey
            </address>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}