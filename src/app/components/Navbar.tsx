import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getSupabase } from '@/app/services/supabaseClient';
import { User } from '@supabase/supabase-js';
import UserMenu from './UserMenu';
import { FileQuestionIcon, Menu, X } from 'lucide-react';

interface NavbarProps {
    instructions?: string;
    backgroundColor?: string;
    foregroundColor?: string;

}

const Navbar: React.FC<NavbarProps> = ({ instructions, backgroundColor = 'bg-white', foregroundColor = 'text-black'
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleInstructions = () => {
        if (instructions === "jeopardy") {
            router.push('/onboarding')
        }
        if (instructions === "millionaire") {
            router.push('/millionaire/onboarding')
        }
    }

    const handleLogin = () => {
        router.push('/login')
    }

    useEffect(() => {
        const getUser = async () => {
            const supabase = getSupabase();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    return (
        <nav className={`w-full flex justify-center ${backgroundColor}`}>

            <div className="max-w-7xl w-full p-4">
                {/* Desktop and Tablet View */}
                <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <Image src="/taco-design.png" alt="Taco" width={48} height={48} />
                        <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold">
                            StudyTaco
                        </span>
                    </div>

                    <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex space-x-6">
                        <button onClick={() => router.push('/home')} className={`${foregroundColor} hover:opacity-80 transition-opacity`}
                        >
                            Home
                        </button>
                        <a href="mailto:support@studytaco.com" className={`${foregroundColor} hover:opacity-80 transition-opacity`}
                        >
                            Support
                        </a>
                    </div>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            {instructions && (
                                <FileQuestionIcon
                                    className="cursor-pointer w-6 h-6"
                                    onClick={handleInstructions}
                                />
                            )}
                            <UserMenu />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            {instructions && (
                                <FileQuestionIcon
                                color={foregroundColor === 'text-white' ? 'white' : foregroundColor.replace('text-', '')}
                                className={`cursor-pointer w-6 h-6 `}
                                    onClick={handleInstructions}
                                />
                            )}
                            <span onClick={handleLogin} className="text-purple-600 hover:text-purple-400">Register</span>
                            <button onClick={handleLogin} className="px-4 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50">
                                Login
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile View */}
                <div className="sm:hidden">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Image src="/taco-design.png" alt="Taco" width={48} height={48} />
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold">
                                StudyTaco
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="mt-4 pt-2 border-t flex flex-col items-center text-center">
                            <div className="flex flex-col space-y-4">
                                <button 
                                    onClick={() => {
                                        router.push('/home');
                                        setIsMenuOpen(false);
                                    }} 
                                    className="hover:text-gray-600 text-lg"
                                >
                                    Home
                                </button>
                                <a 
                                    href="mailto:support@studytaco.com" 
                                    className="hover:text-gray-600 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Support
                                </a>
                                
                                {user ? (
                                    <div className="flex flex-col justify-center items-center">
                                        {instructions && (
                                            <FileQuestionIcon
                                                className="cursor-pointer w-6 h-6"
                                                onClick={() => {
                                                    handleInstructions();
                                                    setIsMenuOpen(false);
                                                }}
                                            />
                                        )}
                                        <div onClick={() => setIsMenuOpen(false)}>
                                            <UserMenu />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-4">
                                        {instructions && (
                                            <FileQuestionIcon
                                                className="cursor-pointer w-6 h-6"
                                                onClick={() => {
                                                    handleInstructions();
                                                    setIsMenuOpen(false);
                                                }}
                                            />
                                        )}
                                        <span 
                                            onClick={() => {
                                                handleLogin();
                                                setIsMenuOpen(false);
                                            }} 
                                            className="text-purple-600 hover:text-purple-400"
                                        >
                                            Register
                                        </span>
                                        <button 
                                            onClick={() => {
                                                handleLogin();
                                                setIsMenuOpen(false);
                                            }} 
                                            className="px-4 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 w-full text-left"
                                        >
                                            Login
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;