import React, { useState } from 'react';
import { useAnnouncements } from './AnnouncementsContext';

const AdminAnnouncements = () => {
  const { announcements, addAnnouncement, removeAnnouncement, updateAnnouncement } = useAnnouncements();
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'low',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(newAnnouncement);
    
    // Reset form
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'low',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Announcements</h2>
      
      {/* Add New Announcement Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="4"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Priority
          </label>
          <select
            value={newAnnouncement.priority}
            onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Announcement
        </button>
      </form>

      {/* Current Announcements List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Current Announcements</h3>
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{announcement.title}</h4>
              <p className="text-gray-600">{announcement.content}</p>
              <span className="text-sm text-gray-500">
                Priority: {announcement.priority} | Date: {announcement.date}
              </span>
            </div>
            <button 
              onClick={() => removeAnnouncement(announcement.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;