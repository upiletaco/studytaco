import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QuestionData } from '@/pages/millionaire/play/[name]/[id]';
import { Card } from '@/components/ui/card';

interface AudiencePollModalProps {
   isOpen: boolean;
   currentQuestion: QuestionData;
   onOptionSelect: (optionId: string) => void;
}

const AudienceModal: React.FC<AudiencePollModalProps> = ({
   isOpen,
   currentQuestion,
   onOptionSelect,
}) => {
    const generatePollData = () => {
        const correctOptionIndex = currentQuestion.options.findIndex(opt => opt.correct);
        const percentages: number[] = [];
        const correctPercentage = Math.floor(Math.random() * 20) + 45;
        let remainingPercentage = 100 - correctPercentage;
        
        for (let i = 0; i < 4; i++) {
            if (i === correctOptionIndex) {
                percentages[i] = correctPercentage;
            } else if (i === 3) {
                percentages[i] = remainingPercentage;
            } else {
                const randomPercent = Math.floor(Math.random() * (remainingPercentage / 2));
                percentages[i] = randomPercent;
                remainingPercentage -= randomPercent;
            }
        }
 
        return currentQuestion.options.map((option, index) => ({
            name: String.fromCharCode(65 + index),
            percentage: percentages[index],
            clue: option.clue,
            id: option.id,
            correct: option.correct
        }));
    };

   const [selectedId, setSelectedId] = useState<string | null>(null);
   const handleSelection = (optionId: string) => {
    setSelectedId(optionId);
    setTimeout(() => {
        onOptionSelect(optionId);
    }, 500);
};

const getButtonStyles = (data: typeof pollData[0]) => {
    const baseStyles = "bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 transition-all duration-200 ";
    
    if (selectedId === data.id) {
        if (data.correct!) {
            return baseStyles + "border-green-400 bg-white";
        } else {
            return baseStyles + "border-red-400 bg-red-100";
        }
    }
    
    return baseStyles + "border-blue-100";
};

   const [pollData] = useState(generatePollData());

   if (!isOpen) return null;

//    return (
//        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
//            <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full max-w-2xl">
//                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
               
//                <div className="relative z-10">
//                    <div className='flex justify-center'>
//                        <div className="w-fit bg-white px-6 py-2 mx-4 rounded-full mb-2 text-center border-2 border-blue-100">
//                            <span className="text-black text-lg font-semibold">Audience Poll Results</span>
//                        </div>
//                    </div>

//                    <h2 className="text-xl font-semibold text-center mb-4">
//                        {currentQuestion.question.question}
//                    </h2>

//                    <div className="bg-white rounded-3xl p-4 mx-4 mb-6 border-2 border-blue-100">
//                        <ResponsiveContainer width="100%" height={200}>
//                            <BarChart
//                                data={pollData}
//                                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//                            >
//                                <CartesianGrid strokeDasharray="3 3" />
//                                <XAxis dataKey="name" />
//                                <YAxis />
//                                <Tooltip />
//                                <Bar dataKey="percentage" fill="#93C5FD" /> {/* blue-300 */}
//                            </BarChart>
//                        </ResponsiveContainer>
//                    </div>

//                    <div className="flex flex-col gap-3">
//                        {pollData.map((data) => (
//                            <button
//                                key={data.name}
//                                onClick={() => handleSelection(data.id)}
//                                className={getButtonStyles(data)}
//                             //    onClick={() => onOptionSelect(data.id)}
//                             //    className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-blue-100"
//                            >
//                                <p className='mr-2 ml-6 text-blue-900 font-semibold'>
//                                    <span className="font-bold mr-2">{data.name}:</span>
//                                    {data.clue}
//                                    <span className="ml-2 text-blue-600">
//                                        ({data.percentage}%)
//                                    </span>
//                                </p>
//                            </button>
//                        ))}
//                    </div>
//                </div>
//            </Card>
//        </div>
//    );

return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center p-4 z-30 overflow-y-auto">
    <div className="my-4 w-full flex justify-center">
        <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
                
                <div className="relative z-10">
                    <div className='flex justify-center'>
                        <div className="w-fit bg-white px-6 py-2 mx-4 rounded-full mb-2 text-center border-2 border-blue-100">
                            <span className="text-black text-lg font-semibold">Audience Poll Results</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-center mb-4">
                        {currentQuestion.question.question}
                    </h2>

                    <div className="bg-white rounded-3xl p-4 mx-4 mb-6 border-2 border-blue-100">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={pollData}
                                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="percentage" fill="#93C5FD" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {pollData.map((data) => (
                            <button
                                key={data.name}
                                onClick={() => handleSelection(data.id)}
                                className={getButtonStyles(data)}
                            >
                                <p className='mr-2 ml-6 text-blue-900 font-semibold'>
                                    <span className="font-bold mr-2">{data.name}:</span>
                                    {data.clue}
                                    <span className="ml-2 text-blue-600">
                                        ({data.percentage}%)
                                    </span>
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    </div>
);
};

export default AudienceModal;