import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

const FilmSlider = () => {
  // Sample film data
  const films = [
    {
      id: 1,
      title: "The Last Sunset",
      genre: "Drama",
      duration: "22 min",
      thumbnail: "https://images.unsplash.com/photo-1601213384658-497dd438210a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Neon Dreams",
      genre: "Sci-Fi",
      duration: "15 min",
      thumbnail: "https://images.unsplash.com/photo-1718047603387-75bc39280f09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Urban Echoes",
      genre: "Documentary",
      duration: "42 min",
      thumbnail: "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Silent Waves",
      genre: "Experimental",
      duration: "18 min",
      thumbnail: "https://images.unsplash.com/photo-1724599048361-7fcb6f62f806?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Golden Hour",
      genre: "Romance",
      duration: "30 min",
      thumbnail: "https://images.unsplash.com/photo-1629591730429-335b6cd3aa54?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === films.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? films.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Featured <span className="text-pink-600">Films</span>
        </h2>
        
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider container */}
          <div 
            ref={sliderRef}
            className="relative h-96 overflow-hidden rounded-xl shadow-lg"
          >
            {/* Slides */}
            {films.map((film, index) => (
              <div
                key={film.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{film.title}</h3>
                      <div className="flex gap-4 text-sm">
                        <span>{film.genre}</span>
                        <span>{film.duration}</span>
                      </div>
                      <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all">
                        <FaPlay /> Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {films.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-pink-500 w-6' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="text-center mt-8">
          <button className="text-pink-600 hover:text-pink-800 font-medium flex items-center justify-center gap-2 mx-auto">
            View All Films <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilmSlider;