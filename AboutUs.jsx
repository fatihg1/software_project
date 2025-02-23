import { FaTrain, FaUsers, FaHandshake, FaPhone } from "react-icons/fa";
import image from "/background.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const stations = [
  { name: "Grand Central Station", image: "/grand-central.jpg" },
  { name: "Union Station", image: "/union-station.jpg" },
  { name: "King's Cross", image: "/kings-cross.jpg" },
  { name: "Gare du Nord", image: "/gare-du-nord.jpg" }
];

export default function AboutUs() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
        <p className="text-gray-600 mt-4 text-lg">
          We are here to make your journey easy and fast. We offer reliable train tickets at the best prices.
        </p>
      </div>
      
      {/* Why Us Section */}
      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-2xl shadow-lg mt-12 max-w-6xl mx-auto px-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img 
            src={image}
            alt="Train Travel" 
            className="rounded-xl shadow-md w-full h-auto"
          />
        </div>
  
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Us?</h2>
          <p className="text-gray-600">
            We are committed to providing a seamless and enjoyable train travel experience. 
            Our platform offers an easy-to-use booking system, competitive prices, and multiple 
            payment options to ensure a hassle-free reservation process. With real-time train 
            updates, secure transactions, and dedicated customer support, we make sure you travel 
            with confidence. Whether you are commuting for work or exploring new destinations, 
            our reliable service guarantees comfort, safety, and convenience. Book your ticket 
            today and experience a smarter way to travel!
          </p>
        </div>
      </div>
      
      {/* Highlights Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <FaTrain className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Wide Route Options</h2>
          <p className="text-gray-600 mt-2">Find tickets to many different destinations at the best prices.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <FaUsers className="text-5xl text-orange-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Customer-Oriented Service</h2>
          <p className="text-gray-600 mt-2">Customer satisfaction is our top priority.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <FaHandshake className="text-5xl text-green-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Fast and Reliable</h2>
          <p className="text-gray-600 mt-2">Save time with an easy ticket purchasing experience.</p>
        </div>
      </div>

      {/* Train Stations Slider */}
      <div className="mt-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Train Stations</h2>
        <Slider {...settings}>
          {stations.map((station, index) => (
            <div key={index} className="p-4 text-center">
              <img src={station.image} alt={station.name} className="w-full h-128 object-cover rounded-lg shadow-md" />
              <h3 className="text-lg font-medium mt-4">{station.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
