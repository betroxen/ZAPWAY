'use client';
import { useAuth } from '@/contexts/AuthContext';
import { db, DATABASE_ID, USERS_COLLECTION_ID } from '@/lib/appwrite';

export default function RightsPage() {
  const { user } = useAuth();

  const exportData = async () => {
    if (!user) return;
    try {
      const data = await db.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.id);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zapway-data-${user.email}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      console.error(e);
      alert('Could not export data.');
    }
  };

  const eraseAccount = async () => {
    if (!confirm('Permanently delete your account?')) return;
    if (!user) return;
    try {
      await db.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, user.id);
      alert('Account erased');
      // Ideally, you also call a server-side endpoint to delete the Appwrite auth user
      // and perform any other cleanup.
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
      alert('Could not erase account.');
    }
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your GDPR Rights</h1>
      <button onClick={exportData} className="bg-blue-500 text-white px-4 py-2 mr-4">Download Data (JSON)</button>
      <button onClick={eraseAccount} className="bg-red-500 text-white px-4 py-2">Delete Account</button>
    </div>
  );
}