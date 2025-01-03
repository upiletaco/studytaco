import { Card } from '@/components/ui/card';
import React from 'react';

const LoadingQuestionCard = () => {
    return (
        <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative m-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="text-xl font-bold text-blue-900 animate-pulse">
                        Loading More Questions...
                    </div>
                </div>

                {/* Fake question text */}
                <div className="h-8 bg-gray-200 rounded-full mb-8 animate-pulse"></div>

                {/* Fake answer buttons */}
                <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className="bg-white px-6 py-4 mx-4 rounded-full mb-2 text-center border-2 border-blue-100 h-14 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default LoadingQuestionCard;