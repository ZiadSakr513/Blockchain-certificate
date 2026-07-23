import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ShieldX, Plus, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import { CertificateTable } from "@/components/CertificateTable";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useContract } from "@/hooks/useContract";
import type { Certificate } from "@/types/certificate";

export function AdminDashboard() {
  const { address, isAdmin, connect, disconnect, loading: walletLoading } = useContract();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    setLoading(true);
    setError("");
    try {
      const { getAllCertificateIds, getTotalCertificates } = await import("@/hooks/useContract");
      
      const count = await getTotalCertificates();
      setTotalCount(count);
      
      if (count === 0) {
        setCertificates([]);
        setLoading(false);
        return;
      }

      const ids = await getAllCertificateIds();
      
      if (ids.length > 0) {
        const certs: Certificate[] = [];
        for (const id of ids) {
          certs.push({
            certificateId: id,
            studentName: "Loading...",
            courseName: "Loading...",
            organization: "Loading...",
            dateIssued: 0,
            grade: "",
            ipfsHash: "",
            exists: false,
          });
        }
        setCertificates(certs);
      } else {
        setCertificates([]);
      }
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCertificates();
    }
  }, [isAdmin]);

  if (!address) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <Shield className="mx-auto mb-4 text-slate-400" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Admin Access Required
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Connect to your local Hardhat node to access the admin dashboard.
          </p>
          <button
            onClick={connect}
            disabled={walletLoading}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {walletLoading ? "Connecting..." : "Connect (Local Hardhat)"}
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <ShieldX className="mx-auto mb-4 text-rose-500" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Unauthorized
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Connected wallet is not the contract owner.
          </p>
          <p className="mt-2 text-sm text-slate-500 font-mono break-all">
            {address}
          </p>
          <button
            onClick={disconnect}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and monitor all issued certificates
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCertificates}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <Link
            to="/issue"
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <Plus size={18} />
            Issue Certificate
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Total Certificates
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {totalCount}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Your Address
          </p>
          <p className="text-sm font-mono text-slate-900 dark:text-white break-all">
            {address.slice(0, 8)}...{address.slice(-6)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Connection
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Local Hardhat
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-sm flex items-start gap-2">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error loading certificates</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton count={5} />
      ) : certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.certificateId}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-mono">
                      {cert.certificateId}
                    </h3>
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                      ID Only
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Certificate details are available on-chain. Use the Verify page to check this certificate.
                  </p>
                </div>
                <Link
                  to={`/verify?id=${encodeURIComponent(cert.certificateId)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink size={16} />
                  Verify
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <EmptyState
            title="No Certificates Yet"
            description="No certificates have been issued. Start by issuing your first certificate."
          />
          <div className="p-6 pt-0">
            <Link
              to="/issue"
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <Plus size={18} />
              Issue First Certificate
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
