import React, { useState } from "react";
import { FaTrain, FaUsers, FaClipboardList, FaMoneyBillWave, FaBullhorn, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    { id: 1, user: "Ali Yılmaz", train: "İstanbul - Ankara", date: "2024-03-10", status: "Onaylandı" },
    { id: 2, user: "Ayşe Kaya", train: "İzmir - İstanbul", date: "2024-03-12", status: "Beklemede" },
    { id: 3, user: "Mehmet Demir", train: "Ankara - İzmir", date: "2024-03-15", status: "İptal Edildi" },
  ]);

  // Rezervasyon durumunu değiştirme fonksiyonu
  const changeStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin")}>
            <FaBars /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/trains")}>
            <FaTrain /> <span>Tren Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/admin/users")}>
            <FaUsers /> <span>Kullanıcı Yönetimi</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-md bg-purple-700 transition" onClick={() => navigate("/admin/bookings")}>
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
        {/* Üst Kısım */}
        <div className="flex justify-between items-center mb-6">
          {/* Arama Kutusu */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-96">
            <FaSearch className="text-gray-400 mx-2" />
            <input type="text" placeholder="Ara..." className="outline-none p-1 w-full" />
          </div>

          {/* Sayfa Başlığı */}
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">📅 Rezervasyon Yönetimi</h1>

          {/* Çıkış Butonu */}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Çıkış</span>
          </button>
        </div>

        {/* Rezervasyon Listesi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Mevcut Rezervasyonlar</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Kullanıcı</th>
                <th className="p-3 text-left">Tren</th>
                <th className="p-3 text-left">Tarih</th>
                <th className="p-3 text-left">Durum</th>
                <th className="p-3 text-left">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-3">{booking.user}</td>
                  <td className="p-3">{booking.train}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className={`p-3 font-bold ${
                    booking.status === "Onaylandı" ? "text-green-500" : 
                    booking.status === "İptal Edildi" ? "text-red-500" : 
                    "text-yellow-500"
                  }`}>
                    {booking.status}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => changeStatus(booking.id, "Onaylandı")}
                    >
                      Onayla
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => changeStatus(booking.id, "Beklemede")}
                    >
                      Beklemeye Al
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => changeStatus(booking.id, "İptal Edildi")}
                    >
                      İptal Et
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
