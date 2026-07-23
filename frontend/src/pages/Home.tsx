import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, Clock, Search } from "lucide-react";

export function Home() {
  const benefits = [
    {
      icon: Shield,
      title: "Immutable Records",
      description:
        "Once issued, certificates are permanently recorded on the blockchain and cannot be altered or deleted.",
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description:
        "Verify any certificate in seconds using its unique ID. No need to contact the issuing institution.",
    },
    {
      icon: Search,
      title: "Cryptographically Secure",
      description:
        "Each certificate is secured by cryptographic proofs, making forgery virtually impossible.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Access certificate verification anywhere, anytime, without relying on centralized servers.",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Verify Certificates on the{" "}
              <span className="text-primary-600 dark:text-primary-400">Blockchain</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
              Trust, transparency, and immutability for academic and professional
              certificates. No more paper fraud or fake credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/verify"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Verify Certificate
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Blockchain for Certificates?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Blockchain technology provides an unprecedented level of trust and
              transparency for credential verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 md:p-12 text-center border border-primary-100 dark:border-primary-800">
            <Shield className="mx-auto mb-4 text-primary-600 dark:text-primary-400" size={48} />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Verify a Certificate?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
              Enter a certificate ID to instantly verify its authenticity on the
              blockchain. It's fast, secure, and completely free.
            </p>
            <Link
              to="/verify"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Verify Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
