import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { isAddress } from 'ethers';
import './Admin.css'; // Import the stylesheet

const Admin = () => {
    // State for the Action Panel (Assigning Roles)
    const { role, contract, roleConstants, account } = useRole();
    const [addressToAssign, setAddressToAssign] = useState('');
    const [selectedRole, setSelectedRole] = useState('supplier');
    const [assignStatus, setAssignStatus] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);

    // State for the Information Panel (Searching Roles)
    const [addressToSearch, setAddressToSearch] = useState('');
    const [searchedUserRoles, setSearchedUserRoles] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStatus, setSearchStatus] = useState('');

    // --- Panel 1: Assign Role Logic ---
    const handleAssignRole = async (e) => {
        e.preventDefault();
        setAssignStatus('');
        if (!isAddress(addressToAssign)) {
            setAssignStatus('❌ Invalid Ethereum address.');
            return;
        }

        setIsAssigning(true);
        try {
            const roleByte = roleConstants[selectedRole];
            const tx = await contract.grantRole(roleByte, addressToAssign);
            setAssignStatus('⏳ Transaction sent... waiting for confirmation.');
            await tx.wait();
            setAssignStatus(`✅ Role "${selectedRole}" successfully assigned!`);
        } catch (error) {
            console.error('Role assignment failed:', error);
            setAssignStatus(`❌ Transaction failed: ${error.reason || 'Check console for details.'}`);
        } finally {
            setIsAssigning(false);
        }
    };

    // --- Panel 2: Search Role Logic ---
    // In your Admin component, replace the handleSearchRoles function:
    const handleSearchRoles = async (e) => {
        e.preventDefault();
        setSearchedUserRoles(null);
        setSearchStatus('');

        if (!isAddress(addressToSearch)) {
            setSearchStatus('❌ Please enter a valid Ethereum address.');
            return;
        }

        setIsSearching(true);
        try {
            // Try using the getRoles function first
            const roleString = await contract.getRoles(addressToSearch);

            // Convert to the same format as before for compatibility
            const roles = {
                admin: roleString === "admin",
                supplier: roleString === "supplier",
                manufacturer: roleString === "manufacturer",
                transporter: roleString === "transporter",
                retailer: roleString === "retailer"
            };

            setSearchedUserRoles(roles);
        } catch (error) {
            console.error('Error using getRoles, falling back to individual checks:', error);

            // Fallback to individual role checks
            const roles = {
                admin: await contract.hasRole(roleConstants.admin, addressToSearch),
                supplier: await contract.hasRole(roleConstants.supplier, addressToSearch),
                manufacturer: await contract.hasRole(roleConstants.manufacturer, addressToSearch),
                transporter: await contract.hasRole(roleConstants.transporter, addressToSearch),
                retailer: await contract.hasRole(roleConstants.retailer, addressToSearch)
            };
            setSearchedUserRoles(roles);
        } finally {
            setIsSearching(false);
        }
    };
    if (role !== 'admin') {
        return (
            <div className="admin-page-container">
                <div className="access-denied-container">
                    <div className="access-denied-icon">
                        <i className="fas fa-lock"></i>
                    </div>
                    <h2>Access Denied</h2>
                    <p>Only users with the 'Admin' role can access this panel.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-content">
                <div className="admin-header">
                    <h1><i className="fas fa-shield-alt"></i> Admin Dashboard</h1>
                    <p>Manage user roles and permissions</p>
                </div>

                <div className="admin-panels-fullwidth">
                    {/* Action Panel: Assign Role - Full Width */}
                    <div className="admin-panel-fullwidth assign-panel">
                        <div className="panel-header">
                            <h2><i className="fas fa-user-plus"></i> Assign Role</h2>
                            <p>Grant a new role to a specific wallet address</p>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={handleAssignRole}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="address"><i className="fas fa-wallet"></i> Wallet Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="form-input"
                                            value={addressToAssign}
                                            onChange={(e) => setAddressToAssign(e.target.value)}
                                            placeholder="0x..."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role"><i className="fas fa-user-tag"></i> Role to Assign</label>
                                        <select
                                            id="role"
                                            className="form-select"
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            required
                                            style={{ height: "54px" }}
                                        >
                                            <option value="supplier">📦 Supplier</option>
                                            <option value="manufacturer">🏭 Manufacturer</option>
                                            <option value="transporter">🚚 Transporter</option>
                                            <option value="retailer">🏪 Retailer</option>
                                            {/* <option value="admin">👑 Admin</option> */}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-assign"
                                    disabled={isAssigning || !isAddress(addressToAssign)}
                                >
                                    {isAssigning ? (
                                        <>
                                            <span className="spinner"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus-circle"></i>
                                            Assign Role
                                        </>
                                    )}
                                </button>
                            </form>
                            {assignStatus && (
                                <div className={`status-message ${assignStatus.includes('❌') ? 'error' : assignStatus.includes('⏳') ? 'warning' : 'success'}`}>
                                    {assignStatus}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Information Panel: Check Roles - Full Width */}
                    <div className="admin-panel-fullwidth info-panel">
                        <div className="panel-header">
                            <h2><i className="fas fa-search"></i> Check Roles</h2>
                            <p>Look up the current roles for any address</p>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={handleSearchRoles} className="search-form">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Enter address to search..."
                                        value={addressToSearch}
                                        onChange={(e) => setAddressToSearch(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="btn-search"
                                        type="submit"
                                        disabled={isSearching || !isAddress(addressToSearch)}
                                    >
                                        {isSearching ? (
                                            <span className="spinner"></span>
                                        ) : (
                                            <>
                                                <i className="fas fa-search"></i>
                                                Search
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {searchStatus && (
                                <div className="status-message error">
                                    {searchStatus}
                                </div>
                            )}

                            {searchedUserRoles ? (
                                <div className="roles-container">
                                    <h3>Role Status</h3>
                                    <div className="roles-grid">
                                        {Object.entries(searchedUserRoles).map(([roleName, hasRole]) => (
                                            <div key={roleName} className={`role-item ${hasRole ? 'active' : 'inactive'}`}>
                                                <div className="role-icon">
                                                    <i className={`fas ${hasRole ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                                </div>
                                                <div className="role-info">
                                                    <span className="role-name">
                                                        {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                                                    </span>
                                                    <span className="role-status">
                                                        {hasRole ? 'Assigned' : 'Not assigned'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="search-placeholder">
                                    <i className="fas fa-search"></i>
                                    <p>Enter an address to view role information</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;