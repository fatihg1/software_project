import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaTicketAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const ManagerDashboard = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

//   if (!isSignedIn || user.publicMetadata?.role !== "admin") {
//     return <Navigate to="/" />;
//   }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className={`flex items-center space-x-2 p-3 rounded-md ${activeTab === "dashboard" ? "bg-purple-700" : "hover:bg-purple-700"} transition`} onClick={() => setActiveTab("dashboard")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/trains")}>
            <FaTrain /> <span>Tren Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/users")}>
            <FaUsers /> <span>Kullanıcı Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/bookings")}>
            <FaClipboardList /> <span>Rezervasyon Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/finance")}>
            <FaMoneyBillWave /> <span>Finans Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/announcements")}>
            <FaBullhorn /> <span>Duyurular</span>
          </button>
        </nav>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 p-6 relative">
        {/* Header (Üst Kısım) */}
        <div className="flex justify-between items-center mb-6">
          {/* Arama Kutusu */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-96">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Ara..." className="outline-none p-1 w-full" />
          </div>

          {/* Sayfa Başlığı */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📊 Dashboard</h1>

          {/* Çıkış Butonu */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Çıkış</span>
          </button>
        </div>

        {/* Hızlı İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaUsers className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">1,200</h3>
              <p className="text-gray-500">Toplam Kullanıcı</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaTicketAlt className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">5,420</h3>
              <p className="text-gray-500">Toplam Rezervasyon</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaMoneyBillWave className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">₺254,000</h3>
              <p className="text-gray-500">Aylık Gelir</p>
            </div>
          </div>
        </div>

        {/* Son İşlemler ve Kullanıcılar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">📌 Son Rezervasyonlar</h2>
            <ul>
              <li className="p-2 border-b">Ali Yılmaz - İstanbul - Ankara (10 Mart 2024)</li>
              <li className="p-2 border-b">Ayşe Kaya - İzmir - İstanbul (12 Mart 2024)</li>
              <li className="p-2 border-b">Mehmet Demir - Ankara - İzmir (15 Mart 2024)</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">🆕 Yeni Kullanıcılar</h2>
            <ul>
              <li className="p-2 border-b">Fatma Demir - Katıldı: 5 Mart 2024</li>
              <li className="p-2 border-b">Burak Çelik - Katıldı: 7 Mart 2024</li>
              <li className="p-2 border-b">Zeynep Arslan - Katıldı: 9 Mart 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
