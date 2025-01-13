import { useEffect } from "react";
import Leaderboard from "../Leaderboard";
import { LeaderboardEntry } from "@/app/util/wwbm.types";


interface GameLeaderboardProps {
    gameId: string;
    alias: string;
    handlePrizes: () => void;
    currentScore: number;
    userId: string;
    // onRankChange?: (newRank: number) => void;
    players: LeaderboardEntry[];  // New prop
    updatePlayers: (score: number) => void;  // New prop
}
  
  const GameLeaderboard: React.FC<GameLeaderboardProps> = ({ 
    alias, 
    handlePrizes,
    currentScore,
    userId,
    // onRankChange,
    players,
    updatePlayers
}) => {
    //   const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    // const [previousRank, setPreviousRank] = useState<number | null>(null);

    useEffect(() => {
        updatePlayers(currentScore);
    }, [currentScore, updatePlayers]);




    // useEffect(() => {
    //     // Check for rank change
    //     const currentRank = players.find(p => p.user_id === userId)?.rank || null;
        
    //     // Only trigger rank change if we have both ranks and they're different
    //     if (previousRank !== null && 
    //         currentRank !== null && 
    //         currentRank !== previousRank) {
    //         // Always call onRankChange if it exists and ranks are different
    //         if (onRankChange) {
    //             onRankChange(currentRank);
    //         }
    //     }
        
    //     // Always update the previous rank
    //     setPreviousRank(currentRank);
    // }, [players, userId, previousRank, onRankChange]);
  
  
  
      return (
          <Leaderboard 
              players={players} 
              gameTitle={alias} 
              onBack={handlePrizes}
              currentUserId={userId}
          />
      );
  };
  
  export default GameLeaderboard;