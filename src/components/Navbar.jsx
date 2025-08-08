// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import EditorRegister from "./Login/EditorRegister";
// import { FaUser, FaEdit, FaHome, FaUpload, FaSignOutAlt, FaTimes, FaUserEdit, FaVideo, FaBars } from "react-icons/fa";
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import UploaderRegister from "./Login/UploaderRegister";
// import axios from "axios";
// import Notifications from "../pages/Notification";

// const API_URL = import.meta.env.VITE_API_URL;

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userRole, setUserRole] = useState(null);
//     const [showEditorRegister, setShowEditorRegister] = useState(false);
//     const [showUploaderRegister, setShowUploaderRegister] = useState(false);
//     const [showNotification, setShowNotification] = useState(false);
//     const [initial, setInitial] = useState("");
//     const [userId, setUserId] = useState("");
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem("JwtToken");
//             const userId = localStorage.getItem("UserId");
//             const documentId = localStorage.getItem("documentID");

//             if (token && documentId) {
//                 try {
//                     const response = await axios.get(
//                         `${API_URL}/api/users/${documentId}?populate[editor]=*&populate[client]=*&populate[role]=*`,
//                         {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`
//                             }
//                         }
//                     );
//                     setUserId(documentId);
//                     setInitial(response.data?.username?.charAt(0).toUpperCase() || "");
                    
//                     if (response.data?.editor) {
//                         setUserRole('Editor');
//                     } else if (response.data?.film) {
//                         setUserRole('Uploader');
//                     } else {
//                         setUserRole(null);
//                     }

//                     setIsLoggedIn(true);
//                 } catch (error) {
//                     console.error("Error fetching user data:", error);
//                     handleLogout();
//                 }
//             }
//         };

//         fetchUserData();
//     }, []);

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     };

//     const handleUploaderRegisterClick = (e) => {
//         e.preventDefault();
//         setShowUploaderRegister(true);
//         setMobileMenuOpen(false);
//     };

//     const closeUploaderRegister = () => {
//         setShowUploaderRegister(false);
//     };

//     const handleEditorRegisterClick = (e) => {
//         e.preventDefault();
//         setShowEditorRegister(true);
//         setMobileMenuOpen(false);
//     };

//     const closeEditorRegister = () => {
//         setShowEditorRegister(false);
//     };

//     const handleNotificationClick = (e) => {
//         e.preventDefault();
//         setShowNotification(true);
//         setMobileMenuOpen(false);
//     };

//     const closeNotification = () => {
//         setShowNotification(false);
//     };

//     const handleRegistrationSuccess = (role) => {
//         setUserRole(role);
//         setTimeout(() => {
//             closeEditorRegister();
//             closeUploaderRegister();
//             navigate(role === 'Editor' ? '/editor-dashboard' : '/uploader-dashboard');
//             window.location.reload();
//         }, 2000);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('User');
//         localStorage.removeItem('UserId');
//         localStorage.removeItem('JwtToken');
//         localStorage.removeItem('documentID');
//         localStorage.removeItem('EmailId');
//         setIsLoggedIn(false);
//         setUserRole(null);
//         navigate('/');
//     };

//     const user = localStorage.getItem("User");

//     return (
//         <>
//             <div className="flex flex-row h-20 justify-between items-center bg-gradient-to-r from-pink-900 to-gray-500">
//                 <div className="flex px-3 justify-center items-center">
//                     <a className='p-2 text-2xl font-bold text-white' href="/">FilmCraft</a>
//                 </div>

//                 {/* Desktop Navigation */}
//                 <div className="hidden md:flex gap-x-3 px-3 items-center">
//                     {user ? (
//                         <>
//                             <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/">
//                                 Home
//                             </a>
//                             <a className='p-2 text-white hover:bg-pink-600 rounded-md' href="/upload">Upload</a>

//                             {userRole === 'Uploader' && (
//                                 <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/uploader-dashboard">
//                                     UDashboard
//                                 </a>
//                             )}

//                             {userRole === 'Editor' && (
//                                 <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/editor-dashboard">
//                                     EDashboard
//                                 </a>
//                             )}

//                             {!userRole && (
//                                 <>
//                                     <button
//                                         onClick={handleEditorRegisterClick}
//                                         className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
//                                     >
//                                         Register Editor
//                                     </button>
//                                     <button
//                                         onClick={handleUploaderRegisterClick}
//                                         className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
//                                     >
//                                         Register Uploader
//                                     </button>
//                                 </>
//                             )}

//                             <button
//                                 onClick={handleNotificationClick}
//                                 className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
//                             >
//                                 <NotificationsIcon />
//                             </button>

