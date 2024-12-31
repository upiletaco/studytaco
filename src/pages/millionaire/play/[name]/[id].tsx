import LoadingPage from '@/app/components/LoadingPage';
import Game from '@/app/components/wwbm/game/Game';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


export interface GameData {
    id: string;
    created_at: string;
    alias: string;
    high_score: number | null;
    is_public: boolean;
}

export interface Option {
    id: string;
    created_at: string;
    question_id: string;
    clue: string;
    correct: boolean;
}

export interface QuestionData {
    options: Option[];
    question: {
        id: string;
        created_at: string;
        game_id: string;
        question: string;
    };
}




const PlayWwbm = () => {
    const router = useRouter();
    const { id } = router.query;
    const [gameData, setGameData] = useState<QuestionData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameTitle, setGameTitle] = useState<string>("")
    const [link, setLink] = useState<string | null>(null)
    const [highScore, setHighScore] = useState<number|null>(null)
    const [isPublic, setIsPublic] = useState<boolean>(false)


    useEffect(() => {
        setLink(`${window.location.origin}${router.asPath}`)
    }, [router.asPath])

    useEffect(() => {
        const fetchGameData = async () => {
            console.log(link, highScore, isPublic)
            try {
                console.log(`ID in fetchJeopardy: ${id}`)
                const response = await fetch('/api/wwbm/getGame', {
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
                const { data, questions } = await response.json();
                console.log(data)
                console.log(questions)
                setGameData(questions.questions)
                setGameTitle(data.alias)
                setIsLoading(false)
                setHighScore(data.high_score)
                setIsPublic(data.is_public)
                const url = `${window.location.origin}/millionaire/play/${data.alias.replaceAll(" ", "-")}/${id}`;
                const fullUrl = `${window.location.origin}${router.asPath}`
                if(fullUrl != null){
                    setLink(fullUrl)
                } else {
                    setLink(url)
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load game data');
                console.error('Error fetching game data:', err);
            } finally {
                setIsLoading(false);

            }
        }

        // const fetchBoardLink = () => {
        //     const url = `${window.location.origin}/play/${gameTitle.replaceAll(" ", "-")}/${id}`;
        //     const fullUrl = `${window.location.origin}${router.asPath}`
        //     if(fullUrl != null){
        //         setLink(fullUrl)
        //     } else {
        //         setLink(url)
        //     }
            
        // }
        if (id) {
            fetchGameData();
            // fetchBoardLink()
        }

    }, [id])

    if (isLoading) {
        return (
            <LoadingPage/>
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

    if (!gameData) {
        return (
            <div className="min-h-screen bg-[#060CE9] flex items-center justify-center">
                <div className="text-[#FFCC00] text-2xl font-bold">
                    No game data found
                </div>
            </div>
        );
    }
    return <Game title={gameTitle} questions={gameData} link={link!}/>

}

export default PlayWwbm