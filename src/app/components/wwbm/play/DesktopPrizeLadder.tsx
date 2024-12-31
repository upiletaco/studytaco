import { prizeLadder } from '@/app/util/wwbm.types';
import React from 'react'

interface DesktopPrizeLadderProps{
    currentQuestionIndex: number;
}

const DesktopPrizeLadder: React.FC<DesktopPrizeLadderProps> = ({currentQuestionIndex}) => {
    return (
        <div className="hidden md:block fixed right-0 top-0 h-screen w-40 p-4 bg-gray-50 mt-32 overflow-y-auto"> {/* Changed positioning */}
            <h1 className='text-black text-xl font-bold mb-2 text-center'>Prize Ladder</h1>
            <div className="flex-1 space-y-2 text-white ">
                {[...prizeLadder].reverse().map((prize, index) => {
                    const actualIndex = prizeLadder.length - 1 - index;
                    return (
                        <div
                            key={prize}
                            className={`p-2 rounded text-center ${actualIndex === currentQuestionIndex
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
    )
}

export default DesktopPrizeLadder