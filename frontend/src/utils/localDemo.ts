import { ethers } from "ethers";

const DEMO_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export function connectDemoMode(): Promise<string> {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(DEMO_PRIVATE_KEY, provider);
  return wallet.getAddress();
}
