import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getContract } from "@/services/contract";
import type { Certificate } from "@/types/certificate";

const HARDHAT_RPC = "http://127.0.0.1:8545";
const DEMO_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export function useContract() {
  const [address, setAddress] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;

  const checkAdminStatus = useCallback(async (addr: string, provider: unknown) => {
    try {
      const contract = getContract(contractAddress, provider);
      const owner = await contract.owner();
      setIsAdmin(addr.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      console.error("Failed to check admin status:", error);
    }
  }, [contractAddress]);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const { ethers } = await import("ethers");
      const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
      const wallet = new ethers.Wallet(DEMO_PRIVATE_KEY, provider);
      const addr = await wallet.getAddress();

      setAddress(addr);
      await checkAdminStatus(addr, provider);
      toast.success("Connected to local Hardhat node!");
    } catch (error) {
      console.error("Connection failed:", error);
      toast.error("Connection failed. Is Hardhat node running?");
    } finally {
      setLoading(false);
    }
  }, [checkAdminStatus]);

  const disconnect = useCallback(() => {
    setAddress("");
    setIsAdmin(false);
    setInitialized(false);
  }, []);

  const initialize = useCallback(async () => {
    if (initialized) return;
    setInitialized(true);
  }, [initialized]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    address,
    isAdmin,
    loading,
    connect,
    disconnect,
  };
}

export async function issueCertificate(data: {
  certificateId: string;
  studentName: string;
  courseName: string;
  organization: string;
  dateIssued: string;
  grade: string;
  ipfsHash: string;
}): Promise<void> {
  const { ethers } = await import("ethers");
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
  const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
  const wallet = new ethers.Wallet(DEMO_PRIVATE_KEY, provider);
  const signer = wallet.connect(provider);
  const contract = getContract(contractAddress, signer);
  const dateIssuedTimestamp = Math.floor(new Date(data.dateIssued).getTime() / 1000);

  const tx = await contract.issueCertificate(
    data.certificateId,
    data.studentName,
    data.courseName,
    data.organization,
    dateIssuedTimestamp,
    data.grade,
    data.ipfsHash
  );

  toast.loading("Issuing certificate...", { id: "issue" });
  await tx.wait();
  toast.success("Certificate issued successfully!", { id: "issue" });
}

export async function verifyCertificate(certificateId: string): Promise<Certificate | null> {
  try {
    const { ethers } = await import("ethers");
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
    const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
    const contract = getContract(contractAddress, provider);

    const exists = await contract.certificateExists(certificateId);
    if (!exists) {
      return null;
    }

    const cert = await contract.verifyCertificate(certificateId);
    console.log("verifyCertificate raw result:", cert);
    
    const data = cert as unknown as {
      studentName: string;
      courseName: string;
      organization: string;
      dateIssued: bigint;
      grade: string;
      ipfsHash: string;
      exists: boolean;
    };
    
    return {
      certificateId,
      studentName: data.studentName,
      courseName: data.courseName,
      organization: data.organization,
      dateIssued: Number(data.dateIssued),
      grade: data.grade,
      ipfsHash: data.ipfsHash,
      exists: data.exists,
    };
  } catch (error) {
    console.error("Failed to verify certificate:", error);
    throw error;
  }
}

export async function getTotalCertificates(): Promise<number> {
  try {
    const { ethers } = await import("ethers");
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
    const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
    const contract = getContract(contractAddress, provider);
    const count = await contract.totalCertificates();
    return Number(count);
  } catch (error) {
    console.error("Failed to get total certificates:", error);
    throw error;
  }
}

export async function getAllCertificateIds(): Promise<string[]> {
  try {
    const { ethers } = await import("ethers");
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
    const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
    const contract = getContract(contractAddress, provider);
    const result = await contract.getAllCertificateIds();
    return result as string[];
  } catch (error) {
    console.error("Failed to get certificate IDs:", error);
    throw error;
  }
}

export async function fetchCertificateBatch(ids: string[]): Promise<Certificate[]> {
  const { ethers } = await import("ethers");
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
  const provider = new ethers.JsonRpcProvider(HARDHAT_RPC);
  const contract = getContract(contractAddress, provider);
  const results: Certificate[] = [];

  for (const id of ids) {
    try {
      const exists = await contract.certificateExists(id);
      if (exists) {
        const cert = await contract.verifyCertificate(id);
        const data = cert as unknown as {
          studentName: string;
          courseName: string;
          organization: string;
          dateIssued: bigint;
          grade: string;
          ipfsHash: string;
          exists: boolean;
        };
        
        results.push({
          certificateId: id,
          studentName: data.studentName,
          courseName: data.courseName,
          organization: data.organization,
          dateIssued: Number(data.dateIssued),
          grade: data.grade,
          ipfsHash: data.ipfsHash,
          exists: data.exists,
        });
      } else {
        console.warn(`Certificate ${id} does not exist on chain`);
      }
    } catch (error) {
      console.error(`Failed to fetch certificate ${id}:`, error);
    }
  }

  return results;
}
