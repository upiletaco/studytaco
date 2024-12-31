import { NavigationButtonsProps } from '@/app/util/survey.types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { FC } from 'react'

interface ExtendedNavigationButtonsProps extends NavigationButtonsProps {
  isNextDisabled: boolean;
}

const NavigationButtons: FC<ExtendedNavigationButtonsProps> = ({ 
    currentSlide, 
    totalSlides, 
    onNext, 
    onPrev, 
    onFinish,
    isNextDisabled
  }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4">
    {currentSlide !== 0 ? (
      <button
        className="h-12 w-12 rounded-full bg-blue-300 hover:bg-blue-400 
          transition-colors flex items-center justify-center"
        onClick={onPrev}
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
    ) : (
      <div />
    )}

    {currentSlide === totalSlides - 1 ? (
      <button
        className="h-12 w-12 rounded-full bg-lime-300 hover:bg-lime-400 
          transition-colors flex items-center justify-center"
        onClick={onFinish}
        disabled={isNextDisabled}

      >
        <ArrowRight className="w-5 h-5 text-gray-700" />
      </button>
    ) : (
      <button
          className={`h-12 w-12 rounded-full transition-colors flex items-center justify-center
            ${isNextDisabled 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
        <ArrowRight className="w-5 h-5 text-gray-700" />
      </button>
    )}
  </div>
  )
}

export default NavigationButtons