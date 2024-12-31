import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]';
import React from 'react'

interface FollowUpFriendModalProps{
    questions: QuestionData[];
    currentQuestionIndex: number;
    currentQuestion: QuestionData;
    friendSuggestion: Option | null;

    letterMapping: string[];
    handleSelection: (option: string) => void;
}

const FollowUpFriendModal: React.FC<FollowUpFriendModalProps> = ({questions, currentQuestionIndex, currentQuestion, friendSuggestion, letterMapping, handleSelection}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-30">
    <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl text-center mb-4 font-bold">Choose Your Answer</h2>
        <h2 className="text-xl text-center mb-6">
            {questions[currentQuestionIndex].question.question}
        </h2>
        <div className="flex flex-col gap-3">
            {currentQuestion?.options
                .filter(opt => opt.id !== friendSuggestion?.id)
                .map((option, index) => (
                    <button
                        key={option.id}
                        onClick={() => handleSelection(option.id)}
                        className="bg-purple-400 hover:bg-purple-500 p-4 rounded-lg text-left transition-colors duration-300 text-white"
                    >
                        <span className="font-bold mr-2 text-white">{letterMapping[index]}:</span>
                        {option.clue}
                    </button>
                ))}
        </div>
    </div>
</div>
  )
}

export default FollowUpFriendModal