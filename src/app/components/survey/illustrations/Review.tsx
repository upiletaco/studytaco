import React from 'react'


const Review = () => {
    return (
        <div className="flex justify-center mx-auto">

        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            {/* <!-- Floating Paper Elements --> */}
            <rect
                x="80"
                y="100"
                width="240"
                height="60"
                fill="#93C5FD"
                transform="rotate(-8 200 130)"
            />

            <rect
                x="80"
                y="180"
                width="240"
                height="60"
                fill="#D8B4FE"
                transform="rotate(8 200 210)"
            />

            <rect
                x="80"
                y="260"
                width="240"
                height="60"
                fill="#86EFAC"
                transform="rotate(-4 200 290)"
            />

            {/* <!-- Study Lines --> */}
            <g stroke="#000000" stroke-width="2" opacity="0.15">
                <line x1="100" y1="120" x2="280" y2="110" />
                <line x1="100" y1="135" x2="280" y2="125" />

                <line x1="100" y1="200" x2="280" y2="210" />
                <line x1="100" y1="215" x2="280" y2="225" />

                <line x1="100" y1="280" x2="280" y2="275" />
                <line x1="100" y1="295" x2="280" y2="290" />
            </g>

            {/* <!-- Highlight Elements --> */}
            <rect
                x="120"
                y="115"
                width="80"
                height="8"
                fill="#EAB308"
                transform="rotate(-8 160 119)"
                opacity="0.5"
            />

            <rect
                x="200"
                y="205"
                width="60"
                height="8"
                fill="#EAB308"
                transform="rotate(8 230 209)"
                opacity="0.5"
            />

            <rect
                x="150"
                y="285"
                width="100"
                height="8"
                fill="#EAB308"
                transform="rotate(-4 200 289)"
                opacity="0.5"
            />
        </svg>
        </div>
    )
}

export default Review