import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home'
import Login from './Components/Login';
import Register from './Components/Register';
import JobDetails from './Components/JobDetails';
import { AuthProvider } from './Context/AuthContext';
import AddJob from './Components/Addjob';
import Editjob from './Components/Editjob';
import './App.css'

function App() {
  

  return (
    <>
     <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/JobDetails/:jobId" element={<JobDetails />} />
          <Route path="/addjobs" element={<AddJob />} />
          <Route path="/editjob" element={<Editjob />} />
        </Routes>
      </Router>
     </AuthProvider>
    </>
  )
}

export default App
