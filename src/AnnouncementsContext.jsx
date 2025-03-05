import React, { createContext, useState, useContext } from 'react';

// Create the context
const AnnouncementsContext = createContext();

// Provider component
export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to Our Service',
      content: 'We are excited to launch our new help center!',
      date: '2024-03-05',
      priority: 'high'
    }
  ]);

  // Function to add a new announcement
  const addAnnouncement = (newAnnouncement) => {
    const announcementWithId = {
      ...newAnnouncement,
      id: Date.now() // Use timestamp as unique ID
    };
    setAnnouncements([...announcements, announcementWithId]);
  };

  // Function to remove an announcement
  const removeAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  // Function to update an existing announcement
  const updateAnnouncement = (id, updatedAnnouncement) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, ...updatedAnnouncement } : announcement
    ));
  };

  return (
    <AnnouncementsContext.Provider 
      value={{ 
        announcements, 
        addAnnouncement, 
        removeAnnouncement, 
        updateAnnouncement 
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  );
};

// Custom hook to use the Announcements context
export const useAnnouncements = () => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
};