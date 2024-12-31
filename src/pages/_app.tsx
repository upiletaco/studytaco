import '../app/globals.css'
import type { AppProps } from 'next/app'
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { Router, useRouter } from 'next/router'




function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()


  useEffect(() => {
    const checkAuthForGameRoutes = () => {
      const isGameRoute = router.pathname.startsWith('/play') ||
        router.pathname.startsWith('/game') || router.pathname.startsWith('/onboarding') || router.pathname.startsWith('/survey') || router.pathname.startsWith('/millionaire')
      const isAuthRoute = router.pathname.startsWith('/login')
      const token = localStorage.getItem('sb-pslnazgalhfzppftmlrr-auth-token')

      if (isGameRoute) {
        if (!token) {
          router.push('/login')
        }
      } 

      if(isAuthRoute){
        if(token){
          router.push('/home')
        }
      }
    }

    checkAuthForGameRoutes()
  }, [router.pathname])

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })

    const handleRouteChange = () => posthog?.capture('$pageview')

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])
  return (
    <>
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  )

}

export default MyApp