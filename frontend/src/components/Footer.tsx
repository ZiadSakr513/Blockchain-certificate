import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="text-primary-600" size={24} />
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              CertVerify
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © 2024 CertVerify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
            >
              Home
            </Link>
            <Link
              to="/verify"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
            >
              Verify
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
