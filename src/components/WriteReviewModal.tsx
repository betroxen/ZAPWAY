
import React, { useState, useContext } from 'react';
import { Button } from './Button';
import { Icons } from './icons';
import { ToastContext } from '../context/ToastContext';

interface WriteReviewModalProps {
    casinoId: string;
    casinoName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ casinoId, casinoName, onClose, onSuccess }) => {
    const showToast = useContext(ToastContext)?.showToast ?? (() => {});
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const jwt = localStorage.getItem('jwt');

        if (!jwt) {
            showToast('You must be logged in to write a review.', 'error');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/casinos/${casinoId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-appwrite-jwt': jwt,
                },
                body: JSON.stringify({ rating, text }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review.');
            }

            showToast('Review submitted successfully!', 'success');
            onSuccess();
            onClose();

        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#0c0c0e] border border-[#3a3846] rounded-lg shadow-xl p-8 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-[#8d8c9e] hover:text-white transition-colors">
                    <Icons.X className="h-6 w-6" />
                </button>

                <h2 className="font-orbitron text-2xl text-white font-bold">Write a review for {casinoName}</h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Rating Input */}
                    <div>
                        <label className="font-bold text-white">Overall Rating</label>
                        <div className="flex items-center gap-1 mt-2 text-yellow-400 text-3xl">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <button
                                        type="button"
                                        key={starValue}
                                        onClick={() => setRating(starValue)}
                                        onMouseEnter={() => setHoverRating(starValue)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="transition-transform hover:scale-125"
                                    >
                                        <Icons.Star
                                            className={`h-8 w-8 ${starValue <= (hoverRating || rating) ? 'fill-current' : ''}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Text Input */}
                    <div>
                        <label htmlFor="reviewText" className="font-bold text-white">Your Review</label>
                        <textarea
                            id="reviewText"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`What did you like or dislike about ${casinoName}?`}
                            className="mt-2 w-full bg-[#1A1A1A] border border-[#3a3846] rounded-md p-3 text-white focus:ring-2 focus:ring-[#00FFC0] focus:border-[#00FFC0] transition-colors"
                            rows={5}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting || rating === 0 || text.trim() === ''}>
                            {isSubmitting ? (
                                <><Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                            ) : (
                                'Submit Review'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
