import React from 'react';
import { Play } from 'lucide-react';
import { GeometricTaco } from './survey/illustrations/Taco';
import { useRouter } from 'next/navigation';
import HeaderBar from './HeaderBar';

const GameDashboard = () => {
    const router = useRouter()
    const handleJeopardyClick = () => {
        router.push('/game')
    };

    const handleMillionaireClick = () => {
        router.push('/millionaire/home');
    };

    return (
        <div className='bg-white'>

        <div className="flex flex-col h-screen bg-white w-full p-4 mx-auto max-w-2xl">
            {/* Header Section */}
            {/* <div className="flex  items-center mb-8 bg-pink">
                <UserMenu />
                <StreakCounter />
            </div> */}
            <HeaderBar/>

            {/* Welcome Section */}
            <div className="flex items-center justify-between align-middle mt-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to</h1>
                    <h2 className="text-4xl font-bold text-emerald-400">Taco Learn</h2>
                </div>
                <GeometricTaco />
            </div>

            {/* Games Section */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Play Games:</h3>

            {/* Game Cards */}
            <div className="flex flex-col gap-4 flex-grow">
                {/* AI Jeopardy Card */}
                <button
                    onClick={handleJeopardyClick}
                    className="flex justify-between items-center p-6 bg-sky-100 rounded-xl h-1/2 hover:bg-sky-200 transition-colors"
                >
                    <span className="text-2xl font-semibold text-gray-800">AI Jeopardy</span>
                    <Play className="w-8 h-8 text-gray-800" />
                </button>

                {/* Millionaire Game Card */}
                <button
                    onClick={handleMillionaireClick}
                    className="flex justify-between items-center p-6 bg-purple-100 rounded-xl h-1/2 hover:bg-purple-200 transition-colors"
                >
                    <span className="text-2xl font-semibold text-gray-800">Millionaire Trivia</span>
                    <Play className="w-8 h-8 text-gray-800" />
                </button>
            </div>

        </div>
        </div>

    );
};

export default GameDashboard;