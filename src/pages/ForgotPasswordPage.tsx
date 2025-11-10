
import React, { useState } from \'react\';
import { Icons } from \'../components/icons\';
import { Button } from \'../components/Button\';
import { Input } from \'../components/Input\';
import { ZapLogo } from \'../components/ZapLogo\';

interface ForgotPasswordPageProps {
    onBackToLogin: () => void; // Function to switch back to the login view
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin }) => {
    const [email, setEmail] = useState(\'\');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(\'\');
    const [error, setError] = useState(\'\');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(\'\');
        setMessage(\'\');
        setIsLoading(true);

        if (!email) {
            setError(\'EMAIL ADDRESS IS REQUIRED\');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(\'http://localhost:3001/request-password-reset\', {
                method: \'POST\',
                headers: { \'Content-Type\': \'application/json\' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || \'An unknown error occurred.\');
            }

            setMessage(\'RECOVERY EMAIL SENT. Check your inbox to proceed.\');
        } catch (err: any) {
            setError(err.message.toUpperCase() || \'FAILED TO SEND RECOVERY EMAIL\');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=\"w-full max-w-md mx-auto p-6 animate-fadeIn\">
             <div className=\"text-center mb-6\">
                <ZapLogo className=\"mx-auto mb-4 p-3 rounded-2xl inline-block\" iconClassName=\"h-10 w-10\" />
                <h2 className=\"font-heading text-xl text-white uppercase tracking-widest\">Passkey Recovery</h2>
                <p className=\"text-xs font-mono text-[#00FFC0] mt-2 tracking-wider opacity-80\">// INITIATE GRID RE-ENTRY PROTOCOL</p>
            </div>

            {message ? (
                <div className=\"p-4 bg-green-950/50 border border-green-700/50 rounded text-center font-mono text-sm text-green-300\">
                    {message}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className=\"space-y-4\">
                    <div className=\"space-y-1\">
                        <label className=\"text-[10px] font-mono text-[#8d8c9e] uppercase ml-1\">Email Protocol</label>
                        <div className=\"relative\">
                            <Icons.Mail className=\"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]\" />
                            <Input 
                                type=\"email\" 
                                placeholder=\"OPERATOR@ZAP.GG\" 
                                className=\"pl-10 font-mono\"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        disabled={isLoading || !email}
                    >
                        {isLoading ? \'SENDING RECOVERY LINK...\' : \'REQUEST RECOVERY LINK\'}
                    </Button>
                </form>
            )}

            <div className=\"mt-6 text-center\">
                <button 
                    onClick={onBackToLogin}
                    className=\"text-xs font-mono text-[#8d8c9e] hover:text-[#00FFC0] transition-colors uppercase tracking-wider\"
                >
                    [ RETURN TO AUTHENTICATION ]
                </button>
            </div>
        </div>
    );
};
