const StopSign = () => {

    return (
        <div className="flex justify-center mx-auto">
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <polygon
                points="150,80 250,80 320,150 320,250 250,320 150,320 80,250 80,150"
                fill="#FF4B55"
            />

            <polygon
                points="160,100 240,100 300,160 300,240 240,300 160,300 100,240 100,160"
                fill="#E6343D"
            />


            <circle cx="200" cy="200" r="80" fill="none" stroke="#FFE5E7" stroke-width="3" opacity="0.3" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="#FFE5E7" stroke-width="2" opacity="0.2" />

            <circle cx="250" cy="80" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="320" cy="150" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="320" cy="250" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="250" cy="320" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="150" cy="320" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="80" cy="250" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="80" cy="150" r="6" fill="#FFE5E7" opacity="0.4" />
            <circle cx="150" cy="80" r="6" fill="#FFE5E7" opacity="0.4" />
        </svg>

        </div>

    )
}

export {StopSign}