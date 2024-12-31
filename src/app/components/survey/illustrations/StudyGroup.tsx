import React from 'react'


const StudyGroup = () => {
    return (
        <div className="flex justify-center mx-auto"
        ><svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            {/* <!-- Left Figure --> */}
            <g transform="translate(-20,0)">
                <circle
                    cx="120"
                    cy="150"
                    r="25"
                    fill="#93C5FD"
                />
                <path
                    d="M95,180 Q120,200 145,180 L135,230 L105,230 Z"
                    fill="#93C5FD"
                />
            </g>

            {/* <!-- Center Figure --> */}
            <g transform="translate(0,-20)">
                <circle
                    cx="200"
                    cy="150"
                    r="30"
                    fill="#D8B4FE"
                />
                <path
                    d="M170,185 Q200,205 230,185 L220,245 L180,245 Z"
                    fill="#D8B4FE"
                />
            </g>

            {/* <!-- Right Figure --> */}
            <g transform="translate(20,0)">
                <circle
                    cx="280"
                    cy="150"
                    r="25"
                    fill="#86EFAC"
                />
                <path
                    d="M255,180 Q280,200 305,180 L295,230 L265,230 Z"
                    fill="#86EFAC"
                />
            </g>

            {/* <!-- Background Figures --> */}
            <g opacity="0.6" transform="translate(-40,30)">
                <circle
                    cx="160"
                    cy="170"
                    r="20"
                    fill="#EAB308"
                />
                <path
                    d="M140,195 Q160,210 180,195 L175,235 L145,235 Z"
                    fill="#EAB308"
                />
            </g>

            <g opacity="0.6" transform="translate(40,30)">
                <circle
                    cx="240"
                    cy="170"
                    r="20"
                    fill="#93C5FD"
                />
                <path
                    d="M220,195 Q240,210 260,195 L255,235 L225,235 Z"
                    fill="#93C5FD"
                />
            </g>

            {/* <!-- Connecting Elements --> */}
            <path
                d="M150,200 Q200,180 250,200"
                fill="none"
                stroke="#D8B4FE"
                stroke-width="4"
                opacity="0.3"
            />

            <path
                d="M130,220 Q200,200 270,220"
                fill="none"
                stroke="#86EFAC"
                stroke-width="4"
                opacity="0.3"
            />
        </svg>
        </div>
    )
}

export default StudyGroup