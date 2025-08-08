import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import Navbar from '../Navbar';
import Footer from '../Footer';

const ClientRequestForm = () => {
  const [step, setStep] = useState(1);
  const [selectedEditor, setSelectedEditor] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  // Mock data for demonstration
  const editors = [
    { id: 1, name: 'John Doe', email: 'john@example.com', specialization: 'Travel Vlogs' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', specialization: 'Music Videos' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', specialization: 'Corporate Videos' }
  ];

  // Generate time slots for the next 7 days
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    
    // Generate for next 7 days from today
    for (let day = 0; day < 7; day++) {
      const date = addDays(today, day);
      
      // Generate 2-hour slots from 8 AM to 8 PM
      for (let hour = 8; hour <= 20; hour += 2) {
        const startTime = setMinutes(setHours(date, hour), 0);
        const endTime = setMinutes(setHours(date, hour + 2), 0);
        
        slots.push({
          id: `${format(date, 'yyyy-MM-dd')}-${hour}-${hour+2}`,
          date: format(date, 'EEE, MMM d'),
          time: `${hour}:00 - ${hour+2}:00`,
          start: startTime,
          end: endTime,
          dateObj: date
        });
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSelectSlot = (slotId) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <>
      <Navbar/>
      
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Vertical Steps Navigation - Left Side */}
        <div className="w-full md:w-64 bg-gray-50 p-6 border-r">
          <h2 className="text-xl font-bold mb-6">Request Steps</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`flex items-center cursor-pointer ${step >= stepNumber ? 'text-pink-600' : 'text-gray-500'}`}
                onClick={() => step >= stepNumber && setStep(stepNumber)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step >= stepNumber ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
                  {stepNumber}
                </div>
                <span>
                  {['Choose Editor', 'Select Times', 'Project Details', 'Confirmation'][stepNumber-1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content - Right Side */}
        <div className="flex-1 p-6">
          {/* Step 1: Editor Selection */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Select an Editor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editors.map(editor => (
                  <div 
                    key={editor.id}
                    className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => {
                      setSelectedEditor(editor);
                      setStep(2);
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        {editor.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium">{editor.name}</h4>
                        <p className="text-sm text-gray-600">{editor.specialization}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{editor.email}</p>
                  
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time Slot Selection */}
          {step === 2 && selectedEditor && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">Select Time Slots</h2>
              <p className="mb-6">For editor: {selectedEditor.name}</p>
              
              {/* Calendar Date Picker */}
              <div className="mb-4">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {format(selectedDate, 'MMMM d, yyyy')} ▼
                </button>
                
                {showCalendar && (
                  <div className="mt-2">
                    <Calendar
                      date={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      minDate={new Date()}
                      maxDate={addDays(new Date(), 6)}
                    />
                  </div>
                )}
              </div>
              
              {/* Time Slots for Selected Date */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots
                    .filter(slot => isSameDay(slot.dateObj, selectedDate))
                    .map(slot => (
                      <div 
                        key={slot.id}
                        className={`border rounded-lg p-3 cursor-pointer transition 
                          ${selectedSlots.includes(slot.id) ? 'bg-pink-100 border-pink-500' : 'hover:bg-gray-50'}`}
                        onClick={() => handleSelectSlot(slot.id)}
                      >
                        <div className="font-medium">{slot.time}</div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Selected Slots Preview */}
              {selectedSlots.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Selected Time Slots:</h4>
                  <ul className="list-disc pl-5">
                    {selectedSlots.map(slotId => {
                      const slot = timeSlots.find(s => s.id === slotId);
                      return (
                        <li key={slotId}>
                          {slot?.date} - {slot?.time}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={selectedSlots.length !== 3}
                  className={`px-4 py-2 rounded-md 
                    ${selectedSlots.length === 3 ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <form onSubmit={handleProjectSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Project Title</label>
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
                  <label className="block text-gray-700 mb-2">Description</label>
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
                  <label className="block text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={projectDetails.deadline}
                    onChange={(e) => setProjectDetails({...projectDetails, deadline: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="flex justify-between">
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
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto text-center py-8">
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
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default ClientRequestForm;