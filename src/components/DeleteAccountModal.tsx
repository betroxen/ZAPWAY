
import React, { useState } from \'react\';
import { Icons } from \'./icons\';
import { Button } from \'./Button\';
import { Input } from \'./Input\';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
  showToast: (message: string, type: \'success\' | \'error\' | \'info\') => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm, showToast }) => {
    const [password, setPassword] = useState(\'\');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(\'\');

    const handleConfirm = async () => {
        if (!password) {
            setError(\'PASSWORD IS REQUIRED FOR THIS ACTION\');
            return;
        }
        setIsLoading(true);
        setError(\'\');
        try {
            await onConfirm(password);
            // The parent component will handle closing and success messages
        } catch (err: any) {
            setError(err.message || \'An unexpected error occurred.\');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className=\"fixed inset-0 z-50 flex items-center justify-center p-4\">
            <div className=\"fixed inset-0 bg-black/80 backdrop-blur-sm\" onClick={onClose} />
            <div className=\"relative w-full max-w-lg bg-red-950/20 border-2 border-red-900/50 rounded-xl shadow-lg animate-modal-enter overflow-hidden\">
                {/* Caution Stripes */}
                <div className=\"absolute top-0 left-0 w-full h-2.5 bg-[repeating-linear-gradient(45deg,rgba(239,68,68,0.4),rgba(239,68,68,0.4)_15px,transparent_15px,transparent_30px)]\"></div>

                <div className=\"p-8 text-center\">
                    <div className=\"mx-auto w-fit bg-red-500/10 text-red-500 p-3 rounded-full mb-4\">
                        <Icons.AlertTriangle className=\"h-8 w-8\" />
                    </div>
                    <h2 className=\"font-heading text-2xl text-red-400 uppercase tracking-widest\">Self-Destruct Protocol</h2>
                    <p className=\"text-[#8d8c9e] mt-2 mb-6 max-w-sm mx-auto\">This is a permanent, irreversible action. To confirm, please enter your current passkey below.</p>
                    
                    <div className=\"space-y-4\">
                         <Input 
                            type=\"password\" 
                            placeholder=\"ENTER YOUR PASSKEY TO CONFIRM...\"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className=\"text-center font-mono tracking-widest bg-black/30 border-red-900/50 focus:border-red-500\"
                            disabled={isLoading}
                        />

                        {error && <p className=\"text-yellow-400 text-xs font-mono text-center pt-2\">{error}</p>}

                        <Button 
                            variant=\"destructive\" 
                            onClick={handleConfirm} 
                            loading={isLoading} 
                            disabled={isLoading || !password}
                            className=\"w-full uppercase font-heading tracking-widest py-3 text-base\"
                        >
                            {isLoading ? \'DECOMMISSIONING...\' : \'Confirm and Delete Account\'}
                        </Button>
                        <Button variant=\"ghost\" onClick={onClose} className=\"text-[#8d8c9e] hover:text-white uppercase text-xs\">
                           Abort Sequence
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
