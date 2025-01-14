import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, UserIcon } from 'lucide-react';
import { getSupabase } from '../services/supabaseClient';
import Modal from './jeopardy/modals/modalTemplate';
import { User } from '@supabase/supabase-js';

export default function UserMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();
    const supabase = getSupabase()

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // const handleSignIn = async () => {
    //     router.push('/login')
    // }



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

    async function getUserData() {
        const { data: { user } } = await supabase.auth.getUser();
        console.log(`User: ${user?.id}`)
        setUser(user);
    }

    if (!user) return (
            <div className="relative">
                <div className="flex items-center  rounded-lg ">
    
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 bg-gray-500 hover:bg-blue-600 rounded-full"
                    >
                        <UserIcon
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </button>
                </div>
    
                {isMenuOpen && (
    
                    <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                        <div className="flex flex-col items-center justify-center space-y-4 w-full">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-blue-600 bg-white text-black  max-w-xs"
                            >
                                <LogIn size={16} className="text-black" />
                                Sign In
                            </button>
                        </div>
                    </Modal>
    
                )}
            </div>
        );

    const { user_metadata: { picture, full_name } } = user;

    return (
        <div className="relative">
            <div className="flex items-center  rounded-lg ">

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 hover:bg-blue-600 rounded-full"
                >
                    {/* <img
                        src={picture}
                        alt={`${full_name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                    /> */}
                     {picture ? (
            <img
                src={picture}
                alt={`${full_name}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('bg-gray-200', 'flex', 'items-center', 'justify-center');
                    // Create and append the UserIcon
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                    target.parentElement?.appendChild(icon);
                }}
            />
        ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-600" />
            </div>
        )}
                </button>
            </div>

            {isMenuOpen && (

                <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <div className="flex flex-col items-center justify-center space-y-4 w-full">
                        <span className="font-medium text-center text-white">{full_name}</span>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-blue-600 bg-white text-black  max-w-xs"
                        >
                            <LogOut size={16} className="text-black" />
                            Logout
                        </button>
                    </div>
                </Modal>

            )}
        </div>
    );
}