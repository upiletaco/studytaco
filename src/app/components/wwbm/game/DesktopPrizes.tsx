import { prizeLadder } from '@/app/util/wwbm.types';
import { Card } from '@/components/ui/card';
import React from 'react'

interface DesktopPrizeLadderProps {
    currentQuestionIndex: number;
}

const DesktopPrizes: React.FC<DesktopPrizeLadderProps> = ({ currentQuestionIndex }) => {
    return (
        <div className="hidden md:block fixed top-0 right-0 h-screen w-[calc((100vw-768px)/2)] min-w-[240px] max-w-[300px] p-4">
            <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Fixed header */}
                    <div className="sticky top-0 z-20 pb-4">
                        <div className='flex justify-center'>
                            <div className="w-fit bg-white px-6 py-2 rounded-full text-center border-2 border-blue-100">
                                <span className="text-black text-lg font-semibold">Prize Ladder</span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        <div className="space-y-2">
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

export default DesktopPrizes