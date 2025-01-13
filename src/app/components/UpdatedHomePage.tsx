import React from 'react';
import { Brain, Mail, Play, Trophy, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Image from 'next/image';

const GamePage = () => {
  const router = useRouter()
  const handleJeopardyClick = () => {
    router.push('/game')
  };

  const handleMillionaireClick = () => {
    router.push('/millionaire/home');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left side content */}
          <div className="flex-1 space-y-6 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Turn Study Time Into
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent text-4xl md:text-5xl font-bold">
                  Game Time
                </span>
                <Image
                  src="/taco-design.png"
                  alt="Taco"
                  width={96}
                  height={96}
                  className=" md:mt-0"
                />
              </div>
            </div>
            <p className="text-xl text-gray-600 flex items-center justify-center ">
              Transform your study materials into engaging games. Learn faster, remember longer.
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
          {/* <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
            <div className=" mb-4 absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full animate-pulse flex justify-center align-middle items-center" />
            <GeometricTaco />
          </div> */}
        </div>
      </div>

      {/* Game Selection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
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
      <div className="bg-gray-50 py-8">
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
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand and Copyright */}
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Image src="/taco-design.png" alt="Taco" width={24} height={24} />

                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  StudyTaco
                </span>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} StudyTaco. All rights reserved.
              </p>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@studytaco.com" className="text-sm">
                  support@studytaco.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GamePage;