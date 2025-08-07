import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = localStorage.getItem('UserId');

const EditorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/video-bookings?filters[editor]=${USER_ID}&populate=time_slots,client`)
      .then(res => setRequests(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const acceptRequest = (id, selectedTime) => {
    axios.put(`${API_URL}/api/video-bookings/${id}`, {
      data: {
        selected_time: selectedTime,
        status: 'accepted'
      }
    }).then(() => {
      alert('Request accepted.');
      window.location.reload();
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
      {requests.length === 0 ? <p>No requests yet.</p> : requests.map((req) => (
        <div key={req.id} className="border p-4 rounded mb-4">
          <p><strong>Client:</strong> {req.attributes.client?.username}</p>
          <p><strong>Description:</strong> {req.attributes.project_description}</p>
          <p><strong>Status:</strong> {req.attributes.status}</p>
          <p className="mt-2">Choose preferred time to accept:</p>
          {req.attributes.time_slots.map((slot, i) => (
            <div key={i} className="flex items-center mt-2 gap-3">
              <span>{slot.time} - {slot.note}</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => acceptRequest(req.id, slot.time)}>Accept this</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EditorDashboard;
