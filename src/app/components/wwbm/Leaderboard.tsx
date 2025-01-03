import { Trophy, Award, Medal, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

// ... other interfaces remain the same

interface LeaderboardPlayer {
    name: string;
    score: number;
    rank: number;
    avatar?: string;
    
  }
  
  interface LeaderboardProps {
    players: LeaderboardPlayer[];
    title?: string;
    onBack?: () => void;
    gameTitle: string; // Add this

  }

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  players, 
  onBack, 
  gameTitle
}) => {
  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400 fill-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-orange-400 fill-orange-400" />;
      case 4:
        return <Award className="w-6 h-6 text-blue-400" />;
      case 5:
        return <Award className="w-6 h-6 text-emerald-400" />;
      default:
        return <Award className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Header remains the same */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          {gameTitle}
        </h1>
      </div>
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {players.slice(0, 3).map((player, index) => (
          <div
            key={player.name}
            className="bg-gradient-to-tr from-blue-50 via-white to-purple-50 rounded-xl p-4 border border-blue-100"
          >
            <div className="flex items-center gap-3 mb-2">
              {getTrophyIcon(index + 1)}
              <span className="text-lg font-semibold text-gray-800">
                {player.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rank #{index + 1}</span>
              <span className="font-semibold text-emerald-600">{player.score.toLocaleString()} XP</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of Leaderboard */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {players.slice(3).map((player, index) => (
          <div 
            key={player.name}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 flex justify-center">
              {getTrophyIcon(player.rank)}
            </div>
            <div className="flex-1">
              <span className="font-medium text-gray-800">{player.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {player.score.toLocaleString()} XP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;