import { prizeLadder } from '@/app/util/wwbm.types';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import React from 'react'

interface MobilePrizeLadderProps {
   handlePrizeLadder: () => void;
   currentQuestionIndex: number;
}

const MobilePrizes: React.FC<MobilePrizeLadderProps> = ({ handlePrizeLadder, currentQuestionIndex }) => {
   return (
       <div className="md:hidden fixed inset-0 bg-black bg-opacity-80 z-20 flex flex-col p-4">
           <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full h-full">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>

               <div className="relative z-10 flex flex-col h-full">
                   {/* Header */}
                   <div className='flex justify-between items-center mb-4'>
                       <div className="w-fit bg-white px-6 py-2 rounded-full text-center border-2 border-blue-100">
                           <span className="text-black text-lg font-semibold">Prize Ladder</span>
                       </div>
                       <button 
                           onClick={handlePrizeLadder}
                           className="bg-white p-2 rounded-full border-2 border-blue-100"
                       >
                           <X className="w-6 h-6 text-blue-900" />
                       </button>
                   </div>

                   {/* Scrollable Prize List */}
                   <div className="flex-1 overflow-y-auto">
                       <div className="space-y-2 w-full max-w-xs mx-auto">
                           {[...prizeLadder].reverse().map((prize, index) => {
                               const actualIndex = prizeLadder.length - 1 - index;
                               return (
                                   <div
                                       key={prize}
                                       className={`
                                           bg-white px-6 py-3 rounded-full text-center border-2
                                           ${actualIndex === currentQuestionIndex 
                                               ? 'border-orange-300 text-orange-700 font-bold' 
                                               : actualIndex < currentQuestionIndex
                                                   ? 'border-green-300 text-green-700'
                                                   : 'border-blue-100 text-blue-900'
                                           }
                                       `}
                                   >
                                       {prize}
                                   </div>
                               );
                           })}
                       </div>
                   </div>
               </div>
           </Card>
       </div>
   )
}

export default MobilePrizes