//                             <div className="relative group">
//                                 <button
//                                     className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-700 font-bold"
//                                 >
//                                     {initial}
//                                 </button>
//                                 <div className="profile-dropdown absolute right-0 mt-1 w-20 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
//                                     <button
//                                         onClick={handleLogout}
//                                         className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center"
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <a className='p-2 flex items-center' href="/">
//                                 Home
//                             </a>
//                             <a className="p-2 px-4 flex items-center bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition" href="/login">
//                                 Log in
//                             </a>
//                         </>
//                     )}
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="md:hidden flex items-center px-4">
//                     <button 
//                         onClick={toggleMobileMenu}
//                         className="text-white focus:outline-none"
//                     >
//                         <FaBars size={24} />
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//                 <div className="md:hidden bg-gradient-to-b from-pink-800 to-gray-600 w-full absolute z-40">
//                     <div className="flex flex-col px-4 py-2 space-y-2">
//                         {user ? (
//                             <>
//                                 <a 
//                                     className='p-2 text-white hover:bg-pink-700 rounded-md' 
//                                     href="/"
//                                     onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                     Home
//                                 </a>
//                                 <a 
//                                     className='p-2 text-white hover:bg-pink-700 rounded-md' 
//                                     href="/upload"
//                                     onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                     Upload
//                                 </a>

//                                 {userRole === 'Uploader' && (
//                                     <a 
//                                         className='p-2 text-white hover:bg-pink-700 rounded-md' 
//                                         href="/uploader-dashboard"
//                                         onClick={() => setMobileMenuOpen(false)}
//                                     >
//                                         Uploader Dashboard
//                                     </a>
//                                 )}

//                                 {userRole === 'Editor' && (
//                                     <a 
//                                         className='p-2 text-white hover:bg-pink-700 rounded-md' 
//                                         href="/editor-dashboard"
//                                         onClick={() => setMobileMenuOpen(false)}
//                                     >
//                                         Editor Dashboard
//                                     </a>
//                                 )}

//                                 {!userRole && (
//                                     <>
//                                         <button
//                                             onClick={handleEditorRegisterClick}
//                                             className="p-2 text-left text-white hover:bg-pink-700 rounded-md"
//                                         >
//                                             Register Editor
//                                         </button>
//                                         <button
//                                             onClick={handleUploaderRegisterClick}
//                                             className="p-2 text-left text-white hover:bg-pink-700 rounded-md"
//                                         >
//                                             Register Uploader
//                                         </button>
//                                     </>
//                                 )}

//                                 <button
//                                     onClick={handleNotificationClick}
//                                     className="p-2 text-left text-white hover:bg-pink-700 rounded-md flex items-center"
//                                 >
//                                     <NotificationsIcon className="mr-2" /> Notifications
//                                 </button>

//                                 <button
//                                     onClick={handleLogout}
//                                     className="p-2 text-left text-white hover:bg-pink-700 rounded-md flex items-center"
//                                 >
//                                     <FaSignOutAlt className="mr-2" /> Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <a 
//                                     className='p-2 text-white hover:bg-pink-700 rounded-md' 
//                                     href="/"
//                                     onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                     Home
//                                 </a>
//                                 <a 
//                                     className="p-2 text-white hover:bg-pink-700 rounded-md" 
//                                     href="/login"
//                                     onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                     Log in
//                                 </a>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Registration Modals */}
//             {showEditorRegister && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
//                         <button onClick={closeEditorRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//                             <FaTimes />
//                         </button>
//                         <EditorRegister
//                             onSuccess={() => handleRegistrationSuccess('Editor')}
//                             onCancel={closeEditorRegister}
//                         />
//                     </div>
//                 </div>
//             )}

//             {showUploaderRegister && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
//                         <button onClick={closeUploaderRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//                             <FaTimes />
//                         </button>
//                         <UploaderRegister
//                             onSuccess={() => handleRegistrationSuccess('Uploader')}
//                             onCancel={closeUploaderRegister}
//                         />
//                     </div>
//                 </div>
//             )}

//             {showNotification && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-top justify-end z-50 p-5">
//                     <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
//                         <button onClick={closeNotification} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//                             <FaTimes />
//                         </button>
//                         <Notifications onCancel={closeNotification} />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Navbar;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaHome, FaUpload, FaSignOutAlt, FaTimes, FaUserEdit, FaVideo, FaBars } from "react-icons/fa";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
    const [userRole, setUserRole] = useState('Uploader'); // 'Editor' or 'Uploader'
    const [showEditorRegister, setShowEditorRegister] = useState(false);
    const [showUploaderRegister, setShowUploaderRegister] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [initial, setInitial] = useState("U"); // First letter of username
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mock data - remove in your actual implementation
    const mockUser = {
        username: "UploaderDemo",
        role: "Uploader",
        initial: "U"
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleUploaderRegisterClick = (e) => {
        e.preventDefault();
        setShowUploaderRegister(true);
        setMobileMenuOpen(false);
    };

    const closeUploaderRegister = () => {
        setShowUploaderRegister(false);
    };

    const handleEditorRegisterClick = (e) => {
        e.preventDefault();
        setShowEditorRegister(true);
        setMobileMenuOpen(false);
    };

    const closeEditorRegister = () => {
        setShowEditorRegister(false);
    };

    const handleNotificationClick = (e) => {
        e.preventDefault();
        setShowNotification(true);
        setMobileMenuOpen(false);
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    const handleRegistrationSuccess = (role) => {
        setUserRole(role);
        setTimeout(() => {
            closeEditorRegister();
            closeUploaderRegister();
            navigate(role === 'Editor' ? '/editor-dashboard' : '/uploader-dashboard');
            window.location.reload();
        }, 2000);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-row h-20 justify-between items-center bg-gradient-to-r from-pink-900 to-gray-500">
                <div className="flex px-3 justify-center items-center">
                    <a className='p-2 text-2xl font-bold text-white' href="/">FilmCraft</a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-x-3 px-3 items-center">
                    {isLoggedIn ? (
                        <>
                            <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/">
                                Home
                            </a>
                            <a className='p-2 text-white hover:bg-pink-600 rounded-md' href="/upload">Upload</a>

                            {userRole === 'Uploader' && (
                                <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/uploader-dashboard">
                                    UDashboard
                                </a>
                            )}

                            {userRole === 'Editor' && (
                                <a className='p-2 flex items-center text-white hover:bg-pink-600 rounded-md' href="/editor-dashboard">
                                    EDashboard
                                </a>
                            )}

                            {!userRole && (
                                <>
                                    <button
                                        onClick={handleEditorRegisterClick}
                                        className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
                                    >
                                        Register Editor
                                    </button>
                                    <button
                                        onClick={handleUploaderRegisterClick}
                                        className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
                                    >
                                        Register Uploader
                                    </button>
                                </>
                            )}

                            <button
                                onClick={handleNotificationClick}
                                className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
                            >
                                <NotificationsIcon />
                            </button>

                            <div className="relative group">
                                <button
                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-700 font-bold"
                                >
                                    {mockUser.initial}
                                </button>
                                <div className="profile-dropdown absolute right-0 mt-1 w-20 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <a className='p-2 flex items-center' href="/">
                                Home
                            </a>
                            <a className="p-2 px-4 flex items-center bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition" href="/login">
                                Log in
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center px-4">
                    <button 
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-b from-pink-800 to-gray-600 w-full absolute z-40">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        {isLoggedIn ? (
                            <>
                                <a 
                                    className='p-2 text-white hover:bg-pink-700 rounded-md' 
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </a>
                                <a 
                                    className='p-2 text-white hover:bg-pink-700 rounded-md' 
                                    href="/upload"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Upload
                                </a>

                                {userRole === 'Uploader' && (
                                    <a 
                                        className='p-2 text-white hover:bg-pink-700 rounded-md' 
                                        href="/uploader-dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Uploader Dashboard
                                    </a>
                                )}

                                {userRole === 'Editor' && (
                                    <a 
                                        className='p-2 text-white hover:bg-pink-700 rounded-md' 
                                        href="/editor-dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Editor Dashboard
                                    </a>
                                )}

                                {!userRole && (
                                    <>
                                        <button
                                            onClick={handleEditorRegisterClick}
                                            className="p-2 text-left text-white hover:bg-pink-700 rounded-md"
                                        >
                                            Register Editor
                                        </button>
                                        <button
                                            onClick={handleUploaderRegisterClick}
                                            className="p-2 text-left text-white hover:bg-pink-700 rounded-md"
                                        >
                                            Register Uploader
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={handleNotificationClick}
                                    className="p-2 text-left text-white hover:bg-pink-700 rounded-md flex items-center"
                                >
                                    <NotificationsIcon className="mr-2" /> Notifications
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-left text-white hover:bg-pink-700 rounded-md flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a 
                                    className='p-2 text-white hover:bg-pink-700 rounded-md' 
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </a>
                                <a 
                                    className="p-2 text-white hover:bg-pink-700 rounded-md" 
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Editor Registration Modal - Static Version */}
            {showEditorRegister && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeEditorRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-center mb-4">Editor Registration</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
                                        <option>Video Editing</option>
                                        <option>Color Grading</option>
                                        <option>Motion Graphics</option>
                                    </select>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRegistrationSuccess('Editor')}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        Register as Editor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Uploader Registration Modal - Static Version */}
            {showUploaderRegister && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeUploaderRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-center mb-4">Uploader Registration</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Organization (optional)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRegistrationSuccess('Uploader')}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        Register as Uploader
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Modal - Static Version */}
            {showNotification && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-top justify-end z-50 p-5">
                    <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeNotification} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4">Notifications</h3>
                            <div className="space-y-3">
                                <div className="p-3 border-b">
                                    <p className="font-medium">New editing request</p>
                                    <p className="text-sm text-gray-600">You have a new video to edit</p>
                                    <p className="text-xs text-gray-400">2 hours ago</p>
                                </div>
                                <div className="p-3 border-b">
                                    <p className="font-medium">Payment received</p>
                                    <p className="text-sm text-gray-600">Your payment of $50 has been processed</p>
                                    <p className="text-xs text-gray-400">1 day ago</p>
                                </div>
                                <div className="p-3 border-b">
                                    <p className="font-medium">System update</p>
                                    <p className="text-sm text-gray-600">New features available in dashboard</p>
                                    <p className="text-xs text-gray-400">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;