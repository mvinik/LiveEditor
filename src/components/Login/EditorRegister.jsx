import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditorRegister = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem("JwtToken");
    const userId = localStorage.getItem("UserId");
      const documentId = localStorage.getItem("documentID");
    
    if (!token || !documentId) {
      setMessage('Please log in first');
      setShowSnackbar(true);
      setLoading(false);
      return;
    }

    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      // Step 1: Create editor entry
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/editors`,
        {
          data: {
            Name: formData.name,
            Email: formData.email,
            users_permissions_user: documentId
          }
        },
        options
      );

      // Step 2: Change user role to Editor
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${documentId}`,
        {
          role: 3
        },
        options
      );

      setMessage('Successfully registered as Editor!');
      setShowSnackbar(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(
        err.response?.data?.error?.message || 
        err.message ||
        'Registration failed. Please try again.'
      );
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-5 border rounded-lg bg-white shadow-lg relative">
      {/* Snackbar Notification */}
      {showSnackbar && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg flex items-center justify-between ${
          message.includes('Success') ? 
            'bg-green-500 text-white' : 
            'bg-red-500 text-white'
        }`}
        style={{ minWidth: '300px', maxWidth: '90vw' }}>
          <span>{message}</span>
          <button 
            onClick={() => setShowSnackbar(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-center">
        <span className="text-pink-600">Editor </span>Registration
      </h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@gmail.com"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      
        <div className="flex flex-col  gap-3">
          <button 
            type="submit" 
            disabled={loading}
            className={`flex-1 bg-pink-600 text-white px-4 py-2 rounded-md transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
            }`}
          >
            {loading ? 'Processing...' : 'Register as Editor'}
          </button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorRegister;