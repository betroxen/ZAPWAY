import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const AffiliatePage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, you would handle form submission here
        alert('Thank you for your inquiry! We will get back to you shortly.');
        e.currentTarget.reset();
    };

    const selectClassName = "flex h-10 w-full rounded-[4px] border border-[#3a3846] bg-[#24232d] px-3 py-2 text-sm text-white placeholder:text-[#8d8c9e] transition-colors hover:bg-[#2b2a34] hover:border-[#2e2d36] focus:outline-none focus:ring-2 focus:ring-[#1ed760] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none";

    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-2">Partner With Zap</h1>
            <p className="text-lg text-[#8d8c9e] mb-10">
                Zap is a rapidly growing hub and rewards platform that connects a dedicated community of smart crypto gamblers with the industry's best operators.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-[#8d8c9e] prose prose-invert max-w-none">
                     <style>{`.prose h3 { color: white; }`}</style>
                    <p>We are not a typical affiliate. We are a community-driven ecosystem built on transparency, data, and shared success. We are looking for long-term partners who share our values and want to help build a smarter, safer gaming landscape.</p>
                    <h3 className="font-heading text-xl text-white pt-4">For Casino Operators</h3>
                    <p>Join our curated list of trusted partners. We offer a direct line to a highly engaged, educated, and loyal community of players. Our model is built on transparent affiliate partnerships that drive high-quality, strategic traffic to your platform.</p>
                    <h3 className="font-heading text-xl text-white pt-4">For Affiliates & Content Creators</h3>
                    <p>Join our mission. If you are a streamer, writer, or community leader who believes in transparency and smart gaming, we want to connect. We offer unique ways to collaborate and reward your audience.</p>
                     <p className="pt-4">If you are interested in helping us build the future of crypto gaming, please complete the form.</p>
                </div>
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="full-name" className="block text-xs text-[#8d8c9e] font-medium mb-2">Full Name</label>
                            <Input type="text" id="full-name" name="full_name" required />
                        </div>
                         <div>
                            <label htmlFor="company-name" className="block text-xs text-[#8d8c9e] font-medium mb-2">Company / Brand Name (Optional)</label>
                            <Input type="text" id="company-name" name="company_name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs text-[#8d8c9e] font-medium mb-2">Email Address</label>
                            <Input type="email" id="email" name="email" required />
                        </div>
                         <div>
                            <label htmlFor="partnership-type" className="block text-xs text-[#8d8c9e] font-medium mb-2">Partnership Type</label>
                             <select id="partnership-type" name="partnership_type" required className={selectClassName}>
                                <option value="">--Please select an option--</option>
                                <option value="casino_operator">Casino / Operator</option>
                                <option value="affiliate_creator">Affiliate / Content Creator</option>
                                <option value="media">Media / Press</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs text-[#8d8c9e] font-medium mb-2">Message (Tell us about your brand)</label>
                            <textarea id="message" name="message" rows={4} required className={`${selectClassName.replace('h-10', '')} resize-none py-2`}></textarea>
                        </div>
                        <Button type="submit" className="w-full">Submit Inquiry</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};