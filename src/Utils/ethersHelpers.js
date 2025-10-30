import { ethers } from "ethers";
import SupplyChainArtifact from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, SupplyChainArtifact.abi, signerOrProvider);
}
