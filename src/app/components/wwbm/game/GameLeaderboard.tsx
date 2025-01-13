import { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";
import { getSupabase } from "@/app/services/supabaseClient";
import { LeaderboardEntry } from "@/app/util/wwbm.types";


interface GameLeaderboardProps {
    gameId: string;
    alias: string;
    handlePrizes: () => void;
    currentScore: number;
    userId: string;
    onRankChange?: (newRank: number) => void;
    players: LeaderboardEntry[];  // New prop
    updatePlayers: (score: number) => void;  // New prop
}
  
  const GameLeaderboard: React.FC<GameLeaderboardProps> = ({ 
    gameId, 
    alias, 
    handlePrizes,
    currentScore,
    userId,
    onRankChange,
    players,
    updatePlayers
}) => {
    //   const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [previousRank, setPreviousRank] = useState<number | null>(null);

    useEffect(() => {
        updatePlayers(currentScore);
    }, [currentScore, updatePlayers]);




    useEffect(() => {
        // Check for rank change
        const currentRank = players.find(p => p.user_id === userId)?.rank || null;
        
        // Only trigger rank change if we have both ranks and they're different
        if (previousRank !== null && 
            currentRank !== null && 
            currentRank !== previousRank) {
            // Always call onRankChange if it exists and ranks are different
            if (onRankChange) {
                onRankChange(currentRank);
            }
        }
        
        // Always update the previous rank
        setPreviousRank(currentRank);
    }, [players, userId, previousRank, onRankChange]);
  
    //   useEffect(() => {
    //       const fetchLeaderboard = async () => {
    //           const { data: leaderboard } = await supabase
    //               .from('leaderboards')
    //               .select('id')
    //               .eq('game_id', gameId)
    //               .single();
  
    //           const leaderboardId = leaderboard?.id;
    //           if (leaderboardId) {
    //               const { data: retrievedPlayers } = await supabase
    //                   .from('leaderboard_entries')
    //                   .select('*')
    //                   .eq('leaderboard_id', leaderboardId);
  
    //               if (retrievedPlayers) {
    //                   let allPlayers = [...retrievedPlayers] as LeaderboardEntry[];
                      
    //                   // Check if current user exists in players
    //                   const currentPlayerIndex = allPlayers.findIndex(p => p.user_id === userId);
                      
    //                   if (currentPlayerIndex === -1) {
    //                       // Add temporary player if they don't exist
    //                       const temporaryPlayer: LeaderboardEntry = {
    //                           id: 'temp-' + userId,
    //                           user_id: userId,
    //                           username: 'You',
    //                           score: currentScore,
    //                           leaderboard_id: leaderboardId,
    //                           rank: null,
    //                           is_bot: false,
    //                           created_at: null,
    //                           updated_at: null
    //                       };
    //                       allPlayers.push(temporaryPlayer);
    //                   } else {
    //                       // Update existing player's score
    //                       allPlayers[currentPlayerIndex].score = currentScore;
    //                   }
  
    //                   // Sort players by score
    //                   allPlayers.sort((a, b) => b.score - a.score);
  
    //                   // Update ranks
    //                   allPlayers = allPlayers.map((player, index) => ({
    //                       ...player,
    //                       rank: index + 1
    //                   }));
  
    //                   // Check for rank change
    //                   const currentRank = allPlayers.find(p => p.user_id === userId)?.rank || null;
    //                   if (previousRank !== null && 
    //                       currentRank !== null && 
    //                       currentRank !== previousRank && 
    //                       onRankChange) {
    //                       onRankChange(currentRank);
    //                   }
    //                   setPreviousRank(currentRank);
  
    //                   setPlayers(allPlayers);
    //               }
    //           }
    //       };
  
    //       fetchLeaderboard();
  
    //       const subscription = supabase
    //           .channel(`leaderboard-${gameId}`)
    //           .on('postgres_changes', {
    //               event: '*',
    //               schema: 'public',
    //               table: 'leaderboard_entries',
    //               filter: `leaderboard_id=eq.${gameId}`
    //           }, () => {
    //               fetchLeaderboard();
    //           })
    //           .subscribe();
  
    //       return () => {
    //           subscription.unsubscribe();
    //       };
    //   }, [gameId, currentScore, userId]); // Added currentScore and userId to dependencies
  
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