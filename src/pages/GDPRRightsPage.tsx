import React, { useState } from 'react';
// FIX: Import modern hooks instead of legacy contexts
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../auth/authService';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';


export const GDPRRightsPage = () => {
  // FIX: Use modern hooks to get context values
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const exportData = async () => {
    if (!user || !showToast) return;
    setIsExporting(true);
    try {
      const userData = await authService.exportUserData(user.$id);
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zapway-data-${user.email}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('User data exported successfully.', 'success');
    } catch (error) {
      console.error("Failed to export data:", error);
      showToast('Failed to export data. See console for details.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const erase = async () => {
    if (!user || !logout || !showToast) return;
    if (!window.confirm('CRITICAL: Are you sure you want to permanently delete your account and all associated data? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      await authService.deleteAccount(user.$id);
      showToast('Account deleted successfully.', 'info');
      logout(); // This will update the global state and trigger re-render in App.tsx
    } catch (error) {
      console.error("Failed to delete account:", error);
      showToast('Failed to delete account. See console for details.', 'error');
      setIsDeleting(false);
    }
    // No need to setIsDeleting(false) on success, as the component will unmount.
  };

  if (!user) return <p className="p-10 text-center">Please log in to manage your data.</p>;

  return (
    <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
        <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-white mb-4">Your GDPR Rights</h1>
            <p className="text-lg text-[#8d8c9e]">Manage your data and privacy settings.</p>
        </div>
        
        <div className="bg-[#14131c] border border-[#333] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
                <h2 className="font-heading text-xl text-white mb-2 flex items-center gap-2"><Icons.Database className="h-5 w-5 text-[#00FFC0]" /> Data Export</h2>
                <p className="text-[#8d8c9e] mb-4">Download a JSON file containing all your user profile data stored in our database.</p>
                <Button onClick={exportData} loading={isExporting} className="w-full md:w-auto font-heading uppercase tracking-wider">
                    Download Data
                </Button>
            </div>
            <div className="w-full md:w-px h-px md:h-24 bg-[#333]"></div>
            <div className="flex-1">
                <h2 className="font-heading text-xl text-red-500 mb-2 flex items-center gap-2"><Icons.Trash className="h-5 w-5" /> Account Deletion</h2>
                <p className="text-[#8d8c9e] mb-4">Permanently delete your user profile and associated authentication account. This action is irreversible.</p>
                <Button onClick={erase} loading={isDeleting} variant="secondary" className="w-full md:w-auto font-heading uppercase tracking-wider border-red-900/50 text-red-400 hover:bg-red-950/30 hover:border-red-500">
                    Delete Account
                </Button>
            </div>
        </div>
    </div>
  );
}