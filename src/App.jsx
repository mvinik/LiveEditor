
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './components/Login/Login'
import GoogleAuthCallback from './components/GoogleAuthCallback'
import Upload from './components/Upload Page/Upload'
import ClientRequestForm from './components/Upload Page/ClientRequestForm'
import EditorDetailsPage from './components/Editors/EditorDetailsPage'
import Notifications from './pages/Notification'

function App() {


  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation();
  const jwt = localStorage.getItem('JwtToken');

  return (
    <Routes>
      {!jwt ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit-request" element={<ClientRequestForm />} />
          <Route path="editor/:documentId" element={<EditorDetailsPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Home />} />
        </>
      )}
    </Routes>
  );
}

export default App
