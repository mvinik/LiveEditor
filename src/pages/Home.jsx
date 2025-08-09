import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilmSlider from "../components/FilmSlider";
import { motion } from "framer-motion";

import { 
  FaUpload, 
  FaFilm, 
  FaEdit, 
  FaUsers, 
  FaPlayCircle,
  FaCloudUploadAlt,
  FaStar,
  FaGlobe
} from "react-icons/fa";
import FAQSection from "../components/FAQ";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="m-20 flex items-center justify-center px-4 " >
        <div className="max-w-6xl mx-auto text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            <span className="text-pink-600">Showcase</span> Your Films <br />
            <span className="text-pink-600">Perfect</span> Them With Experts
          </h1>
          <p className="text-xl md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            The complete platform for uploading, editing, and distributing your films with professional collaboration tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/upload")}
              className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2"
            >
              <FaCloudUploadAlt /> Upload Your Film
            </button>
            <button
              onClick={() => navigate("/edit-request")}
              className="bg-transparent border-2 border-gray-500 hover:bg-gray-600 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2"
            >
              <FaEdit /> Request Editing
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Built for <span className="text-pink-600">Filmmakers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaFilm className="text-4xl mb-4 text-pink-600" />}
              title="Cinematic Uploads"
              description="4K, HDR, and RAW support with no compression. Perfect for festival submissions."
            />
            <FeatureCard 
              icon={<FaEdit className="text-4xl mb-4 text-pink-600" />}
              title="Professional Editing"
              description="Collaborate with award-winning editors in real-time."
            />
            <FeatureCard 
              icon={<FaGlobe className="text-4xl mb-4 text-pink-600" />}
              title="Global Distribution"
              description="One-click submissions to festivals and platforms."
            />
          </div>
        </div>
      </section>

      {/* Upload Benefits Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Why Upload <span className="text-pink-600">With Us</span>
          </h2>
          <div className="space-y-12">
            <UploadBenefit
              icon={<FaCloudUploadAlt className="text-2xl" />}
              title="Secure Storage"
              description="Military-grade encryption for your raw footage and final cuts."
            />
            <UploadBenefit
              icon={<FaStar className="text-2xl" />}
              title="Festival Ready"
              description="Automatic format conversion for 100+ film festivals."
            />
            <UploadBenefit
              icon={<FaUsers className="text-2xl" />}
              title="Collaborative Workspace"
              description="Share projects with your entire crew securely."
            />
          </div>
        </div>
      </section>


<FilmSlider/>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800  text-white  px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold  text-center mb-16">
            Trusted by <span className="text-pink-600">Filmmakers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              quote="The quality preservation when uploading our feature film was exceptional."
              author="Lisa T., Independent Filmmaker"
            />
            <Testimonial
              quote="Saved us weeks of work by connecting us with the perfect editor for our documentary."
              author="Carlos M., Documentary Director"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
   
<FAQSection/>
      <Footer/>
    </>
  );
};

// Reusable Components
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all border border-gray-100">
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const UploadBenefit = ({ icon, title, description }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
    <div className="text-xl italic mb-4">"{quote}"</div>
    <div className="font-medium text-pink-600">{author}</div>
  </div>
);

export default Home;