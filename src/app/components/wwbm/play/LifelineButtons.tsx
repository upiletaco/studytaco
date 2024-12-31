import { Percent, Phone, Users } from 'lucide-react';
import React from 'react'

interface LifelineButtonsProps{
    handleLifeline: (lifeline: string) => void;
    usedLifelines: Set<string>;
}

const LifelineButtons: React.FC<LifelineButtonsProps> = ({handleLifeline, usedLifelines}) => {

    const getLifelineStyle = (lifeline: string) => {
        if (usedLifelines.has(lifeline)) {
            return 'bg-gray-600 cursor-not-allowed opacity-50';
        }
        return 'bg-gray-50 hover:bg-gray-200 cursor-pointer border-black border-2';
    };

    
  return (
    <div className="mt-6 flex justify-center gap-4">
    <div className="relative group">
        <button
            onClick={() => handleLifeline('fifty-fifty')}
            className={`${getLifelineStyle('fifty-fifty')} p-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-12 h-12`}
            disabled={usedLifelines.has('fifty-fifty')}
        >
            <Percent size={24} />
        </button>
        <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
            50/50
        </div>
    </div>

    <div className="relative group">
        <button
            onClick={() => handleLifeline('phone-friend')}
            className={`${getLifelineStyle('phone-friend')} p-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-12 h-12`}
            disabled={usedLifelines.has('phone-friend')}
        >
            <Phone size={24} />
        </button>
        <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
            Ask A Friend
        </div>
    </div>

    <div className="relative group">
        <button
            onClick={() => handleLifeline('ask-audience')}
            className={`${getLifelineStyle('ask-audience')} p-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-12 h-12`}
            disabled={usedLifelines.has('ask-audience')}
        >
            <Users size={24} />
        </button>
        <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
            Ask the Polls
        </div>
    </div>
</div>
  )
}

export default LifelineButtons