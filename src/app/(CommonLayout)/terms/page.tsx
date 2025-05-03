import React from 'react';

const TermsPage = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-[#4F46E5]">Terms and Conditions</h1>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                        <p className="text-gray-700">By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined here.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
                        <p className="text-gray-700">Permission is granted to temporarily access the materials on this website for personal, non-commercial use only.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
                        <p className="text-gray-700">The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
                        <p className="text-gray-700">In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Revisions</h2>
                        <p className="text-gray-700">We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
                        <p className="text-gray-700">These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TermsPage;