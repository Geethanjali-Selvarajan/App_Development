import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Adopt from './Components/Adopt';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Service from './Components/Service';
import Contact from './Components/Contact';
import Rescue from './Components/Rescue';
import Transfer from './Components/Transfer';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Components/AuthContext';
import Sitting from './Components/Sitting';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
         
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sitting" element={
            <ProtectedRoute>
              <Sitting />
            </ProtectedRoute>
          } />
          <Route path="/rescue" element={
            <ProtectedRoute>
              <Rescue />
            </ProtectedRoute>
          } />
          <Route path="/transfer" element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          } />
          <Route path="/adopt" element={
            <ProtectedRoute>
              <Adopt />
            </ProtectedRoute>
          } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
