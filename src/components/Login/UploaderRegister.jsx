import React, { useState, useEffect } from "react";
import axios from "axios";

const UploaderRegister = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
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
      // Create uploader entry
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/clients`,
        {
          data: {
            Name: formData.name,
            Email: formData.email,
            users_permissions_user: documentId
          }
        },
        options
      );

      // Change user role to Uploader (role ID 4)
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${documentId}`,
        {
          role: 4
        },
        options
      );

      setMessage('Successfully registered as Uploader!');
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
    <div className="max-w-md mx-auto p-4 sm:p-6 border rounded-lg bg-white shadow-md relative">
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

      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-pink-600">Uploader </span>Registration
      </h2>
      
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@gmail.com"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      
        <div className="flex flex-col  gap-3">
          <button 
            type="submit" 
            disabled={loading}
            className={`flex-1 bg-pink-600 text-white px-4 py-3 rounded-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Register as Uploader'}
          </button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploaderRegister;