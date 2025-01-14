import React from 'react';

const OnboardingInstructions = () => {
  return (
    <div className="bg-white rounded-xl w-full max-w-2xl flex flex-col">
      

      <div className="overflow-y-auto">
        <div className="p-6 text-gray-600 space-y-6">
         

          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Getting Started</h3>
            <p>Upload your files (PDF, DOCX, TXT) and we will transform them into a custom Jeopardy board.</p>
            <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-200 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Playing the Game</h3>
            <p>Select questions from different categories and test your knowledge!</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-green-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Scoring</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Correct answers: Earn points equal to the question value
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                Incorrect answers: Lose points equal to the question value
              </li>
            </ul>
          </div>

          <p className="text-center font-medium text-gray-900">
            Play as many times as you like and share the game with your friends!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInstructions;