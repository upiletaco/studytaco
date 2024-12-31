const Clock = () => {
    return (
        <div className="flex justify-center mx-auto">

        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <path
                d="M200,50 A150,150 0 0,1 350,200"
                fill="none"
                stroke="#93C5FD"
                stroke-width="40"
                stroke-linecap="round"
            />

            <path
                d="M350,200 A150,150 0 0,1 200,350"
                fill="none"
                stroke="#D8B4FE"
                stroke-width="40"
                stroke-linecap="round"
            />

            <path
                d="M200,350 A150,150 0 0,1 50,200"
                fill="none"
                stroke="#86EFAC"
                stroke-width="40"
                stroke-linecap="round"
            />

            <path
                d="M50,200 A150,150 0 0,1 200,50"
                fill="none"
                stroke="#EAB308"
                stroke-width="40"
                stroke-linecap="round"
            />

            <circle
                cx="200"
                cy="200"
                r="20"
                fill="#93C5FD"
            />

            <path
                d="M200,200 L200,100"
                stroke="#D8B4FE"
                stroke-width="12"
                stroke-linecap="round"
            />

            <path
                d="M200,200 L280,200"
                stroke="#86EFAC"
                stroke-width="12"
                stroke-linecap="round"
            />
        </svg>
        </div>
    )
}

export {Clock}