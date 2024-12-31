import React from 'react'
import { GenerateButtonProps } from '../util/wwbm.types'


const GenerateButton : React.FC<GenerateButtonProps> = ({ 
    isProcessing, 
    isGenerating, 
    onGenerate 
}) => {
  return (
    <button
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl 
        flex items-center justify-center gap-3 transition-colors relative
        ${(isProcessing || isGenerating) ? 'opacity-90 cursor-not-allowed' : ''}`}
      disabled={isProcessing || isGenerating}
      onClick={onGenerate}
    >
      {isGenerating && (
        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
      )}
      <span className="font-semibold text-lg">
        {isGenerating ? 'Generating Questions...' : 'Generate Millionaire Trivia Game'}
      </span>
    </button>
  );
}

export default GenerateButton