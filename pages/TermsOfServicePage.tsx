import React from 'react';

export const TermsOfServicePage = () => {
    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-sm text-[#8d8c9e] mb-8">Effective Date: November 07, 2025</p>

            <div className="prose prose-invert max-w-none text-[#8d8c9e] space-y-6">
                <style>{`
                    .prose h2 { color: white; margin-top: 2em; padding-bottom: 0.5em; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .prose h3 { color: white; margin-top: 1.5em; }
                    .prose a { color: #1ed760; text-decoration: none; }
                    .prose a:hover { text-decoration: underline; }
                    .prose strong { color: white; }
                `}</style>
                <h2>1. Introduction & Agreement to Terms</h2>
                <p>These Terms and Conditions (“Terms”) constitute a legally binding agreement between you (“User,” “you,” or “your”) and ZapWay Corporation (“ZapWay,” “we,” “us,” or “our”), a company registered in the Autonomous Island of Anjouan...</p>
                {/* The rest of the Terms of Service content would be pasted here */}
                <p>By accessing, browsing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy (which is incorporated herein by reference). If you do not agree to these Terms, you must not access or use the Platform.</p>

                <h2>2. Definitions</h2>
                <p>"Content": All text, graphics, logos, images, software, trademarks, game guides, reviews, and other materials found on the Platform...</p>

                <h2>3. User Eligibility and Legal Compliance</h2>
                <h3>3.1. Minimum Age</h3>
                <p>You must be at least 18 years of age or the legal age for gambling in your jurisdiction of residence, whichever is higher, to use the Platform.</p>
                <h3>3.2. Legal Warranties</h3>
                <p>By using the Platform, you represent, warrant, and covenant that: (a) You meet the minimum age requirement... (d) It is your sole responsibility to determine the legality of using our services.</p>

                {/* ... Continue for all sections ... */}

                <h2>17. Contact Information</h2>
                <p>For any questions, concerns, or requests regarding these Terms:</p>
                <ul>
                    <li>Email: <a href="mailto:legal@zap.gg">legal@zap.gg</a></li>
                    <li>Address: ZapWay Corporation, Premier Business Centre, Rue de la Pépinière, Mutsamudu, Autonomous Island of Anjouan, Union of the Comoros</li>
                    <li>Support: <a href="mailto:support@zap.gg">support@zap.gg</a></li>
                </ul>
            </div>
        </div>
    );
};
