// pages/auth/callback.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSupabase } from '@/app/services/supabaseClient'
import { checkUserSurvey } from '@/app/services/supabaseService';
import Image from 'next/image';



export default function AuthCallback() {
  const router = useRouter()
  const supabase = getSupabase()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {

      if (event === 'SIGNED_IN') {
        const finishedSurvey = await checkUserSurvey()

        if (finishedSurvey == true) {
          router.push('/home') // Redirect to your desired page after sign in

        } else {
          router.push('/survey')
        }

      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  return <div className="min-h-screen bg-white p-6 flex items-center justify-center">


    <div className="max-w-sm  p-6 w-full">
    <div className='flex justify-center'>
                <Image src="/taco-design.png" alt="Taco" width={128} height={128} />

                </div>

      <h1 className="text-3xl font-serif text-center mb-12 text-black">
        Loading ...
      </h1>


    </div>


  </div>
}
