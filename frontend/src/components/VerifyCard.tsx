import type { Certificate } from "@/types/certificate";
import { formatDate, formatAddress } from "@/utils/helpers";
import { Shield, Building2, BookOpen, Calendar, User, ExternalLink } from "lucide-react";

interface VerifyCardProps {
  certificate: Certificate;
}

export function VerifyCard({ certificate }: VerifyCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-primary-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-white" size={24} />
            <div>
              <h2 className="text-white font-semibold">Verified Certificate</h2>
              <p className="text-primary-100 text-sm">Blockchain Confirmed</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
            Authentic
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Student Name
              </p>
              <div className="flex items-center gap-2">
                <User size={16} className="text-slate-400" />
                <p className="text-slate-900 dark:text-white font-medium">
                  {certificate.studentName}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Course
              </p>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-slate-400" />
                <p className="text-slate-900 dark:text-white font-medium">
                  {certificate.courseName}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Organization
              </p>
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" />
                <p className="text-slate-900 dark:text-white font-medium">
                  {certificate.organization}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Date Issued
              </p>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <p className="text-slate-900 dark:text-white font-medium">
                  {formatDate(certificate.dateIssued)}
                </p>
              </div>
            </div>

            {certificate.grade && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Grade
                </p>
                <p className="text-slate-900 dark:text-white font-medium">
                  {certificate.grade}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Certificate ID
              </p>
              <code className="text-sm font-mono text-primary-600 dark:text-primary-400 break-all">
                {certificate.certificateId}
              </code>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Shield className="text-emerald-600 dark:text-emerald-400" size={20} />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This certificate is verified on the blockchain and cannot be forged or altered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
