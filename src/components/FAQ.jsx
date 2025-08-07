import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilm, FaUpload, FaEdit, FaUsers } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What file formats do you accept for upload?",
      answer: "We support all major video formats including MP4, MOV, AVI, and ProRes. For the best quality, we recommend uploading in the original format your camera produces. Maximum file size is 10GB for standard accounts.",
      icon: <FaFilm className="text-pink-500 text-xl" />
    },
    {
      question: "How does the live editing collaboration work?",
      answer: "Once you upload your film, you'll be matched with a professional editor. You'll join a virtual editing room where you can watch the editor work in real-time, provide live feedback via chat or video call, and see changes applied instantly.",
      icon: <FaEdit className="text-pink-500 text-xl" />
    },
    {
      question: "Can I download my original files after editing?",
      answer: "Yes, we store all your original files for 90 days after upload. You can download them anytime from your dashboard. Edited versions are stored indefinitely.",
      icon: <FaUpload className="text-pink-500 text-xl" />
    },
    {
      question: "How do you ensure the quality of your editors?",
      answer: "All editors in our network undergo a rigorous vetting process including portfolio reviews and test projects. We maintain an average editor rating of 4.8+ stars from client feedback.",
      icon: <FaUsers className="text-pink-500 text-xl" />
    },
    {
      question: "What if I'm not satisfied with the edits?",
      answer: "We offer unlimited revisions within 14 days of delivery. If you're still not satisfied, we'll match you with a different editor at no additional cost or provide a full refund.",
      icon: <FaEdit className="text-pink-500 text-xl" />
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Frequently Asked <span className="text-pink-600">Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all"
            >
              <button
                className={`w-full flex items-center justify-between p-6 text-left ${activeIndex === index ? 'bg-gray-50' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center space-x-4">
                  {/* {faq.icon} */}
                  <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                </div>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              
              <div 
                className={`px-6 pb-6 pt-0 transition-all duration-300 ease-in-out ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600 pl-10">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? Our team is ready to help.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;