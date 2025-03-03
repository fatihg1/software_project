const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo & Description */}
          <div>
            <h2 className="text-xl font-bold text-white">Train Ticket Booking</h2>
            <p className="mt-2 text-gray-400">
              The easiest way to book train tickets with secure payment and 24/7 customer support. Travel smarter with us.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-2 text-gray-400">123 Train St, Travel City, TX 75001</p>
            <p className="mt-1 text-gray-400">Email: support@trainbooking.com</p>
            <p className="mt-1 text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-700 mt-6 pt-4">
          © {new Date().getFullYear()} Train Ticket Booking. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  