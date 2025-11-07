
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

export const BonusCalculatorPage = () => {
    const [deposit, setDeposit] = useState<number | ''>(100);
    const [bonusPercent, setBonusPercent] = useState<number | ''>(100);
    const [wagering, setWagering] = useState<number | ''>(35);
    const [wagerType, setWagerType] = useState<'bonus' | 'deposit_bonus'>('bonus');

    const calculate = () => {
        const dep = Number(deposit) || 0;
        const pct = Number(bonusPercent) || 0;
        const wag = Number(wagering) || 0;

        const bonusAmount = (dep * pct) / 100;
        const totalFunds = dep + bonusAmount;
        
        let totalWager = 0;
        if (wagerType === 'bonus') {
            totalWager = bonusAmount * wag;
        } else {
            totalWager = (dep + bonusAmount) * wag;
        }

        return { bonusAmount, totalFunds, totalWager };
    };

    const results = calculate();

    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Icons.Calculator className="text-[#1ed760] h-10 w-10" /> Bonus Calculator
            </h1>
            <p className="text-lg text-[#8d8c9e] mb-10">Determine the true cost of a casino bonus before you deposit.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#8d8c9e] mb-2">Deposit Amount ($)</label>
                        <Input type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} min="0" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#8d8c9e] mb-2">Bonus Percentage (%)</label>
                        <Input type="number" value={bonusPercent} onChange={(e) => setBonusPercent(Number(e.target.value))} min="0" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[#8d8c9e] mb-2">Wagering Requirement (x)</label>
                        <Input type="number" value={wagering} onChange={(e) => setWagering(Number(e.target.value))} min="0" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#8d8c9e] mb-2">Wagering Applies To</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button 
                                variant={wagerType === 'bonus' ? 'primary' : 'secondary'} 
                                onClick={() => setWagerType('bonus')}
                                type="button"
                            >
                                Bonus Only
                            </Button>
                            <Button 
                                variant={wagerType === 'deposit_bonus' ? 'primary' : 'secondary'} 
                                onClick={() => setWagerType('deposit_bonus')}
                                type="button"
                            >
                                Deposit + Bonus
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-[#1ed760]/5 border-[#1ed760]/20 flex flex-col justify-center">
                    <h3 className="font-heading text-2xl text-white mb-6 text-center">Results</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center p-4 bg-[#14131c] rounded-lg border border-[#3a3846]">
                            <span className="text-[#8d8c9e]">Total Funds to Play</span>
                            <span className="font-bold text-xl text-white">${results.totalFunds.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between items-center p-4 bg-[#14131c] rounded-lg border border-[#3a3846]">
                            <span className="text-[#8d8c9e]">Bonus Amount Received</span>
                            <span className="font-bold text-[#1ed760]">${results.bonusAmount.toFixed(2)}</span>
                        </div>
                        <div className="p-5 bg-[#14131c] rounded-lg border-2 border-[#1ed760]/30 text-center">
                            <p className="text-[#8d8c9e] uppercase text-sm font-bold mb-2">Total Wagering Required</p>
                            <p className="font-heading text-3xl md:text-4xl text-white font-bold">${results.totalWager.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
