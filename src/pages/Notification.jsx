// Notifications.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const jwtToken = localStorage.getItem('JwtToken');
  const userId = localStorage.getItem('UserId');
    const documentId = localStorage.getItem("documentID");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
       `${API_URL}/api/notifications?filters[user][documentId]=${documentId}&populate=editor_request&sort=createdAt:desc`,
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setNotifications(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${API_URL}/api/notifications/${notificationId}`,
        { data: { read: true } },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      
     setNotifications(notifications.map(notif => 
  notif.documentId === notificationId
    ? { ...notif, read: true }
    : notif
));

    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.documentId} 
              className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between">
                <div>
                  <p>{notification.message}</p>
                  {notification.editor_request && (
                    <Link 
                      to={`/projects/${notification.editor_request.data.documentId}`}
                      className="text-blue-600 text-sm"
                    >
                      View Project
                    </Link>
                  )}
                </div>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.documentId)}
                    className="text-sm text-gray-500"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;