import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { useToast } from '../context/ToastContext';
import { mockCasinosData } from '../constants/casinos';
import { useSound } from '../context/SoundContext';

const STEPS = ['TARGET', 'SIGNAL', 'DATA', 'EVIDENCE', 'TRANSMIT'];

const CATEGORIES = [
    { value: 'PAYOUT', label: 'PAYOUT SPEED', desc: 'Time from request to wallet.' },
    { value: 'SUPPORT', label: 'SUPPORT CIRCUIT', desc: 'Competence & speed of service.' },
    { value: 'BONUS', label: 'BONUS T&C', desc: 'Clarity & fairness of terms.' },
    { value: 'UX', label: 'GENERAL UX', desc: 'Interface, mobile, loading.' },
];

const PRIORITIES = [
    { value: 'STANDARD', label: 'STANDARD', color: 'text-[#8d8c9e]' },
    { value: 'ELEVATED', label: 'ELEVATED (Severe Delay)', color: 'text-yellow-500' },
    { value: 'CRITICAL', label: 'CRITICAL (Security/Fraud)', color: 'text-red-500' },
];

export const ReviewModal = ({ isOpen, onClose, initialCasinoId }) => {
  const { showToast } = useToast();
  const { playSound } = useSound();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
      targetOperator: initialCasinoId || '',
      incidentDate: '',
      category: 'PAYOUT',
      priority: 'STANDARD',
      ratingPayout: 0,
      ratingTerms: 0,
      ratingSupport: 0,
      summary: '',
      evidenceUrl: '',
      txId: '',
      attestData: false,
      attestTerms: false
  });

  useEffect(() => {
      if (isOpen) {
          playSound('ui_open', 0.5);
          setCurrentStep(initialCasinoId ? 1 : 1);
          setFormData({
              targetOperator: initialCasinoId || '',
              incidentDate: new Date().toISOString().split('T')[0],
              category: 'PAYOUT',
              priority: 'STANDARD',
              ratingPayout: 0,
              ratingTerms: 0,
              ratingSupport: 0,
              summary: '',
              evidenceUrl: '',
              txId: '',
              attestData: false,
              attestTerms: false
          });
          setSearchTerm('');
      }
  }, [isOpen, initialCasinoId, playSound]);

  const handleClose = () => {
    playSound('ui_close', 0.4);
    onClose();
  };

  const selectedCasino = useMemo(() => mockCasinosData.find(c => c.id === formData.targetOperator), [formData.targetOperator]);
  const filteredCasinos = useMemo(() => {
      if (!searchTerm) return mockCasinosData.slice(0, 5);
      return mockCasinosData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
      // Validation logic...
      return true;
  };

  const handleNext = () => {
      if (validateStep()) {
          setCurrentStep(prev => prev + 1);
      }
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
      if (!validateStep()) return;
      showToast("VPR TRANSMITTED. Validation Queue activated. +50 SSP Pending.", "success");
      handleClose();
  };

  const MetricRater = ({ label, field }) => (
    <div className="bg-[#0c0c0e] p-4 rounded-lg border border-[#3a3846]">
        <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-3">{label}</label>
        <div className="flex justify-between items-center gap-2">
            <span className="text-xs text-[#8d8c9e] font-mono">FAIL (1)</span>
            <div className="flex gap-1 flex-1 justify-center">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        onClick={() => {
                            handleInputChange(field, val);
                            playSound('click_secondary', 0.1 + (val * 0.05));
                        }}
                        className={`h-10 flex-1 max-w-[50px] rounded-sm font-bold transition-all border ${
                            formData[field] >= val 
                            ? 'bg-[#00FFC0] border-[#00FFC0] text-black shadow-[0_0_10px_rgba(0,255,192,0.3)]' 
                            : 'bg-[#14131c] border-[#3a3846] text-[#8d8c9e] hover:border-white/30'
                        }`}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <span className="text-xs text-[#8d8c9e] font-mono">OPTIMAL (5)</span>
        </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={handleClose} />
      <div className="relative w-full max-w-3xl rounded-xl bg-[#14131c] border border-[#3a3846] shadow-2xl animate-fadeIn flex flex-col my-auto max-h-[95vh]">
        <div className="p-6 border-b border-[#3a3846] bg-[#0c0c0e] rounded-t-xl">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-white flex items-center gap-3 uppercase">
                        <Icons.Database className="h-6 w-6 text-[#00FFC0] animate-pulse" /> 
                        ZAP VPR SUBMISSION PROTOCOL
                    </h2>
                    <p className="text-[#00FFC0] font-mono text-xs uppercase tracking-widest mt-1">
                        // VALIDATED PLAYER REPORT // STATUS: ACTIVE
                    </p>
                </div>
                <button onClick={handleClose} className="text-[#8d8c9e] hover:text-white bg-[#14131c] p-2 rounded-md border border-[#3a3846] hover:border-red-500 transition-colors">
                    <Icons.X className="h-5 w-5" />
                </button>
            </div>
            <div className="mb-2 flex justify-between text-xs font-mono uppercase tracking-wider">
                {STEPS.map((step, i) => (
                    <span key={step} className={`${currentStep > i + 1 ? 'text-[#00FFC0]' : currentStep === i + 1 ? 'text-white font-bold' : 'text-[#3a3846]'}`}>
                        [{i + 1}] {step}
                    </span>
                ))}
            </div>
            <div className="relative h-1.5 bg-[#24232d] rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-[#00FFC0] transition-all duration-300 ease-out shadow-[0_0_10px_#00FFC0]"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                />
            </div>
        </div>
        <div className="bg-[#00FFC0]/5 border-b border-[#00FFC0]/10 p-3 px-6 text-xs text-[#8d8c9e] font-mono">
            <strong className="text-[#00FFC0]">MISSION DIRECTIVE:</strong> We only accept raw, verifiable data. Subjective noise will be purged by the validation queue.
        </div>
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar bg-[#14131c]">
            {currentStep === 1 && (
                <div className="animate-fadeIn space-y-6">
                    {/* Step 1 content */}
                </div>
            )}
            {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                    <p className="text-sm text-[#8d8c9e] mb-4">Grade the operator based on measurable ZAP metrics. Be purely objective.</p>
                    <div className="space-y-4">
                        <MetricRater label="PAYOUT EFFICIENCY (Speed vs Advertised)" field="ratingPayout" />
                        <MetricRater label="CLARITY OF TERMS (No Hidden Clauses)" field="ratingTerms" />
                        <MetricRater label="SUPPORT COMPETENCE (Resolution Time)" field="ratingSupport" />
                    </div>
                    {/* ... other step 3 content */}
                </div>
            )}
            {/* Other steps content */}
        </div>
        <div className="p-6 border-t border-[#3a3846] bg-[#0c0c0e] rounded-b-xl flex justify-between items-center">
            {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="text-[#8d8c9e] hover:text-white">
                    <Icons.ChevronLeft className="mr-2 h-4 w-4" /> BACK
                </Button>
            ) : (
                <div></div> 
            )}
            
            {currentStep < STEPS.length ? (
                 <Button onClick={handleNext} className="font-heading uppercase tracking-wider px-8">
                    NEXT PHASE <Icons.ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                 <Button 
                    onClick={handleSubmit} 
                    className="shadow-[0_0_30px_rgba(0,255,192,0.4)] font-heading uppercase tracking-widest py-4 px-6 h-auto text-sm md:text-base"
                    disabled={!formData.attestData || !formData.attestTerms}
                >
                    <Icons.Zap className="mr-2 h-5 w-5" /> TRANSMIT VPR & ACTIVATE QUEUE
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};