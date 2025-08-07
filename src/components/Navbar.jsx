// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import EditorRegister from "./Login/EditorRegister";
// import { FaUser, FaEdit, FaHome, FaUpload, FaSignOutAlt, FaTimes } from "react-icons/fa";
// import UploaderRegister from "./Login/UploaderRegister";
// const API_URL = import.meta.env.VITE_API_URL;
// const USERID = localStorage.getItem('UserId');

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("JwtToken"));
//     const [showEditorRegister, setShowEditorRegister] = useState(false);
//     const [showUploaderRegister,setShowUploaderRegister]=useState(false);

//       const handleUploaderRegisterClick = (e) => {
//         e.preventDefault();
//         setShowUploaderRegister(true);
//     };

//     const closeUploaderRegister = () => {
//         setShowUploaderRegister(false);
//     };



//     const handleEditorRegisterClick = (e) => {
//         e.preventDefault();
//         setShowEditorRegister(true);
//     };

//     const closeEditorRegister = () => {
//         setShowEditorRegister(false);
//     };

//     const handleRegistrationSuccess = () => {
//       setTimeout(()=>{
//           closeEditorRegister();
//          closeUploaderRegister();
//       },2000)

//     };

//     const user = localStorage.getItem("User");
//     const username = localStorage.getItem("UserName");
//     const jwt = localStorage.getItem("JwtToken");

//     const handleLogout = () => {
//         localStorage.removeItem('User');
//         localStorage.removeItem('UserId');
//         localStorage.removeItem('JwtToken');
//         localStorage.removeItem('EmailId');
//         setIsLoggedIn(false);
//         navigate('/');
//     };

//     return (
//         <>
//             <div className="flex flex-row h-20 justify-between items-center bg-gradient-to-r from-pink-900 to-gray-500">
//                 <div className="flex px-3 justify-center items-center">
//                     <a className='p-2 text-2xl font-bold text-white' href="/">FilmCraft</a>
//                 </div>

//                 <div className="flex gap-x-3 px-3">
//                     {user ? (
//                         <>
//                             <a className='p-2' href="/">Home</a>
//                             <a className='p-2' href="/upload">Upload</a>
//                             <button
//                                 onClick={handleEditorRegisterClick}
//                                 className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
//                             >
//                                 Editor Register
//                             </button>
//                             <button
//                                 onClick={handleUploaderRegisterClick}
//                                 className="p-2 px-4 flex items-center bg-pink-700 text-white rounded-md hover:bg-pink-800 transition"
//                             >
//                                Uploader Register
//                             </button>
//                             <button
//                                 onClick={handleLogout}
//                                 className="p-2 px-4 flex items-center bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
//                             >
//                                 <FaSignOutAlt className="mr-1" /> Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <a className='p-2' href="/">Home</a>
//                             <a className='p-2' href="/upload">Upload</a>
//                             <a className="p-2 px-4 flex items-center bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition" href="/login">
//                                 Log in
//                             </a>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Editor Register Overlay - Moved outside the main navbar div */}
//             {showEditorRegister && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60  flex items-center justify-center z-50">
//                  <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md  relative max-h-[90vh] overflow-y-auto">
//                         <button 
//                             onClick={closeEditorRegister}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                         >
//                             <FaTimes />
//                         </button>

//                         <EditorRegister 
//                             onSuccess={handleRegistrationSuccess} 
//                             onCancel={closeEditorRegister}
//                         />
//                     </div>
//                 </div>
//             )}

//              {/* Uploader Register Overlay - Moved outside the main navbar div */}
//             {showUploaderRegister && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60  flex items-center justify-center z-50">
//                  <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md  relative max-h-[90vh] overflow-y-auto">
//                         <button 
//                             onClick={closeUploaderRegister}
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                         >
//                             <FaTimes />
//                         </button>

//                         <UploaderRegister 
//                             onSuccess={handleRegistrationSuccess} 
//                             onCancel={closeUploaderRegister}
//                         />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditorRegister from "./Login/EditorRegister";
import { FaUser, FaEdit, FaHome, FaUpload, FaSignOutAlt, FaTimes, FaUserEdit, FaVideo } from "react-icons/fa";
import UploaderRegister from "./Login/UploaderRegister";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [showEditorRegister, setShowEditorRegister] = useState(false);
    const [showUploaderRegister, setShowUploaderRegister] = useState(false);
    const [initial, setInitial] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("JwtToken");
            const userId = localStorage.getItem("UserId");
            const documentId = localStorage.getItem("documentID");

            if (token && documentId) {
                try {
                    const response = await axios.get(
                        `${API_URL}/api/users/${documentId}?populate[editor]=*&populate[client]=*&populate[role]=*`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );
                    console.log(response, 'response')
                    setUserId(documentId);
                    setInitial(response.data?.username?.charAt(0).toUpperCase() || "");

                    // Check if user is an editor or uploader
                    if (response.data?.editor) {
                        setUserRole('Editor');
                    } else if (response.data?.film) {
                        setUserRole('Uploader');
                    } else {
                        setUserRole(null);
                    }

                    setIsLoggedIn(true);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    handleLogout();
                }
            }
        };

        fetchUserData();
    }, []);

    const handleUploaderRegisterClick = (e) => {
        e.preventDefault();
        setShowUploaderRegister(true);
    };

    const closeUploaderRegister = () => {
        setShowUploaderRegister(false);
    };

    const handleEditorRegisterClick = (e) => {
        e.preventDefault();
        setShowEditorRegister(true);
    };

    const closeEditorRegister = () => {
        setShowEditorRegister(false);
    };

    const handleRegistrationSuccess = (role) => {
        // Update role in state
        setUserRole(role);

        setTimeout(() => {
            closeEditorRegister();
            closeUploaderRegister();
            navigate(role === 'Editor' ? '/editor-dashboard' : '/uploader-dashboard');
            window.location.reload(); // Refresh to ensure latest data
        }, 2000);
    };

    const handleLogout = () => {
        localStorage.removeItem('User');
        localStorage.removeItem('UserId');
        localStorage.removeItem('JwtToken');
        localStorage.removeItem('documentID');
        localStorage.removeItem('EmailId');
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    const user = localStorage.getItem("User");

    return (
        <>
            <div className="flex flex-row h-20 justify-between items-center bg-gradient-to-r from-pink-900 to-gray-500">
                <div className="flex px-3 justify-center items-center">
                    <a className='p-2 text-2xl font-bold text-white' href="/">FilmCraft</a>
                </div>

                <div className="flex gap-x-3 px-3 items-center ">
                    {user ? (
                        <>
                            <a className='p-2 flex items-center text-white  hover:bg-pink-600 rounded-md ' href="/">
                                Home
                            </a>
                            <a className='p-2  text-white  hover:bg-pink-600 rounded-md ' href="/upload">Upload</a>
                            <a className='p-2  text-white  hover:bg-pink-600 rounded-md ' href="/notifications">Notifications</a>

                            {userRole === 'Uploader' && (
                                //uploader dashboard
                                <a className='p-2 flex items-center  text-white  hover:bg-pink-600 rounded-md ' href="/uploader-dashboard">
                                    UDashboard
                                </a>
                            )}

                            {userRole === 'Editor' && (
                                //editor dashboard
                                <a className='p-2 flex items-center  text-white hover:bg-pink-600 rounded-md ' href="/editor-dashboard">
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

                            <div className="relative group">
                                <button
                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-700 font-bold"
                                    onMouseEnter={() => document.querySelector('.profile-dropdown').classList.remove('hidden')}
                                >
                                    {initial}
                                </button>
                                <div
                                    className="profile-dropdown absolute right-0 mt-1 w-20 bg-white rounded-md shadow-lg hidden z-50"
                                    onMouseEnter={() => document.querySelector('.profile-dropdown').classList.remove('hidden')}
                                    onMouseLeave={() => document.querySelector('.profile-dropdown').classList.add('hidden')}
                                >
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
            </div>

            {/* Registration Modals */}
            {showEditorRegister && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeEditorRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                        <EditorRegister
                            onSuccess={() => handleRegistrationSuccess('Editor')}
                            onCancel={closeEditorRegister}
                        />
                    </div>
                </div>
            )}

            {showUploaderRegister && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-6 w-full max-w-xs sm:max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeUploaderRegister} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                        <UploaderRegister
                            onSuccess={() => handleRegistrationSuccess('Uploader')}
                            onCancel={closeUploaderRegister}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;