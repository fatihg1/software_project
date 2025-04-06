import React, { createContext, useState, useContext, useEffect } from 'react';

// Context oluştur
const AnnouncementsContext = createContext();

// Provider bileşeni
export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error("Duyuru verileri çekilemedi:", err));
  }, []);

  return (
    <AnnouncementsContext.Provider value={{ announcements }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};

// Hook
export const useAnnouncements = () => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements sadece AnnouncementsProvider içinde kullanılabilir');
  }
  return context;
};
