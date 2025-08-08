// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = "http://localhost:1337/api/editors";

// const EditorDetailsPage = () => {
//   const { documentId } = useParams();
//   const [editor, setEditor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios.get(`${API_URL}/${documentId}`)
//       .then(res => {
//         setEditor(res.data.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load editor details");
//         setLoading(false);
//       });
//   }, [documentId]);

//   if (loading) return <div className="text-center p-10">Loading...</div>;
//   if (error || !editor) return <div className="text-center p-10 text-red-500">{error || "Editor not found"}</div>;

//   const { Name, Email, createdAt } = editor;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
      
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-2 text-gray-800">{Name}</h1>
//         <p className="text-gray-600 mb-1"><strong>Email:</strong> {Email}</p>
//         {/* <p className="text-gray-600 mb-1"><strong>Document ID:</strong> {documentId}</p> */}
//         <p className="text-gray-500 text-sm mt-2">Created At: {new Date(createdAt).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// };

// export default EditorDetailsPage;
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const EditorDetailsPage = () => {
  const editor = {
    name: "Alex Johnson",
    title: "Senior Video Editor & Motion Graphics Specialist",
    hourlyRate: 1500, // ₹ per hour
    profileImage:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    experience: "12+ Years in Professional Video Editing",
    location: "Los Angeles, CA, USA",
    rating: 4.9,
    completedProjects: 320,
    bio: `I’m an award-winning video editor with over a decade of experience in
    crafting cinematic visuals, engaging ads, and compelling storytelling.
    My expertise covers Adobe Premiere Pro, After Effects, DaVinci Resolve,
    and high-end motion graphics. I’ve worked with global brands, filmmakers,
    and content creators to bring their vision to life with precision and
    creativity.`,
    skills: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "Final Cut Pro",
      "Motion Graphics",
      "Color Grading",
      "Sound Design",
      "Storyboarding",
      "Cinematic Transitions",
      "Visual Effects (VFX)",
    ],
    portfolio: [
      {
        title: "Cinematic Short Film",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1682125771198-f7cbed7cb868",
        link: "#",
      },
      {
        title: "Brand Commercial",
        thumbnail:
          "https://www.holidayscalendar.com/wp-content/uploads/2022/01/National-Short-Film-Day-420x210.jpg",
        link: "#",
      },
      {
        title: "Music Video",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsk5V932kqJfyFlcw2kmjphETKAKMRuEG7AMxvV5CRDwGizKeMDAf5qRYu7hjZM5wviyg",
        link: "#",
      },
    ],
    reviews: [
      {
        name: "Samantha Lee",
        comment:
          "Alex is simply the best! The attention to detail and storytelling skills are unmatched.",
        rating: 5,
      },
      {
        name: "David Kim",
        comment:
          "Delivered ahead of schedule with outstanding quality. Will hire again.",
        rating: 5,
      },
      {
        name: "Rachel Adams",
        comment:
          "Professional, creative, and highly skilled in cinematic edits.",
        rating: 4.8,
      },
    ],
    contact: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 987-6543",
      website: "https://alexjohnsonedits.com",
    },
  };

  return (
    <>

    <Navbar/>
    
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-black-50 to-white rounded-2xl shadow-xl">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center border-b pb-8 border-black-200">
        <img
          src={editor.profileImage}
          alt={editor.name}
          className="w-44 h-44 rounded-full object-cover border-4 border-black-200 shadow-md hover:scale-105 transition-transform"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-black-700">{editor.name}</h1>
          <p className="text-lg text-black-500">{editor.title}</p>
          <p className="text-sm text-gray-500">{editor.location}</p>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
            <span className="text-yellow-500 text-lg">⭐ {editor.rating}</span>
            <span className="text-gray-500">{editor.completedProjects} Projects</span>
          </div>
          <p className="mt-3 text-lg font-semibold text-black-600">
            ₹{editor.hourlyRate.toLocaleString()}/hour
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black-700 mb-3">About Me</h2>
        <p className="text-gray-700 leading-relaxed">{editor.bio}</p>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black-700 mb-3">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-3">
          {editor.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-black-50 px-4 py-2 rounded-full text-black-600 text-sm font-medium shadow-sm hover:bg-black-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black-700 mb-4">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {editor.portfolio.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <div className="p-3 text-center font-medium text-black-600">{item.title}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black-700 mb-4">Client Reviews</h2>
        {editor.reviews.map((review, index) => (
          <div
            key={index}
            className="border border-black-200 p-4 rounded-lg shadow-sm mb-4 bg-black-50 hover:bg-black-100 transition"
          >
            <p className="font-semibold text-black-700">{review.name}</p>
            <p className="text-yellow-500">⭐ {review.rating}</p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-8 border-t border-black-200 pt-6">
        <h2 className="text-2xl font-bold text-black-700 mb-3">Contact</h2>
        <p>
          Email:{" "}
          <a href={`mailto:${editor.contact.email}`} className="text-black-600 hover:underline">
            {editor.contact.email}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href={`tel:${editor.contact.phone}`} className="text-black-600 hover:underline">
            {editor.contact.phone}
          </a>
        </p>
        <p>
          Website:{" "}
          <a
            href={editor.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black-600 hover:underline"
          >
            {editor.contact.website}
          </a>
        </p>
      </div>
    </div>
    
    <Footer/>

    </>
  );
};

export default EditorDetailsPage;
