async function main() {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");

  // Deploy the contract and wait for deployment to finish
  const supplyChain = await SupplyChain.deploy();
  await supplyChain.waitForDeployment(); // Use waitForDeployment instead of deployed()

  console.log("SupplyChain deployed to:", await supplyChain.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
