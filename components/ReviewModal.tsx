import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ToastContext } from '../context/ToastContext';
import { mockCasinosData } from '../constants/casinos';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCasinoId: string | null;
}

const STEPS = ['Select Casino', 'Rate', 'Details', 'Context'];

const PLAYER_TAGS = [
    "High Roller", "Casual Player", "Bonus Hunter", "Slots Specialist", 
    "Live Dealer Main", "Sports Bettor", "VPN User"
];

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, initialCasinoId }) => {
  const { showToast } = useContext(ToastContext) || { showToast: () => {} };
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCasinoId, setSelectedCasinoId] = useState<string | null>(initialCasinoId);
  const [searchTerm, setSearchTerm] = useState('');

  // Step 2: Ratings
  const [ratings, setRatings] = useState({
      overall: 0,
      payoutSpeed: 0,
      gameVariety: 0,
      support: 0
  });
  const [hoverRatings, setHoverRatings] = useState({ overall: 0, payoutSpeed: 0, gameVariety: 0, support: 0 });

  // Step 3: Text Details
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');

  // Step 4: Context Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Reset on open
  useEffect(() => {
      if (isOpen) {
          setCurrentStep(initialCasinoId ? 2 : 1);
          setSelectedCasinoId(initialCasinoId);
          setSearchTerm('');
          setRatings({ overall: 0, payoutSpeed: 0, gameVariety: 0, support: 0 });
          setPros('');
          setCons('');
          setSelectedTags([]);
      }
  }, [isOpen, initialCasinoId]);

  const selectedCasino = useMemo(() => mockCasinosData.find(c => c.id === selectedCasinoId), [selectedCasinoId]);
  const filteredCasinos = useMemo(() => {
      if (!searchTerm) return mockCasinosData.slice(0, 5); // Show top 5 initially
      return mockCasinosData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleNext = () => {
      if (currentStep === 1 && !selectedCasinoId) {
          showToast("Please select a casino to review.", "error");
          return;
      }
      if (currentStep === 2 && ratings.overall === 0) {
           showToast("Please provide at least an overall rating.", "error");
           return;
      }
       if (currentStep === 3 && (pros.length < 20 && cons.length < 20)) {
           showToast("Please add a bit more detail to either highlights or pain points.", "error");
           return;
      }
      setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
      // In a real app, gather all state and submit to API
      showToast("Review submitted successfully! +25 ZP Earned", "success");
      onClose();
  };

  const toggleTag = (tag: string) => {
      setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const StarRating = ({ label, ratingKey }: { label: string, ratingKey: keyof typeof ratings }) => (
      <div className="mb-4">
          <label className="block text-sm font-medium text-[#8d8c9e] mb-2">{label}</label>
          <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                  <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRatings(prev => ({ ...prev, [ratingKey]: star }))}
                      onMouseLeave={() => setHoverRatings(prev => ({ ...prev, [ratingKey]: 0 }))}
                      onClick={() => setRatings(prev => ({ ...prev, [ratingKey]: star }))}
                      className="focus:outline-none transition-transform hover:scale-110"
                  >
                      <Icons.Star 
                          className={`h-8 w-8 transition-colors duration-200 ${
                              star <= (hoverRatings[ratingKey] || ratings[ratingKey]) 
                                  ? 'fill-[#1ed760] text-[#1ed760] drop-shadow-[0_0_8px_rgba(29,215,96,0.5)]' 
                                  : 'text-[#3a3846]'
                          }`} 
                      />
                  </button>
              ))}
          </div>
      </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-xl bg-[#14131c] border border-[#3a3846] shadow-2xl animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* Header with Progress */}
        <div className="p-6 border-b border-[#3a3846]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-white">
                    {selectedCasino ? `Review ${selectedCasino.name}` : 'Write a Review'}
                </h2>
                <button onClick={onClose} className="text-[#8d8c9e] hover:text-white"><Icons.X /></button>
            </div>
            {/* Progress Bar */}
            <div className="relative h-2 bg-[#24232d] rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-[#1ed760] transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-[#8d8c9e]">
                {STEPS.map((step, i) => (
                    <span key={step} className={currentStep > i ? 'text-[#1ed760]' : currentStep === i + 1 ? 'text-white' : ''}>
                        {step}
                    </span>
                ))}
            </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {currentStep === 1 && (
                <div className="animate-fadeIn">
                    <h3 className="text-xl text-white font-heading mb-4">Which casino did you play at?</h3>
                    <div className="relative mb-6">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-5 w-5" />
                        <Input 
                            placeholder="Search casinos..." 
                            className="pl-10 h-12 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredCasinos.map(casino => (
                            <button
                                key={casino.id}
                                onClick={() => { setSelectedCasinoId(casino.id); handleNext(); }}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left
                                ${selectedCasinoId === casino.id ? 'bg-[#1ed760]/10 border-[#1ed760]' : 'bg-[#24232d] border-transparent hover:border-[#3a3846]'}`}
                            >
                                <img src={casino.logo} alt={casino.name} className="w-10 h-10 rounded-md" />
                                <span className="font-bold text-white">{casino.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div className="animate-fadeIn space-y-6">
                    <h3 className="text-xl text-white font-heading mb-2">Rate the Vitals</h3>
                    <p className="text-[#8d8c9e] mb-6">Be honest. Your data helps other degens find their edge.</p>
                    
                    <StarRating label="Overall Experience (Required)" ratingKey="overall" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pt-4 border-t border-[#3a3846]">
                        <StarRating label="Payout Speed" ratingKey="payoutSpeed" />
                        <StarRating label="Game Variety & RTP" ratingKey="gameVariety" />
                        <StarRating label="Customer Support" ratingKey="support" />
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                     <h3 className="text-xl text-white font-heading mb-2">The Details</h3>
                     <p className="text-[#8d8c9e] mb-6">What stood out? Share specific examples to earn more ZP.</p>

                     <div>
                         <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                             <Icons.ArrowUp className="text-[#1ed760] h-4 w-4" /> Highlights (Pros)
                         </label>
                         <textarea 
                            rows={3}
                            className="w-full rounded-md border border-[#3a3846] bg-[#24232d] p-3 text-white placeholder:text-[#8d8c9e] focus:outline-none focus:ring-2 focus:ring-[#1ed760] resize-none"
                            placeholder="Fast KYC, massive weekly bonus, great original games..."
                            value={pros}
                            onChange={(e) => setPros(e.target.value)}
                        />
                     </div>

                      <div>
                         <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                             <Icons.ArrowDown className="text-red-500 h-4 w-4" /> Pain Points (Cons)
                         </label>
                         <textarea 
                            rows={3}
                            className="w-full rounded-md border border-[#3a3846] bg-[#24232d] p-3 text-white placeholder:text-[#8d8c9e] focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            placeholder="Slow support on weekends, high wagering requirements..."
                            value={cons}
                            onChange={(e) => setCons(e.target.value)}
                        />
                     </div>
                </div>
            )}

            {currentStep === 4 && (
                 <div className="animate-fadeIn space-y-6">
                    <h3 className="text-xl text-white font-heading mb-2">Add Context</h3>
                    <p className="text-[#8d8c9e] mb-6">Help users like you by defining your playstyle at this casino.</p>

                    <div className="flex flex-wrap gap-3">
                        {PLAYER_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                                ${selectedTags.includes(tag) 
                                    ? 'bg-[#1ed760]/20 border-[#1ed760] text-[#1ed760]' 
                                    : 'bg-[#24232d] border-[#3a3846] text-[#8d8c9e] hover:text-white hover:border-white/30'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="bg-[#1ed760]/10 p-4 rounded-lg border border-[#1ed760]/20 mt-8 flex items-start gap-3">
                        <Icons.Zap className="text-[#1ed760] h-6 w-6 flex-shrink-0" />
                        <div>
                            <p className="text-white font-medium">Earn 25 Zap Points</p>
                            <p className="text-sm text-[#8d8c9e]">By submitting this review, you certify that it is based on your genuine experience.</p>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#3a3846] flex justify-between">
            {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack}>Back</Button>
            ) : (
                <div></div> // Spacer
            )}
            
            {currentStep < STEPS.length ? (
                 <Button onClick={handleNext} disabled={currentStep === 1 && !selectedCasinoId}>
                    Next Step <Icons.ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                 <Button onClick={handleSubmit} className="shadow-[0_0_20px_rgba(29,215,96,0.4)]">
                    Submit Review
                </Button>
            )}
        </div>

      </div>
    </div>
  );
};
