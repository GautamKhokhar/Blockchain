import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useRole } from '../../context/RoleContext';
import './ShipmentCreator.css';

const ShipmentCreator = () => {
  // IMPORTANT: Ensure your RoleContext provides the connected 'account' address
  const { contract, role, account } = useRole(); 
  
  const [shipmentData, setShipmentData] = useState({
    id: '',
    product: '',
    receiver: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    if (!contract || !account || role !== 'supplier') {
        setMessage('Error: Wallet not connected or you do not have the supplier role.');
        return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      // --- Part 1: On-Chain Blockchain Transaction ---
      const tx = await contract.createShipment(
        parseInt(shipmentData.id),
        shipmentData.product,
        shipmentData.receiver
      );
      
      setMessage('Transaction sent... waiting for confirmation...');
      
      // Wait for the transaction to be mined
      await tx.wait();
      
      setMessage('✅ On-chain shipment created! Saving to database...');

      // --- Part 2: Off-Chain API Call to save in MongoDB ---
      try {
        const backendPayload = {
          shipmentId: parseInt(shipmentData.id),
          product: shipmentData.product,
          sender: account, // The connected user's wallet address
          receiver: shipmentData.receiver,
          blockHash: tx.hash // The unique hash of the blockchain transaction
        };

        // This URL should point to your running backend server
        await axios.post('http://localhost:3000/api/shipments', backendPayload);
        
        setMessage('Shipment created and saved successfully!');
        setShipmentData({ id: '', product: '', receiver: '' }); // Reset form

      } catch (dbError) {
          console.error("Database save error:", dbError);
          // Provide a helpful error message for the user to report
          setMessage(`⚠️ On-chain transaction succeeded, but failed to save to database. TxHash: ${tx.hash}`);
      }

    } catch (error) {
      console.error("Blockchain transaction error:", error);
      setMessage('Error: ' + (error.reason || error.message));
    }
    
    setLoading(false);
  };

  if (role !== 'supplier') {
    return null; // Don't render the component if the user is not a supplier
  }

  return (
    <div className="creator-card">
      <div className="creator-card-header">
        <h5 className="mb-0">
          <i className="fas fa-plus-circle me-2"></i>
          Create New Shipment
        </h5>
      </div>
      <div className="creator-card-body">
        <form onSubmit={handleCreateShipment}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-hashtag me-1"></i>
                Shipment ID
              </label>
              <input
                type="number"
                className="form-input"
                value={shipmentData.id}
                onChange={(e) => setShipmentData({...shipmentData, id: e.target.value})}
                required
                placeholder="101"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-gift me-1"></i>
                Product Name
              </label>
              <input
                type="text"
                className="form-input"
                value={shipmentData.product}
                onChange={(e) => setShipmentData({...shipmentData, product: e.target.value})}
                required
                placeholder="Laptop Batch"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-user-check me-1"></i>
                Receiver Address
              </label>
              <input
                type="text"
                className="form-input"
                value={shipmentData.receiver}
                onChange={(e) => setShipmentData({...shipmentData, receiver: e.target.value})}
                placeholder="0x..."
                required
              />
            </div>
            <div className="form-group form-button-container">
              <button type="submit" className="create-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus me-1"></i>
                    Create Shipment
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        {message && (
          <div className={`message-alert ${message.includes('Error') || message.includes('⚠️') ? 'error' : 'success'}`}>
            <i className={`fas ${message.includes('Error') || message.includes('⚠️') ? 'fa-exclamation-circle' : 'fa-check-circle'} me-2`}></i>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentCreator;