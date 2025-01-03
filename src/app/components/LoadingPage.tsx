import React from 'react'
import Image from 'next/image';


const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-white p-6 flex items-center justify-center">


            <div className="max-w-sm  p-6 w-full">
                <div className='flex justify-center'>
                <Image src="/taco-design.png" alt="Taco" width={128} height={128} />

                </div>

                <h1 className="text-3xl font-serif text-center mb-12 text-black animate-pulse">
                    Loading ...
                </h1>


            </div>


        </div>)
}

export default LoadingPage