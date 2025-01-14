import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'
import { QuestionCounter } from './QuestionCounter';
import StreakCounter from '../../StreakCounter';


interface MillionaireTitleBarProps {
    title: string;
    currentQuestionIndex: number;
    questionLength: number;
    score: number;
    handlePrizes: () => void;
    streak: number;
}


const MillionaireTitleBar: React.FC<MillionaireTitleBarProps> = ({ title, currentQuestionIndex, questionLength, score, handlePrizes, streak }) => {
    const router = useRouter()
    const calculateProgress = (): number => {
        return 100 * ((currentQuestionIndex + 1) / questionLength)
    }
    const handleHome = () => {
        router.push('/millionaire/home')
    }

    return (
        <div className='p-4'>

            <div className='flex justify-between items-center pb-2'>
                <div className='flex gap-4'>
                <ArrowLeft onClick={handleHome} className='bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-3xl p-2 w-10 h-10' />
                <StreakCounter/>
                </div>
                <p className='text-black text-xl font-semibold text-center'>{title}</p>

                <div className='flex gap-4'>
                    <QuestionCounter streak={streak} />
                    <Trophy onClick={handlePrizes} className='bg-orange-200 text-orange-600 hover:bg-orange-300 rounded-3xl p-2 w-10 h-10' />
                </div>
            </div>

            <div className="bg-gray-200 px-2 py-1 rounded-full mb-2 text-center">
                <span className="text-black text-lg font-semibold">{score} pt</span>
            </div>

            <Progress value={calculateProgress()} className='w-full  bg-gray-100 [&>div]:bg-orange-200' />


        </div>
    )
}

export default MillionaireTitleBar