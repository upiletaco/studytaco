import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getSupabase } from '@/app/services/supabaseClient';
import Image from 'next/image';




const SignUpPage = () => {

  const handleSignIn = async () => {
    const supabase = getSupabase()
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      console.log(data)
      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="max-w-sm  p-6 w-full">
        <div className='flex justify-center'>
          <Image src="/taco-design.png" alt="Taco" width={128} height={128} />

        </div>

        <h1 className="text-3xl font-serif text-center mb-12 text-black">
          Welcome to Study Taco!
        </h1>

        <div className="space-y-4">
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 
            border-2 rounded-full hover:bg-gray-50 transition-colors">
            <FcGoogle className="text-xl" />
            <span className="text-[15px] text-black">Continue with Google</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;