import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QuestionData } from '@/pages/millionaire/play/[name]/[id]';

interface AudiencePollModalProps {
    isOpen: boolean;
    currentQuestion: QuestionData;
    onOptionSelect: (optionId: string) => void;
}

const AudiencePollModal: React.FC<AudiencePollModalProps> = ({
    isOpen,
    currentQuestion,
    onOptionSelect,
}) => {
    // Generate poll data with higher probability for correct answer
    const generatePollData = () => {
        const correctOptionIndex = currentQuestion.options.findIndex(opt => opt.correct);
        const percentages: number[] = [];
        
        // Assign 45-65% to correct answer
        const correctPercentage = Math.floor(Math.random() * 20) + 45;
        let remainingPercentage = 100 - correctPercentage;
        
        // Distribute remaining percentage among incorrect answers
        for (let i = 0; i < 4; i++) {
            if (i === correctOptionIndex) {
                percentages[i] = correctPercentage;
            } else if (i === 3) {
                // Last option gets remaining percentage
                percentages[i] = remainingPercentage;
            } else {
                // Random distribution for other answers
                const randomPercent = Math.floor(Math.random() * (remainingPercentage / 2));
                percentages[i] = randomPercent;
                remainingPercentage -= randomPercent;
            }
        }

        return currentQuestion.options.map((option, index) => ({
            name: String.fromCharCode(65 + index),  // A, B, C, D
            percentage: percentages[index],
            clue: option.clue,
            id: option.id
        }));
    };

    const [pollData] = useState(generatePollData());

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg w-full max-w-xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl text-black text-center mb-4">Audience Poll Results</h2>
                <h2 className="text-lg text-black text-center mb-4">{currentQuestion.question.question}</h2>
                <div className="mb-6">
                    {/* Chart Container - Make it responsive */}
                    <div className="w-full h-64 bg-gray-50 rounded-lg p-2 md:p-4">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                data={pollData}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="percentage" fill="#9F7AEA" /> {/* Use Tailwind purple-400 hex */}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Options Grid - Make it single column on mobile */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pollData.map((data) => (
                            <button
                                key={data.name}
                                onClick={() => onOptionSelect(data.id)}
                                className="bg-purple-400 hover:bg-purple-500 p-4 rounded-lg text-left transition-colors duration-300"
                            >
                                <span className="font-bold text-white mr-2">{data.name}:</span>
                                <span className="text-white">{data.clue}</span>
                                <span className="block text-sm text-white mt-1">
                                    {data.percentage}% of audience
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30">
    //         <div className="bg-gray-50 p-6 rounded-lg w-full max-w-xl">
    //             <h2 className="text-xl text-black text-center mb-4">Audience Poll Results</h2>
    //             <h2 className="text-lg text-black text-center mb-4">{currentQuestion.question.question}</h2>
    //             <div className="mb-6">
    //                 {/* Chart Container */}
    //                 <div className="w-full h-64 bg-gray-50 rounded-lg p-4">
    //                     <BarChart
    //                         width={500}
    //                         height={200}
    //                         data={pollData}
    //                         margin={{
    //                             top: 5,
    //                             right: 30,
    //                             left: 20,
    //                             bottom: 5,
    //                         }}
    //                     >
    //                         <CartesianGrid strokeDasharray="3 3" />
    //                         <XAxis dataKey="name" />
    //                         <YAxis />
    //                         <Tooltip />
    //                         <Bar dataKey="percentage" fill="purple-400" />
    //                     </BarChart>
    //                 </div>

    //                 {/* Options Grid */}
    //                 <div className="mt-6 grid grid-cols-2 gap-4">
    //                     {pollData.map((data) => (
    //                         <button
    //                             key={data.name}
    //                             onClick={() => onOptionSelect(data.id)}
    //                             className="bg-purple-400 hover:bg-purple-500 p-4 rounded-lg text-left transition-colors duration-300"
    //                         >
    //                             <span className="font-bold text-white mr-2">{data.name}:</span>
    //                             <span className="text-white">{data.clue}</span>
    //                             <span className="block text-sm text-black mt-1">
    //                                 {data.percentage}% of audience
    //                             </span>
    //                         </button>
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default AudiencePollModal

// Usage in your main game component:
/*
const [showAudiencePoll, setShowAudiencePoll] = useState(false);

// In your lifeline handler:
const handleLifeline = (lifeline: string) => {
    if (lifeline === 'ask-audience') {
        setShowAudiencePoll(true);
    }
    // ... other lifeline handling
};

// In your JSX:
{showAudiencePoll && (
    <AudiencePollModal
        isOpen={showAudiencePoll}
        onClose={() => setShowAudiencePoll(false)}
        currentQuestion={currentQuestion}
        onOptionSelect={(optionId) => {
            setShowAudiencePoll(false);
            handleAnswerSelect(optionId);
        }}
    />
)}
*/