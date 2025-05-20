import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'
import ModernLogisticsHomepage from './pages/main';
import AdminDashboard from './pages/admin';
import LogisticsForm from './pages/logisticsform';
import Footer from './componets/Footer';
import Navbar from './componets/Navbar';

function App() {

  return (

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ModernLogisticsHomepage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/form" element={<LogisticsForm />} />

        </Routes>  </main>
      <Footer />
    </div>
  )
}

export default App
