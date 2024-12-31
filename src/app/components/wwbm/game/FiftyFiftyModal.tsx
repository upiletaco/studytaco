import { Card } from '@/components/ui/card';
import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import React, { useState } from 'react'

interface LifelineModalProps{
    questions: QuestionData[]
    currentQuestionIndex: number;
    lifelineOptions: Option[];
    letterMapping: string[];
    handleLifelineAnswer: (optionId: string) => void;

}

const FiftyFiftyModal: React.FC<LifelineModalProps> = ({questions, currentQuestionIndex, lifelineOptions, letterMapping, handleLifelineAnswer}) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelection = (optionId: string) => {
        setSelectedId(optionId);
        setTimeout(() => {
            handleLifelineAnswer(optionId);
        }, 500);
    };

    const getButtonStyles = (option: Option) => {
        const baseStyles = "bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 transition-all duration-200 ";
        
        if (selectedId === option.id) {
            if (option.correct) {
                return baseStyles + "border-green-400 bg-white";
            } else {
                return baseStyles + "border-red-400 bg-red-100";
            }
        }
        
        return baseStyles + "border-blue-100";
    };
  return (
<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
        <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
            
            <div className="relative z-10">
                <div className='flex justify-center'>
                    <div className="w-fit bg-white px-6 py-2 mx-4 rounded-full mb-2 text-center border-2 border-blue-100">
                        <span className="text-black text-lg font-semibold">50:50 Lifeline</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center mb-4">
                    {questions[currentQuestionIndex].question.question}
                </h2>

                <div className="flex flex-col gap-3">
                    {lifelineOptions.map((option, index) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelection(option.id)}
                            className={getButtonStyles(option)}
                            // onClick={() => handleLifelineAnswer(option.id)}
                            // className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-blue-100"
                        >
                            <p className='mr-2 ml-6 text-blue-900 font-semibold'>
                                <span className="font-bold mr-2">{letterMapping[index]}:</span>
                                {option.clue}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    </div>
  )
}

export default FiftyFiftyModal