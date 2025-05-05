"use client";
import React from "react";
import { ScrollText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
          <ScrollText className="w-5 h-5" /> Legal Notice
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Understand the rules that govern your use of our services and platform.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-gray-800 leading-relaxed">
        <Section title="📘 1. Acceptance of Terms">
          By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined here.
        </Section>

        <Section title="🛠️ 2. Use License">
          Permission is granted to temporarily access the materials on this website for personal, non-commercial use only.
        </Section>

        <Section title="⚠️ 3. Disclaimer">
          The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
        </Section>

        <Section title="🚫 4. Limitations">
          In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on this website.
        </Section>

        <Section title="📝 5. Revisions">
          We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
        </Section>

        <Section title="⚖️ 6. Governing Law">
          These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </Section>

        <div className="text-sm text-gray-500 text-center mt-10">
          Last updated: <strong>{new Date().toLocaleDateString()}</strong>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
    <h2 className="text-xl font-semibold text-[#4F46E5] mb-2">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </section>
);

export default TermsPage;
