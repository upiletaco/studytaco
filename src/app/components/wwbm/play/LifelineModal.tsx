import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import React from 'react'

interface LifelineModalProps{
    questions: QuestionData[]
    currentQuestionIndex: number;
    lifelineOptions: Option[];
    letterMapping: string[];
    handleLifelineAnswer: (optionId: string) => void;

}

const LifelineModal: React.FC<LifelineModalProps> = ({questions, currentQuestionIndex, lifelineOptions, letterMapping, handleLifelineAnswer}) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
                    <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl text-center mb-6 font-bold">
                            50:50 Lifeline
                        </h2>
                        <h2 className="text-xl text-center mb-6">
                            {questions[currentQuestionIndex].question.question}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {lifelineOptions.map((option, index) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleLifelineAnswer(option.id)}
                                    className="bg-purple-300 hover:bg-purple-400 p-4 rounded-lg text-left transition-colors duration-300"
                                >
                                    <span className="font-bold mr-2">{letterMapping[index]}:</span>
                                    {option.clue}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
  )
}

export default LifelineModal