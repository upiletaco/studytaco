export const OnboardingSlideContent: object[] = 
[
    {
      title: "Welcome to TacoLearn",
      description: "Education should be fun, so we are building products to turn your learning into games.",
      illustration: (
        <div className="w-64 h-48 mx-auto mb-8">
          <div className="relative bg-blue-200 rounded-xl p-4 shadow-lg transform -rotate-3">
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 mt-4 mb-3">
              <div className="w-5 h-5 bg-white/30 rounded-md" />
              <div className="text-white/70">My TacoLearn</div>
            </div>
            <div className="bg-white/30 h-6 rounded-md mb-2" />
            <div className="bg-white/30 h-6 rounded-md" />
            <div className="absolute -right-1 -top-1">
              <div className="w-6 h-6 text-purple-400">✨</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Our First Game is Jeopardy!",
      description: "Here's how to play:",
      hasInstructions: true,
      illustration: (
        <div className="w-64 h-48 mx-auto mb-8 relative">
          <div className="absolute top-0 left-4 w-12 h-12 bg-blue-100 rounded-lg transform -rotate-6" />
          <div className="absolute top-0 right-4 w-12 h-12 bg-blue-100 rounded-lg transform rotate-6" />
          <div className="bg-purple-200 rounded-xl p-6 mx-auto max-w-[200px] relative top-8">
            <div className="bg-white/30 h-4 rounded-md mb-3" />
            <div className="bg-white/30 h-3 rounded-md mb-2" />
            <div className="bg-white/30 h-3 rounded-md mb-2" />
            <div className="absolute -right-2 -top-2">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-green-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
        title: "Upload your notes",
        description: "Upload your files (PDF, DOCX, TXT) and we will transform them into a custom Jeopardy board.",
        illustration: (<div className="w-64 h-48 mx-auto mb-8 relative">
            {/* Background floating files */}
            <div className="absolute top-2 left-4 w-10 h-12 bg-blue-100 rounded-lg transform -rotate-6 flex flex-col p-1">
              <div className="w-6 h-1 bg-blue-200 rounded mb-1" />
              <div className="w-4 h-1 bg-blue-200 rounded" />
            </div>
            <div className="absolute top-2 right-4 w-10 h-12 bg-blue-100 rounded-lg transform rotate-6 flex flex-col p-1">
              <div className="w-6 h-1 bg-blue-200 rounded mb-1" />
              <div className="w-4 h-1 bg-blue-200 rounded" />
            </div>
            {/* Main upload box */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-purple-100 rounded-xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-purple-400 rounded-full" />
              </div>
              <div className="w-16 h-2 bg-purple-200 rounded" />
              <div className="w-12 h-2 bg-purple-200 rounded" />
            </div>
          </div>)
    },
    {
        title: "Playing the Game",
        description: "Select questions from different categories and test your knowledge!.",
        illustration: (
            <div className="w-64 h-48 mx-auto mb-8 relative">
              {/* Grid of cards */}
              <div className="grid grid-cols-3 gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} 
                    className={`w-16 h-16 ${i === 4 ? 'bg-blue-200' : 'bg-purple-100'} 
                      rounded-lg flex items-center justify-center shadow-sm
                      ${i === 4 ? 'transform scale-110' : ''}`}
                  >
                    {i === 4 && (
                      <div className="w-6 h-6 bg-blue-300 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Highlight effect on selected card */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 transform translate-x-2 -translate-y-2">
                <div className="w-6 h-6 text-yellow-400">✨</div>
              </div>
            </div>
          )
      
    },
    {
        title: "Scoring",
        description: "Gain Points on correct answers and lose points on wrong answers",
        illustration: (
            <div className="w-64 h-48 mx-auto mb-8 relative">
              {/* Score display boxes */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 items-center">
                <div className="w-24 h-32 bg-green-100 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-green-400 rounded-full" />
                  </div>
                  <div className="w-12 h-3 bg-green-200 rounded" />
                  <div className="text-green-600 font-bold">+500</div>
                </div>
                <div className="w-24 h-32 bg-red-100 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm">
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-red-400 rounded-full" />
                  </div>
                  <div className="w-12 h-3 bg-red-200 rounded" />
                  <div className="text-red-600 font-bold">-200</div>
                </div>
              </div>
            </div>
          )
    },
    {
      title: "Get Started",
      description: "Click here to begin your learning journey.",
      illustration: (
        <div className="w-64 h-48 mx-auto mb-8 relative">
          <div className="bg-yellow-100 w-40 h-48 mx-auto rounded-lg relative">
            <div className="absolute w-full h-1/2 border-b-2 border-dashed border-blue-400" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
              <div className="w-8 h-8 bg-blue-200 rounded-full" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
              <div className="w-8 h-8 bg-blue-200 rounded-full" />
            </div>
          </div>
        </div>
      )
    }
  ];