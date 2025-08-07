// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// const ClientRequestForm = () => {
//   const [step, setStep] = useState(1);
//   const [editors, setEditors] = useState([]);
//   const [selectedEditor, setSelectedEditor] = useState(null);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [projectDetails, setProjectDetails] = useState({
//     title: '',
//     description: '',
//     deadline: ''
//   });
//   const [notification, setNotification] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const API_URL = import.meta.env.VITE_API_URL;
//   const userId = localStorage.getItem('UserId');
//   const jwtToken = localStorage.getItem('JwtToken');
  
//   // Fetch available editors
//   useEffect(() => {
//     const fetchEditors = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/editors`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`
//           }
//         });
        
//         // Assuming your API returns data in the format you showed:
//         // { data: [ { id: 12, attributes: { Name: "...", Email: "..." } } ] }
        
//         setEditors(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching editors:', error);
//         setError(error);
//         setLoading(false);
//       }
//     };
    
//     fetchEditors();
//   }, []);


//   // Handle editor selection
//   const handleSelectEditor = (editor) => {
//     setSelectedEditor(editor);
//     setStep(2);
//   };

//   // Handle time slot selection
//   const handleSelectSlot = (slot) => {
//     if (selectedSlots.includes(slot)) {
//       setSelectedSlots(selectedSlots.filter(s => s !== slot));
//     } else if (selectedSlots.length < 3) {
//       setSelectedSlots([...selectedSlots, slot]);
//     }
//   };

//   // Handle project details submission
//   const handleProjectSubmit = (e) => {
//     e.preventDefault();
//     setStep(3);
//   };

//   // Final submission
//   const handleFinalSubmit = async () => {
//     try {
//       // Create project
//       const projectResponse = await axios.post(`${API_URL}/api/projects`, {
//         data: {
//           title: projectDetails.title,
//           description: projectDetails.description,
//           deadline: projectDetails.deadline,
//           client: userId,
//           editor: selectedEditor.id,
//           status: 'pending',
//           proposed_slots: selectedSlots
//         }
//       }, {
//         headers: { Authorization: `Bearer ${jwtToken}` }
//       });

//       // Create notification for editor
//       await axios.post(`${API_URL}/api/notifications`, {
//         data: {
//           user: selectedEditor.attributes.user.data.id,
//           type: 'editor_request',
//           message: `You have a new editing request for ${projectDetails.title}`,
//           related_project: projectResponse.data.data.id,
//           read: false
//         }
//       }, {
//         headers: { Authorization: `Bearer ${jwtToken}` }
//       });

//       setNotification({
//         type: 'success',
//         message: 'Request sent successfully! The editor will respond soon.'
//       });
//       setStep(4);
//     } catch (error) {
//       setNotification({
//         type: 'error',
//         message: 'Failed to send request. Please try again.'
//       });
//       console.error('Error submitting request:', error);
//     }
//   };

//   // Generate time slots (example implementation)
//   const generateTimeSlots = () => {
//     const slots = [];
//     const today = new Date();
    
//     for (let i = 1; i <= 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
      
//       ['09:00', '12:00', '15:00', '18:00'].forEach(time => {
//         slots.push({
//           id: `${date.toISOString().split('T')[0]}-${time}`,
//           date: date.toLocaleDateString(),
//           time
//         });
//       });
//     }
    
//     return slots;
//   };

//   return (<>
//   <Navbar/>
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Select Editor & Schedule</h2>
      
//       {/* Progress Steps */}
//       <div className="flex justify-between mb-8">
//         {[1, 2, 3, 4].map((stepNumber) => (
//           <div key={stepNumber} className="flex flex-col items-center">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center 
//               ${step >= stepNumber ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
//               {stepNumber}
//             </div>
//             <span className="text-sm mt-1">
//               {['Choose Editor', 'Select Times', 'Project Details', 'Complete'][stepNumber-1]}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Step 1: Editor Selection */}
//       {step === 1 && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Available Editors</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {editors.map(editor => (
//               <div key={editor.id} className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
//                 onClick={() => handleSelectEditor(editor)}>
//                 <div className="flex items-center mb-3">
//                   <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
//                     {editor.Name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <h4 className="font-medium">{editor.Name}</h4>
//                     {/* <p className="text-sm text-gray-600">{editor.attributes.specialization}</p> */}
//                   </div>
//                 </div>
//                 {/* <div className="text-sm">
//                   <p><span className="font-medium">Rate:</span> ${editor.attributes.rate}/hour</p>
//                   <p><span className="font-medium">Experience:</span> {editor.attributes.experience} years</p>
//                   <p className="line-clamp-2">{editor.attributes.bio}</p>
//                 </div> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Step 2: Time Slot Selection */}
//       {step === 2 && selectedEditor && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Select 3 Preferred Time Slots</h3>
//           <p className="mb-4">Editor: {selectedEditor.attributes.user.data.attributes.username}</p>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//             {(timeSlots.length ? timeSlots : generateTimeSlots()).map(slot => (
//               <div 
//                 key={slot.id}
//                 className={`border rounded-lg p-3 cursor-pointer transition 
//                   ${selectedSlots.includes(slot.id) ? 'bg-pink-100 border-pink-500' : 'hover:bg-gray-50'}`}
//                 onClick={() => handleSelectSlot(slot.id)}
//               >
//                 <div className="font-medium">{slot.date}</div>
//                 <div>{slot.time}</div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 flex justify-between">
//             <button 
//               onClick={() => setStep(1)}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Back
//             </button>
//             <button 
//               onClick={() => setStep(3)}
//               disabled={selectedSlots.length !== 3}
//               className={`px-4 py-2 rounded-md 
//                 ${selectedSlots.length === 3 ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-300 cursor-not-allowed'}`}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Project Details */}
//       {step === 3 && (
//         <form onSubmit={handleProjectSubmit}>
//           <h3 className="text-xl font-semibold mb-4">Project Details</h3>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Project Title</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={projectDetails.title}
//               onChange={(e) => setProjectDetails({...projectDetails, title: e.target.value})}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Description</label>
//             <textarea
//               className="w-full p-2 border rounded-md"
//               rows="4"
//               value={projectDetails.description}
//               onChange={(e) => setProjectDetails({...projectDetails, description: e.target.value})}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Deadline</label>
//             <input
//               type="date"
//               className="w-full p-2 border rounded-md"
//               value={projectDetails.deadline}
//               onChange={(e) => setProjectDetails({...projectDetails, deadline: e.target.value})}
//               required
//             />
//           </div>
          
//           <div className="mt-6 flex justify-between">
//             <button 
//               type="button"
//               onClick={() => setStep(2)}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Back
//             </button>
//             <button 
//               type="submit"
//               className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
//             >
//               Submit Request
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 4: Confirmation */}
//       {step === 4 && (
//         <div className="text-center py-8">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Request Submitted Successfully!</h3>
//           <p className="mb-6">The editor has been notified and will respond to your request soon.</p>
//           <button 
//             onClick={() => navigate('/my-projects')}
//             className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
//           >
//             View My Projects
//           </button>
//         </div>
//       )}

//       {/* Notification */}
//       {notification && (
//         <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg 
//           ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {notification.message}
//           <button 
//             onClick={() => setNotification(null)}
//             className="ml-4"
//           >
//             ✕
//           </button>
//         </div>
//       )}
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default ClientRequestForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const ClientRequestForm = () => {
  const [step, setStep] = useState(1);
  const [editors, setEditors] = useState([]);
  const [selectedEditor, setSelectedEditor] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add new state for editor response
const [editorResponse, setEditorResponse] = useState(null);
const [waitingForEditor, setWaitingForEditor] = useState(false);


  const API_URL = import.meta.env.VITE_API_URL;
  // const userId = localStorage.getItem('UserId');
  const documentId = localStorage.getItem("documentID");
  const jwtToken = localStorage.getItem('JwtToken');
  const navigate = useNavigate();

  // Fetch available editors
  useEffect(() => {
    const fetchEditors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/editors?populate=*`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        console.log("Editors data:", response.data.data);
        
        if (!response.data?.data) {
          throw new Error("Invalid response format - missing data");
        }

        const editorsData = response.data.data.map(editor => ({
          ...editor,
          // Ensure documentId is available
          documentId: editor.documentId || editor.id
        }));
        
        setEditors(editorsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching editors:', error);
        setError(error);
        setLoading(false);
      }
    };
    
    fetchEditors();
  }, []);

  // Generate time slots for next 7 days
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      ['09:00', '12:00', '15:00', '18:00'].forEach(time => {
        const slotDate = new Date(`${date.toISOString().split('T')[0]}T${time}`);
        slots.push({
        documentId: slotDate.toISOString(),
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          time,
          datetime: slotDate
        });
      });
    }
    
    setTimeSlots(slots);
  };

  // Handle editor selection
  const handleSelectEditor = (editor) => {
    setSelectedEditor(editor);
    generateTimeSlots();
    setStep(2);
  };

// Modified handleSelectSlot and step progression
const handleSelectSlot = async (slotId) => {
  if (selectedSlots.includes(slotId)) {
    setSelectedSlots(selectedSlots.filter(documentId => documentId !== slotId));
  } else if (selectedSlots.length < 3) {
    setSelectedSlots([...selectedSlots, slotId]);
    
    // When 3 slots are selected, automatically send to editor
    if (selectedSlots.length === 2) { // Because we're adding the 3rd one now
      try {
        setWaitingForEditor(true);
        
        // Create temporary request
        const tempRequest = await axios.post(`${API_URL}/api/editor-requests`, {
          data: {
            editor: selectedEditor.documentId,
            client: documentId,
            proposed_slots: [...selectedSlots, slotId],
            Sstatus: 'pending'
          }
        }, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });

        // Notify editor
        await axios.post(`${API_URL}/api/notifications`, {
          data: {
            user: selectedEditor.documentId,
            type: 'time_slot_request',
            message: `New time slot request from client`,
            temp_request: tempRequest.data.data.documentId,
            read: false
          }
        });

        setNotification({
          type: 'success',
          message: 'Time slots sent to editor for approval'
        });
        
        // Start polling for editor response
        startPollingEditorResponse(tempRequest.data.data.documentId);
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Failed to send time slots to editor'
        });
        setWaitingForEditor(false);
      }
    }
  }
};

// Polling function
const startPollingEditorResponse = (requestId) => {
  const interval = setInterval(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/editor-requests/${requestId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      
      if (response.data.data.Sstatus === 'accepted') {
        clearInterval(interval);
        setEditorResponse('accepted');
        setWaitingForEditor(false);
        setStep(3); // Move to project details
      } else if (response.data.dataSstatus === 'rejected') {
        clearInterval(interval);
        setEditorResponse('rejected');
        setWaitingForEditor(false);
        setNotification({
          type: 'error',
          message: 'Editor rejected the time slots. Please choose different slots.'
        });
        setSelectedSlots([]); // Reset slots
      }
    } catch (error) {
      console.error('Error checking editor response:', error);
    }
  }, 5000); // Check every 5 seconds

  // Cleanup after 30 minutes if no response
  setTimeout(() => {
    clearInterval(interval);
    if (!editorResponse) {
      setWaitingForEditor(false);
      setNotification({
        type: 'warning',
        message: 'Editor did not respond in time. Please try again.'
      });
    }
  }, 1800000);
};


  // Handle project details submission
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setStep(3.5); // Show confirmation before final submit
  };

  // Final submission to send to editor
  const handleFinalSubmit = async () => {
    try {
      // Create project using documentId
      const projectResponse = await axios.post(`${API_URL}/api/editor-requests`, {
        data: {
          title: projectDetails.title,
          description: projectDetails.description,
          deadline: projectDetails.deadline,
          client: documentId,
          editor: selectedEditor.documentId, // Using documentId here
          Sstatus: 'pending',
          proposed_slots: selectedSlots
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      // Create notification for editor using documentId
      await axios.post(`${API_URL}/api/notifications`, {
        data: {
          user: selectedEditor.documentId, // Using documentId here
          type: 'editor_request',
          message: `New editing request: ${projectDetails.title}`,
          editor_request: projectResponse.data.data.documentId, // Using documentId here
          read: false
        }
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      setNotification({
        type: 'success',
        message: 'Request sent successfully! The editor will respond soon.'
      });
      setStep(4);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send request. Please try again.'
      });
      console.error('Error submitting request:', error);
    }
  };

  return (
    <>
      <Navbar/>
      
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Video Editing Request</h2>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step >= stepNumber ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
                {stepNumber}
              </div>
              <span className="text-sm mt-1">
                {['Choose Editor', 'Select Times', 'Project Details', 'Complete'][stepNumber-1]}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Editor Selection */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Available Editors</h3>
            {loading ? (
              <p>Loading editors...</p>
            ) : error ? (
              <p className="text-red-500">Error loading editors</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editors.map(editor => (
                  <div 
                    key={editor.documentId} // Using documentId as key
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    {/* Profile View Section */}
                    <div className="flex items-center gap-4 mb-3 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        {editor.Name?.charAt(0).toUpperCase() || 'E'}
                      </div>
                      <div>
                        <h4 className="font-medium">{editor.Name || 'Editor'}</h4>
                        <h4 className="font-medium">{editor.Email}</h4>
                      </div>
                    </div>

                    <div className="text-sm mb-3">
                      {/* Additional editor info can go here */}
                    </div>

                    <div className='flex flex-row gap-4'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectEditor(editor);
                        }}
                        className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                      >
                        Select Editor
                      </button>
                      <button
                        onClick={() => navigate(`/editor/${editor.documentId}`)} // Using documentId in URL
                        className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                      >
                        View Editor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

 {step === 2 && selectedEditor && (
  <div>
    <h3 className="text-xl font-semibold mb-4">Select 3 Preferred Time Slots</h3>
    <p className="mb-4">Editor: {selectedEditor.Name}</p>
    
    {waitingForEditor ? (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <p>Waiting for editor to respond...</p>
        <button 
          onClick={() => {
            setWaitingForEditor(false);
            setSelectedSlots([]);
          }}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel Request
        </button>
      </div>
    ) : editorResponse === 'rejected' ? (
      <div className="bg-red-50 p-4 rounded-md mb-4">
        <p className="text-red-600">Editor rejected these time slots. Please choose different ones.</p>
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {timeSlots.map(slot => (
            <div 
              key={slot.id}
              className={`border rounded-lg p-3 cursor-pointer transition 
                ${selectedSlots.includes(slot.id) ? 'bg-pink-100 border-pink-500' : 'hover:bg-gray-50'}`}
              onClick={() => handleSelectSlot(slot.id)}
            >
              <div className="font-medium">{slot.date}</div>
              <div>{slot.time}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          {selectedSlots.length === 3 ? (
            <p>Time slots selected. Request will be sent to editor automatically...</p>
          ) : (
            <p>Select 3 preferred time slots ({(3 - selectedSlots.length)} remaining)</p>
          )}
        </div>
      </>
    )}
    
    <div className="mt-6 flex justify-between">
      <button 
        onClick={() => setStep(1)}
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        disabled={waitingForEditor}
      >
        Back
      </button>
    </div>
  </div>
)}
        {/* Step 3: Project Details */}
        {step === 3 && (
          <form onSubmit={handleProjectSubmit}>
            <h3 className="text-xl font-semibold mb-4">Project Details</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Video Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={projectDetails.title}
                onChange={(e) => setProjectDetails({...projectDetails, title: e.target.value})}
                required
                placeholder="e.g., Travel Vlog Editing"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Video Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows="4"
                value={projectDetails.description}
                onChange={(e) => setProjectDetails({...projectDetails, description: e.target.value})}
                required
                placeholder="Describe your video content, editing requirements, etc."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Desired Completion Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={projectDetails.deadline}
                onChange={(e) => setProjectDetails({...projectDetails, deadline: e.target.value})}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                Review Request
              </button>
            </div>
          </form>
        )}

        {/* Step 3.5: Confirmation before sending to editor */}
        {step === 3.5 && (
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Request</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-2">{projectDetails.title}</h4>
              <p className="text-gray-700 mb-4">{projectDetails.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Selected Editor:</p>
                  <p>{selectedEditor.Name}</p>
                </div>
                <div>
                  <p className="font-medium">Desired Completion:</p>
                  <p>{new Date(projectDetails.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="font-medium">Proposed Time Slots:</p>
                <ul className="list-disc pl-5 mt-2">
                  {selectedSlots.map(slotId => {
                    const slot = timeSlots.find(s => s.id === slotId);
                    return (
                      <li key={slotId}>
                        {slot?.date} at {slot?.time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button 
                onClick={handleFinalSubmit}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                Confirm & Send to Editor
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Request Submitted Successfully!</h3>
            <p className="mb-6">The editor has been notified and will respond to your request soon.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg 
            ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
            <button 
              onClick={() => setNotification(null)}
              className="ml-4"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default ClientRequestForm;