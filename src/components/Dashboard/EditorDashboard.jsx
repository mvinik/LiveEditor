import React, { useState } from "react";
import { 
  FaVideo, 
  FaMoneyBillWave, 
  FaClipboardList,
  FaHome,
  FaUpload,
  FaUser,
  FaSignOutAlt,
  FaCaretDown,
  FaBell
} from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

const EditorDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    // Your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Dashboard Header with Compact Menu */}
      <header className="bg-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Editor Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-pink-700"
            >
              <FaBell className="text-xl" />
              <span className="absolute top-0 right-0 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2 bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-700 font-bold">
                  A
                </div>
                <span>Andro</span>
                <FaCaretDown />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <a 
                    href="/" 
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    <FaHome className="mr-3 text-pink-600" />
                    Home
                  </a>
                  <a 
                    href="/upload" 
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    <FaUpload className="mr-3 text-pink-600" />
                    Upload
                  </a>
                  <a 
                    href="/editor-dashboard" 
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    <FaUser className="mr-3 text-pink-600" />
                    Editor Dashboard
                  </a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    <FaSignOutAlt className="mr-3 text-pink-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 bg-white rounded-md shadow-lg w-72 z-50 p-4">
          <h3 className="font-bold text-lg mb-2">Notifications</h3>
          <div className="space-y-2">
            <div className="p-2 hover:bg-pink-50 rounded cursor-pointer">
              New project assigned - Wedding Highlights
            </div>
            <div className="p-2 hover:bg-pink-50 rounded cursor-pointer">
              Client message received
            </div>
            <div className="p-2 hover:bg-pink-50 rounded cursor-pointer">
              Payment received for Corporate Ad
            </div>
          </div>
        </div>
      )}

      {/* Rest of your dashboard content */}
      <div className="max-w-7xl mx-auto p-6">
     
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaVideo className="text-pink-600 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">Uploaded Videos</h2>
          <p className="font-bold text-lg">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaMoneyBillWave className="text-pink-600 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className=" font-bold text-lg">₹4,500</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaClipboardList className="text-pink-600 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">Active Projects</h2>
          <p className=" font-bold text-lg">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <MdNotificationsActive className="text-pink-600 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">New Requests</h2>
          <p className=" font-bold text-lg">3</p>
        </div>
      </section>

      {/* Projects List */}
      <section className="bg-white rounded-2xl shadow overflow-hidden mb-8">
        <h2 className="text-2xl font-bold  mb-4">Recent<span className="text-pink-700"> Projects</span></h2>
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Project</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Deadline</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-pink-50">
                <td className="px-6 py-4">Wedding Highlights</td>
                <td className="px-6 py-4">Aarav Sharma</td>
                <td className="px-6 py-4">12 Aug 2025</td>
                <td className="px-6 py-4 text-green-600 font-medium">In Progress</td>
              </tr>
              <tr className="border-t hover:bg-pink-50">
                <td className="px-6 py-4">Corporate Ad</td>
                <td className="px-6 py-4">TechSphere Ltd</td>
                <td className="px-6 py-4">18 Aug 2025</td>
                <td className="px-6 py-4 text-yellow-600 font-medium">Pending</td>
              </tr>
              <tr className="border-t hover:bg-pink-50">
                <td className="px-6 py-4">Music Video</td>
                <td className="px-6 py-4">Priya Mehta</td>
                <td className="px-6 py-4">25 Aug 2025</td>
                <td className="px-6 py-4 text-green-600 font-medium">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Profile */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold  mb-4">Editor <span className="text-pink-700">Profile</span></h2>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?_gl=1*1bi32ph*_ga*ODI4MDA4NTAuMTc1Mzc4ODAyMw..*_ga_8JE65Q40S6*czE3NTQ2MzM2MTAkbzMkZzEkdDE3NTQ2MzM2NzUkajU5JGwwJGgw"
            alt="Editor"
            className="w-28 h-28 rounded-full "
          />
          <div>
            <h3 className="text-xl font-bold">Andro</h3>
            <p className="text-gray-600">Professional Video Editor | 5+ Years Experience</p>
            <p className="mt-2">
              <strong>Email:</strong> ananya@example.com
            </p>
            <p>
              <strong>Skills:</strong> Adobe Premiere, After Effects, DaVinci Resolve
            </p>
          </div>
        </div>
      </section>
      </div>

      <footer className="bg-pink-600 text-white py-4 text-center mt-10">
        © 2025 VideoEditPro — All Rights Reserved
      </footer>
    </div>
  );
};

export default EditorDashboard;