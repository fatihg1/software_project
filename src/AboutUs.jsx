import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { 
  FaTrain, 
  FaUsers, 
  FaHandshake, 
  FaPhone, 
  FaClock, 
  FaShieldAlt, 
  FaMapMarkedAlt,
  FaHistory,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const years = [2015, 2018, 2021, "Today"];

const originalStations = [
  { image: "/haydarpasa_gari.jpg" },
  { image: "/ankara_gari.jpg" },
  { image: "/kars_gari.jpg" },
  { image: "/alsancak_gari.jpg" }
];

const originalTeamMembers = [
  { image: "/api/placeholder/300/300" },
  { image: "/api/placeholder/300/300" },
  { image: "/api/placeholder/300/300" }
];

const FAQs = [
  {
    question: "How far in advance can I book tickets?",
    answer: "You can book tickets up to 3 months in advance for most routes. Some special routes and seasonal trains may have different booking windows."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, PayPal, and mobile payment solutions including Apple Pay and Google Pay."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Yes, you can cancel or modify your booking up to 24 hours before departure. A small fee may apply depending on your ticket type."
  },
  {
    question: "Do you offer discounts for group travel?",
    answer: "Yes, we offer special discounts for groups of 10 or more travelers. Please contact our customer service for more details."
  }
];

// Animation variants for different elements
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      delay: 0.1 
    }
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15
    }
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15
    }
  }
};

export default function AboutUs() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page as loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[40vh] md:h-128 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
          backgroundImage: "url('/api/placeholder/1600/800')",
          backgroundAttachment: 'fixed'
        }}>
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>
        <motion.div 
          initial="hidden"
          animate={isPageLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative flex items-center justify-center h-full text-center px-4 py-30 md:py-0"
        >
          <div className="max-w-4xl px-4 pt-26">
            <motion.h1 variants={itemFadeIn} className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.aboutTitle}
            </motion.h1>
            <motion.p variants={itemFadeIn} className="text-white text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t.aboutText}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 variants={itemFadeIn} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.missionTitle}
            </motion.h2>
            <motion.div variants={scaleIn} className="w-24 h-1 bg-blue-500 mx-auto mb-6"></motion.div>
            <motion.p variants={itemFadeIn} className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.missionText}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.whyChooseUsTitle}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromLeft}
              className="w-full md:w-1/2 overflow-hidden rounded-2xl"
            >
              <img 
                src="logo.png"
                alt="Train Travel Experience" 
                className="w-full h-auto hover:scale-100 transition-transform duration-500"
              />
            </motion.div>
      
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="w-full md:w-1/2 p-6"
            >
              <div className="space-y-8">
                {Object.values(t.features).map((feature, index) => (
                  <motion.div key={index} variants={itemFadeIn} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaShieldAlt className="text-xl text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.servicesTitle}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Object.values(t.services).map((service, index) => (
              <motion.div 
                key={index}
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-md text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrain className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mt-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* History */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.historyTitle}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="relative border-l-4 border-blue-500 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 pb-6 space-y-12"
          >
            {t.timeline.map((entry, index) => (
              <motion.div key={index} variants={itemFadeIn} className="relative">
                <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-500 border-4 border-white"></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{years[index]}</h3>
                  <p className="text-gray-600 mt-2">{entry}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stations */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.stationsTitle}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t.stationsSubtitle}</p>
          </div>
          
          <motion.div variants={scaleIn} className="station-slider">
            <Slider {...sliderSettings}>
              {t.stations.map((station, index) => (
                <div key={index} className="px-4">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-160 overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
                        src={originalStations[index].image} 
                        alt={station.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-800">{station.name}</h3>
                      <p className="text-blue-600 mt-1">{station.location}</p>
                      <p className="text-gray-600 mt-3">{station.info}</p>
                    </div>
                  </div>
                </div> 
              ))}
            </Slider>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQs */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.faqTitle}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </motion.div>
          
          <div className="space-y-4">
            {t.faq.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemFadeIn}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                  {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 pt-0 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="py-16 px-4 bg-blue-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contactTitle}</h2>
          <p className="text-xl mb-8">{t.contactText}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition-colors duration-300"
            onClick={() => navigate('/contact')}
          >
            {t.contactButton}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
