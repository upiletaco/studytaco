import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { WwbmGame } from '@/app/util/wwbm.types';
import { Play, Star, Users } from 'lucide-react';
import LoadingPage from '../LoadingPage';
import { getSupabase } from '@/app/services/supabaseClient';

// interface BoardData {
//   alias: string | null;
//   created_at: string;
//   high_score: number | null;
//   id: string;
//   is_public: boolean;
// }

const UserGames = () => {
  const [games, setGames] = useState<WwbmGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  const router = useRouter();

  useEffect(() => {
    const fetchBoards = async () => {

      try {
        const supabase = getSupabase()
        const { data: { user } } = await supabase.auth.getUser();

        const user_id = user?.id

        if (user_id == null) {
          return
        }

        const response = await fetch('/api/wwbm/getUserGames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user_id
          })
        });
        const data = await response.json();
        setGames(data.data.reverse());
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleGameClick = (id: string, title: string) => {
    const urlTitle = title.replaceAll(" ", "-")
    posthog.capture('user clicks on discover boards')
    router.push(`/millionaire/play/${urlTitle}/${id}`);
  };

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Games</h2>
        <select className="bg-white border rounded-lg px-3 py-2 text-sm">
          <option>All Categories</option>
          <option>History</option>
          <option>Biology</option>
          <option>Science</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map(game => (
          <div key={game.id} onClick={() => handleGameClick(game.id, game.alias)} className="bg-gradient-to-tr from-blue-50 via-white to-orange-50 rounded-xl p-4 hover:shadow-lg transition-shadow border border-blue-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{game.alias}</h3>
                {/* <p className="text-sm text-gray-600">by John Doe</p> */}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                             <Users size={16} />
                             <span>{Math.floor(Math.random() * (200 - 30 + 1) + 30)}</span>
                             </div>
                          
                           <div className="flex items-center gap-1">
                             <Star size={16} className="text-yellow-500 fill-yellow-500" />
                             <span>{(Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)}</span>
                             </div>
            </div>

            <button onClick={() => handleGameClick(game.id, game.alias)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Play size={16} />
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default UserGames;