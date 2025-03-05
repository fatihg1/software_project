import { Train, Home } from 'lucide-react';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Train size={36} className="text-white"/>
            <h1 className="text-4xl font-bold tracking-tight">Page Not Found!</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
        <p className="text-gray-500 mb-0">
          Error Code:
          </p>
          <div className="text-9xl font-bold text-gray-300 mb-2">404</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sorry, the page you are looking for was not found :(</h2>
          <p className="text-gray-500 mb-7">
          The page you requested may have been removed or is temporarily unavailable.
          </p>
          
          <button 
            onClick={handleGoHome}
            className="inline-flex items-center space-x-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            <Home size={30} />
            <span>Return to Home Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}