import { prizeLadder } from '@/app/util/wwbm.types';
import { X } from 'lucide-react';
import React from 'react'

interface MobilePrizeLadderProps {
    handlePrizeLadder: () => void;
    currentQuestionIndex: number;
}

const MobilePrizeLadder: React.FC<MobilePrizeLadderProps> = ({handlePrizeLadder, currentQuestionIndex}) => {
  return (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-20 flex flex-col">
    {/* Fixed header */}
    <div className="sticky top-0 p-4 bg-black bg-opacity-90 flex justify-between items-center">
        <h1 className='text-white text-3xl font-bold'>Prizes</h1>
        <X
            color='white'
            className='cursor-pointer'
            onClick={handlePrizeLadder}
        />
    </div>

    {/* Scrollable content */}
    <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-gray-50 rounded-lg p-4 w-full max-w-xs mx-auto">
            {[...prizeLadder].reverse().map((prize, index) => {
                const actualIndex = prizeLadder.length - 1 - index;
                return (
                    <div
                        key={prize}
                        className={`p-2 mb-1 rounded text-center ${actualIndex === currentQuestionIndex
                            ? 'bg-orange-500'
                            : actualIndex < currentQuestionIndex
                                ? 'bg-green-600'
                                : 'bg-purple-400'
                            }`}
                    >
                        ${prize}
                    </div>
                );
            })}
        </div>
    </div>
</div>
  )
}

export default MobilePrizeLadder