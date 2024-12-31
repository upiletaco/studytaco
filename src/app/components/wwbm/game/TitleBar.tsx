import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'


interface MillionaireTitleBarProps {
    title: string;
    currentQuestionIndex: number;
    questionLength: number;
    score: number;
    handlePrizes: () => void;
}


const MillionaireTitleBar: React.FC<MillionaireTitleBarProps> = ({ title, currentQuestionIndex, questionLength, score, handlePrizes }) => {
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
                <ArrowLeft onClick={handleHome} className='bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-3xl p-2 w-10 h-10' />
                <p className='text-black text-xl font-semibold text-center'>{title}</p>

                <Trophy onClick={handlePrizes} className='bg-orange-200 text-orange-600 hover:bg-orange-300 rounded-3xl p-2 w-10 h-10' />
            </div>

            <div className="bg-gray-200 px-2 py-1 rounded-full mb-2 text-center">
                <span className="text-black text-lg font-semibold">{score} pt</span>
            </div>

            <Progress value={calculateProgress()} className='w-full  bg-gray-100 [&>div]:bg-orange-200' />


        </div>
    )
}

export default MillionaireTitleBar