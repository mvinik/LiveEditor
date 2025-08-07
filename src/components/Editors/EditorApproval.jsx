// EditorApproval.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditorApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const jwtToken = localStorage.getItem('JwtToken');
  const userId = localStorage.getItem('UserId');
        const documentId = localStorage.getItem("documentID");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/editor-requests?filters[editor][documentId]=${documentId}&populate=*`, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });
        setRequests(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  const handleApprove = async (projectId, selectedSlot) => {
    try {
      // Update project with selected slot and status
      await axios.put(`${API_URL}/api/editor-requests/${projectId}`, {
        data: {
          Sstatus: 'approved',
          selected_slot: selectedSlot
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      // Create notification for client
      const project = requests.find(p => p.documentId === projectId);
      await axios.post(`${API_URL}/api/notifications`, {
        data: {
          user: project.client.data.documentId,
          type: 'slot_confirmed',
          message: `Your editor has confirmed ${new Date(selectedSlot).toLocaleString()} for your project`,
          editor_request: projectId,
          read: false
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      // Refresh requests
     setRequests(requests.map(req => 
  req.documentId === projectId ? {
    ...req,
    Sstatus: 'approved',
    selected_slot: selectedSlot
  } : req
));

    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (projectId) => {
    try {
      // Update project status
      await axios.put(`${API_URL}/api/editor-requests/${projectId}`, {
        data: {
          Sstatus: 'rejected'
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      // Create notification for client
      const project = requests.find(p => p.documentId === projectId);
      await axios.post(`${API_URL}/api/notifications`, {
        data: {
          user: project.client.data.documentId,
          type: 'request_rejected',
          message: `Your editor has declined the request for ${project.title}`,
          editor_request: projectId,
          read: false
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      // Refresh requests
      setRequests(requests.filter(req => req.documentId !== projectId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Requests</h2>
      
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.documentId} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{request.title}</h3>
              <p className="text-gray-600 mb-2">{request.description}</p>
              
              <div className="mb-3">
                <p className="font-medium">Client's Preferred Slots:</p>
                <ul className="list-disc pl-5 mt-1">
                  {request.preferred_time_slots.map((slot, index) => (
                    <li key={index}>
                      {new Date(slot).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <select
                  className="border rounded-md p-2 flex-1"
                  onChange={(e) => {
                    // Store selected slot in component state
                    const updated = requests.map(req => 
                      req.documentId === request.documentId ? { ...req, selectedSlot: e.target.value } : req
                    );
                    setRequests(updated);
                  }}
                >
                  <option value="">Select a slot to confirm</option>
                  {request.preferred_time_slots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {new Date(slot).toLocaleString()}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => handleApprove(request.documentId, request.selectedSlot)}
                  disabled={!request.selectedSlot}
                  className={`px-4 py-2 rounded-md 
                    ${request.selectedSlot ? 'bg-green-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Confirm Slot
                </button>
                
                <button
                  onClick={() => handleReject(request.documentId)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorApproval;