import React ,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Tickets from './components/Tickets'; 
import KnowledgeBase from './components/KnowledgeBase'; 
import LiveChat from './components/LiveChat'; 
import Analytics from './components/Analytics'; 
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Header from './components/Header';
import Logout from './components/Logout';
import Register from './components/Register';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set authentication state to true
    }
  }, []);
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/tickets" element={Tickets} /> 
          <Route path="/knowledge-base" element={<KnowledgeBase/>} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/analytics" element={Analytics} />
        </Routes>
      <Footer/>
    </Router>
  );
};

export default Dashboard;
