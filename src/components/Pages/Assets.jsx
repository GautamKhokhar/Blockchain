import React from 'react';
import { useRole } from '../../context/RoleContext';
import ShipmentCreator from '../Shipment/ShipmentCreator';
import ShipmentUpdater from '../Shipment/ShipmentUpdater';
import ShipmentViewer from '../Shipment/ShipmentViewer';
import './Assets.css';

const Assets = () => {
  const { role, account } = useRole();

  const getRoleEmoji = (role) => {
    switch(role) {
      case 'admin': return '👑';
      case 'supplier': return '📦';
      case 'manufacturer': return '🏭';
      case 'transporter': return '🚚';
      case 'retailer': return '🏪';
      default: return '👤';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#8A2BE2';
      case 'supplier': return '#FF6B6B';
      case 'manufacturer': return '#FFA73F';
      case 'transporter': return '#20BFAA';
      case 'retailer': return '#9C51E0';
      default: return '#6B7280';
    }
  };

  return (
    <div className="assets-container">
      {/* Header Section */}
      <div className="assets-header">
        <div className="header-content">
          <div className="role-badge" style={{backgroundColor: getRoleColor(role)}}>
            <span className="role-emoji">{getRoleEmoji(role)}</span>
          </div>
          <h1>Assets Management</h1>
          <div className="account-info">
            <span className="role-tag" style={{backgroundColor: getRoleColor(role)}}>
              {role}
            </span>
            <span className="account-address">{account}</span>
          </div>
        </div>
        <div className="header-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </div>

      <div className="assets-content">
        {/* Main Content */}
        <div className="main-content full-width">
          <div className="content-card full-width-card">
            <div className="card-header">
              <i className="fas fa-shipping-fast"></i>
              <h2>Shipment Management</h2>
            </div>
            <div className="card-content full-width-content">
              <ShipmentCreator />
              {role !== 'supplier' && role !== 'admin' && <ShipmentUpdater />}
              <ShipmentViewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;