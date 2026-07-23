import type { Certificate } from "@/types/certificate";
import { formatDate, copyToClipboard, truncateText } from "@/utils/helpers";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

interface CertificateTableProps {
  certificates: Certificate[];
  loading?: boolean;
}

export function CertificateTable({ certificates, loading }: CertificateTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    await copyToClipboard(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">No certificates issued yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Certificate ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Student
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Course
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Date
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {certificates.map((cert) => (
              <tr
                key={cert.certificateId}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-primary-600 dark:text-primary-400">
                      {truncateText(cert.certificateId, 16)}
                    </code>
                    <button
                      onClick={() => handleCopy(cert.certificateId)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                      title="Copy Certificate ID"
                    >
                      {copiedId === cert.certificateId ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} className="text-slate-400" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                  {cert.studentName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {cert.courseName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {formatDate(cert.dateIssued)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
