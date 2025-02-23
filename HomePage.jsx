export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')",backgroundSize: "cover", backgroundPosition: "center" }}></div>
      
      <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Fast and Easy Train Tickets</h1>
        <p className="text-lg md:text-xl mt-4">Plan your trip and find the best prices!</p>
        
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Route</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="From" 
              className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="To" 
              className="p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="submit" 
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
