import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getSupabase } from '@/app/services/supabaseClient';
import { User } from '@supabase/supabase-js';
import UserMenu from './UserMenu';

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

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
       <button onClick={() => router.push('/')} className="hover:text-gray-600">
         Home
       </button>
       <a href="mailto:support@studytaco.com" className="hover:text-gray-600">
         Support
       </a>
     </div>

     {user ? (
       <UserMenu />
     ) : (
       <div className="flex items-center space-x-4">
         <span className="text-pink-600">Register</span>
         <button className="px-4 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-50">
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