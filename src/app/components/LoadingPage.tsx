import React from 'react'
import { GeometricTaco } from './survey/illustrations/Taco'


const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-white p-6 flex items-center justify-center">


            <div className="max-w-sm  p-6 w-full">
                <GeometricTaco />

                <h1 className="text-3xl font-serif text-center mb-12 text-black animate-pulse">
                    Loading ...
                </h1>


            </div>


        </div>)
}

export default LoadingPage