import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import SupplyChainArtifact from "../abis/SupplyChain.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [contract, setContract] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [roleConstants, setRoleConstants] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }
    try {
      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("[RoleProvider] Account connected:", selectedAccount);
      setAccount(selectedAccount);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        SupplyChainArtifact.abi,
        signer
      );
      console.log("[RoleProvider] Contract instance created");
      setContract(contractInstance);

      // Fetch role constants from contract
      const constants = await fetchRoleConstantsFromContract(contractInstance);
      setRoleConstants(constants);

    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const fetchRoleConstantsFromContract = async (contract) => {
    try {
      const roles = {
        admin: await contract.ADMIN_ROLE(),
        supplier: await contract.SUPPLIER_ROLE(),
        manufacturer: await contract.MANUFACTURER_ROLE(),
        transporter: await contract.TRANSPORTER_ROLE(),
        retailer: await contract.RETAILER_ROLE()
      };
      console.log("[RoleProvider] Role constants from contract:", roles);
      return roles;
    } catch (error) {
      console.error("Failed to fetch role constants from contract:", error);

      // Fallback: generate locally if contract call fails
      return {
        admin: ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE")),
        supplier: ethers.keccak256(ethers.toUtf8Bytes("SUPPLIER_ROLE")),
        manufacturer: ethers.keccak256(ethers.toUtf8Bytes("MANUFACTURER_ROLE")),
        transporter: ethers.keccak256(ethers.toUtf8Bytes("TRANSPORTER_ROLE")),
        retailer: ethers.keccak256(ethers.toUtf8Bytes("RETAILER_ROLE"))
      };
    }
  };

  const fetchRoleFromContract = async () => {
    if (!contract || !account || !roleConstants) {
      console.log("[RoleProvider] Contract, account, or role constants not ready");
      setLoadingRole(false);
      return;
    }

    setLoadingRole(true);

    try {
      console.log("[RoleProvider] Checking roles for account:", account);
      console.log("[RoleProvider] Using role constants:", roleConstants);

      // Try using the contract's getRoles function first
      try {
        const roleString = await contract.getRoles(account);
        console.log("[RoleProvider] User role from getRoles:", roleString);

        if (roleString !== "guest") {
          setRole(roleString);
          setLoadingRole(false);
          return;
        }
      } catch (error) {
        console.warn("getRoles function failed, falling back to individual role checks:", error);
      }

      // Fallback to individual role checks
      const rolesMap = [
        { bytes: roleConstants.admin, name: "admin" },
        { bytes: roleConstants.supplier, name: "supplier" },
        { bytes: roleConstants.manufacturer, name: "manufacturer" },
        { bytes: roleConstants.transporter, name: "transporter" },
        { bytes: roleConstants.retailer, name: "retailer" },
      ];

      for (const { bytes, name } of rolesMap) {
        try {
          console.log(`[RoleProvider] Checking role ${name} with bytes:`, bytes);
          const hasRole = await contract.hasRole(bytes, account);
          console.log(`[RoleProvider] Role ${name}:`, hasRole);
          if (hasRole) {
            console.log("[RoleProvider] User has role:", name);
            setRole(name);
            setLoadingRole(false);
            return;
          }
        } catch (error) {
          console.warn(`Error checking role ${name}:`, error);
          continue;
        }
      }

      console.log("[RoleProvider] No matching role found");
      setRole(null);
    } catch (error) {
      console.error("Failed to fetch role:", error);
      setRole(null);
    } finally {
      setLoadingRole(false);
    }
  };

  useEffect(() => {
    if (contract && account && roleConstants) {
      fetchRoleFromContract();
    }
  }, [account, contract, roleConstants]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          console.log("[RoleProvider] No accounts connected");
          setAccount(null);
          setRole(null);
          setContract(null);
          setRoleConstants(null);
        } else {
          console.log("[RoleProvider] Account changed to:", accounts[0]);
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const value = {
    account,
    role,
    contract,
    setRole,
    connectWallet,
    loadingRole,
    roleConstants
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};