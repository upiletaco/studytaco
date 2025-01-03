import { Card } from '@/components/ui/card'
import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]';
import React, { useEffect, useState } from 'react'

interface QuestionCardProps {

    points: string;
    question: QuestionData;
    handleAnswerSelect: (optionId: string) => void;
    lives: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, handleAnswerSelect, lives }) => {
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        console.log(question)
        if (question) {
            // Create a copy of the options array and shuffle it
            const shuffled = [...question.options]
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            setShuffledOptions(shuffled);
        }
    }, [question]);

    const handleSelection = (optionId: string) => {
        setSelectedId(optionId);
        // const isCorrect = shuffledOptions.find(opt => opt.id === optionId)?.correct;

        // Delay the handleAnswerSelect call to show the green border
        setTimeout(() => {
            handleAnswerSelect(optionId);
            setSelectedId(null); // Reset selection for next question
        }, 500); // Half second delay

    };

    const getButtonStyles = (option: Option) => {
        const baseStyles = "bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 transition-all duration-200 hover:bg-gray-100";

        if (selectedId === option.id) {
            if (option.correct) {
                return baseStyles + " border-green-400 bg-white"; // Light green border for correct
            } else {
                return baseStyles + " border-red-400 bg-red-100"; // Red background and border for incorrect
            }
        }

        return baseStyles + " border-blue-100"; // Default border
    };
    const getCardBorderClass = () => {
        const baseClasses = "rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative m-4";
        
        if (lives === 2) {
            // Light red, slow pulse
            return `${baseClasses} before:absolute before:inset-0 before:rounded-[48px] before:border-red-200 before:transition-all before:duration-2000 before:animate-[border-pulse-slow_2s_ease-in-out_infinite]`;
        } else if (lives === 1) {
            // Deep red, fast pulse
            return `${baseClasses} before:absolute before:inset-0 before:rounded-[48px] before:border-red-400 before:transition-all before:duration-1000 before:animate-[border-pulse-fast_1s_ease-in-out_infinite]`;
        }
        
        return baseClasses;
    };

    return (
        
        <Card className={getCardBorderClass()}>
             <style jsx>{`
                @keyframes border-pulse-slow {
                    0%, 100% { border-width: 2px; }
                    50% { border-width: 4px; }
                }
                @keyframes border-pulse-fast {
                    0%, 100% { border-width: 2px; }
                    50% { border-width: 6px; }
                }
            `}</style>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
            <div className="relative z-10 ">
                <div className='flex justify-center'>
                  
                </div>

                <h2 className="text-xl font-semibold text-center mb-4">{question.question.question}</h2>
                <div className="flex flex-col gap-3">
                    {shuffledOptions.map((option) => (
                        <button
                            key={option.id}
                            //     onClick={() => handleAnswerSelect(option.id)}

                            //     className={`bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center  border-2 border-blue-100                               `}
                            // // disabled={selectedAnswerId !== null}
                            onClick={() => handleSelection(option.id)}
                            className={getButtonStyles(option)}
                        >

                            <p className='mr-2 ml-6 text-blue-900 font-semibold'>
                                {option.clue}
                            </p>

                        </button>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default QuestionCard