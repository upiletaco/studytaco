import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getSupabase } from '@/app/services/supabaseClient';
import { User } from '@supabase/supabase-js';
import UserMenu from './UserMenu';
import { FileQuestionIcon } from 'lucide-react';


interface NavbarProps {
    instructions?: string;
}

const Navbar: React.FC<NavbarProps> = ({ instructions }) => {
    const [user, setUser] = useState<User | null>(null);
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
        <nav className="w-full flex justify-center">
            <div className="max-w-7xl w-full p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold">
                            Study Taco
                        </span>
                        <Image src="/taco-design.png" alt="Taco" width={48} height={48} />
                    </div>

                    <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex space-x-6">
                        <button onClick={() => router.push('/home')} className="hover:text-gray-600">
                            Home
                        </button>
                        <a href="mailto:support@studytaco.com" className="hover:text-gray-600">
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
                                    className="cursor-pointer w-6 h-6"
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
            </div>
        </nav>
    );
};

export default Navbar;