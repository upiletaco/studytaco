import React, { useEffect, useState } from 'react'
import WwbmHomePage from './Homes';
import { WwbmQuestion } from '@/app/util/wwbm.types';
import EditMillionaire from './Edit';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

type ViewState = 'home' | 'edit' | 'play';


const MillionaireNavHandler = () => {

    const [currentView, setCurrentView] = useState<ViewState>('home');
    const [gameData, setGameData] = useState<WwbmQuestion[] | null>(null);
    const [title, setTitle] = useState<string>("")
    const router = useRouter()
    const handleViewChange = (view: ViewState) => {
        setCurrentView(view);
    };


    useEffect(() => {
        const checkOnboardingComplete = () => {
            const visited = localStorage.getItem('visited-millionaire')

            if (visited == null) {
                router.push('/millionaire/onboarding')
            }
        }

        checkOnboardingComplete()

    }, [])



    // const handleNewGame = () => {
    //     // Reset everything and go back to home
    //     setGameData(null);
    //     setCurrentView('home');
    // };

    const HomeComponent = () => {
        const onGameDataGenerated = (questions: WwbmQuestion[], title: string) => {
            setCurrentView('edit'); // Automatically transition to play view when data is generated
            setTitle(title)
            setGameData(questions)
        };

        return <WwbmHomePage onQuestionsGenerated={onGameDataGenerated} />;
    };

    const EditComponent = () => {
        if (!gameData) return null;

        // const handleSaveEdit = (updatedData: WwbmQuestion[], updatedTitle: string) => {
        //     setGameData(updatedData);
        //     setCurrentView('play');
        //     setTitle(updatedTitle)
        // };

        return (
            <div className="relative">
                <EditMillionaire wwbmQuestions={gameData} title={title} />
                <button
                    onClick={() => handleViewChange('home')}
                    className="fixed bottom-6 left-6 z-50 bg-blue-500 hover:bg-blue-600 text-white 
    px-6 py-4 rounded-xl font-semibold transition-all duration-200 
    flex items-center gap-2 border-2 border-blue-400 shadow-lg"
                >
                    <ArrowLeft className="w-5 h-5" /> {/* Import from lucide-react */}
                    Back to Home
                </button>
            </div>
        );
    };


    // const PlayComponent = () => {
    //     if (!jeopardyData) return null;

    //     return (
    //         <div className="relative">
    //         <PlayScreen categories={jeopardyData.categories} handleReset={handleNewGame} title={title} link= {null} highScore={null} isPublic={false}/>
    //         </div>
    //     )

    // }


    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="w-full max-w-7xl mx-auto relative">


                {currentView === 'home' && <HomeComponent />}
                {currentView === 'edit' && <EditComponent />}
                {/* {currentView === 'play' && <PlayComponent />} */}
            </div>
        </div>
    )
}

export default MillionaireNavHandler