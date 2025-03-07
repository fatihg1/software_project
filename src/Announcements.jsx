import React from 'react';
import { useAnnouncements } from './AnnouncementsContext.jsx';

const Announcements = () => {
  const { announcements } = useAnnouncements();

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 border-red-400 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'low': return 'bg-blue-100 border-blue-400 text-blue-700';
      default: return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Announcements</h2>
      
      {announcements.length === 0 ? (
        <div className="text-center text-gray-500">
          No current announcements
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`
                ${getPriorityColor(announcement.priority)} 
                border-l-4 p-4 rounded-md shadow-sm
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                <span className="text-sm text-gray-600">{announcement.date}</span>
              </div>
              <p className="text-base">{announcement.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;