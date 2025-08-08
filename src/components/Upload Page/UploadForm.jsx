import React, { useState, useRef } from 'react';

const UploadForm = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    category: 'narrative',
    contactEmail: '',
    synopsis: ''
  });
  
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile({
        id: Date.now(),
        name: e.target.files[0].name,
        size: (e.target.files[0].size / (1024 * 1024)).toFixed(2) + ' MB',
        preview: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsSubmitting(false);
      if (file) {
        onUpload([file]); // Pass the uploaded file to the parent
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Film Submission Form</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Film Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                
                   <div>
                <label className="block text-gray-700 mb-1 font-medium">Director*</label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Director's name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Year Completed*</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="2020"
                  max="2024"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="2023"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="narrative">Narrative Short</option>
                  <option value="documentary">Documentary</option>
                  <option value="experimental">Experimental</option>
                  <option value="animation">Animation</option>
                  <option value="student">Student Film</option>
                </select>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Contact Email*</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your@email.com"
                />
              </div>
              
              
              {/* Right Column */}
          
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Film File*</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    required
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full p-3 border border-gray-300 rounded-md text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    {file ? (
                      <>
                        <span className="text-gray-800 truncate pr-2">{file.name}</span>
                        <span className="text-pink-600 text-sm bg-pink-100 px-2 py-1 rounded">{file.size}</span>
                      </>
                    ) : (
                      'Select video file...'
                    )}
                  </button>
                </div>
                
                <div>
                <label className="block text-gray-700 mb-1 font-medium">Synopsis*</label>
                <textarea
                  name="synopsis"
                  value={formData.synopsis}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tell us about your film..."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Terms and Submit */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 mr-2 border-gray-300 text-pink-600 focus:ring-pink-500 rounded"
              />
              <label htmlFor="terms" className="text-gray-700">
                I confirm that I have all necessary rights to submit this film and agree to the festival's 
                <a href="#" className="text-pink-600 hover:underline"> terms and conditions</a>.
              </label>
            </div>
          
            </div>
            
            <div className="flex justify-end space-x-3 border-t pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded ${
                  isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Film'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
