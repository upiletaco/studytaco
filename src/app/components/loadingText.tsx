import React, { useState, useEffect } from 'react';

const loadingStates = [
  "Reading File...",
  "Creating Clues...",
  "Determining Answers...",
  "Drawing Jeopardy Board..."
];

interface LoadingTextProps {
  isVisible: boolean;
}

const LoadingText: React.FC<LoadingTextProps> = ({ isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingStates.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  
  if (!isVisible) return null;
  return (
    <div className="mt-6 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-700 text-lg">
          {loadingStates[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingText;