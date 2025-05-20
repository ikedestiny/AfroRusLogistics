import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'
import ModernLogisticsHomepage from './pages/main';
import AdminDashboard from './pages/admin';
import Footer from './componets/Footer';
import Navbar from './componets/Navbar';
import ClientLogisticsForm from './pages/requestForm';
import ProviderLogisticsForm from './pages/providerForm';
import AuthPage from './pages/Authpage';

function App() {

  return (

    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ModernLogisticsHomepage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/form" element={<ProviderLogisticsForm />} />
          <Route path="/request" element={<ClientLogisticsForm />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>  </main>
      <Footer />
    </div>
  )
}

export default App
