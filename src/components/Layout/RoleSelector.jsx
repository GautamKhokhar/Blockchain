import React from 'react';
import { useRole } from '../../context/RoleContext'; // adjust path as needed
import './RoleSelector.css';

const RoleSelector = () => {
  const { role, setRole } = useRole();

  return (
    <div className="role-selector-container">
      <label htmlFor="role-select">Select your role:</label>
      <select
        id="role-select"
        value={role || ''}
        onChange={e => setRole(e.target.value)}
      >
        <option value="">-- Choose --</option>
        <option value="supplier">Supplier</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="transporter">Transporter</option>
        <option value="retailer">Retailer</option>
        <option value="admin">Admin</option>
      </select>
      {role && (
        <span className="selected-role">
          Role: {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      )}
    </div>
  );
};

export default RoleSelector;
