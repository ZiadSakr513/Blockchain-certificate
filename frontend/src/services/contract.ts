import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import cerAbi from "../cer.abi.json" assert {
  type: "json",
};

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

export function getContract(address: string, providerOrSigner: BrowserProvider | JsonRpcSigner): Contract {
  return new Contract(address, cerAbi.abi as unknown as string[], providerOrSigner);
}

export function getProvider(): BrowserProvider {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this application.");
  }
  return new BrowserProvider(window.ethereum);
}

export async function getSigner(): Promise<JsonRpcSigner> {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer;
}

export async function connectWallet(): Promise<string> {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  return address;
}
