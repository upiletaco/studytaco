import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react';

interface FollowUpFriendModalProps {
   questions: QuestionData[];
   currentQuestionIndex: number;
   currentQuestion: QuestionData;
   friendSuggestion: Option | null;
   letterMapping: string[];
   handleSelection: (option: string) => void;
   handleBack: () => void; // New prop for handling back action

}

const FollowUpFriendModal: React.FC<FollowUpFriendModalProps> = ({
   questions, 
   currentQuestionIndex, 
   currentQuestion, 
   friendSuggestion, 
   letterMapping, 
   handleSelection,
   handleBack
}) => {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleOptionSelect = (optionId: string) => {
        setSelectedId(optionId);
        setTimeout(() => {
            handleSelection(optionId);
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
               <div className='flex justify-between items-center mb-4'>
                       <button 
                           onClick={handleBack}
                           className="ml-4 p-2 hover:bg-blue-50 rounded-full transition-colors"
                       >
                           <ArrowLeft className="w-6 h-6 text-blue-900" />
                       </button>
                       <div className="w-fit bg-white px-6 py-2 rounded-full text-center border-2 border-blue-100 mr-4">
                           <span className="text-black text-lg font-semibold">Choose Your Answer</span>
                       </div>
                   </div>

                   <h2 className="text-xl font-semibold text-center mb-4">
                       {questions[currentQuestionIndex].question.question}
                   </h2>

                   <div className="flex flex-col gap-3">
                       {currentQuestion?.options
                           .filter(opt => opt.id !== friendSuggestion?.id)
                           .map((option, index) => (
                               <button
                                   key={option.id}
                                   onClick={() => handleOptionSelect(option.id)}
                                   className={getButtonStyles(option)}
                                //    onClick={() => handleSelection(option.id)}
                                //    className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-blue-100"
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

export default FollowUpFriendModal