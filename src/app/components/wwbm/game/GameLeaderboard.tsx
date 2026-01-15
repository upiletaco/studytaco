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
    }, [currentScore]);



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