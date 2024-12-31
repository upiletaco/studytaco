import { SlideIndicatorProps } from '@/app/util/survey.types'
import React, { FC } from 'react'


const SlideIndicator: FC<SlideIndicatorProps> = ({ 
    totalSlides, 
    currentSlide 
  }) => {
  return (
    <div className="flex gap-2 justify-center flex-1 px-4 mb-4">
    {[...Array(totalSlides)].map((_, index) => (
      <div
        key={index}
        className={`h-1 w-8 rounded-full transition-colors duration-300 
          ${currentSlide === index ? 'bg-gray-900' : 'bg-gray-300'}`}
      />
    ))}
  </div>
  )
}

export default SlideIndicator