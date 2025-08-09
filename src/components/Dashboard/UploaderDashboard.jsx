import React, { useState } from "react";
import { 
  Upload, 
  DollarSign, 
  Eye, 
  Video,
  Home,
  User,
  Bell,
  LogOut,
  ChevronDown,
  Edit,
  CheckCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploaderDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' or 'editRequests'
const navigate=useNavigate()
  // Sample static data
  const videos = [
    {
      id: 1,
      title: "My First Short Film",
      thumbnail: "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg",
      views: 1200,
      earnings: 2500,
      status: "Published",
    },
    {
      id: 2,
      title: "Behind The Scenes",
      thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg",
      views: 800,
      earnings: 1500,
      status: "Pending Review",
    },
    {
      id: 3,
      title: "Teaser Trailer",
      thumbnail: "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg",
      views: 500,
      earnings: 800,
      status: "Draft",
    },
  ];

  const editRequests = [
    {
      id: 1,
      videoId: 2,
      title: "Behind The Scenes",
      thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg",
      editor: "Ananya Verma",
      status: "In Progress",
      dateSent: "2023-05-15",
      deadline: "2023-05-25",
      progress: 65,
    },
    {
      id: 2,
      videoId: 3,
      title: "Teaser Trailer",
      thumbnail: "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg",
      editor: "Rahul Patel",
      status: "Completed",
      dateSent: "2023-05-10",
      dateCompleted: "2023-05-18",
    },
    {
      id: 3,
      videoId: 1,
      title: "My First Short Film",
      thumbnail: "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg",
      editor: "Priya Sharma",
      status: "Pending",
      dateSent: "2023-05-20",
    }
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Dashboard Header with Compact Menu */}
      <header className="bg-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Uploader Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-pink-700"
            >
              <Bell className="text-xl" />
              <span className="absolute top-0 right-0 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                3
              </span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2 bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-700 font-bold">
                  U
                </div>
                <span>Uploader</span>
                <ChevronDown />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <a href="/" className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100">
                    <Home className="mr-3 text-pink-600" size={16} />
                    Home
                  </a>
                  <a href="/upload" className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100">
                    <Upload className="mr-3 text-pink-600" size={16} />
                    Upload
                  </a>
                  <a href="/uploader-dashboard" className="flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100">
                    <User className="mr-3 text-pink-600" size={16} />
                    Uploader Dashboard
                  </a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-gray-800 hover:bg-pink-100">
                    <LogOut className="mr-3 text-pink-600" size={16} />
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
              Editor has completed "Teaser Trailer"
            </div>
            <div className="p-2 hover:bg-pink-50 rounded cursor-pointer">
              New message from editor
            </div>
            <div className="p-2 hover:bg-pink-50 rounded cursor-pointer">
              "Behind The Scenes" is 65% complete
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <Eye className="text-pink-600" size={32} />
              <div>
                <h2 className="text-xl font-semibold">Total Views</h2>
                <p className="text-pink-500 font-bold text-lg">2,500</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <DollarSign className="text-pink-600" size={32} />
              <div>
                <h2 className="text-xl font-semibold">Total Earnings</h2>
                <p className="text-pink-500 font-bold text-lg">₹4,800</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <Video className="text-pink-600" size={32} />
              <div>
                <h2 className="text-xl font-semibold">Videos Uploaded</h2>
                <p className="text-pink-500 font-bold text-lg">{videos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-4 font-medium ${activeTab === 'videos' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
          >
            My Videos
          </button>
          <button
            onClick={() => setActiveTab('editRequests')}
            className={`py-2 px-4 font-medium ${activeTab === 'editRequests' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
          >
            Edit Requests ({editRequests.length})
          </button>
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Uploaded <span className="text-pink-700">Videos</span></h2>
              <button onClick={()=>navigate('/upload')}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition">
                <Upload size={18} />
                Upload New Video
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <p className={`text-sm ${
                      video.status === "Published" ? "text-green-600" :
                      video.status === "Pending Review" ? "text-yellow-600" :
                      "text-gray-500"
                    }`}>
                      Status: {video.status}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-pink-600 flex items-center gap-1">
                        <Eye size={14} /> {video.views}
                      </span>
                      <span className="text-sm text-pink-600 flex items-center gap-1">
                         ₹{video.earnings}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Requests Tab */}
        {activeTab === 'editRequests' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Edit <span className="text-pink-700">Requests</span></h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Video</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Editor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {editRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-pink-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-16">
                            <img className="h-10 w-16 object-cover rounded" src={request.thumbnail} alt={request.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.title}</div>
                            <div className="text-sm text-gray-500">Sent: {request.dateSent}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.editor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === "Completed" ? "bg-green-100 text-green-800" :
                          request.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.status === "In Progress" ? (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-pink-600 h-2.5 rounded-full" 
                              style={{ width: `${request.progress}%` }}
                            ></div>
                            <span className="text-xs text-gray-500">{request.progress}%</span>
                          </div>
                        ) : request.status === "Completed" ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-1" size={16} />
                            <span>Completed on {request.dateCompleted}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <Clock className="mr-1" size={16} />
                            <span>Waiting for editor</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.deadline || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-pink-600 hover:text-pink-900 mr-3">
                          <Edit size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-pink-600 text-white py-4 text-center mt-10">
        © 2025 VideoEditPro — All Rights Reserved
      </footer>
    </div>
  );
};

export default UploaderDashboard;