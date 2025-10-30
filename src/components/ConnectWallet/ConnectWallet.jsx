import React, { useState, useEffect } from 'react';
import RoleSelector from '../Layout/RoleSelector';  // adjust path
import './ConnectWallet.css';
import { useRole } from '../../context/RoleContext'; // Import context hook

const ConnectWallet = () => {
  const { connectWallet, account: contextAccount } = useRole();
  const [localAccount, setLocalAccount] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Use RoleContext’s account state to keep in sync
  useEffect(() => {
    setLocalAccount(contextAccount);
    console.log('[ConnectWallet] RoleContext account changed:', contextAccount);
  }, [contextAccount]);

  // Remove local account management; delegate wallet connect to context
  const handleConnectClick = async () => {
    try {
      await connectWallet();
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg('Connection to wallet was rejected.');
      console.error('[ConnectWallet] Wallet connection error:', err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          console.log('[ConnectWallet] accountsChanged:', accounts);
          connectWallet();  // Refresh contract and context on account change
          setErrorMsg(null);
        } else {
          setLocalAccount(null);
          setErrorMsg('Please connect to MetaMask.');
        }
      });
    }
  }, [connectWallet]);

  return (
    <div className="connects-wallets-pages">
      <div className="wallets-roles-containers">
        <div className="connects-wallets-containers">
          <h2 className="pages-titles">Connect Wallet</h2>
          {localAccount ? (
            <p className="connecteds-accounts">
              <strong>Connected Account:</strong> {localAccount}
            </p>
          ) : (
            <>
              <button onClick={handleConnectClick} className="connects-wallets-buttons">
                Connect MetaMask Wallet
              </button>
              {errorMsg && <p className="error-message">{errorMsg}</p>}
            </>
          )}
        </div>
        {localAccount && <RoleSelector />}
      </div>
    </div>
  );
};

export default ConnectWallet;
