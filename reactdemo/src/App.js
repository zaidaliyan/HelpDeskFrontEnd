// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Import custom CSS file for dark mode styling

// function App() {
//   const [students, setStudents] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editedStudent, setEditedStudent] = useState({});
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [newStudent, setNewStudent] = useState({ id: null, name: '', branch: '' });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [lastUsedId, setLastUsedId] = useState(0);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (isButtonClicked) {
//       fetchStudents();
//     }
//   }, [isButtonClicked]);

//   useEffect(() => {
//     if (students.length > 0) {
//       const lastId = students[students.length - 1].id;
//       setLastUsedId(lastId);
//     }
//   }, [students]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     // Save user preference to localStorage
//     localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
//   };

//   useEffect(() => {
//     // Load user preference from localStorage
//     const savedDarkMode = localStorage.getItem('darkMode');
//     setIsDarkMode(savedDarkMode === 'true');
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleEdit = (student) => {
//     setEditedStudent(student);
//     setShowEditForm(true);
//   };

//   const handleDelete = async (studentId) => {
//     try {
//       await axios.delete(`http://localhost:3001/students/${parseInt(studentId)}`);
//       setStudents(students.filter(student => student.id !== studentId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (updatedStudent) => {
//     try {
//       await axios.put(`http://localhost:3001/students/${updatedStudent.id}`, updatedStudent);
//       setStudents(students.map(student => student.id === updatedStudent.id ? updatedStudent : student));
//       setShowEditForm(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       const newId = parseInt(lastUsedId) + 1;
//       const response = await axios.post('http://localhost:3001/students', { ...newStudent, id: newId });
//       setStudents([...students, response.data]);
//       setNewStudent({ id: null, name: '', branch: '' });
//       setShowAddForm(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className={`container mt-5 ${isDarkMode ? 'dark-mode' : ''}`}>
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className={`card-header d-flex justify-content-between align-items-center ${isDarkMode ? 'bg-dark text-white' : 'bg-info text-white'}`}>
//               <h5 className="m-0">Students</h5>
//               <div>
//                 <input type="text" className="form-control mr-2" placeholder="Search" onChange={handleSearch} />
//                 <button onClick={toggleDarkMode} className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
//               </div>
//             </div>
//             <div className="card-body">
//               <button onClick={() => setIsButtonClicked(true) } className='btn btn-primary mb-3'>Fetch Students</button>
//               <button onClick={() => setShowAddForm(true)} className="btn btn-success mb-3 ml-2">Add Student</button>
//               {showAddForm && (
//                 <div className="card">
//                   <div className="card-body">
//                     <h5>Add Student</h5>
//                     <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
//                       <div className="form-group">
//                         <label>Name</label>
//                         <input type="text" className="form-control" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
//                       </div>
//                       <div className="form-group">
//                         <label>Branch</label>
//                         <input type="text" className="form-control" value={newStudent.branch} onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })} />
//                       </div>
//                       <button type="submit" className="btn btn-success">Add</button>
//                       <button onClick={() => setShowAddForm(false)} className="btn btn-secondary ml-2">Cancel</button>
//                     </form>
//                   </div>
//                 </div>
//               )}
//               {isButtonClicked && (
//                 <table className='table table-striped table-bordered'>
//                   <thead className={`thead-${isDarkMode ? 'dark' : 'light'}`}>
//                     <tr>
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Branch</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
//                       <tr key={student.id}>
//                         <td>{student.id}</td>
//                         <td>{student.name}</td>
//                         <td>{student.branch}</td>
//                         <td>
//                           <button onClick={() => handleEdit(student)} className="btn btn-sm btn-primary mr-2">Edit</button>
//                           <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//               {showEditForm && (
//                 <div className="card">
//                   <div className="card-body">
//                     <h5>Edit Student</h5>
//                     <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editedStudent); }}>
//                       <div className="form-group">
//                         <label>Name</label>
//                         <input type="text" className="form-control" value={editedStudent.name} onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })} />
//                       </div>
//                       <div className="form-group">
//                         <label>Branch</label>
//                         <input type="text" className="form-control" value={editedStudent.branch} onChange={(e) => setEditedStudent({ ...editedStudent, branch: e.target.value })} />
//                       </div>
//                       <button type="submit" className="btn btn-primary">Update</button>
//                       <button onClick={() => setShowEditForm(false)} className="btn btn-secondary ml-2">Cancel</button>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './HomePage.css'; // Custom styles for the home page

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       <header className="bg-primary py-5">
//         <div className="container">
//           <h1 className="text-white display-4">Welcome to HelpDesk Pro</h1>
//           <p className="lead text-white">Your All-in-One Customer Support Solution</p>
//           <a href="/signup" className="btn btn-light btn-lg mr-2">Sign Up</a>
//           <a href="/login" className="btn btn-light btn-lg">Log In</a>
//         </div>
//       </header>
//       <main className="container py-5">
//         <section className="features mb-5">
//           <h2 className="text-center mb-4">Features</h2>
//           <div className="row">
//             <div className="col-md-4 mb-4">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Ticket Management</h5>
//                   <p className="card-text">Efficiently manage support tickets from creation to resolution.</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Knowledge Base</h5>
//                   <p className="card-text">Access articles and FAQs for quick problem-solving.</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">Live Chat Support</h5>
//                   <p className="card-text">Instantly connect with support agents for real-time assistance.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="cta text-center mb-5">
//           <h2>Ready to Improve Your Customer Support?</h2>
//           <p>Sign up today and experience the power of HelpDesk Pro.</p>
//           <a href="/signup" className="btn btn-primary btn-lg">Get Started</a>
//         </section>
//         <section className="about">
//           <h2 className="text-center mb-4">About HelpDesk Pro</h2>
//           <p className="text-center">HelpDesk Pro is a comprehensive customer support management platform designed to streamline your support operations and enhance customer satisfaction. Our all-in-one solution provides everything you need to deliver exceptional support experiences.</p>
//         </section>
//       </main>
//       <footer className="bg-dark text-white text-center py-4">
//         <div className="container">
//           <p>&copy; 2024 HelpDesk Pro. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;



import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import LandingPage from './components/LandingPage';
import Tickets from './components/Tickets'; // Assuming you have a component for tickets
import KnowledgeBase from './components/KnowledgeBase'; // Assuming you have a component for knowledge base
import LiveChat from './components/LiveChat'; // Assuming you have a component for live chat
import Analytics from './components/Analytics'; // Assuming you have a component for analytics
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
// import Settings from './Settings'; // Assuming you have a component for settings

const Dashboard = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/knowledge-base" element={<KnowledgeBase/>} />
          <Route path="/live-chat" component={LiveChat} />
          <Route path="/analytics" component={Analytics} />
        </Routes>
    </Router>
  );
};

export default Dashboard;
