import { useEffect, useState } from "react";

const AnimatedScore = ({ score }: { score: number }) => {
    const [prevScore, setPrevScore] = useState(score);
    const [showChange, setShowChange] = useState(false);
    const [scoreChange, setScoreChange] = useState(0);

    useEffect(() => {
        if (score !== prevScore) {
            const change = score - prevScore;
            setScoreChange(change);
            setShowChange(true);
            setPrevScore(score);

            // Hide the floating number after animation
            const timer = setTimeout(() => {
                setShowChange(false);
            }, 1000); // Match this with your animation duration

            return () => clearTimeout(timer);
        }
    }, [score, prevScore]);

    return (
        <div className="z-40">
            {/* Score display - no size changes */}
            <div className={`text-4xl font-bold font-mono ${score < 0 ? 'text-red-500' : 'text-[#FFCC00]'
                }`}>
                Score: {score}
            </div>

            {/* Floating score change */}
            {showChange && (
                <div
                    key={Date.now()} // Force new animation on each change
                    className={`
              relative right-4 z-40
              text-2xl font-bold
              animate-fade-out
              ${scoreChange > 0 ? 'text-green-500' : 'text-red-500'}
            `}
                >
                    {scoreChange > 0 ? '+' : ''}{scoreChange}
                </div>
            )}
        </div>
    );
};

export default AnimatedScore;