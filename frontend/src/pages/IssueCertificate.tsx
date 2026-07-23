import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import { issueCertificate } from "@/hooks/useContract";
import type { CertificateFormData } from "@/types/certificate";

export function IssueCertificate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CertificateFormData>({
    certificateId: "",
    studentName: "",
    courseName: "",
    organization: "",
    dateIssued: "",
    grade: "",
    ipfsHash: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CertificateFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CertificateFormData, string>> = {};

    if (!formData.certificateId.trim()) {
      newErrors.certificateId = "Certificate ID is required";
    }
    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
    }
    if (!formData.courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }
    if (!formData.dateIssued) {
      newErrors.dateIssued = "Date issued is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await issueCertificate(formData);
      navigate("/admin");
    } catch (error) {
      console.error("Failed to issue certificate:", error);
      alert("Failed to issue certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CertificateFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-primary-600 px-6 py-5">
          <div className="flex items-center gap-3">
            <Plus className="text-white" size={24} />
            <div>
              <h1 className="text-xl font-semibold text-white">Issue New Certificate</h1>
              <p className="text-primary-100 text-sm">
                Fill in the details below to issue a new certificate on the blockchain
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Certificate ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                placeholder="e.g., CERT-001"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.certificateId
                    ? "border-rose-300 dark:border-rose-700"
                    : "border-slate-200 dark:border-slate-700"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.certificateId && (
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                  {errors.certificateId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Student Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g., Alice Smith"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.studentName
                    ? "border-rose-300 dark:border-rose-700"
                    : "border-slate-200 dark:border-slate-700"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.studentName && (
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                  {errors.studentName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="e.g., Blockchain Fundamentals"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.courseName
                    ? "border-rose-300 dark:border-rose-700"
                    : "border-slate-200 dark:border-slate-700"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.courseName && (
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                  {errors.courseName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g., Tech Academy"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.organization
                    ? "border-rose-300 dark:border-rose-700"
                    : "border-slate-200 dark:border-slate-700"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                  {errors.organization}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Date Issued <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="dateIssued"
                value={formData.dateIssued}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.dateIssued
                    ? "border-rose-300 dark:border-rose-700"
                    : "border-slate-200 dark:border-slate-700"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.dateIssued && (
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                  {errors.dateIssued}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Grade <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g., A, A+, Pass"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                IPFS / File URL <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                type="text"
                name="ipfsHash"
                value={formData.ipfsHash}
                onChange={handleChange}
                placeholder="e.g., ipfs://QmHash..."
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Issuing...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Issue Certificate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
