import { Copy, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'


export interface WwbmGameOverProps{
  isCorrect: boolean | null;
  score: number;
  correctAnswers: number;
  resetGame: () => void;
  link: string;
  title: string;
}

const WwbmGameOverModal: React.FC<WwbmGameOverProps> = ({isCorrect, score, correctAnswers, resetGame, link, title}) => {
  const [copied, setCopied] = useState<boolean>(false)
  const router = useRouter()
  
  const shareMessage = encodeURIComponent(`I scored $${score} in Millionaire Trivia - ${title}! Can you beat my score?`);

  const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${shareMessage}&url=${encodeURIComponent(link || '')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link || '')}&quote=${shareMessage}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link || '')}`
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
      // posthog.capture(`user clicks share to ${platform}`, {"link": sharlinkedLink})
      if (link) {
          window.open(shareLinks[platform], '_blank', 'width=600,height=400');
      }
  };

  const handleCopy = async () => {
    if (link) {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
};



const handleGoHome = () => {
  router.push('/millionaire/home')
}
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30">
      <div className="bg-gray-50 p-6 rounded-lg text-center w-full max-w-xs">
        <h2 className="text-2xl mb-4">
          {isCorrect ? 'Congratulations!' : 'Game Over'}
        </h2>
        <p className="text-xl mb-4">
          Final Score: ${score.toLocaleString()}
        </p>
        <p className="mb-6">
          Total Correct: {correctAnswers}
        </p>
        <button
          onClick={resetGame}
          className="bg-purple-400 hover:bg-purple-500 px-6 py-3 rounded-lg w-full mb-6 text-white"
        >
          Play Again
        </button>
        <h1>Share Game</h1>

        <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent text-black px-3 py-2 
                                        rounded-lg focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-purple-400 text-white p-2 rounded-lg 
                                        hover:bg-purple-500 transition duration-200"
          >
            <Copy size={20} />
          </button>

        </div>
        {copied && (
          <p className="text-purple-600 text-md mb-2">Link copied to clipboard!</p>
        )}


        <div className="flex justify-center space-x-4 mb-2">
          <button
            onClick={() => handleSocialShare('twitter')}
            className="bg-[#1DA1F2] text-white p-2 rounded-lg 
                                        hover:bg-[#1a8cd8] transition duration-200"
          >
            <Twitter size={24} />
          </button>
          <button
            onClick={() => handleSocialShare('facebook')}
            className="bg-[#4267B2] text-white p-2 rounded-lg 
                                        hover:bg-[#365899] transition duration-200"
          >
            <Facebook size={24} />
          </button>
          <button
            onClick={() => handleSocialShare('linkedin')}
            className="bg-[#0077B5] text-white p-2 rounded-lg 
                                        hover:bg-[#006399] transition duration-200"
          >
            <Linkedin size={24} />
          </button>
        </div>
        <button
          onClick={handleGoHome}
          className="bg-transparent px-6 py-3 rounded-lg w-full border-2 border-purple-400 hover:bg-gray-100"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default WwbmGameOverModal