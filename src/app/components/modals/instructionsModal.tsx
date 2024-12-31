import React, { useState } from 'react';

const HowToPlayModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span 
        onClick={() => setIsOpen(true)}
        className="text-[#FFCC00] mb-4 font-semibold uppercase underline cursor-pointer hover:text-[#FFD700] transition-colors duration-200"
      >
        How to Play
      </span>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#000080] border-2 border-[#FFCC00] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="p-6 border-b border-[#FFCC00]">
              <h2 className="text-2xl font-bold text-center text-[#FFCC00]">
                How to Play AI Jeopardy
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 text-[#FFCC00] space-y-4">
                <p>
                  Taco Learn has built an AI Jeopardy game that turns your study materials into an engaging learning experience!
                </p>

                <div className="bg-[#000080]/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Getting Started</h3>
                  <p>Upload your files (PDF, DOCX, TXT) and we will transform them into a custom Jeopardy board.</p>
                  <div className="mt-2 max-w-xs mx-auto">
                    <img 
                      src="/upload.png" 
                      alt="File upload demo" 
                      className="rounded-lg border border-[#FFCC00]/30 w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="bg-[#000080]/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Playing the Game</h3>
                  <p>Select questions from different categories and test your knowledge!</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="mx-auto w-full">
                      <img 
                        src="/board.png" 
                        alt="Board" 
                        className="rounded-lg border border-[#FFCC00]/30 w-full h-full object-cover"
                      />
                    </div>
                    <div className="mx-auto w-full">
                      <img 
                        src="/question.png" 
                        alt="Question" 
                        className="rounded-lg border border-[#FFCC00]/30 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#000080]/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Scoring</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Correct answers: Earn points equal to the question value</li>
                    <li>Incorrect answers: Lose points equal to the question value</li>
                  </ul>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="mx-auto w-full">
                      <img 
                        src="/addPoint.png" 
                        alt="Gaining points" 
                        className="rounded-lg border border-[#FFCC00]/30 w-full h-full object-cover"
                      />
                    </div>
                    <div className="mx-auto w-full">
                      <img 
                        src="/subtractPoint.png" 
                        alt="Losing points" 
                        className="rounded-lg border border-[#FFCC00]/30 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-center font-bold">
                  Play as many times as you like and share the game with your friends!
                </p>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 border-t border-[#FFCC00]">
              <div className="text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#FFCC00] text-[#000080] px-6 py-2 rounded-lg 
                    font-bold hover:bg-[#FFD700] transition duration-200"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowToPlayModal;