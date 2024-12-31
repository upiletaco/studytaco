import { Card } from '@/components/ui/card';
import { Percent, Phone, Users } from 'lucide-react';
import React from 'react'

interface LifelineButtonsProps {
    handleLifeline: (lifeline: string) => void;
    usedLifelines: Set<string>;
}

const GameLifelineButtons: React.FC<LifelineButtonsProps> = ({ handleLifeline, usedLifelines }) => {

    const getLifelineStyle = (lifeline: string) => {
        if (usedLifelines.has(lifeline)) {
            return 'bg-gray-600 cursor-not-allowed opacity-50';
        }
        return 'bg-gray-50 hover:bg-gray-200 cursor-pointer';
    };

    const buttonWrapper = "relative p-[2px] rounded-full group"
    const gradientBorder = "absolute inset-0 bg-gradient-to-tr from-blue-400/40 via-white to-orange-400/40 rounded-full"
    const buttonContent = "relative p-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-12 h-12"


    return (

        <Card className="rounded-[48px]  p-6 bg-white overflow-hidden relative m-4 flex justify-around align-middle items-center">

                <div className="relative group">
                
                     <button
                    onClick={() => handleLifeline('fifty-fifty')}
                    className={buttonWrapper}
                    disabled={usedLifelines.has('fifty-fifty')}
                >
                    <div className={gradientBorder} />
                    <div className={`${buttonContent} ${getLifelineStyle('fifty-fifty')}`}>
                        <Percent size={24} />
                    </div>
                </button>
                    <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        50/50
                    </div>
                </div>

                <div className="relative group">
                <button
                    onClick={() => handleLifeline('phone-friend')}
                    className={buttonWrapper}
                    disabled={usedLifelines.has('phone-friend')}
                >
                    <div className={gradientBorder} />
                    <div className={`${buttonContent} ${getLifelineStyle('phone-friend')}`}>
                        <Phone size={24} />
                    </div>
                </button>
                    <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Ask A Friend
                    </div>
                </div>

                <div className="relative group">
                <button
                    onClick={() => handleLifeline('ask-audience')}
                    className={buttonWrapper}
                    disabled={usedLifelines.has('ask-audience')}
                >
                    <div className={gradientBorder} />
                    <div className={`${buttonContent} ${getLifelineStyle('ask-audience')}`}>
                        <Users size={24} />
                    </div>
                </button>
                    <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Ask the Polls
                    </div>
                </div>
        </Card>
    )
}

export default GameLifelineButtons