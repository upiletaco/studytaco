import { SurveryData } from '@/app/util/survey.types'
import React, { FC, useState } from 'react'


interface ExtendedSlideProps extends SurveryData {
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

const Slide: FC<ExtendedSlideProps> = ({
  question,
  options,
  illustration: Illustration,
  selectedAnswer,
  onAnswerSelect
}) => {

  const [otherText, setOtherText] = useState('');
  const isOtherSelected = selectedAnswer === 'Other' || selectedAnswer?.startsWith('Other:');


  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    console.log(newText)
    setOtherText(newText);
    if (isOtherSelected) {
      onAnswerSelect(`Other: ${newText}`);
    }
  };
  const handleOptionChange = (option: string) => {
    console.log(option)
    if (option === 'Other') {
      onAnswerSelect(otherText ? `Other: ${otherText}` : 'Other');
    } else {
      onAnswerSelect(option);
    }
  };


  

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="mb-6">

      <Illustration/>


        <div className="flex items-center gap-2 mb-4">
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{question}</h2>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8 w-9/12">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
          >
            <input
              type="radio"
              name="answer"
              className="w-5 h-5 border-2 border-gray-300"
              checked={option === 'Other' ? isOtherSelected : selectedAnswer === option}
              onChange={() => handleOptionChange(option)}
            />
            <span className="text-gray-700">{option}</span>
            {option === 'Other' && isOtherSelected && (
              <input
                type="text"
                value={otherText}
                onChange={handleOtherTextChange}
                placeholder="Please specify..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-0 text-black"
                autoFocus
              />
            )}
          </label>
          
        ))}
      </div>

    </div>
  )
}

export default Slide