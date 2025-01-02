import React from 'react';
import { Brain, Play, Trophy, Users } from 'lucide-react';
import { GeometricTaco } from './survey/illustrations/Taco';
import { useRouter } from 'next/navigation';
import HeaderBar from './HeaderBar';

const GamePage = () => {
  const router = useRouter()
  const handleJeopardyClick = () => {
    router.push('/game')
  };

  const handleMillionaireClick = () => {
    router.push('/millionaire/home');
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeaderBar />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Study Taco
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Transform your study materials into engaging quiz games. Learn faster, remember longer.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">Games Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">20%+</div>
                <div className="text-sm text-gray-600">Grade Boost</div>
              </div>
            </div>
          </div>

          {/* Right side mascot */}
          <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
            <div className=" mb-4 absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full animate-pulse flex justify-center align-middle items-center" />
            <GeometricTaco />
          </div>
        </div>
      </div>

      {/* Game Selection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Select a Game to Play
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Millionaire Card */}
          <button className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-left border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-emerald-50 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Millionaire Trivia
              </h3>
              <p className="text-gray-600 mb-6">
                Test your knowledge with our popular quiz format. Win virtual millions!
              </p>
              <div onClick={handleMillionaireClick} className="flex items-center text-blue-600 font-medium">
                Play Now
                <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* AI Jeopardy Card */}
          <button className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 text-left border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 via-white to-pink-50 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                AI Jeopardy
              </h3>
              <p className="text-gray-600 mb-6">
                Challenge yourself with AI-generated categories and questions.
              </p>
              <div onClick={handleJeopardyClick} className="flex items-center text-purple-600 font-medium">
                Play Now
                <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Learning</h3>
              <p className="text-gray-600">AI-powered questions adapt to your knowledge level</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compete & Win</h3>
              <p className="text-gray-600">Challenge friends and climb the leaderboard</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Join thousands of learners worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;