import React from 'react';

// This is a placeholder for the Privacy Policy page.
// In a real application, the full text would be included here.
export const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-sm text-[#8d8c9e] mb-8">Effective Date: November 07, 2025</p>

            <div className="prose prose-invert max-w-none text-[#8d8c9e] space-y-6">
                <style>{`
                    .prose h2 { color: white; margin-top: 2em; padding-bottom: 0.5em; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .prose h3 { color: white; margin-top: 1.5em; }
                    .prose a { color: #1ed760; text-decoration: none; }
                    .prose a:hover { text-decoration: underline; }
                    .prose strong { color: white; }
                `}</style>
                <h2>1. Introduction</h2>
                <p>ZapWay Corporation ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. By using the Platform, you agree to the collection and use of information in accordance with this policy.</p>

                <h2>2. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways. The information we may collect on the Platform includes:</p>
                <h3>2.1. Personal Data</h3>
                <p>Personally identifiable information, such as your username, email address, and demographic information, that you voluntarily give to us when you register with the Platform or when you choose to participate in various activities related to the Platform, such as online chat and message boards.</p>
                <h3>2.2. Derivative Data</h3>
                <p>Information our servers automatically collect when you access the Platform, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Platform.</p>
                
                <h2>3. Use of Your Information</h2>
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Platform to...</p>
                {/* ... Placeholder for more detailed sections ... */}

                <h2>9. Contact Us</h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                 <ul>
                    <li>Email: <a href="mailto:legal@zap.gg">legal@zap.gg</a></li>
                    <li>Address: ZapWay Corporation, Premier Business Centre, Rue de la Pépinière, Mutsamudu, Autonomous Island of Anjouan, Union of the Comoros</li>
                </ul>
            </div>
        </div>
    );
};
