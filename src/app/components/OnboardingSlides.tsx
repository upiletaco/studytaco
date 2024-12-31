import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';  // Change the import

const OnboardingSlides = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    const handleSubmit = async () => {
        console.log("handling submit")
        router.push('/game')
    };

    useEffect(()=> {
        localStorage.setItem('visited-jeopardy', 'true')
    }, [])


    const slides = [

        {
            title: "Our First Game is Jeopardy!",
            description: "Here's how to play:",
            illustration: (
                <div className="w-64 h-48 mx-auto mb-8 relative">
                    <div className="absolute top-0 left-4 w-12 h-12 bg-blue-200 rounded-lg transform -rotate-6" />
                    <div className="absolute top-0 right-4 w-12 h-12 bg-blue-200 rounded-lg transform rotate-6" />
                    <div className="bg-purple-300 rounded-xl p-6 mx-auto max-w-[300px] relative top-8">
                        <div className="bg-white/30 h-4 rounded-md mb-3" />
                        <div className="bg-white/30 h-3 rounded-md mb-2" />
                        <div className="bg-white/30 h-3 rounded-md mb-2" />
                        <div className="absolute -right-2 -top-2">
                            <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-green-600 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Upload your notes or Youtube Video",
            description: "Upload your files (PDF, DOCX, TXT) or a youtube link and we will transform them into a custom Jeopardy board",
            illustration: (<div className="w-64 h-48 mx-auto mb-8 relative">
                {/* Background floating files */}
                <div className="absolute top-2 left-4 w-10 h-12 bg-blue-200 rounded-lg transform -rotate-6 flex flex-col p-1">
                    <div className="w-6 h-1 bg-blue-300 rounded mb-1" />
                    <div className="w-4 h-1 bg-blue-300 rounded" />
                </div>
                <div className="absolute top-2 right-4 w-10 h-12 bg-blue-200 rounded-lg transform rotate-6 flex flex-col p-1">
                    <div className="w-6 h-1 bg-blue-300 rounded mb-1" />
                    <div className="w-4 h-1 bg-blue-300 rounded" />
                </div>
                {/* Main upload box */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-purple-200 rounded-xl border-2 border-dashed border-purple-400 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-purple-500 rounded-full" />
                    </div>
                    <div className="w-16 h-2 bg-purple-300 rounded" />
                    <div className="w-12 h-2 bg-purple-300 rounded" />
                </div>
            </div>)
        },
        {
            title: "Playing the Game",
            description: "Select questions from different categories and test your knowledge",
            illustration: (
                <div className="w-64 h-48 mx-auto mb-8 relative">
                    {/* Grid of cards */}
                    <div className="grid grid-cols-3 gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i}
                                className={`w-16 h-16 ${i === 4 ? 'bg-blue-300' : 'bg-purple-200'} 
                      rounded-lg flex items-center justify-center shadow-sm
                      ${i === 4 ? 'transform scale-110' : ''}`}
                            >
                                {i === 4 && (
                                    <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Highlight effect on selected card */}
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 transform translate-x-2 -translate-y-2">
                        <div className="w-6 h-6 text-yellow-500">✨</div>
                    </div>
                </div>
            )

        },
        {
            title: "Scoring",
            description: "Gain points on correct answers and lose points on wrong answers",
            illustration: (
                <div className="w-64 h-48 mx-auto mb-8 relative">
                    {/* Score display boxes */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 items-center">
                        <div className="w-24 h-32 bg-green-200 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm">
                            <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-green-500 rounded-full" />
                            </div>
                            <div className="w-12 h-3 bg-green-300 rounded" />
                            <div className="text-green-600 font-bold">+500</div>
                        </div>
                        <div className="w-24 h-32 bg-red-200 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm">
                            <div className="w-10 h-10 bg-red-300 rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-red-500 rounded-full" />
                            </div>
                            <div className="w-12 h-3 bg-red-300 rounded" />
                            <div className="text-red-600 font-bold">-300</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Get Started",
            description: "Play now!",
            illustration: (
                <div className="w-64 h-48 mx-auto mb-8 relative">
                    <svg className="rounded-xl" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor='#00FFFF' stop-opacity="0.3" />
                                <stop offset="70%" stopColor='#060CE9' stop-opacity="0.8" />
                                <stop offset="100%" stopColor='#000080' stop-opacity="1" />
                            </radialGradient>

                            <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor='#FFFFFF' stop-opacity="0" />
                                <stop offset="50%" stopColor='#00FFFF' stop-opacity="0.5" />
                                <stop offset="100%" stopColor='#FFFFFF' stop-opacity="0" />
                            </linearGradient>
                        </defs>

                        <rect width="600" height="400" fill="url(#backgroundGlow)" />

                        <g>
                            <g transform="translate(300,200) rotate(-60)">
                                <rect x="-300" y="-2" width="600" height="4" fill="url(#rayGradient)" opacity="0.3" />
                            </g>
                            <g transform="translate(300,200) rotate(-40)">
                                <rect x="-300" y="-3" width="600" height="6" fill="url(#rayGradient)" opacity="0.4" />
                            </g>
                            <g transform="translate(300,200) rotate(-20)">
                                <rect x="-300" y="-4" width="600" height="8" fill="url(#rayGradient)" opacity="0.5" />
                            </g>

                            <g transform="translate(300,200)">
                                <rect x="-300" y="-5" width="600" height="10" fill="url(#rayGradient)" opacity="0.6" />
                            </g>

                            <g transform="translate(300,200) rotate(20)">
                                <rect x="-300" y="-4" width="600" height="8" fill="url(#rayGradient)" opacity="0.5" />
                            </g>
                            <g transform="translate(300,200) rotate(40)">
                                <rect x="-300" y="-3" width="600" height="6" fill="url(#rayGradient)" opacity="0.4" />
                            </g>
                            <g transform="translate(300,200) rotate(60)">
                                <rect x="-300" y="-2" width="600" height="4" fill="url(#rayGradient)" opacity="0.3" />
                            </g>
                        </g>

                        <g transform="translate(300,200)">
                            <text x="0" y="0"
                                font-family="Impact, sans-serif"
                                font-size="72"
                                fill="#000080"
                                text-anchor="middle"
                                transform="translate(6,6)">
                                JEOPARDY!
                            </text>

                            <text x="0" y="0"
                                font-family="Impact, sans-serif"
                                font-size="72"
                                fill="#FFFFFF"
                                stroke="#FFCC00"
                                stroke-width="2"
                                text-anchor="middle">
                                JEOPARDY!
                            </text>

                            <text x="0" y="0"
                                font-family="Impact, sans-serif"
                                font-size="72"
                                fill="none"
                                stroke="#FFFFFF"
                                stroke-width="1"
                                text-anchor="middle"
                                opacity="0.5">
                                JEOPARDY!
                            </text>
                        </g>
                    </svg>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto px-4 py-8 min-h-screen flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center">
                    {slides[currentSlide].illustration}

                    <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        {slides[currentSlide].title}
                    </h1>

                    <p className="text-gray-600 text-center mb-8 max-w-xs">
                        {slides[currentSlide].description}
                    </p>

                </div>


         
                


                <div className='flex-col'>
                    <div className="flex gap-2 justify-center flex-1 px-4 mb-4">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 w-8 rounded-full transition-colors duration-300 
          ${currentSlide === index ? 'bg-gray-900' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between px-4">
                        {currentSlide != 0 ? (
                            <button
                                className="h-12 w-12 rounded-full bg-blue-300 hover:bg-blue-400 
            transition-colors flex items-center justify-center"
                                onClick={() => setCurrentSlide(prev => prev - 1)}
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-700" />
                            </button>
                        ) : (<div></div>)}


                        {currentSlide === slides.length - 1 ? (
                            <button
                                className="h-12 w-12 rounded-full bg-lime-300 hover:bg-lime-400 
                transition-colors flex items-center justify-center"
                                onClick={handleSubmit}
                            >

                                <ArrowRight className="w-5 h-5 text-gray-700" />
                                
                            </button>

                        ) : (
                            <button
                                className="h-12 w-12 rounded-full bg-blue-300 hover:bg-blue-400 
                transition-colors flex items-center justify-center"
                                onClick={() => setCurrentSlide(prev => prev + 1)}
                            >
                                <ArrowRight className="w-5 h-5 text-gray-700" />
                            </button>
                        )}
                    </div>

                </div>


            </div>
        </div>
    );
};

export default OnboardingSlides;