
import React, { useState, useEffect } from \'react\';
import { useLocation } from \'react-router-dom\'; // Assuming you use react-router for URL params
import { Icons } from \'../components/icons\';
import { Button } from \'../components/Button\';
import { Input } from \'../components/Input\';
import { ZapLogo } from \'../components/ZapLogo\';

// Utility to parse query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const ResetPasswordPage: React.FC = () => {
    const query = useQuery();
    const [password, setPassword] = useState(\'\');
    const [confirmPassword, setConfirmPassword] = useState(\'\');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(\'\');
    const [error, setError] = useState(\'\');

    const [userId, setUserId] = useState<string | null>(null);
    const [secret, setSecret] = useState<string | null>(null);

    useEffect(() => {
        const userIdParam = query.get(\'userId\');
        const secretParam = query.get(\'secret\');
        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
        } else {
            setError(\'INVALID OR EXPIRED RECOVERY LINK.\');
        }
    }, [query]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(\'\');
        setMessage(\'\');

        if (!password || !confirmPassword) {
            setError(\'BOTH PASSKEY FIELDS ARE REQUIRED\');
            return;
        }
        if (password !== confirmPassword) {
            setError(\'PASSKEYS DO NOT MATCH\');
            return;
        }
        // Add password strength validation here if desired

        setIsLoading(true);

        try {
            const response = await fetch(\'http://localhost:3001/complete-password-reset\', {
                method: \'POST\',
                headers: { \'Content-Type\': \'application/json\' },
                body: JSON.stringify({ userId, secret, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || \'An unknown error occurred.\');
            }

            setMessage(\'PASSKEY RESET SUCCESSFUL. You can now log in.\');
        } catch (err: any) {
            setError(err.message.toUpperCase() || \'FAILED TO RESET PASSKEY\');
        } finally {
            setIsLoading(false);
        }
    };

    if (!userId || !secret) {
        return (
             <div className=\"w-full max-w-md mx-auto p-6 text-center\">
                 <ZapLogo className=\"mx-auto mb-4 p-3 rounded-2xl inline-block\" iconClassName=\"h-10 w-10\" />
                 <h2 className=\"font-heading text-xl text-white uppercase tracking-widest\">Invalid Link</h2>
                 <p className=\"p-4 mt-4 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-sm font-mono\">
                     {error}
                 </p>
             </div>
        );
    }

    return (
        <div className=\"w-full max-w-md mx-auto p-6 animate-fadeIn\">
            <div className=\"text-center mb-6\">
                 <ZapLogo className=\"mx-auto mb-4 p-3 rounded-2xl inline-block\" iconClassName=\"h-10 w-10\" />
                <h2 className=\"font-heading text-xl text-white uppercase tracking-widest\">Set New Passkey</h2>
                <p className=\"text-xs font-mono text-[#00FFC0] mt-2 tracking-wider opacity-80\">// FINALIZE GRID RE-ENTRY</p>
            </div>

            {message ? (
                <div className=\"p-4 bg-green-950/50 border border-green-700/50 rounded text-center font-mono text-sm text-green-300\">
                    {message}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className=\"space-y-4\">
                    <div className=\"space-y-1\">
                        <label className=\"text-[10px] font-mono text-[#8d8c9e] uppercase ml-1\">New Passkey</label>
                        <div className=\"relative\">
                            <Icons.Lock className=\"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]\" />
                            <Input 
                                type=\"password\" 
                                placeholder=\"ENTER NEW PASSKEY\"
                                className=\"pl-10 font-mono\"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className=\"space-y-1\">
                        <label className=\"text-[10px] font-mono text-[#8d8c9e] uppercase ml-1\">Confirm New Passkey</label>
                        <div className=\"relative\">
                            <Icons.Lock className=\"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]\" />
                            <Input 
                                type=\"password\" 
                                placeholder=\"RE-ENTER NEW PASSKEY\"
                                className=\"pl-10 font-mono\"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className=\"p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-xs font-mono flex items-center gap-2\">
                            <Icons.AlertTriangle className=\"h-4 w-4 shrink-0\" /> {error}
                        </div>
                    )}

                    <Button 
                        type=\"submit\" 
                        className=\"w-full font-heading uppercase tracking-[0.15em] text-sm py-3 transition-all duration-300\"
                        size=\"lg\"
                        loading={isLoading}
                        disabled={isLoading || !password || !confirmPassword}
                    >
                        {isLoading ? \'SECURING PASSKEY...\' : \'SET NEW PASSKEY\'}
                    </Button>
                </form>
            )}
        </div>
    );
};
