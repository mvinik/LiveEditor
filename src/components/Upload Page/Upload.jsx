import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';
import UploadForm from './UploadForm'; // Make sure this path is correct

const Upload = () => {
  const navigate = useNavigate();
  const [films, setFilms] = useState([
    {
      id: 1,
      title: "Midnight Journey",
      description: "A thrilling adventure through city streets at night",
      price: 600,
      thumbnail: "https://plus.unsplash.com/premium_photo-1682125795272-4b81d19ea386?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpbG18ZW58MHx8MHx8fDA%3D",
      duration: "12:45",
      category: "Adventure"
    },
     {
      id: 2,
      title: "Summer Breeze",
      description: "Peaceful moments captured during a countryside summer",
      price: 700,
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbXxlbnwwfHwwfHx8MA%3D%3D",
      duration: "8:22",
      category: "Documentary"
    },
    {
      id: 3,
      title: "Urban Patterns",
      description: "Abstract visuals of city architecture and movement",
      price: 500,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpbG18ZW58MHx8MHx8fDA%3D",
      duration: "5:18",
      category: "Experimental"
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadComplete = (uploadedFiles) => {
    const newFilms = uploadedFiles.map(file => ({
      id: file.id,
      title: file.name.split('.')[0],
      description: "Your newly uploaded short film",
      price: 0.99,
      thumbnail: file.preview,
      duration: "--:--",
      category: "New Upload"
    }));
    
    setFilms([...newFilms, ...films]);
    setShowUploadModal(false);
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative text-white py-20 px-4 bg-center bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZpbG18ZW58MHx8MHx8fDA%3D')`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Showcase Your Short Films</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Upload your creative work and connect with audiences worldwide
            </p>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-md text-lg transition"
            >
              Upload Your Film
            </button>
          </div>
        </div>

        {/* Films Grid */}
       
      {/* Films Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured <span className='text-pink-600'>Short Films</span></h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {films.map(film => (
            <div key={film.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="relative">
                <img 
                  src={film.thumbnail} 
                  alt={film.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {film.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{film.title}</h3>
                  <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                    {film.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{film.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">₹{film.price}</span>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Upload Modal - Only this one should exist */}
        {showUploadModal && (
          <UploadForm 
            onClose={() => setShowUploadModal(false)}
            onUpload={handleUploadComplete}
          />
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Upload;