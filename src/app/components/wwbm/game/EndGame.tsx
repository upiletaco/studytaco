import React, { useEffect, useState } from 'react';
import { Send, X, Play, Copy, Facebook, Linkedin, Twitter } from 'lucide-react';
import { getSupabase } from '@/app/services/supabaseClient';
import { User } from '@supabase/supabase-js';
import { updateWwbmHighScore } from '@/app/services/wwbmService';

export interface WwbmGameOverProps{
    isCorrect: boolean | null;
    score: number;
    correctAnswers: number;
    resetGame: () => void;
    link: string;
    title: string;
  }

const CongratsPage: React.FC<WwbmGameOverProps> = ({ score, resetGame, link, title }) => {
    const [user, setUser] = useState<User | null>(null);
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(30)
    const [isRunning, setIsRunning] = useState(true);


    const supabase = getSupabase()



    useEffect(() => {

        if(isRunning && timeLeft > 0){
            setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1)
                }, 1000)
        } else {
            setIsRunning(false)
        }



    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };


    const handleSocialShare = (platform: string) => {
        const text = `I scored ${score} points playing ${title}! Try to beat my score!`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(link);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        };

        window.open(urls[platform as keyof typeof urls], '_blank');
    };


    useEffect(() => {
        // Get initial user data
        getUserData();

        // Set up listener for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);


    useEffect(() =>{
        const uuid = link.split('/').pop() || '';
        updateWwbmHighScore(score, uuid)
    }, [])

    async function getUserData() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    }


    if (!user) return (
        <div className="relative min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700" />

            <button className="absolute top-6 right-6 bg-white/20 p-2 rounded-lg z-10">
                <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative z-10 flex flex-col items-center max-w-md w-full">


                <h1 className="text-white text-3xl font-bold mb-2 flex items-center gap-2">
                    CONGRATS <span className="text-2xl">🎉</span>
                </h1>



                <div className="bg-white/20 px-8 py-2 rounded-full mb-6">
                    <span className="text-white text-lg font-semibold">{score} pt</span>
                </div>

                <p className="text-white/80 text-center mb-12">
                    Share your achivement 😎
                </p>

                <div className="flex gap-6 w-full justify-center">
                   

                    <button className="flex flex-col items-center" onClick={resetGame}>
                        <div className="bg-pink-300 p-4 rounded-xl mb-2">
                            <Play className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-sm">Restart</span>
                    </button>

                    <button className="flex flex-col items-center">
                        <div className="bg-orange-300 p-4 rounded-xl mb-2">
                            <Send className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-sm">Continue</span>
                    </button>
                </div>
            </div>
        </div>

    )

    const { user_metadata: { picture, full_name } } = user!;


    return (
        <div className="relative min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700" />


            <div className="relative z-10 flex flex-col items-center max-w-md w-full">
                <div className="relative mb-8">

                    <div className="relative mb-10">
                        <div className="w-24 h-24 rounded-full bg-cyan-400 flex items-center justify-center">
                            <img
                                src={picture}
                                alt={`${full_name}'s profile`}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-transparent p-2 rounded-full">
                            👑
                        </div>
                    </div>
                </div>

                <h1 className="text-white text-3xl font-bold mb-2 flex items-center gap-2">
                    CONGRATS <span className="text-2xl">🎉</span>
                </h1>

                <p className="text-orange-300 text-xl font-semibold mb-4">
                    {full_name}
                </p>

                <div className="bg-white/20 px-8 py-2 rounded-full mb-6">
                    <span className="text-white text-lg font-semibold">{score} pt</span>
                </div>

                <p className="text-white/80 text-center mb-12">
                    Share your achivement  😎
                </p>

                <div className="w-full max-w-sm mb-8">
                    <div className="bg-white/20 rounded-xl p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={link}
                                readOnly
                                className="flex-1 bg-white/20 text-white px-3 py-2 rounded-lg focus:outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="bg-blue-300 p-3 rounded-xl hover:bg-blue-400 transition-colors"
                            >
                                <Copy className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {copied && (
                            <p className="text-blue-300 text-sm text-center">Link copied!</p>
                        )}

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => handleSocialShare('twitter')}
                                className="bg-[#1DA1F2] p-3 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Twitter className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => handleSocialShare('facebook')}
                                className="bg-[#4267B2] p-3 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => handleSocialShare('linkedin')}
                                className="bg-[#0077B5] p-3 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                <Linkedin className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 w-full justify-center">
                    

                    <button className="flex flex-col items-center" onClick={resetGame}>
                        <div className="bg-pink-300 p-4 rounded-xl mb-2">
                            <Play className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-sm">Play Again</span>
                    </button>

                    <button className="flex flex-col items-center">
                        <div className="bg-orange-300 p-4 rounded-xl mb-2">
                            <Send className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-sm">Continue</span>
                    </button>


                </div>
            </div>
        </div>
    );
};

export default CongratsPage;