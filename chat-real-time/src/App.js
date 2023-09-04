
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './components/context/AuthProvider';
import AppProvider from './components/context/AppProvider';
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMemberModal from './components/Modal/InviteMemberModal';
function App() {
  return (
    <Router>
    <AuthProvider>
    <AppProvider>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ChatRoom />} />
        </Routes> 
        <AddRoomModal></AddRoomModal>      
        <InviteMemberModal></InviteMemberModal>
    </AppProvider>
    </AuthProvider>
    </Router>
  );
}

export default App;
