import React, { useState, useEffect } from 'react';
import { useRole } from '../../context/RoleContext';
import { useSelectedShipment } from '../../context/ShipmentContext';
import { ethers } from 'ethers';
import './ShipmentViewer.css'; // We'll create this CSS file

const ShipmentViewer = () => {
    const { contract, role } = useRole();
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { setSelectedShipmentId } = useSelectedShipment();
    // Function to fetch all shipments from blockchain
    const fetchShipments = async () => {
        if (!contract) return;

        setLoading(true);
        setError('');

        try {
            console.log('Fetching shipments from blockchain...');

            // Use the new contract methods to get ALL shipment IDs
            const shipmentCount = await contract.getShipmentCount();
            console.log('Total shipments:', shipmentCount.toString());

            const allShipmentIds = await contract.getAllShipmentIds();
            console.log('All shipment IDs:', allShipmentIds);

            const shipmentData = [];

            // Fetch each shipment by ID
            for (const id of allShipmentIds) {
                try {
                    const shipment = await contract.shipments(id);

                    // Check if shipment exists (sender is not zero address)
                    if (shipment.sender !== ethers.ZeroAddress) {
                        shipmentData.push({
                            id: id.toString(),
                            product: shipment.product,
                            status: shipment.status,
                            sender: shipment.sender,
                            receiver: shipment.receiver,
                            createdAt: shipment.createdAt.toString(),
                            updatedAt: shipment.updatedAt.toString()
                        });
                    }
                } catch (err) {
                    console.log(`Error fetching shipment ${id}:`, err.message);
                }
            }

            console.log('Fetched shipments:', shipmentData);
            setShipments(shipmentData);

        } catch (error) {
            console.error('Error fetching shipments:', error);
            setError('Failed to load shipments: ' + error.message);

            // Fallback: Try the old method with a range of IDs
            try {
                console.log('Trying fallback method...');
                const fallbackShipments = [];
                for (let id = 1; id <= 20; id++) {
                    try {
                        const shipment = await contract.shipments(id);
                        if (shipment.sender !== ethers.ZeroAddress) {
                            fallbackShipments.push({
                                id: id,
                                product: shipment.product,
                                status: shipment.status,
                                sender: shipment.sender,
                                receiver: shipment.receiver
                            });
                        }
                    } catch (err) {
                        // Skip non-existent shipments
                    }
                }
                setShipments(fallbackShipments);
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                setShipments([]);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        if (contract) {
            fetchShipments();
        }
    }, [contract]);

    // Refresh button handler
    const handleRefresh = () => {
        fetchShipments();
    };

    // Listen for shipment creation events
    useEffect(() => {
        if (!contract) return;

        const handleShipmentCreated = (shipmentId, product, sender) => {
            console.log('New shipment created event:', shipmentId, product, sender);
            // Refresh the list when new shipment is created
            fetchShipments();
        };

        // Set up event listener
        contract.on('ShipmentCreated', handleShipmentCreated);

        // Clean up
        return () => {
            contract.off('ShipmentCreated', handleShipmentCreated);
        };
    }, [contract]);

    if (!role) return null;

    if (loading) {
        return (
            <div className="card moderns-cards">
                <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading shipments...</span>
                    </div>
                    <p className="mt-3">Loading shipments from blockchain...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card moderns-cards">
            <div className="card-header moderns-cards-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                    <i className="fas fa-boxes me-2"></i>
                    Shipment Inventory
                </h5>
                <button onClick={handleRefresh} className="btn btn-refresh">
                    <i className="fas fa-sync-alt me-1"></i>
                    Refresh
                </button>
            </div>
            <div className="card-body">
                {error && (
                    <div className="alert alert-warning modern-alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                    </div>
                )}

                <div className="tables-containers">
                    <table className="moderns-tables">
                        <thead>
                            <tr>
                                <th><i className="fas fa-hashtag me-1"></i>ID</th>
                                <th><i className="fas fa-gift me-1"></i>Product</th>
                                <th><i className="fas fa-tasks me-1"></i>Status</th>
                                <th><i className="fas fa-paper-plane me-1"></i>Sender</th>
                                <th><i className="fas fa-user-check me-1"></i>Receiver</th>
                                <th><i className="fas fa-cogs me-1"></i>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map(shipment => (
                                <tr key={shipment.id}>
                                    <td><strong>#{shipment.id}</strong></td>
                                    <td>{shipment.product}</td>
                                    <td>
                                        <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`}>
                                            {shipment.status === 'Delivered' && <i className="fas fa-check-circle me-1"></i>}
                                            {shipment.status === 'In Transit' && <i className="fas fa-truck me-1"></i>}
                                            {shipment.status === 'Processing' && <i className="fas fa-cog me-1"></i>}
                                            {shipment.status === 'Cancelled' && <i className="fas fa-times-circle me-1"></i>}
                                            {shipment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="address-container">
                                            <i className="fas fa-user me-1"></i>
                                            <span className="text-muted">
                                                {shipment.sender?.slice(0, 6)}...{shipment.sender?.slice(-4)}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="address-container">
                                            <i className="fas fa-user me-1"></i>
                                            <span className="text-muted">
                                                {shipment.receiver?.slice(0, 6)}...{shipment.receiver?.slice(-4)}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {shipment.status === 'Delivered' ? (
                                            <span className="completed-badge">
                                                <i className="fas fa-check-circle me-1"></i> Completed
                                            </span>
                                        ) : (
                                            <button
                                                className="btn-edit"
                                                onClick={() => setSelectedShipmentId(shipment.id)}
                                            >
                                                <i className="fas fa-edit me-1"></i>
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {shipments.length === 0 && (
                    <div className="empty-state">
                        <i className="fas fa-box-open fa-3x mb-3"></i>
                        <p>No shipments found</p>
                        <small>Create your first shipment using the form above</small>
                    </div>
                )}

                <div className="table-footer">
                    <small className="text-muted">
                        <i className="fas fa-box me-1"></i>
                        Showing {shipments.length} shipment(s) •
                        <i className="fas fa-user-tag ms-2 me-1"></i>
                        Role: <strong>{role}</strong>
                        {shipments.length > 0 && ' • Click "Refresh" to update'}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ShipmentViewer;