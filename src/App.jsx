import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Homepage/Home';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import { RoleProvider } from './context/RoleContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';  
import NoAccess from './components/pages/NoAccess';                  
import Assets from './components/Pages/Assets';
import Admin from './components/Pages/Admin';
import AboutUs from './components/Aboutpage/AboutUs'; 
import ScrollToTop from './components/ScrollToTop';
import ContactUs from './components/Contactpage/ContactUs';
import BlockPage from './components/Features/BlockPage';
import BlockchainEducation from './components/History/BlockchainEducation';
import { SelectedShipmentProvider } from './context/ShipmentContext';
// Dummy components for each page—you'll replace with actual content later

// const Transactions = () => <h2 className="page-title">Transactions</h2>;
const UploadDocs = () => <h2 className="page-title">Upload Documents</h2>;
const Analytics = () => <h2 className="page-title">Analytics</h2>;


function App() {
  return (
    <RoleProvider>
      <SelectedShipmentProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/no-access" element={<NoAccess />} />
           <Route path="/about-us" element={<AboutUs />} />
           <Route path="/contact" element={<ContactUs/>}/>
           <Route path="/features" element={<BlockPage/>}/>
           <Route path="/education" element={<BlockchainEducation/>}/>
          {/* Protected routes with role restrictions */}
          <Route
            path="/assets"
            element={
              <ProtectedRoute allowedRoles={['supplier', 'manufacturer', 'admin', 'transporter', 'retailer']}>
                <Assets />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/upload-docs"
            element={
              <ProtectedRoute allowedRoles={['supplier', 'admin']}>
                <UploadDocs />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>
      </Router>
      </SelectedShipmentProvider>
    </RoleProvider>
  );
}

export default App;
