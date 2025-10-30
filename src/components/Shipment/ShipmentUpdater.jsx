import React, { useState, useEffect, useCallback } from 'react';
import { useRole } from '../../context/RoleContext';
import { useSelectedShipment } from '../../context/ShipmentContext';
import './ShipmentUpdater.css';

const ShipmentUpdater = () => {
  const { contract, role, account } = useRole();
  const [updateData, setUpdateData] = useState({ id: '', newStatus: '', transferTo: '' });

  // State to manage the UI logic
  const [actionType, setActionType] = useState('update');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [isActionAllowed, setIsActionAllowed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
const { selectedShipmentId, setSelectedShipmentId } = useSelectedShipment();
 // Add this useEffect to respond to changes in the selected shipment ID
  useEffect(() => {
    if (selectedShipmentId) {
      setUpdateData(prev => ({ ...prev, id: selectedShipmentId }));
      // Optionally clear the selection after using it
      setSelectedShipmentId('');
    }
  }, [selectedShipmentId, setSelectedShipmentId]);
  // Function to save role data to MongoDB
  const saveRoleData = async (shipmentId, status, txHash, receiver = '') => {
    try {
      // Get shipment details to extract product name
      const shipment = await contract.getShipment(shipmentId);

      let roleData = {};
      let apiEndpoint = '';

      // Determine which API endpoint and data structure to use based on role
      switch (role) {
        case 'manufacturer':
          apiEndpoint = 'http://localhost:3000/api/manufacturer/save';
          roleData = {
            shipmentId: parseInt(shipmentId),
            productName: shipment.product,
            sender: account,
            receiver: receiver,
            status: status,
            blockchainTxHash: txHash
          };
          break;
        case 'transporter':
          apiEndpoint = 'http://localhost:3000/api/transporter/save';
          roleData = {
            shipmentId: parseInt(shipmentId),
            productName: shipment.product,
            sender: account,
            receiver: receiver,
            status: status,
            blockchainTxHash: txHash
          };
          break;
        case 'retailer':
          apiEndpoint = 'http://localhost:3000/api/retailer/save';
          roleData = {
            shipmentId: parseInt(shipmentId),
            productName: shipment.product,
            sender: account,
            status: status,
            blockchainTxHash: txHash
          };
          break;
        default:
          console.log('No data saving for this role');
          return true;
      }

      console.log(`Saving ${role} data:`, roleData);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      const result = await response.json();
      if (!result.success) {
        console.error(`Failed to save ${role} data:`, result.message);
        return false;
      } else {
        console.log(`${role} data saved/updated successfully`);
        return true;
      }
    } catch (error) {
      console.error(`Error saving ${role} data:`, error);
      return false;
    }
  };

  // This function determines what the current user can do based on the shipment's state
  const getAvailableActions = useCallback((shipment) => {
    if (!shipment || !role || !account) {
      setIsActionAllowed(false);
      return;
    }

    // Crucial check: only the current owner of the shipment can perform actions
    if (shipment.currentOwner.toLowerCase() !== account.toLowerCase()) {
      setAvailableStatuses([]);
      setActionType('update');
      setIsActionAllowed(false);
      return;
    }

    setIsActionAllowed(true);
    let statuses = [];

    switch (role) {
      case 'manufacturer':
        if (shipment.status === 'Created') {
          statuses = ['Processing'];
          setActionType('update');
        } else if (shipment.status === 'Processing') {
          setActionType('transfer');
        }
        break;
      case 'transporter':
        if (shipment.status === 'Processing') {
          statuses = ['In Transit'];
          setActionType('update');
        } else if (shipment.status === 'In Transit') {
          setActionType('transfer');
        }
        break;
      case 'retailer':
        if (shipment.status === 'In Transit') {
          statuses = ['Delivered'];
          setActionType('update');
        } else {
          setIsActionAllowed(false);
        }
        break;
      default:
        setIsActionAllowed(false);
        break;
    }
    setAvailableStatuses(statuses);
  }, [role, account]);

  // Handles form submission for both updating status and transferring ownership
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return;

    setLoading(true);
    setMessage('');

    try {
      if (actionType === 'update') {
        const tx = await contract.updateShipmentStatus(updateData.id, updateData.newStatus);
        await tx.wait();

        // Save role data when status is updated
        if (['manufacturer', 'transporter', 'retailer'].includes(role)) {
          let shouldSave = false;
          let statusToSave = updateData.newStatus;

          if (role === 'manufacturer' && updateData.newStatus === 'Processing') {
            shouldSave = true;
          } else if (role === 'transporter' && updateData.newStatus === 'In Transit') {
            shouldSave = true;
          } else if (role === 'retailer' && updateData.newStatus === 'Delivered') {
            shouldSave = true;
          }

          if (shouldSave) {
            const saveSuccess = await saveRoleData(updateData.id, statusToSave, tx.hash, '');
            if (saveSuccess) {
              setMessage(`Status updated and ${role} data saved successfully!`);
            } else {
              setMessage('Status updated successfully! But failed to save data.');
            }
          } else {
            setMessage('Status updated successfully!');
          }
        } else {
          setMessage('Status updated successfully!');
        }

        fetchShipmentDetails(updateData.id);
      } else if (actionType === 'transfer') {
        const tx = await contract.transferShipment(updateData.id, updateData.transferTo);
        await tx.wait();

        // Update role data with RECEIVER address when transferring (only for manufacturer and transporter)
        if (['manufacturer', 'transporter'].includes(role)) {
          let statusToSave = '';

          if (role === 'manufacturer') {
            statusToSave = 'Processing';
          } else if (role === 'transporter') {
            statusToSave = 'In Transit';
          }

          const saveSuccess = await saveRoleData(updateData.id, statusToSave, tx.hash, updateData.transferTo);
          if (saveSuccess) {
            setMessage(`Shipment transferred and ${role} record successfully!`);
          } else {
            setMessage('Shipment transferred successfully! But failed to update receiver data.');
          }
        } else {
          setMessage('Shipment transferred successfully!');
        }

        setUpdateData({ id: '', newStatus: '', transferTo: '' });
        setShipmentDetails(null);
      }
    } catch (error) {
      setMessage('Error: ' + (error.reason || error.message));
    }
    setLoading(false);
  };

  // Fetches the full details of a shipment from the contract
  const fetchShipmentDetails = async (id) => {
    if (!contract || !id) {
      setShipmentDetails(null);
      return;
    }
    try {
      const shipment = await contract.getShipment(id);
      setShipmentDetails(shipment);
    } catch (error) {
      console.error('Error fetching shipment:', error);
      setShipmentDetails(null);
      setMessage(`Could not find shipment with ID #${id}`);
    }
  };

  // When the user types an ID, fetch the shipment details
  useEffect(() => {
    const handler = setTimeout(() => {
      if (updateData.id) {
        setMessage('');
        fetchShipmentDetails(updateData.id);
      } else {
        setShipmentDetails(null);
        setIsActionAllowed(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [updateData.id, contract]);

  // When shipment details are loaded, determine the available actions
  useEffect(() => {
    if (shipmentDetails) {
      getAvailableActions(shipmentDetails);
    }
  }, [shipmentDetails, getAvailableActions]);

  // This component should only be visible to these roles
  if (!role || !['manufacturer', 'transporter', 'retailer'].includes(role)) {
    return null;
  }

  return (
    <div className="updater-card">
      <div className="updater-card-header">
        <h5 className="mb-0">
          <i className="fas fa-sync-alt me-2"></i>
          Manage Shipment
        </h5>
      </div>
      <div className="updater-card-body">
        <form onSubmit={handleSubmit}>
          <div className="updater-form-grid">
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-hashtag me-1"></i>
                Shipment ID
              </label>
              <input
                type="number"
                className="form-input"
                value={updateData.id}
                onChange={(e) => setUpdateData({ id: e.target.value, newStatus: '', transferTo: '' })}
                required
                placeholder="101"
              />
            </div>

            {/* This block dynamically renders the correct form part based on the shipment's state */}
            {isActionAllowed && shipmentDetails ? (
              <>
                {actionType === 'update' ? (
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-tasks me-1"></i>
                      New Status
                    </label>
                    <select
                      className="form-select"
                      value={updateData.newStatus}
                      onChange={(e) => setUpdateData({ ...updateData, newStatus: e.target.value })}
                      required
                    >
                      <option value="">Select Status</option>
                      {availableStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-user-check me-1"></i>
                      Transfer To Address
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={updateData.transferTo}
                      onChange={(e) => setUpdateData({ ...updateData, transferTo: e.target.value })}
                      placeholder="0x..."
                      required
                    />
                  </div>
                )}
                <div className="form-group action-button-container">
                  <button type="submit" className="action-button" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className={`fas ${actionType === 'update' ? 'fa-edit' : 'fa-exchange-alt'} me-1`}></i>
                        {actionType === 'update' ? 'Update Status' : 'Transfer Shipment'}
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="form-group status-message">
                {updateData.id && !shipmentDetails && !message.startsWith('❌') && (
                  <div className="fetching-indicator">
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Fetching details...
                  </div>
                )}
                {shipmentDetails && !isActionAllowed && (
                  <div className="not-allowed-message">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    You are not the current owner or no actions are available for this shipment.
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

        {message && (
          <div className={`message-alert ${message.includes('✅') || message.includes('successfully') ? 'success' : 'error'}`}>
            <i className={`fas ${(message.includes('✅') || message.includes('successfully')) ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentUpdater;