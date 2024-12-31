import React, { useEffect, useState } from 'react'
import { JeopardyData } from '../../data/sampleBoardData';
import HomeScreen from './homeScreen';
import EditScreen from './editScreen';
import PlayScreen from './playScreen';
import { useRouter } from 'next/router';



type ViewState = 'home' | 'edit' | 'play';

const NavHandler = () => {

    const [currentView, setCurrentView] = useState<ViewState>('home');
    const [jeopardyData, setJeopardyData] = useState<JeopardyData | null>(null);
    const [title, setTitle] = useState<string>("")
    const router = useRouter()


      useEffect(() => {
            const checkOnboardingComplete =  () => {
                const visited =  localStorage.getItem('visited-jeopardy')
    
                if (visited == null) {
                    router.push('/onboarding')
                }
            }
    
            checkOnboardingComplete()
    
        }, [])
        
    const handleViewChange = (view: ViewState) => {
        setCurrentView(view);
    };

    const handleNewGame = () => {
        // Reset everything and go back to home
        setJeopardyData(null);
        setCurrentView('home');
    };

    const HomeComponent = () => {
        const onJeopardyDataGenerated = (data: JeopardyData, title: string) => {
            setJeopardyData(data);
            setCurrentView('edit'); // Automatically transition to play view when data is generated
            setTitle(title)
        };

        return <HomeScreen onJeopardyDataGenerated={onJeopardyDataGenerated} />;
    };

    const EditComponent = () => {
        if (!jeopardyData) return null;

        const handleSaveEdit = (updatedData: JeopardyData, updatedTitle: string) => {
            setJeopardyData(updatedData);
            setCurrentView('play');
            setTitle(updatedTitle)
        };

        return (
            <div className="relative">
                <EditScreen
                    categories={jeopardyData.categories}
                    onEditSave={handleSaveEdit}
                    title={title}

                />
                <button
                    onClick={() => handleViewChange('home')}
                    className="fixed bottom-4 left-4 bg-[#FFCC00] text-[#000080] px-6 py-2 rounded-lg 
            font-bold hover:bg-[#FFD700] transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        );
    };


    const PlayComponent = () => {
        if (!jeopardyData) return null;
        
        return (
            <div className="relative">
            <PlayScreen categories={jeopardyData.categories} handleReset={handleNewGame} title={title} link= {null} highScore={null} isPublic={false}/>
            </div>
        )
     
    }


    return (
        <div className="min-h-screen bg-[#060CE9] flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto relative">


            {currentView === 'home' && <HomeComponent />}
            {currentView === 'edit' && <EditComponent />}
            {currentView === 'play' && <PlayComponent />}
        </div>
    </div>
    )
}

export default NavHandler