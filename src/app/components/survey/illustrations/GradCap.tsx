import React from 'react'


const GradCap = () => {
    return (
        <div className="flex justify-center mx-auto">

        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            {/* <!-- Base diamond shape --> */}
            <polygon
                points="200,100 350,200 200,300 50,200"
                fill="#000000"
            />

            {/* <!-- Top square --> */}
            <rect
                x="120"
                y="140"
                width="160"
                height="160"
                fill="#1a1a1a"
                transform="rotate(-45 200 220)"
            />

            {/* <!-- Tassel element --> */}
            <path
                d="M200,160 Q240,200 280,180 L260,220 Q220,240 180,200 Z"
                fill="#EAB308"
            />

            {/* <!-- Center button --> */}
            <circle
                cx="200"
                cy="220"
                r="15"
                fill="#EAB308"
                opacity="0.8"
            />

            {/* <!-- Subtle highlight --> */}
            <rect
                x="150"
                y="220"
                width="100"
                height="8"
                fill="#333333"
                transform="rotate(-45 200 220)"
            />
        </svg>
        </div>
    )

}

export default GradCap