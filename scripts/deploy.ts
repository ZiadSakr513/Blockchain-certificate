import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  const registry = await CertificateRegistry.deploy(deployer.address);

  await registry.waitForDeployment();
  const address = await registry.getAddress();

  console.log("CertificateRegistry deployed to:", address);
  console.log("Admin/Owner:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
