import PlayScreen from '@/app/components/screens/playScreen';
import { Category } from '@/app/data/sampleBoardData';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const PlayGame = () => {
    const router = useRouter();
    const { id } = router.query;
    const [jeopardyData, setJeopardyData] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameTitle, setGameTitle] = useState<string>("")
    const [link, setLink] = useState<string | null>(null)
    const [highScore, setHighScore] = useState<number|null>(null)
    const [isPublic, setIsPublic] = useState<boolean>(false)

    const handleNewGame = () => {
        setJeopardyData(null);
        setIsLoading(true)
        router.push('/game');
    };

    useEffect(() => {
        setLink(`${window.location.origin}${router.asPath}`)
    }, [router.asPath])

    useEffect(() => {
        const fetchJeopardyData = async () => {
            try {
                console.log(`ID in fetchJeopardy: ${id}`)
                const response = await fetch('/api/retrieve-game', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "game_id": id,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to retrieve game');
                }
                const { data, title, high_score, is_public } = await response.json();
                console.log(data)
                setJeopardyData(data)
                setGameTitle(title)
                setIsLoading(false)
                setHighScore(high_score)
                setIsPublic(is_public)
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load game data');
                console.error('Error fetching game data:', err);
            } finally {
                setIsLoading(false);

            }
        }

        const fetchBoardLink = () => {
            const url = `${window.location.origin}/play/${gameTitle.replaceAll(" ", "-")}/${id}`;
            const fullUrl = `${window.location.origin}${router.asPath}`
            if(fullUrl != null){
                setLink(fullUrl)
            } else {
                setLink(url)
            }
            
        }
        if (id) {
            fetchJeopardyData();
            fetchBoardLink()
        }

    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#060CE9] flex items-center justify-center">
                <div className="text-[#FFCC00] text-2xl font-bold animate-pulse">
                    Loading Game...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#060CE9] flex items-center justify-center">
                <div className="max-w-md w-full bg-[#000080] border-2 border-[#FFCC00] rounded-lg p-6">
                    <h2 className="text-[#FFCC00] text-xl font-bold mb-4">Error Loading Game</h2>
                    <p className="text-white">{error}</p>
                    <button
                        onClick={() => router.push('/game')}
                        className="mt-6 bg-[#FFCC00] text-[#000080] px-6 py-2 rounded-lg 
              font-bold hover:bg-[#FFD700] transition duration-200"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!jeopardyData) {
        return (
            <div className="min-h-screen bg-[#060CE9] flex items-center justify-center">
                <div className="text-[#FFCC00] text-2xl font-bold">
                    No game data found
                </div>
            </div>
        );
    }

    return <PlayScreen categories={jeopardyData} handleReset={handleNewGame} title={gameTitle} link={link} highScore={highScore} isPublic={isPublic}/>;
}

export default PlayGame