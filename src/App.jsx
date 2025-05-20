import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'
import LogisticsHomepage from './pages/main';
import ModernLogisticsHomepage from './pages/main';
import AdminDashboard from './pages/admin';
import LogisticsForm from './pages/logisticsform';
import Navbar from './componets/navbar';
import Footer from './componets/Footer';

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
