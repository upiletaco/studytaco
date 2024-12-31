import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'

interface PhoneFriendModalProps {
    questions: QuestionData[]
    currentQuestionIndex: number;
    friendSuggestion: Option | null;
    handleTrue: () => void;
    handleFalse: () => void;
}

const PhoneModal: React.FC<PhoneFriendModalProps> = ({ questions, currentQuestionIndex, friendSuggestion, handleTrue, handleFalse }) => {
    const [selectedOption, setSelectedOption] = useState<'use' | 'different' | null>(null);

    const handleSelection = (choice: 'use' | 'different') => {
        setSelectedOption(choice);
        setTimeout(() => {
            if (choice === 'use') {
                handleTrue();
            } else {
                handleFalse();
            }
        }, 500);
    };

    const getButtonStyles = (type: 'use' | 'different') => {
        const baseStyles = "bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 transition-all duration-200 ";

        if (selectedOption === type) {
            if (type === 'use' && friendSuggestion?.correct) {
                return baseStyles + "border-green-400 bg-white";
            } else if (type === 'use' && !friendSuggestion?.correct) {
                return baseStyles + "border-red-400 bg-red-100";
            }
        }

        if (type === 'use') {
            return baseStyles + "border-blue-100 hover:border-blue-200";
        } else {
            return baseStyles + "border-orange-200 hover:border-orange-300";
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
            <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>

                <div className="relative z-10">
                    <div className='flex justify-center'>
                        <div className="w-fit bg-white px-6 py-2 mx-4 rounded-full mb-2 text-center border-2 border-blue-100">
                            <span className="text-black text-lg font-semibold">Phone A Friend</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-center mb-4">
                        {questions[currentQuestionIndex].question.question}
                    </h2>

                    <p className="text-lg text-center mb-4 text-blue-900">Your friend suggests:</p>

                    {/* <div className="bg-white px-6 py-4 mx-4 rounded-full mb-4 text-center border-2 border-blue-100">
                        <p className='text-blue-900 font-semibold'>
                            {friendSuggestion?.clue}
                        </p>
                    </div> */}

                    <div className="mx-4 mb-8 text-center">
                        <p className='text-xl font-bold text-blue-900'>
                            {friendSuggestion?.clue}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => handleSelection('use')}
                            className={getButtonStyles('use')}
                        //    onClick={handleTrue}
                        //    className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-green-200 hover:border-green-300"
                        >
                            <p className='text-blue-900 font-semibold'>
                                Use Friend Answer
                            </p>
                        </button>

                        <button
                            onClick={() => handleSelection('different')}
                            className={getButtonStyles('different')}
                        // onClick={handleFalse}
                        // className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-orange-200 hover:border-orange-300"
                        >
                            <p className='text-orange-700 font-semibold'>
                                Choose Different Answer
                            </p>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PhoneModal