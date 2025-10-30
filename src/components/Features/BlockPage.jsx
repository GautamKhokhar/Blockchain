import React from 'react';
import SupplyChainFeatures from './SupplyChainFeatures';
import BlockchainFeatures from './BlockchainFeatures';

const BlockPage = () => {
    return (
        <div className="Block-page">
            <SupplyChainFeatures />
            <BlockchainFeatures />
        </div>
    )

}
export default BlockPage;