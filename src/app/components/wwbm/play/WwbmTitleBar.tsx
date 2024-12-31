import React from 'react'

interface WwbmTitleBarProps{
    title: string;
    handleShowPrizeLadder: () => void;
    showPrizeLadder: boolean;
}

const WwbmTitleBar: React.FC<WwbmTitleBarProps> = ({title, handleShowPrizeLadder, showPrizeLadder}) => {
  return (
<div className=" bg-purple-400 p-3 flex md:justify-center justify-between items-center shadow-lg mt-16">
                <div className="text-lg font-bold text-white">
                    {title}
                </div>
                <button
                    onClick={handleShowPrizeLadder}
                    className="bg-gray-50 px-3 py-1 rounded text-sm md:hidden"
                >
                    {showPrizeLadder ? 'Hide Prizes' : 'Show Prizes'}
                </button>
            </div>  )
}

export default WwbmTitleBar