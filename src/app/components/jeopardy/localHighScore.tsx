import React, { useEffect, useState } from 'react';


interface HighScoreProps {
    uuid: string
}
const HighScoreDisplay: React.FC<HighScoreProps> = ({uuid}) => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    console.log(`UUID in localHighScore: ${uuid}`)
    const checkLocalStorage = () => {
      const scoreKey = `${uuid}-score`;
      const lastVisitedKey = `${uuid}-last-visited`;
      
      const storedScore = localStorage.getItem(scoreKey);
      const lastVisited = localStorage.getItem(lastVisitedKey);
      
      if (!storedScore || !lastVisited) return null;

      // Check if last visited was within 24 hours
      const lastVisitedDate = new Date(lastVisited);
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      if (lastVisitedDate > twentyFourHoursAgo) {
        return parseInt(storedScore);
      }
      
      // Clear expired data
      localStorage.removeItem(scoreKey);
      localStorage.removeItem(lastVisitedKey);
      return null;
    };

    const cachedScore = checkLocalStorage();
    setScore(cachedScore);
  }, [uuid]);

  if (score === null) return null;

  return (
    <div className="items-center justify-center">
      <span className="text-[#FFCC00] font-mono font-bold text-lg">
        High Score: {score.toLocaleString()}
      </span>
    </div>
  );
};

export default HighScoreDisplay;