
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';

export const SettingsPage = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-8">Settings</h1>

            <div className="space-y-8">
                {/* Account Information */}
                <Card className="p-6">
                    <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2">
                        <Icons.Users className="h-5 w-5 text-[#1ed760]" /> Account Information
                    </h2>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-[#8d8c9e] mb-1">Username</label>
                            <Input value="DegenGambler" disabled className="opacity-70 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8d8c9e] mb-1">Email Address</label>
                            <Input type="email" value="degen@zap.gg" />
                        </div>
                        <Button className="mt-2">Save Changes</Button>
                    </div>
                </Card>

                {/* Security */}
                <Card className="p-6">
                    <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2">
                        <Icons.Lock className="h-5 w-5 text-[#1ed760]" /> Security
                    </h2>
                    <div className="space-y-6">
                         <div>
                            <h3 className="text-white font-medium mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                <Input type="password" placeholder="Current Password" />
                                <Input type="password" placeholder="New Password" />
                            </div>
                            <Button variant="secondary" className="mt-4">Update Password</Button>
                        </div>
                        <div className="pt-6 border-t border-[#3a3846]">
                            <Toggle 
                                checked={twoFactor} 
                                onChange={setTwoFactor} 
                                label="Two-Factor Authentication (2FA)"
                                description="Secure your account with an extra layer of protection."
                            />
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="p-6">
                    <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2">
                        <Icons.Mail className="h-5 w-5 text-[#1ed760]" /> Notifications
                    </h2>
                    <div className="divide-y divide-[#3a3846]">
                        <Toggle 
                            checked={emailNotifications} 
                            onChange={setEmailNotifications} 
                            label="Email Notifications"
                            description="Receive essential updates about your account security and missions."
                        />
                        <Toggle 
                            checked={marketingEmails} 
                            onChange={setMarketingEmails} 
                            label="Marketing Communications"
                            description="Receive offers, newsletters, and exclusive partner bonuses."
                        />
                    </div>
                </Card>

                {/* Danger Zone */}
                 <Card className="p-6 border-red-900/50 bg-red-950/10">
                    <h2 className="font-heading text-xl text-red-500 mb-4">Danger Zone</h2>
                    <p className="text-[#8d8c9e] mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <Button variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/20">
                        Delete Account
                    </Button>
                </Card>
            </div>
        </div>
    );
};
