import { Trophy, Award, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LeaderboardEntry } from '@/app/util/wwbm.types';

interface LeaderboardProps {
  players: LeaderboardEntry[];
  gameTitle: string;
  onBack?: () => void;
  currentUserId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  players,
  onBack,
  gameTitle,
  currentUserId
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

  const isCurrentPlayer = (player: LeaderboardEntry) => player.user_id === currentUserId;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-20 flex flex-col p-4">
      <Card className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20"></div>
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-fit bg-white px-6 py-2 rounded-full text-center border-2 border-blue-100">
              <span className="text-black text-lg font-semibold">{gameTitle}</span>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="bg-white p-2 rounded-full border-2 border-blue-100"
              >
                <X className="w-6 h-6 text-blue-900" />
              </button>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {players.slice(0, 3).map((player, index) => (
                <div
                  key={player.username}
                  className={`bg-white rounded-2xl p-4 border-2 
                      ${isCurrentPlayer(player)
                      ? 'border-yellow-400 shadow-lg'
                      : 'border-blue-100'}`}                  >
                  <div className="flex items-center gap-3 mb-2">
                    {getTrophyIcon(index + 1)}
                    <span className="text-lg font-semibold text-gray-800">
                      {player.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rank #{index + 1}</span>
                    <span className="font-semibold text-emerald-600">{player.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-2">
              {players.slice(3).map((player, index) => (
                <div
                  key={player.username}
                  className={`bg-white rounded-full px-6 py-3 border-2 
                    ${isCurrentPlayer(player)
                      ? 'border-yellow-400 shadow-lg'
                      : 'border-blue-100'} 
                    flex items-center`}                >
                  <div className="w-12 flex justify-center">
                    {getTrophyIcon(player.rank || index + 4)}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{player.username}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {player.score} PT
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;