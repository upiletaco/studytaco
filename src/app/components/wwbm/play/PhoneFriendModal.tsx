import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import React from 'react'

interface PhoneFriendModalProps{
    questions: QuestionData[]
    currentQuestionIndex: number;
    friendSuggestion: Option | null;
    handleTrue: () => void;
    handleFalse: () => void;

}


const PhoneFriendModal: React.FC<PhoneFriendModalProps> = ({questions, currentQuestionIndex, friendSuggestion, handleTrue, handleFalse}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-30">
    <div className="bg-gray-50 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl text-center mb-4 font-bold">Phone A Friend</h2>
        <div className="mb-6">
            <h2 className="text-xl text-center mb-6">
                {questions[currentQuestionIndex].question.question}
            </h2>
            <p className="text-lg mb-4">Your friend suggests:</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center border-2 border-purple-400">
                {friendSuggestion?.clue}
            </div>
            <div className="flex flex-col gap-4">
                <button
                    onClick={handleTrue}
                    className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors duration-300"
                >
                    Use Friends Answer
                </button>
                <button
                    onClick={handleFalse}
                    className="bg-orange-500 hover:bg-orange-600 p-3 rounded-lg transition-colors duration-300"
                >
                    Choose Different Answer
                </button>
            </div>
        </div>
    </div>
</div>
  )
}

export default PhoneFriendModal