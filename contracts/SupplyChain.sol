// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    // Role definitions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant TRANSPORTER_ROLE = keccak256("TRANSPORTER_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    // Shipment structure
    struct Shipment {
        uint256 id;
        string product;
        address sender;
        address receiver;
        address currentOwner;
        string status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    // State variables
    mapping(uint256 => Shipment) public shipments;
    mapping(uint256 => string[]) public shipmentStatusHistory;
    uint256 public shipmentCount;
    uint256[] public allShipmentIds;

    // Events
    event RoleAssigned(address indexed account, bytes32 indexed role);
    event RoleRevoked(address indexed account, bytes32 indexed role);
    event ShipmentCreated(uint256 indexed shipmentId, string product, address sender, address receiver);
    event ShipmentStatusUpdated(uint256 indexed shipmentId, string newStatus, address updater);
    event ShipmentTransferred(uint256 indexed shipmentId, address from, address to);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(SUPPLIER_ROLE, msg.sender);
        
        _setRoleAdmin(ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(SUPPLIER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(MANUFACTURER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(TRANSPORTER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(RETAILER_ROLE, ADMIN_ROLE);
    }

    function grantRole(bytes32 role, address account) public override onlyRole(ADMIN_ROLE) {
        require(role != DEFAULT_ADMIN_ROLE, "Cannot grant DEFAULT_ADMIN_ROLE");
        _grantRole(role, account);
        emit RoleAssigned(account, role);
    }

    function revokeRole(bytes32 role, address account) public override onlyRole(ADMIN_ROLE) {
        require(role != DEFAULT_ADMIN_ROLE, "Cannot revoke DEFAULT_ADMIN_ROLE");
        _revokeRole(role, account);
        emit RoleRevoked(account, role);
    }

    function createShipment(uint256 _id, string calldata _product, address _receiver) external onlyRole(SUPPLIER_ROLE) {
        require(shipments[_id].sender == address(0), "Shipment ID already exists");
        require(_receiver != address(0), "Invalid receiver address");
        require(bytes(_product).length > 0, "Product name cannot be empty");
        require(_id > 0, "Invalid shipment ID");

        shipments[_id] = Shipment(_id, _product, msg.sender, _receiver, _receiver, "Created", block.timestamp, block.timestamp);
        shipmentStatusHistory[_id].push("Created");
        allShipmentIds.push(_id);
        shipmentCount++;
        
        emit ShipmentCreated(_id, _product, msg.sender, _receiver);
    }

    function updateShipmentStatus(uint256 _id, string calldata _newStatus) external {
        Shipment storage shipment = shipments[_id];
        require(shipment.sender != address(0), "Shipment doesn't exist");
        require(msg.sender == shipment.currentOwner, "Not authorized: Only the current owner can update status");

        bytes32 currentStatusHash = keccak256(bytes(shipment.status));
        bytes32 newStatusHash = keccak256(bytes(_newStatus));

        if (hasRole(MANUFACTURER_ROLE, msg.sender)) {
            require(currentStatusHash == keccak256(bytes("Created")) && newStatusHash == keccak256(bytes("Processing")), "Manufacturer can only set status to 'Processing'");
        } else if (hasRole(TRANSPORTER_ROLE, msg.sender)) {
            require(currentStatusHash == keccak256(bytes("Processing")) && newStatusHash == keccak256(bytes("In Transit")), "Transporter can only set status to 'In Transit'");
        } else if (hasRole(RETAILER_ROLE, msg.sender)) {
            require(currentStatusHash == keccak256(bytes("In Transit")) && newStatusHash == keccak256(bytes("Delivered")), "Retailer can only set status to 'Delivered'");
        } else if (newStatusHash == keccak256(bytes("Cancelled"))) {
             require(hasRole(ADMIN_ROLE, msg.sender) || msg.sender == shipment.sender, "Only Admin or Sender can cancel");
             require(currentStatusHash == keccak256(bytes("Created")), "Can only cancel in 'Created' state");
        } else {
            revert("Your role is not authorized to set this status");
        }

        shipment.status = _newStatus;
        shipment.updatedAt = block.timestamp;
        shipmentStatusHistory[_id].push(_newStatus);
        emit ShipmentStatusUpdated(_id, _newStatus, msg.sender);
    }

    function transferShipment(uint256 _id, address _newOwner) external {
        Shipment storage shipment = shipments[_id];
        require(shipment.sender != address(0), "Shipment doesn't exist");
        require(_newOwner != address(0), "Invalid new owner address");
        require(msg.sender == shipment.currentOwner, "Only current owner can transfer");

        bytes32 currentStatusHash = keccak256(bytes(shipment.status));

        if (hasRole(MANUFACTURER_ROLE, msg.sender)) {
            require(currentStatusHash == keccak256(bytes("Processing")), "Manufacturer: Set status to 'Processing' before transferring");
        } else if (hasRole(TRANSPORTER_ROLE, msg.sender)) {
            require(currentStatusHash == keccak256(bytes("In Transit")), "Transporter: Set status to 'In Transit' before transferring");
        } else if (hasRole(RETAILER_ROLE, msg.sender)) {
             revert("Retailer cannot transfer the shipment");
        } else {
            require(hasRole(ADMIN_ROLE, msg.sender), "You are not authorized to transfer this shipment");
        }
        require(currentStatusHash != keccak256(bytes("Delivered")), "Cannot transfer a delivered shipment");

        address previousOwner = shipment.currentOwner;
        shipment.currentOwner = _newOwner;
        emit ShipmentTransferred(_id, previousOwner, _newOwner);
    }

    // --- VIEW FUNCTIONS ---
    // Make sure you have a `getShipment` function like this for the frontend to work correctly
    function getShipment(uint256 _id) external view returns (Shipment memory) {
        require(shipments[_id].sender != address(0), "Shipment doesn't exist");
        return shipments[_id];
    }
    
    function getShipmentCount() external view returns (uint256) { return shipmentCount; }
    function getAllShipmentIds() external view returns (uint256[] memory) { return allShipmentIds; }
    function getStatusHistory(uint256 _id) external view returns (string[] memory) { return shipmentStatusHistory[_id]; }

    // Make sure you have a `getRoles` function that returns a string for the frontend
    function getRoles(address account) external view returns (string memory) {
        if (hasRole(ADMIN_ROLE, account)) { return "admin"; }
        if (hasRole(SUPPLIER_ROLE, account)) { return "supplier"; }
        if (hasRole(MANUFACTURER_ROLE, account)) { return "manufacturer"; }
        if (hasRole(TRANSPORTER_ROLE, account)) { return "transporter"; }
        if (hasRole(RETAILER_ROLE, account)) { return "retailer"; }
        return "guest";
    }
}