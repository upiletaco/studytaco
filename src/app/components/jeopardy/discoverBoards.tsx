import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';

interface BoardData {
  alias: string | null;
  created_at: string;
  high_score: number | null;
  id: string;
  is_public: boolean;
}

const DiscoverBoards = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/discover-boards');
        const data = await response.json();
        setBoards(data.data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardClick = (id: string, title: string) => {
    const urlTitle = title.replaceAll(" ", "-")
    posthog.capture('user clicks on discover boards')
    router.push(`/play/${urlTitle}/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <h2 className="text-3xl font-bold text-[#FFCC00] mb-6  
            tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
            font-serif" >Discover Boards</h2>
        <div className="text-[#FFCC00]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold text-[#FFCC00] 
            tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
            font-serif mb-6 text-center">
        Discover Boards
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => handleBoardClick(board.id, board.alias || "board")}
            className="bg-[#000080] border-2 border-[#FFCC00] rounded-lg p-4 cursor-pointer
              transform transition-all duration-200 hover:scale-105
              hover:bg-[#000080]/80"
          >
            <div className="text-[#FFCC00] font-bold text-lg mb-2">
              {board.alias || 'Unnamed Board'}
            </div>
            <div className="text-[#FFCC00] text-sm">
              High Score: {board.high_score?.toLocaleString() || '0'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverBoards;