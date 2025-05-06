"use client";
import React from "react";
import { ShieldCheck, Mail } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
          <ShieldCheck className="w-5 h-5" /> Privacy Matters
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-4">
          Our Privacy Policy
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          We&apos;re committed to protecting your personal data and transparency in how we use it.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 text-gray-800 leading-relaxed">
        <Section title="📘 Introduction">
          This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
        </Section>

        <Section title="📋 Information We Collect">
          We collect information that you provide directly to us, including:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
          </ul>
        </Section>

        <Section title="🔍 How We Use Your Information">
          We use the collected information to:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Provide and maintain our services</li>
            <li>Process your transactions</li>
            <li>Send you important updates and notifications</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="🔐 Data Security">
          We implement appropriate security measures to protect your personal information from unauthorized access,
          alteration, disclosure, or destruction.
        </Section>

        <Section title="🧾 Your Rights">
          You have the right to:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </Section>

        <Section title="📨 Contact Us">
          If you have any questions about this Privacy Policy, please contact us:
          <div className="mt-2 flex items-center gap-2 text-blue-600">
            <Mail className="w-4 h-8" />
            <span>medimart@gmail.com</span>
          </div>
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

export default PrivacyPage;
