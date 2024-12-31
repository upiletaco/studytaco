import React from 'react'
import StreakCounter from './streakCounter'
import UserMenu from './UserMenu'
import { useRouter } from 'next/router'
import { FileQuestionIcon, HomeIcon } from 'lucide-react';

interface HeaderProps{
    instructions?: string;
}

const HeaderBar: React.FC<HeaderProps> = ({instructions}) => {
    const router = useRouter()

    const handleClickHome = () => {
        router.push('/home')
    }

    const handleInstructions = () => {
        if(instructions == "jeopardy"){
            router.push('/onboarding')
        }
        if(instructions == "millionaire"){
            router.push('/millionaire/onboarding')
        }

    }


    return (
        <div className="absolute top-0 left-0 right-0 p-2 bg-white rounded-b-xl">
            <div className="max-w-2xl mx-auto flex justify-between ">
                <div className="z-10 flex items-center gap-2">
                    <HomeIcon  onClick={handleClickHome}/>
                    <StreakCounter />

                </div>
          


                <div className="z-10 flex items-center gap-2">
                {instructions && (<FileQuestionIcon color='black' onClick={handleInstructions}/>)}

                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

export default HeaderBar