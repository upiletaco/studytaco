import React, { useCallback, useEffect, useRef, useState } from 'react';
import { JeopardyData, Question } from '../../../data/sampleBoardData';
import AnimatedScore from '../animatedScore';
import EndGameModal from '../modals/play_screen/endGameModal';
import CategoryTitle from '../categoryTitle';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import ShareGameModal from '../modals/play_screen/shareGameModal';
import HighScoreDisplay from '../localHighScore';
import Modal from '../modals/modalTemplate';
import Confetti from 'react-confetti';

interface JeopardyBoardProps extends JeopardyData {
    shouldReset?: boolean;
    onResetComplete?: () => void;
    onScoreChange?: (score: number) => void;
    handleReset?: () => void;
    title: string,
    link: string | null,
    highScore: number | null,
    isPublic: boolean
}

const PlayScreen: React.FC<JeopardyBoardProps> = ({ categories, handleReset, title, link, highScore, isPublic }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
    const [score, setScore] = useState(0);
    const [showEndGameModal, setShowEndGameModal] = useState(false);
    const [showShareGameModal, setShowShareGameModal] = useState(false);
    const sharedLink = link;
    const cols = categories.length;
    const [isBoardPublic, setIsBoardPublic] = useState<boolean>(isPublic);
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null);

    // Existing functionality remains unchanged
    const handleScoring = (correct: boolean) => {
        if (selectedQuestion) {
            if (correct) {
                setShowConfetti(true);
            }
            const points = selectedQuestion.points;
            const changeAmount = correct ? points : -points;
            setScore(prevScore => prevScore + changeAmount);
            setAnsweredQuestions(prev => new Set([...prev, `${selectedQuestion.points}-${selectedQuestion.clue}`]));
            handleCloseModal();

            
        }
    };

    const handleSettingBoardToPublic = () => {
        setIsBoardPublic(true);
    };

    const handleLocalHighScore = () => {
        if (sharedLink == null) return;
        const id = sharedLink.split('/').pop();
        const scoreKey = `${id}-score`;
        const lastVisitedKey = `${id}-last-visited`;
        const now = new Date();
        localStorage.setItem(scoreKey, score.toString());
        localStorage.setItem(lastVisitedKey, now.toISOString());
    };

    const handleHighScore = () => {
        handleLocalHighScore();
        if (sharedLink == null) return;
        const id = sharedLink.split('/').pop();
        if (highScore == null || score > highScore) {
            try {
                fetch('/api/update-high-score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ score: score, id: id })
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (Array.from(answeredQuestions).length == cols * 5) {
            setShowEndGameModal(true);
        }
    }, [answeredQuestions]);

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
        setShowAnswer(false);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
        setShowAnswer(false);
    };

    const handleRestartGame = () => {
        handleHighScore();
        setScore(0);
        setAnsweredQuestions(new Set());
        setShowEndGameModal(false);
    };

    const isQuestionAnswered = useCallback((question: Question) => {
        return answeredQuestions.has(`${question.points}-${question.clue}`);
    }, [answeredQuestions]);

    const pointValues = categories[0]?.questions.map(q => q.points) || [];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#060CE9] px-2 py-4 sm:p-8">
            {showConfetti && (
                <Confetti
                    width={typeof window !== 'undefined' ? window.innerWidth : 0}
                    height={typeof window !== 'undefined' ? window.innerHeight : 0}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.3}
                    colors={['#FFCC00', '#FFD700', '#FFA500', '#FFFFFF']}
                    onConfettiComplete={() => setShowConfetti(false)}
                />
            )}
            {/* Top Bar - Responsive Layout */}
            <div className="fixed top-0 left-0 right-0 bg-[#060CE9] p-2 sm:p-4 z-40">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 mx-auto">
                    {/* Score and High Score - Now full width on mobile */}
                    <div className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-4">
                        <AnimatedScore score={score} />
                        {sharedLink && <HighScoreDisplay uuid={sharedLink.split('/').pop()!} />}
                    </div>
                    
                    {/* Action Buttons - Now full width on mobile */}
                    <div className="w-full sm:w-auto flex justify-center sm:justify-end gap-2">
                        <button
                            onClick={() => setShowShareGameModal(true)}
                            className="flex-1 sm:flex-initial bg-[#FFCC00] text-[#000080] px-3 py-2 sm:px-6 sm:py-2 rounded-lg 
                            text-sm sm:text-base font-bold hover:bg-[#FFD700] transition duration-200"
                        >
                            Share
                        </button>
                        <button
                            onClick={() => setShowEndGameModal(true)}
                            className="flex-1 sm:flex-initial bg-[#000080] text-[#FFCC00] px-3 py-2 sm:px-6 sm:py-2 rounded-lg 
                            text-sm sm:text-base font-bold hover:bg-[#000080]/80 transition duration-200"
                        >
                            End Game
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Adjusted for top bar */}
            <div className="flex flex-col items-center justify-center  pt-32 max-w-7xl mx-auto sm:pt-20">
                {/* Responsive Headers */}
                <h1 className="text-3xl sm:text-5xl font-bold text-center text-[#FFCC00] 
                    tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                    font-serif mb-4 sm:mb-8">
                    AI Jeopardy
                </h1>

                <h2 className="text-2xl sm:text-4xl font-bold text-[#FFCC00] tracking-wider uppercase 
                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-serif text-center mb-4 sm:mb-8 
                    px-2 sm:px-0">
                    {title}
                </h2>

                {/* Responsive Grid */}
                <div className={`grid gap-1 sm:gap-4 w-full sm:max-w-6xl mx-auto ${
                    cols === 3 ? 'grid-cols-3' :
                    cols === 4 ? 'grid-cols-4' :
                    'grid-cols-5'
                }`}>
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-1 sm:space-y-4">
                            <CategoryTitle title={category.category} />

                            {pointValues.map((points) => {
                                const question = category.questions.find(q => q.points === points);
                                if (!question) return null;

                                return (
                                    <button
                                        key={points}
                                        onClick={() => handleQuestionClick(question)}
                                        className={`
                                            w-full aspect-square 
                                            ${isQuestionAnswered(question)
                                                ? 'bg-[#000080]/50 cursor-default'
                                                : 'bg-[#000080] hover:bg-[#000080]/80 cursor-pointer transform hover:scale-105'}
                                            border border-[#FFCC00] sm:border-2 rounded
                                            transition duration-200
                                            flex items-center justify-center
                                            text-[#FFCC00] font-bold text-sm sm:text-3xl
                                        `}
                                        disabled={isQuestionAnswered(question)}
                                    >
                                        {isQuestionAnswered(question) ? '' : points}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Modals remain unchanged */}
                <Modal isOpen={!!selectedQuestion} onClose={handleCloseModal}>
                    {selectedQuestion && (
                        <div className="text-[#FFCC00]">
                            <div className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
                                {selectedQuestion.points}
                            </div>
                            <div className="text-lg sm:text-xl text-center font-medium mb-6 sm:mb-8">
                                {selectedQuestion.clue}
                            </div>
                            {!showAnswer ? (
                                <div className="flex justify-around px-4 sm:px-12">
                                    <button
                                        onClick={() => setShowAnswer(true)}
                                        className="bg-[#FFCC00] text-[#000080] px-4 sm:px-6 py-2 mx-1 rounded-lg 
                                            font-bold hover:bg-[#FFD700] transition duration-200"
                                    >
                                        Show Answer
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-[#FFCC00] text-[#000080] px-4 sm:px-6 py-2 mx-1 rounded-lg 
                                            font-bold hover:bg-[#FFD700] transition duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full space-y-6">
                                    <div className="text-base sm:text-lg text-center font-medium border-t-2 border-[#FFCC00] pt-6">
                                        {selectedQuestion.answer}
                                    </div>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={() => handleScoring(true)}
                                            className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg 
                                                font-bold hover:bg-green-600 transition duration-200 
                                                flex items-center gap-2"
                                        >
                                            Correct <ThumbsUpIcon size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleScoring(false)}
                                            className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg 
                                                font-bold hover:bg-red-600 transition duration-200 
                                                flex items-center gap-2"
                                        >
                                            Incorrect <ThumbsDownIcon size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                <ShareGameModal
                    isOpen={showShareGameModal}
                    onClose={() => setShowShareGameModal(false)}
                    score={score}
                    title={title}
                    sharedLink={sharedLink}
                    onPublic={handleSettingBoardToPublic}
                    isPublic={isBoardPublic}
                />
                
                <EndGameModal
                    isOpen={showEndGameModal}
                    onClose={() => setShowEndGameModal(false)}
                    score={score}
                    onRestart={handleRestartGame}
                    onNewGame={handleReset!}
                    title={title}
                    sharedLink={sharedLink}
                    onPublic={handleSettingBoardToPublic}
                    isPublic={isBoardPublic}
                />
            </div>
        </div>
    );
};

export default PlayScreen;