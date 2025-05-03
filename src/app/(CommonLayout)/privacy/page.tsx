import React from 'react';

const PrivacyPage = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="mb-4">
                        This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p className="mb-4">We collect information that you provide directly to us, including:</p>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Name and contact information</li>
                        <li>Account credentials</li>
                        <li>Payment information</li>
                        <li>Communication preferences</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <p className="mb-4">We use the collected information to:</p>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Provide and maintain our services</li>
                        <li>Process your transactions</li>
                        <li>Send you important updates and notifications</li>
                        <li>Improve our services</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p className="mb-4">
                        We implement appropriate security measures to protect your personal information from unauthorized access, 
                        alteration, disclosure, or destruction.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                    <p className="mb-4">You have the right to:</p>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Opt-out of marketing communications</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        Email: privacy@example.com
                    </p>
                </section>

                <section>
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </section>
            </div>
        </>
    );
};

export default PrivacyPage;