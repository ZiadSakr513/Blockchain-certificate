import { useState } from "react";
import { Search, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { VerifyCard } from "@/components/VerifyCard";
import { EmptyState } from "@/components/EmptyState";
import { verifyCertificate } from "@/hooks/useContract";
import type { CertificateFormData } from "@/types/certificate";

export function Verify() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateFormData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    try {
      const cert = await verifyCertificate(certificateId.trim());
      if (cert) {
        setResult(cert as unknown as CertificateFormData);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <ShieldCheck className="mx-auto mb-4 text-primary-600" size={48} />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Verify Certificate
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a Certificate ID below to verify its authenticity on the
          blockchain.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID (e.g., CERT-001)"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !certificateId.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>

      {notFound && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <EmptyState
            title="Certificate Not Found"
            description="The certificate ID you entered does not exist on the blockchain. Please check the ID and try again."
            icon={<ShieldX className="text-slate-400" size={32} />}
          />
        </div>
      )}

      {result && <VerifyCard certificate={result} />}
    </div>
  );
}
